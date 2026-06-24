import { prisma } from '../../database.js';
import { validationError } from '../../common/errorHandler.js';
import { findVariantMatch, resolveGroupId, clearLoneGroupMember } from './variant.js';

export type ModuleStepInput = {
  order: number;
  callId: number | null;
  startId: number | null;
  designator?: string | null;
  count?: number | null;
  warning?: string | null;
};

export type ModuleInput = {
  name: string;
  startFormId: number | null;
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

// List and get both load steps + formation names. The list is intentionally
// nested (not shallow like presentation list): module pickers and the session
// conductor need each module's step preview without an N+1, and #71's list
// acceptance asserts steps[].callFormation.call.name.
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
  endFormId: number | null;
  isValid: boolean;
  chainBreaks: number[];
  safeAfterEntryOrder: number | null;
  safeAfterFasrOrder: number | null;
};

// Validate step references against call_formation, derive endFormId, detect
// chain breaks, and compute teach-order safety positions. Draft steps (null
// callId/startId) are skipped in formation-chain validation and mark the module
// isValid: false; a null startFormId leaves the chain unanchored at its first
// step and is likewise isValid: false. Throws validationError on unknown
// (callId, startId) refs or an endFormId that contradicts the derived value.
async function analyze(
  startFormId: number | null,
  bodyEndFormId: number | null | undefined,
  steps: ModuleStepInput[],
  teachOrderId: number | null | undefined,
): Promise<Analysis> {
  if (steps.length === 0) {
    return { endFormId: bodyEndFormId ?? null, isValid: false, chainBreaks: [], safeAfterEntryOrder: null, safeAfterFasrOrder: null };
  }

  const ordered = [...steps].sort((a, b) => a.order - b.order);

  // Reject duplicate step orders up front (406) rather than letting them hit the
  // choreo_module_step PK @@id([moduleId, order]) as a 500.
  if (new Set(ordered.map((s) => s.order)).size !== ordered.length) {
    throw new validationError('Duplicate step order within the module.');
  }

  // Resolved steps are those with both callId and startId set.
  const resolvedSteps = ordered.filter((s): s is ModuleStepInput & { callId: number; startId: number } =>
    s.callId != null && s.startId != null,
  );

  // Any unresolved steps make isValid false regardless of chain.
  const hasUnresolved = resolvedSteps.length < ordered.length;

  if (resolvedSteps.length === 0) {
    return { endFormId: bodyEndFormId ?? null, isValid: false, chainBreaks: [], safeAfterEntryOrder: null, safeAfterFasrOrder: null };
  }

  const callFormations = await prisma.call_formation.findMany({
    where: { OR: resolvedSteps.map((s) => ({ callId: s.callId, startId: s.startId })) },
  });
  const endById = new Map(callFormations.map((cf) => [key(cf.callId, cf.startId), cf.endId]));

  for (const s of resolvedSteps) {
    if (!endById.has(key(s.callId, s.startId))) {
      throw new validationError(`No call_formation for callId ${s.callId} from startId ${s.startId}.`);
    }
  }

  // Chain-break detection only runs across consecutive resolved steps. An
  // unresolved step between two resolved steps breaks the chain at the resolved
  // step that follows it (we cannot verify the transition through a null step).
  const chainBreaks: number[] = [];
  let prevEnd: number | null = startFormId;
  for (let i = 0; i < ordered.length; i++) {
    const step = ordered[i]!;
    if (step.callId == null || step.startId == null) {
      // Unresolved step — unknown end formation; subsequent chain check is skipped.
      prevEnd = null;
      continue;
    }
    if (prevEnd !== null && step.startId !== prevEnd) chainBreaks.push(step.order);
    prevEnd = endById.get(key(step.callId, step.startId))!;
  }

  const derivedEnd = prevEnd;
  if (bodyEndFormId != null && derivedEnd != null && bodyEndFormId !== derivedEnd) {
    throw new validationError(
      `endFormId ${bodyEndFormId} does not match the formation the last step leaves dancers in (${derivedEnd}).`,
    );
  }

  const safe = await computeSafeAfter(teachOrderId, resolvedSteps);

  return {
    endFormId: derivedEnd,
    // An unanchored module (null startFormId) can't have its first step's entry
    // verified, so it is never valid even when every step resolves and chains.
    isValid: startFormId != null && !hasUnresolved && chainBreaks.length === 0,
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
  steps: Array<ModuleStepInput & { callId: number; startId: number }>,
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

export const moduleExists = async (id: number) =>
  (await prisma.choreo_module.count({ where: { id } })) > 0;

export const createModuleService = async (data: ModuleInput) => {
  const { steps, name, startFormId, teachOrderId, endFormId, isVerified, ...flow } = data;
  const analysis = await analyze(startFormId, endFormId, steps, teachOrderId);

  const resolvedSteps = steps.filter(
    (s): s is ModuleStepInput & { callId: number; startId: number } => s.callId != null && s.startId != null,
  );

  // Variant detection (#21) runs inside the transaction at Serializable
  // isolation: the comparison key is unstored by design, so there is no unique
  // constraint to backstop it. Without this, two concurrent identical POSTs
  // could both miss the exact-dup check and both insert — the very duplication
  // this feature prevents. An exact step-row duplicate is never re-created; the
  // existing module is returned so presentations share one choreo unit.
  // Draft modules (any unresolved steps) skip variant detection entirely.
  return prisma.$transaction(
    async (tx) => {
      const match = resolvedSteps.length === steps.length
        ? await findVariantMatch(resolvedSteps, undefined, tx)
        : { exactModuleId: null, matchedIds: [], existingGroupId: null };
      if (match.exactModuleId != null) {
        const existing = await tx.choreo_module.findUnique({
          where: { id: match.exactModuleId },
          include: MODULE_INCLUDE,
        });
        return { module: existing!, chainBreaks: analysis.chainBreaks, reusedExisting: true };
      }

      const groupId = resolveGroupId(match);
      if (groupId != null) {
        await tx.choreo_module.updateMany({
          where: { id: { in: match.matchedIds } },
          data: { variantGroupId: groupId },
        });
      }
      const module = await tx.choreo_module.create({
        data: {
          name,
          startFormId,
          endFormId: analysis.endFormId,
          teachOrderId: teachOrderId ?? null,
          isVerified: isVerified ?? false,
          isValid: analysis.isValid,
          variantGroupId: groupId,
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
      return { module, chainBreaks: analysis.chainBreaks, reusedExisting: false };
    },
    { isolationLevel: 'Serializable' },
  );
};

export const updateModuleService = async (id: number, data: ModuleInput) => {
  const { steps, name, startFormId, teachOrderId, endFormId, isVerified, ...flow } = data;
  const analysis = await analyze(startFormId, endFormId, steps, teachOrderId);

  const resolvedSteps = steps.filter(
    (s): s is ModuleStepInput & { callId: number; startId: number } => s.callId != null && s.startId != null,
  );

  // Variant detection on edit runs inside the transaction (Serializable, same
  // rationale as create): re-match against everything but this module. An
  // identical-row match never merges modules on PUT — the edited module keeps
  // its id and simply joins the group. Draft modules skip detection.
  const module = await prisma.$transaction(async (tx) => {
    const match = resolvedSteps.length === steps.length
      ? await findVariantMatch(resolvedSteps, id, tx)
      : { exactModuleId: null, matchedIds: [], existingGroupId: null };
    const groupId = resolveGroupId(match);
    const previous = await tx.choreo_module.findUnique({
      where: { id },
      select: { variantGroupId: true },
    });
    await tx.choreo_module_step.deleteMany({ where: { moduleId: id } });
    if (groupId != null) {
      await tx.choreo_module.updateMany({
        where: { id: { in: match.matchedIds } },
        data: { variantGroupId: groupId },
      });
    }
    const updated = await tx.choreo_module.update({
      where: { id },
      data: {
        name,
        startFormId,
        endFormId: analysis.endFormId,
        teachOrderId: teachOrderId ?? null,
        ...(isVerified != null ? { isVerified } : {}),
        isValid: analysis.isValid,
        variantGroupId: groupId,
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
    if (previous?.variantGroupId && previous.variantGroupId !== groupId) {
      await clearLoneGroupMember(tx, previous.variantGroupId);
    }
    return updated;
  }, { isolationLevel: 'Serializable' });
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
