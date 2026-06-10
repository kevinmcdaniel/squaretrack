import { randomUUID } from 'node:crypto';
import { prisma } from '../../database.js';
import type { ModuleStepInput } from './index.js';

// Variant detection (#21). Two modules are choreo-equivalent when their steps
// produce identical Taminations text; equivalent modules share a variantGroupId.
// The text is derived on the fly and never stored, so the format below is an
// internal comparison key, free to evolve without a migration.
//
// Key per step: startId : designator : (tamSeq ?? call#id) : count
// - tamSeq (not callId) so synonym-level twins compare equal — e.g. "3/4 Wheel
//   the Ocean" and "3/4 Wheel the Sea" share one tamSeq.
// - startId so the same call list from a different FASR does not group.

type StepRow = {
  order: number;
  callId: number;
  startId: number;
  designator: string | null;
  count: number | null;
  tamSeq: string | null;
};

function keyOf(steps: StepRow[]): string {
  return [...steps]
    .sort((a, b) => a.order - b.order)
    .map((s) => `${s.startId}:${(s.designator ?? '').toLowerCase()}:${s.tamSeq ?? `call#${s.callId}`}:${s.count ?? ''}`)
    .join(';');
}

function sameRows(a: StepRow[], b: StepRow[]): boolean {
  if (a.length !== b.length) return false;
  const sa = [...a].sort((x, y) => x.order - y.order);
  const sb = [...b].sort((x, y) => x.order - y.order);
  return sa.every((s, i) => {
    const t = sb[i]!;
    return (
      s.callId === t.callId &&
      s.startId === t.startId &&
      (s.designator ?? '').toLowerCase() === (t.designator ?? '').toLowerCase() &&
      (s.count ?? null) === (t.count ?? null)
    );
  });
}

export type VariantMatch = {
  // Module whose step rows are literally identical to the input — the caller
  // should reuse it instead of creating a duplicate. Null on PUT-style checks.
  exactModuleId: number | null;
  // Choreo-equivalent (same key) modules, including the exact one if any.
  matchedIds: number[];
  // An existing group id among the matches, if one of them is already grouped.
  existingGroupId: string | null;
};

export async function findVariantMatch(
  steps: ModuleStepInput[],
  excludeModuleId?: number,
): Promise<VariantMatch> {
  const none: VariantMatch = { exactModuleId: null, matchedIds: [], existingGroupId: null };
  if (steps.length === 0) return none; // empty modules never participate

  const tamByCall = new Map(
    (
      await prisma.call.findMany({
        where: { callId: { in: [...new Set(steps.map((s) => s.callId))] } },
        select: { callId: true, tamSeq: true },
      })
    ).map((c) => [c.callId, c.tamSeq]),
  );
  const inputRows: StepRow[] = steps.map((s) => ({
    order: s.order,
    callId: s.callId,
    startId: s.startId,
    designator: s.designator ?? null,
    count: s.count ?? null,
    tamSeq: tamByCall.get(s.callId) ?? null,
  }));
  const inputKey = keyOf(inputRows);
  const firstStart = [...inputRows].sort((a, b) => a.order - b.order)[0]!.startId;

  // Narrow candidates to modules whose first step starts from the same FASR
  // formation — a necessary condition for key equality.
  const candidates = await prisma.choreo_module.findMany({
    where: {
      ...(excludeModuleId != null ? { id: { not: excludeModuleId } } : {}),
      steps: { some: { order: 0, startId: firstStart } },
    },
    select: {
      id: true,
      variantGroupId: true,
      steps: {
        orderBy: { order: 'asc' },
        select: {
          order: true,
          callId: true,
          startId: true,
          designator: true,
          count: true,
          callFormation: { select: { call: { select: { tamSeq: true } } } },
        },
      },
    },
  });

  const match: VariantMatch = { exactModuleId: null, matchedIds: [], existingGroupId: null };
  for (const cand of candidates) {
    const rows: StepRow[] = cand.steps.map((s) => ({
      order: s.order,
      callId: s.callId,
      startId: s.startId,
      designator: s.designator,
      count: s.count,
      tamSeq: s.callFormation.call.tamSeq,
    }));
    if (keyOf(rows) !== inputKey) continue;
    match.matchedIds.push(cand.id);
    if (cand.variantGroupId && !match.existingGroupId) match.existingGroupId = cand.variantGroupId;
    if (match.exactModuleId == null && sameRows(inputRows, rows)) match.exactModuleId = cand.id;
  }
  return match;
}

// Group id the new/updated module should carry: join the matches' existing
// group, mint one when the matches are ungrouped, or null when alone.
export function resolveGroupId(match: VariantMatch): string | null {
  if (match.matchedIds.length === 0) return null;
  return match.existingGroupId ?? randomUUID();
}

// After a module leaves a group, a group of one is meaningless — clear it.
export async function clearLoneGroupMember(
  tx: Pick<typeof prisma, 'choreo_module'>,
  groupId: string,
): Promise<void> {
  const members = await tx.choreo_module.findMany({ where: { variantGroupId: groupId }, select: { id: true } });
  if (members.length === 1) {
    await tx.choreo_module.update({ where: { id: members[0]!.id }, data: { variantGroupId: null } });
  }
}
