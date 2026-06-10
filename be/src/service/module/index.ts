import { prisma } from '../../database.js';
import { validationError } from '../../common/errorHandler.js';

export type ModuleStepInput = {
  order: number;
  callId: number;
  startId: number;
  designator?: string | null;
  count?: number | null;
  warning?: string | null;
};

export type ModuleInput = {
  name: string;
  startFormId: number;
  endFormId?: number | null;
  inFlowRotation?: string | null;
  inFlowDirection?: string | null;
  outFlowRotation?: string | null;
  outFlowDirection?: string | null;
  teachOrderId?: number | null;
  isVerified?: boolean;
  steps: ModuleStepInput[];
};

export type ModuleListFilters = {
  startFormId?: number;
  teachOrderId?: number;
  safeAfterMax?: number;
  search?: string;
  variantGroupId?: string;
};

const MODULE_INCLUDE = {
  startForm: { select: { name: true } },
  endForm: { select: { name: true } },
  steps: {
    orderBy: { order: 'asc' },
    include: {
      callFormation: {
        include: {
          call: { select: { name: true } },
          startForm: { select: { name: true } },
          endForm: { select: { name: true } },
        },
      },
    },
  },
} as const;

const key = (callId: number, startId: number) => `${callId}:${startId}`;

// Result of validating + deriving a module's choreographic invariants from its
// steps. endFormId comes from the last step; chainBreaks lists the `order` of
// each step whose start formation doesn't match where the previous step left
// dancers. isValid is true only when every step chains.
type Analysis = {
  endFormId: number;
  isValid: boolean;
  chainBreaks: number[];
  safeAfterEntryOrder: number | null;
  safeAfterFasrOrder: number | null;
};

// Validate step references against call_formation, derive endFormId, detect
// chain breaks, and compute teach-order safety positions. Throws validationError
// on unknown (callId, startId) refs or an endFormId that contradicts the steps.
async function analyze(
  startFormId: number,
  bodyEndFormId: number | null | undefined,
  steps: ModuleStepInput[],
  teachOrderId: number | null | undefined,
): Promise<Analysis> {
  if (steps.length === 0) {
    if (bodyEndFormId == null) {
      throw new validationError('endFormId is required for a module with no steps.');
    }
    return { endFormId: bodyEndFormId, isValid: false, chainBreaks: [], safeAfterEntryOrder: null, safeAfterFasrOrder: null };
  }

  const ordered = [...steps].sort((a, b) => a.order - b.order);

  const callFormations = await prisma.call_formation.findMany({
    where: { OR: ordered.map((s) => ({ callId: s.callId, startId: s.startId })) },
  });
  const endById = new Map(callFormations.map((cf) => [key(cf.callId, cf.startId), cf.endId]));

  for (const s of ordered) {
    if (!endById.has(key(s.callId, s.startId))) {
      throw new validationError(`No call_formation for callId ${s.callId} from startId ${s.startId}.`);
    }
  }

  const chainBreaks: number[] = [];
  let prevEnd: number | null = null;
  for (let i = 0; i < ordered.length; i++) {
    const step = ordered[i]!;
    const expectedStart: number | null = i === 0 ? startFormId : prevEnd;
    if (step.startId !== expectedStart) chainBreaks.push(step.order);
    prevEnd = endById.get(key(step.callId, step.startId))!;
  }

  const derivedEnd = prevEnd!;
  if (bodyEndFormId != null && bodyEndFormId !== derivedEnd) {
    throw new validationError(
      `endFormId ${bodyEndFormId} does not match the formation the last step leaves dancers in (${derivedEnd}).`,
    );
  }

  const safe = await computeSafeAfter(teachOrderId, ordered);

  return {
    endFormId: derivedEnd,
    isValid: chainBreaks.length === 0,
    chainBreaks,
    safeAfterEntryOrder: safe.entryOrder,
    safeAfterFasrOrder: safe.fasrOrder,
  };
}

// Latest teach-order position any of this module's steps occupies — the point
// after which the module is safe to call. Null when no teach order is set or no
// step appears in it.
async function computeSafeAfter(
  teachOrderId: number | null | undefined,
  steps: ModuleStepInput[],
): Promise<{ entryOrder: number | null; fasrOrder: number | null }> {
  if (teachOrderId == null) return { entryOrder: null, fasrOrder: null };
  const fasrs = await prisma.teach_order_entry_fasr.findMany({
    where: { teachOrderId, OR: steps.map((s) => ({ callId: s.callId, startId: s.startId })) },
    select: { entryOrder: true, fasrOrder: true },
  });
  if (fasrs.length === 0) return { entryOrder: null, fasrOrder: null };
  return {
    entryOrder: Math.max(...fasrs.map((f) => f.entryOrder)),
    fasrOrder: Math.max(...fasrs.map((f) => f.fasrOrder)),
  };
}

function buildStepCreate(steps: ModuleStepInput[]) {
  return steps.map((s) => ({
    order: s.order,
    callId: s.callId,
    startId: s.startId,
    designator: s.designator ?? null,
    count: s.count ?? null,
    warning: s.warning ?? null,
  }));
}

export const listModulesService = async (filters: ModuleListFilters) => {
  return prisma.choreo_module.findMany({
    where: {
      ...(filters.startFormId != null ? { startFormId: filters.startFormId } : {}),
      ...(filters.teachOrderId != null ? { teachOrderId: filters.teachOrderId } : {}),
      ...(filters.variantGroupId ? { variantGroupId: filters.variantGroupId } : {}),
      ...(filters.search ? { name: { contains: filters.search, mode: 'insensitive' } } : {}),
      ...(filters.safeAfterMax != null ? { safeAfterEntryOrder: { lte: filters.safeAfterMax } } : {}),
    },
    include: MODULE_INCLUDE,
    orderBy: { name: 'asc' },
  });
};

export const getModuleService = async (id: number) => {
  return prisma.choreo_module.findUnique({ where: { id }, include: MODULE_INCLUDE });
};

export const createModuleService = async (data: ModuleInput) => {
  const { steps, name, startFormId, teachOrderId, endFormId, isVerified, ...flow } = data;
  const analysis = await analyze(startFormId, endFormId, steps, teachOrderId);

  const module = await prisma.choreo_module.create({
    data: {
      name,
      startFormId,
      endFormId: analysis.endFormId,
      teachOrderId: teachOrderId ?? null,
      isVerified: isVerified ?? false,
      isValid: analysis.isValid,
      safeAfterEntryOrder: analysis.safeAfterEntryOrder,
      safeAfterFasrOrder: analysis.safeAfterFasrOrder,
      inFlowRotation: flow.inFlowRotation ?? null,
      inFlowDirection: flow.inFlowDirection ?? null,
      outFlowRotation: flow.outFlowRotation ?? null,
      outFlowDirection: flow.outFlowDirection ?? null,
      steps: { create: buildStepCreate(steps) },
    },
    include: MODULE_INCLUDE,
  });
  return { module, chainBreaks: analysis.chainBreaks };
};

export const updateModuleService = async (id: number, data: ModuleInput) => {
  const { steps, name, startFormId, teachOrderId, endFormId, isVerified, ...flow } = data;
  const analysis = await analyze(startFormId, endFormId, steps, teachOrderId);

  const module = await prisma.$transaction(async (tx) => {
    await tx.choreo_module_step.deleteMany({ where: { moduleId: id } });
    return tx.choreo_module.update({
      where: { id },
      data: {
        name,
        startFormId,
        endFormId: analysis.endFormId,
        teachOrderId: teachOrderId ?? null,
        ...(isVerified != null ? { isVerified } : {}),
        isValid: analysis.isValid,
        safeAfterEntryOrder: analysis.safeAfterEntryOrder,
        safeAfterFasrOrder: analysis.safeAfterFasrOrder,
        inFlowRotation: flow.inFlowRotation ?? null,
        inFlowDirection: flow.inFlowDirection ?? null,
        outFlowRotation: flow.outFlowRotation ?? null,
        outFlowDirection: flow.outFlowDirection ?? null,
        steps: { create: buildStepCreate(steps) },
      },
      include: MODULE_INCLUDE,
    });
  });
  return { module, chainBreaks: analysis.chainBreaks };
};

export const countModulePresentationRefs = async (id: number) =>
  prisma.presentation_item.count({ where: { moduleId: id } });

export const deleteModuleService = async (id: number) =>
  prisma.choreo_module.delete({ where: { id } });

export const listModulePresentationsService = async (id: number) =>
  prisma.presentation.findMany({
    where: { items: { some: { moduleId: id } } },
    orderBy: { name: 'asc' },
  });
