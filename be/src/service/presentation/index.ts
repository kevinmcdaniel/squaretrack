import { prisma } from '../../database.js';
import { validationError } from '../../common/errorHandler.js';

export type ItemStepInput = {
  stepOrder: number;
  textBefore?: string | null;
  textAfter?: string | null;
  callNameAlternate?: string | null;
  warning?: string | null;
  helperText?: string | null;
};

export type ItemInput = {
  order: number;
  type: 'module_ref' | 'text';
  moduleId?: number | null;
  steps?: ItemStepInput[];
  text?: string | null;
  textType?: string | null;
};

export type PresentationInput = {
  name: string;
  status?: string;
  source?: string | null;
  activator?: string | null;
  rating?: string | null;
  notes?: string | null;
  sourceText?: string | null;
  items: ItemInput[];
};

export type PresentationMeta = {
  name?: string;
  status?: string;
  source?: string | null;
  activator?: string | null;
  rating?: string | null;
  notes?: string | null;
};

export type PresentationListFilters = {
  search?: string;
  source?: string;
  status?: string;
  moduleId?: number;
  safeAfterMax?: number;
  activator?: string;
};

export type FlowWarning = { afterItemOrder: number };

// Full nested load for GET /:id, including each module's own steps so the
// per-item-step cueing rows can be mirrored against the choreography.
const PRESENTATION_DETAIL_INCLUDE = {
  items: {
    orderBy: { order: 'asc' },
    include: {
      steps: { orderBy: { stepOrder: 'asc' } },
      module: {
        include: {
          steps: {
            orderBy: { order: 'asc' },
            include: { callFormation: { include: { call: { select: { name: true } } } } },
          },
        },
      },
    },
  },
} as const;

// ── shaping ──────────────────────────────────────────────────────────────────

function shapeItem(item: any) {
  const base = {
    id: item.id,
    order: item.order,
    type: item.type,
    moduleId: item.moduleId ?? null,
    text: item.text ?? null,
    textType: item.textType ?? null,
  };
  if (item.type !== 'module_ref' || !item.module) {
    return { ...base, module: null, steps: item.steps ?? [] };
  }
  const stepByOrder = new Map<number, any>(item.module.steps.map((s: any) => [s.order, s]));
  return {
    ...base,
    module: {
      id: item.module.id,
      name: item.module.name,
      startFormId: item.module.startFormId,
      endFormId: item.module.endFormId,
      isValid: item.module.isValid,
    },
    steps: item.steps.map((st: any) => {
      const ms = stepByOrder.get(st.stepOrder);
      return {
        ...st,
        moduleStep: ms
          ? {
              order: ms.order,
              callId: ms.callId,
              startId: ms.startId,
              designator: ms.designator,
              count: ms.count,
              warning: ms.warning,
              call: { name: ms.callFormation?.call?.name ?? null },
            }
          : null,
      };
    }),
  };
}

function shapePresentation(p: any) {
  return { ...p, items: p.items.map(shapeItem) };
}

// ── validation + flow analysis ────────────────────────────────────────────────

// Validate every module reference and per-step decoration, and report flow
// breaks between adjacent module refs. Throws validationError on bad data;
// flow breaks are returned (not thrown) — an incompatible boundary is valid
// data the caller may choose to fix.
async function analyzeItems(items: ItemInput[]): Promise<FlowWarning[]> {
  const seenOrders = new Set<number>();
  for (const item of items) {
    if (seenOrders.has(item.order)) {
      throw new validationError(`Duplicate item order ${item.order} within the presentation.`);
    }
    seenOrders.add(item.order);
    if (item.type === 'module_ref' && item.moduleId == null) {
      throw new validationError('module_ref items require a moduleId.');
    }
  }

  const moduleIds = [
    ...new Set(items.filter((i) => i.type === 'module_ref' && i.moduleId != null).map((i) => i.moduleId!)),
  ];
  const modules = moduleIds.length
    ? await prisma.choreo_module.findMany({
        where: { id: { in: moduleIds } },
        select: { id: true, startFormId: true, endFormId: true, steps: { select: { order: true } } },
      })
    : [];
  const moduleById = new Map(modules.map((m) => [m.id, { ...m, orders: new Set(m.steps.map((s) => s.order)) }]));

  for (const item of items) {
    if (item.type !== 'module_ref') continue;
    const mod = moduleById.get(item.moduleId!);
    if (!mod) throw new validationError(`Module id ${item.moduleId} does not exist.`);
    const seenStepOrders = new Set<number>();
    for (const step of item.steps ?? []) {
      // Reject duplicate stepOrder up front (406) rather than hitting the
      // presentation_item_step PK @@id([itemId, stepOrder]) as a 500.
      if (seenStepOrders.has(step.stepOrder)) {
        throw new validationError(`Duplicate stepOrder ${step.stepOrder} within item order ${item.order}.`);
      }
      seenStepOrders.add(step.stepOrder);
      if (!mod.orders.has(step.stepOrder)) {
        throw new validationError(`stepOrder ${step.stepOrder} is not a step of module ${item.moduleId}.`);
      }
    }
  }

  const moduleRefs = items.filter((i) => i.type === 'module_ref').sort((a, b) => a.order - b.order);
  const flowWarnings: FlowWarning[] = [];
  for (let i = 0; i < moduleRefs.length - 1; i++) {
    const prev = moduleById.get(moduleRefs[i]!.moduleId!)!;
    const next = moduleById.get(moduleRefs[i + 1]!.moduleId!)!;
    if (prev.endFormId !== next.startFormId) {
      flowWarnings.push({ afterItemOrder: moduleRefs[i]!.order });
    }
  }
  return flowWarnings;
}

function buildItemsCreate(items: ItemInput[]) {
  return items.map((it) => ({
    order: it.order,
    type: it.type,
    moduleId: it.type === 'module_ref' ? it.moduleId ?? null : null,
    text: it.type === 'text' ? it.text ?? null : null,
    textType: it.type === 'text' ? it.textType ?? null : null,
    steps: it.steps?.length
      ? {
          create: it.steps.map((s) => ({
            stepOrder: s.stepOrder,
            textBefore: s.textBefore ?? null,
            textAfter: s.textAfter ?? null,
            callNameAlternate: s.callNameAlternate ?? null,
            warning: s.warning ?? null,
            helperText: s.helperText ?? null,
          })),
        }
      : undefined,
  }));
}

// ── services ───────────────────────────────────────────────────────────────────

export const listPresentationsService = async (filters: PresentationListFilters) =>
  prisma.presentation.findMany({
    where: {
      ...(filters.search ? { name: { contains: filters.search, mode: 'insensitive' } } : {}),
      ...(filters.source ? { source: filters.source } : {}),
      ...(filters.status ? { status: filters.status } : {}),
      ...(filters.activator ? { activator: filters.activator } : {}),
      ...(filters.moduleId != null ? { items: { some: { moduleId: filters.moduleId } } } : {}),
      ...(filters.safeAfterMax != null
        ? {
            items: {
              none: {
                type: 'module_ref',
                module: { OR: [{ safeAfterEntryOrder: null }, { safeAfterEntryOrder: { gt: filters.safeAfterMax } }] },
              },
            },
          }
        : {}),
    },
    orderBy: { name: 'asc' },
  });

export const getPresentationService = async (id: number) => {
  const record = await prisma.presentation.findUnique({ where: { id }, include: PRESENTATION_DETAIL_INCLUDE });
  return record ? shapePresentation(record) : null;
};

export const createPresentationService = async (data: PresentationInput) => {
  const { items, ...meta } = data;
  const flowWarnings = await analyzeItems(items);
  const created = await prisma.presentation.create({
    data: {
      name: meta.name,
      status: meta.status ?? 'draft',
      source: meta.source ?? null,
      activator: meta.activator ?? null,
      rating: meta.rating ?? null,
      notes: meta.notes ?? null,
      sourceText: meta.sourceText ?? null,
      items: { create: buildItemsCreate(items) },
    },
    include: PRESENTATION_DETAIL_INCLUDE,
  });
  return { presentation: shapePresentation(created), flowWarnings };
};

export const updatePresentationService = async (id: number, data: PresentationInput) => {
  const { items, ...meta } = data;
  const flowWarnings = await analyzeItems(items);
  const updated = await prisma.$transaction(async (tx) => {
    await tx.presentation_item.deleteMany({ where: { presentationId: id } });
    return tx.presentation.update({
      where: { id },
      data: {
        name: meta.name,
        ...(meta.status != null ? { status: meta.status } : {}),
        source: meta.source ?? null,
        activator: meta.activator ?? null,
        rating: meta.rating ?? null,
        notes: meta.notes ?? null,
        sourceText: meta.sourceText ?? null,
        items: { create: buildItemsCreate(items) },
      },
      include: PRESENTATION_DETAIL_INCLUDE,
    });
  });
  return { presentation: shapePresentation(updated), flowWarnings };
};

export const patchPresentationService = async (id: number, meta: PresentationMeta) =>
  prisma.presentation.update({
    where: { id },
    data: {
      ...(meta.name != null ? { name: meta.name } : {}),
      ...(meta.status != null ? { status: meta.status } : {}),
      ...(meta.source !== undefined ? { source: meta.source } : {}),
      ...(meta.activator !== undefined ? { activator: meta.activator } : {}),
      ...(meta.rating !== undefined ? { rating: meta.rating } : {}),
      ...(meta.notes !== undefined ? { notes: meta.notes } : {}),
    },
  });

// Dedup key: trim only — preserves newlines and structure so stored text is
// human-readable. Aggressive normalization (lowercase + whitespace collapse)
// would strip the line-per-step structure needed for later display.
function dedupKey(text: string): string {
  return text.trim();
}

export type BulkIntakeItem = { name: string; sourceText: string };
export type BulkIntakeResult = {
  saved: Array<{ id: number; name: string }>;
  skipped: Array<{ id: number; name: string; sourceText: string }>;
};

// Batch-save new draft presentations, skipping any whose trimmed sourceText
// already exists. Each new presentation is created with status='draft' and no items.
export const bulkIntakePresentationsService = async (sequences: BulkIntakeItem[]): Promise<BulkIntakeResult> => {
  const result: BulkIntakeResult = { saved: [], skipped: [] };

  for (const seq of sequences) {
    const key = dedupKey(seq.sourceText);
    const existing = await prisma.presentation.findFirst({
      where: { sourceText: { equals: key } },
      select: { id: true, name: true, sourceText: true },
    });
    if (existing) {
      result.skipped.push({ id: existing.id, name: existing.name, sourceText: existing.sourceText ?? '' });
      continue;
    }
    const created = await prisma.presentation.create({
      data: { name: seq.name, status: 'draft', sourceText: key },
      select: { id: true, name: true },
    });
    result.saved.push(created);
  }

  return result;
};

export const deletePresentationService = async (id: number) =>
  prisma.presentation.delete({ where: { id } });

export const presentationExists = async (id: number) =>
  (await prisma.presentation.count({ where: { id } })) > 0;

export const appendItemService = async (presentationId: number, item: ItemInput) => {
  await analyzeItems([{ ...item, order: 0 }]);
  const last = await prisma.presentation_item.findFirst({
    where: { presentationId },
    orderBy: { order: 'desc' },
    select: { order: true },
  });
  const order = last ? last.order + 1 : 0;
  return prisma.presentation_item.create({
    data: { presentationId, ...buildItemsCreate([{ ...item, order }])[0]! },
    include: { steps: { orderBy: { stepOrder: 'asc' } } },
  });
};

export const deleteItemService = async (presentationId: number, itemId: number) => {
  const item = await prisma.presentation_item.findUnique({ where: { id: itemId } });
  if (!item || item.presentationId !== presentationId) return false;
  await prisma.$transaction(async (tx) => {
    await tx.presentation_item.delete({ where: { id: itemId } });
    const after = await tx.presentation_item.findMany({
      where: { presentationId, order: { gt: item.order } },
      orderBy: { order: 'asc' },
      select: { id: true, order: true },
    });
    for (const row of after) {
      await tx.presentation_item.update({ where: { id: row.id }, data: { order: row.order - 1 } });
    }
  });
  return true;
};
