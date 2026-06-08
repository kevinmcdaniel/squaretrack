import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { prisma } from '../database.js';
import { T, cleanupTestData } from './setup.js';
import { runMigration } from '../scripts/migrate-sequences-to-modules.js';

beforeAll(async () => { await cleanupTestData(); });
afterAll(async () => { await cleanupTestData(); });

// Issue #70: legacy sequence + sequence_calls → choreo_module + presentation.

describe('migrate-sequences-to-modules (#70)', () => {
  it('splits a sequence into a choreo_module and a presentation without data loss', async () => {
    const start = await prisma.formation.create({ data: { name: `${T}migStart`, dancerCount: 8 } });
    const end = await prisma.formation.create({ data: { name: `${T}migEnd`, dancerCount: 8 } });
    const call = await prisma.call.create({ data: { name: `${T}migCall` } });
    await prisma.call_formation.create({
      data: { callId: call.callId, startId: start.formId, endId: end.formId },
    });

    await prisma.sequence.create({
      data: {
        name: `${T}migSeq`,
        startFormationId: start.formId,
        activator: 'heads',
        rating: 'good',
        notes: 'a note',
        sourceText: 'heads square thru four',
        isVerified: true,
        isValid: true,
        calls: {
          create: [
            {
              order: 0,
              type: 'call',
              callId: call.callId,
              startId: start.formId,
              designator: 'heads',
              count: 4,
              text: 'square thru, four hands',
              helperText: 'watch the timing',
            },
            { order: 1, type: 'filler', text: 'and you know what to do' },
          ],
        },
      },
    });

    await runMigration();

    // choreo_module: purely choreographic, no spoken-text columns on steps.
    const module = await prisma.choreo_module.findFirst({
      where: { name: `${T}migSeq` },
      include: { steps: { orderBy: { order: 'asc' } } },
    });
    expect(module).not.toBeNull();
    expect(module!.startFormId).toBe(start.formId);
    expect(module!.endFormId).toBe(end.formId); // derived from last call's call_formation
    expect(module!.isValid).toBe(true);
    expect(module!.isVerified).toBe(true);
    expect(module!.steps).toHaveLength(1);
    const step = module!.steps[0];
    expect(step.callId).toBe(call.callId);
    expect(step.startId).toBe(start.formId);
    expect(step.designator).toBe('heads');
    expect(step.count).toBe(4);
    expect(step).not.toHaveProperty('text');
    expect(step).not.toHaveProperty('callNameAlternate');

    // presentation: the cueing layer preserves the legacy text fields.
    const presentation = await prisma.presentation.findFirst({
      where: { name: `${T}migSeq` },
      include: { items: { orderBy: { order: 'asc' }, include: { steps: true } } },
    });
    expect(presentation).not.toBeNull();
    expect(presentation!.activator).toBe('heads');
    expect(presentation!.rating).toBe('good');
    expect(presentation!.notes).toBe('a note');
    expect(presentation!.sourceText).toBe('heads square thru four');

    const moduleRef = presentation!.items.find((i) => i.type === 'module_ref');
    expect(moduleRef).toBeDefined();
    expect(moduleRef!.moduleId).toBe(module!.id);
    expect(moduleRef!.steps).toHaveLength(1);
    expect(moduleRef!.steps[0].callNameAlternate).toBe('square thru, four hands');
    expect(moduleRef!.steps[0].helperText).toBe('watch the timing');

    const textItem = presentation!.items.find((i) => i.type === 'text');
    expect(textItem).toBeDefined();
    expect(textItem!.textType).toBe('filler');
    expect(textItem!.text).toBe('and you know what to do');
  });

  it('is idempotent — re-running does not duplicate the migrated pair', async () => {
    const result = await runMigration();
    expect(result.skipped).toBeGreaterThanOrEqual(1);
    expect(await prisma.presentation.count({ where: { name: `${T}migSeq` } })).toBe(1);
    expect(await prisma.choreo_module.count({ where: { name: `${T}migSeq` } })).toBe(1);
  });

  it('preserves an unresolved call row as presentation text — no data loss (#70)', async () => {
    const start = await prisma.formation.create({ data: { name: `${T}migUStart`, dancerCount: 8 } });
    const end = await prisma.formation.create({ data: { name: `${T}migUEnd`, dancerCount: 8 } });
    const call = await prisma.call.create({ data: { name: `${T}migUCall` } });
    await prisma.call_formation.create({
      data: { callId: call.callId, startId: start.formId, endId: end.formId },
    });

    await prisma.sequence.create({
      data: {
        name: `${T}migUnresolved`,
        startFormationId: start.formId,
        calls: {
          create: [
            { order: 0, type: 'call', callId: call.callId, startId: start.formId },
            // Unresolved call: no callId/startId, but it carries spoken text.
            { order: 1, type: 'call', text: 'some unknown call' },
          ],
        },
      },
    });

    await runMigration();

    // Only the resolved call becomes choreography.
    const module = await prisma.choreo_module.findFirst({
      where: { name: `${T}migUnresolved` },
      include: { steps: true },
    });
    expect(module!.steps).toHaveLength(1);

    // The unresolved row's text is kept on the presentation, not dropped.
    const presentation = await prisma.presentation.findFirst({
      where: { name: `${T}migUnresolved` },
      include: { items: { orderBy: { order: 'asc' } } },
    });
    const textItem = presentation!.items.find((i) => i.type === 'text');
    expect(textItem).toBeDefined();
    expect(textItem!.text).toBe('some unknown call');
  });
});
