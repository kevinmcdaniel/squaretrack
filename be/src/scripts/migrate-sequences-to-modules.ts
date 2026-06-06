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

  for (const seq of sequences) {
    const already = await prisma.presentation.findFirst({ where: { name: seq.name } });
    if (already) {
      skipped++;
      continue;
    }

    // Choreographic steps: resolved call rows only (callId + startId required by
    // the choreo_module_step FK). Unresolved/non-call rows carry no choreography.
    const callSteps = seq.calls.filter((c) => c.type === 'call' && c.callId != null && c.startId != null);

    // The module ends where its last call leaves the dancers; fall back to the
    // start formation when there are no resolved call steps.
    let endFormId = seq.startFormationId;
    const lastCall = callSteps[callSteps.length - 1];
    if (lastCall) {
      const cf = await prisma.call_formation.findUnique({
        where: { callId_startId: { callId: lastCall.callId!, startId: lastCall.startId! } },
      });
      if (cf) endFormId = cf.endId;
    }

    const module = await prisma.choreo_module.create({
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
        steps: {
          create: callSteps.map((c, i) => ({
            order: i,
            callId: c.callId!,
            startId: c.startId!,
            designator: c.designator,
            count: c.count,
          })),
        },
      },
    });
    modules++;

    // Cueing layer: a single module_ref item carrying per-call decoration, plus
    // a text item for each non-call row (filler / tip / warning / activator / …).
    const moduleStepDecoration = callSteps.map((c, i) => ({
      stepOrder: i,
      callNameAlternate: c.text ?? null, // legacy display override
      helperText: c.helperText ?? null,
    }));
    const textRows = seq.calls.filter((c) => c.type !== 'call');

    await prisma.presentation.create({
      data: {
        name: seq.name,
        activator: seq.activator,
        rating: seq.rating,
        notes: seq.notes,
        sourceText: seq.sourceText,
        items: {
          create: [
            {
              order: 0,
              type: 'module_ref',
              moduleId: module.id,
              steps: { create: moduleStepDecoration },
            },
            ...textRows.map((c, i) => ({
              order: i + 1,
              type: 'text',
              textType: c.type,
              text: c.text,
            })),
          ],
        },
      },
    });
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
