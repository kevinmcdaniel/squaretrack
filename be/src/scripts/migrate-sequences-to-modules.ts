// One-time data migration for issue #70.
//
// Splits each legacy `sequence` (with its flat `sequence_calls`) into the
// two-layer model:
//   - choreographic content  → choreo_module + choreo_module_step
//   - presentation / cueing  → presentation + presentation_item + presentation_item_step
//
// The legacy tables are left intact; this only copies the data forward so the
// editor UIs (#18/#19/#20) can be rebuilt on the new model without data loss.
//
// Idempotent: a sequence whose name already has a matching presentation is
// skipped (sequence.name is unique, so the name identifies the migrated pair).
//
// Usage (inside the BE container):
//   tsx src/scripts/migrate-sequences-to-modules.ts

import { prisma } from '../database.js';

export async function runMigration(): Promise<{
  modules: number;
  presentations: number;
  skipped: number;
  total: number;
}> {
  const sequences = await prisma.sequence.findMany({
    include: { calls: { orderBy: { order: 'asc' } } },
  });

  let modules = 0;
  let presentations = 0;
  let skipped = 0;

  type StepData = { order: number; callId: number; startId: number; designator: string | null; count: number | null };
  type Decoration = { stepOrder: number; callNameAlternate: string | null; helperText: string | null };
  type ItemSpec =
    | { kind: 'module_ref'; steps: Decoration[] }
    | { kind: 'text'; textType: string; text: string | null };

  for (const seq of sequences) {
    const already = await prisma.presentation.findFirst({ where: { name: seq.name } });
    if (already) {
      skipped++;
      continue;
    }

    // Walk the legacy rows once, in order, building both layers:
    //   - resolved call rows → choreo_module_step (choreography only)
    //   - everything else    → a presentation text item, flushing the current
    //     run of calls first so text keeps its position between calls.
    // Unresolved call rows have no choreography; their text is still preserved.
    const stepsData: StepData[] = [];
    const itemSpecs: ItemSpec[] = [];
    let pending: Decoration[] = [];
    const flush = () => {
      if (pending.length > 0) {
        itemSpecs.push({ kind: 'module_ref', steps: pending });
        pending = [];
      }
    };

    for (const c of seq.calls) {
      if (c.type === 'call' && c.callId != null && c.startId != null) {
        const stepOrder = stepsData.length;
        stepsData.push({ order: stepOrder, callId: c.callId, startId: c.startId, designator: c.designator, count: c.count });
        pending.push({ stepOrder, callNameAlternate: c.text ?? null, helperText: c.helperText ?? null });
        continue;
      }
      flush();
      if (c.type !== 'call') {
        itemSpecs.push({ kind: 'text', textType: c.type, text: c.text });
      } else if (c.text != null) {
        // Unresolved call: no choreography, but keep its text so nothing is lost.
        itemSpecs.push({ kind: 'text', textType: 'call', text: c.text });
      }
    }
    flush();

    // The module ends where its last resolved call leaves the dancers; fall back
    // to the start formation when there are no resolved call steps.
    let endFormId = seq.startFormationId;
    const lastStep = stepsData[stepsData.length - 1];

    // Module + presentation are created atomically: a crash between them would
    // otherwise leave an orphan module the idempotency check can't see, so a
    // re-run would duplicate it.
    await prisma.$transaction(async (tx) => {
      if (lastStep) {
        const cf = await tx.call_formation.findUnique({
          where: { callId_startId: { callId: lastStep.callId, startId: lastStep.startId } },
        });
        if (cf) endFormId = cf.endId;
      }

      const module = await tx.choreo_module.create({
        data: {
          name: seq.name,
          startFormId: seq.startFormationId,
          endFormId,
          isValid: seq.isValid,
          isVerified: seq.isVerified,
          variantGroupId: seq.variantGroupId,
          safeAfterEntryOrder: seq.safeAfterEntryOrder,
          safeAfterFasrOrder: seq.safeAfterFasrOrder,
          teachOrderId: seq.teachOrderId,
          steps: { create: stepsData },
        },
      });

      await tx.presentation.create({
        data: {
          name: seq.name,
          activator: seq.activator,
          rating: seq.rating,
          notes: seq.notes,
          sourceText: seq.sourceText,
          items: {
            create: itemSpecs.map((spec, order) =>
              spec.kind === 'module_ref'
                ? { order, type: 'module_ref', moduleId: module.id, steps: { create: spec.steps } }
                : { order, type: 'text', textType: spec.textType, text: spec.text }
            ),
          },
        },
      });
    });

    modules++;
    presentations++;
  }

  return { modules, presentations, skipped, total: sequences.length };
}

async function main() {
  const summary = await runMigration();
  console.log('Migrated sequences → modules + presentations:', summary);
  await prisma.$disconnect();
}

const isDirectInvocation =
  import.meta.url === `file://${process.argv[1]}` ||
  process.argv[1]?.endsWith('migrate-sequences-to-modules.ts');

if (isDirectInvocation) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
