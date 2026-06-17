import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import { prisma } from '../database.js';
import { T, cleanupTestData } from './setup.js';

beforeAll(async () => { await cleanupTestData(); });
afterAll(async () => { await cleanupTestData(); });

// Build choreo modules to reference. Chain of formations:
//   formA --callX--> formB --callY--> formC --callZ--> formA
//   moduleAB ends at B, moduleBC starts at B, moduleC starts at C.
async function fixtures(tag: string) {
  const formA = await prisma.formation.create({ data: { name: `${T}${tag}A` } });
  const formB = await prisma.formation.create({ data: { name: `${T}${tag}B` } });
  const formC = await prisma.formation.create({ data: { name: `${T}${tag}C` } });
  const callX = await prisma.call.create({ data: { name: `${T}${tag}X` } });
  const callY = await prisma.call.create({ data: { name: `${T}${tag}Y` } });
  const callZ = await prisma.call.create({ data: { name: `${T}${tag}Z` } });
  await prisma.call_formation.create({ data: { callId: callX.callId, startId: formA.formId, endId: formB.formId } });
  await prisma.call_formation.create({ data: { callId: callY.callId, startId: formB.formId, endId: formC.formId } });
  await prisma.call_formation.create({ data: { callId: callZ.callId, startId: formC.formId, endId: formA.formId } });

  const moduleAB = await prisma.choreo_module.create({
    data: {
      name: `${T}${tag}AB`, startFormId: formA.formId, endFormId: formB.formId,
      steps: { create: [{ order: 0, callId: callX.callId, startId: formA.formId }] },
    },
  });
  const moduleBC = await prisma.choreo_module.create({
    data: {
      name: `${T}${tag}BC`, startFormId: formB.formId, endFormId: formC.formId,
      steps: { create: [{ order: 0, callId: callY.callId, startId: formB.formId }] },
    },
  });
  const moduleC = await prisma.choreo_module.create({
    data: {
      name: `${T}${tag}C`, startFormId: formC.formId, endFormId: formA.formId,
      steps: { create: [{ order: 0, callId: callZ.callId, startId: formC.formId }] },
    },
  });
  return { moduleAB, moduleBC, moduleC };
}

// ── GET /api/presentation ───────────────────────────────────────────────────

describe('GET /api/presentation', () => {
  it('returns [] (not null) when no presentations match', async () => {
    const res = await request(app).get(`/api/presentation?search=${T}NoSuchPresXYZ`);
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
  });

  it('lists created presentations (shallow, no items)', async () => {
    const { moduleAB } = await fixtures('List');
    await request(app).post('/api/presentation').send({
      name: `${T}ListPres`,
      items: [{ order: 0, type: 'module_ref', moduleId: moduleAB.id, steps: [] }],
    });
    const res = await request(app).get(`/api/presentation?search=${T}ListPres`);
    expect(res.status).toBe(200);
    const row = res.body.data.find((p: any) => p.name === `${T}ListPres`);
    expect(row).toBeDefined();
    expect(row.items).toBeUndefined();
  });
});

// ── POST /api/presentation ──────────────────────────────────────────────────

describe('POST /api/presentation', () => {
  it('creates a presentation with a module ref and a text item (201)', async () => {
    const { moduleAB } = await fixtures('Create');
    const res = await request(app).post('/api/presentation').send({
      name: `${T}CreatePres`,
      source: 'personal',
      activator: 'heads',
      items: [
        { order: 0, type: 'module_ref', moduleId: moduleAB.id, steps: [{ stepOrder: 0, textBefore: 'And now' }] },
        { order: 1, type: 'text', text: 'smooth dancing', textType: 'tip' },
      ],
    });
    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe(`${T}CreatePres`);
    expect(res.body.flowWarnings).toEqual([]);
  });

  it('allows an empty-items draft (persist raw before parse) (201)', async () => {
    const res = await request(app).post('/api/presentation').send({
      name: `${T}DraftPres`,
      sourceText: 'heads square thru four, and right and left thru',
      items: [],
    });
    expect(res.status).toBe(201);
    expect(typeof res.body.data.id).toBe('number');
    expect(res.body.data.sourceText).toContain('square thru');
  });

  it('saves but returns flowWarnings when adjacent modules do not chain', async () => {
    const { moduleAB, moduleC } = await fixtures('Flow');
    const res = await request(app).post('/api/presentation').send({
      name: `${T}FlowPres`,
      items: [
        { order: 0, type: 'module_ref', moduleId: moduleAB.id, steps: [] }, // ends at B
        { order: 1, type: 'module_ref', moduleId: moduleC.id, steps: [] },  // starts at C → gap
      ],
    });
    expect(res.status).toBe(201);
    expect(res.body.flowWarnings.length).toBeGreaterThan(0);
    expect(res.body.flowWarnings[0].afterItemOrder).toBe(0);
  });

  it('no flowWarnings when adjacent modules chain', async () => {
    const { moduleAB, moduleBC } = await fixtures('Chain');
    const res = await request(app).post('/api/presentation').send({
      name: `${T}ChainPres`,
      items: [
        { order: 0, type: 'module_ref', moduleId: moduleAB.id, steps: [] }, // ends at B
        { order: 1, type: 'module_ref', moduleId: moduleBC.id, steps: [] }, // starts at B
      ],
    });
    expect(res.status).toBe(201);
    expect(res.body.flowWarnings).toEqual([]);
  });

  it('rejects an unknown moduleId (406)', async () => {
    const res = await request(app).post('/api/presentation').send({
      name: `${T}BadModPres`,
      items: [{ order: 0, type: 'module_ref', moduleId: 999999, steps: [] }],
    });
    expect(res.status).toBe(406);
  });

  it('rejects a stepOrder that does not exist in the module (406)', async () => {
    const { moduleAB } = await fixtures('BadStep');
    const res = await request(app).post('/api/presentation').send({
      name: `${T}BadStepPres`,
      items: [{ order: 0, type: 'module_ref', moduleId: moduleAB.id, steps: [{ stepOrder: 9 }] }],
    });
    expect(res.status).toBe(406);
  });

  it('rejects duplicate stepOrder within one item (406, not 500)', async () => {
    const { moduleAB } = await fixtures('DupStep');
    const res = await request(app).post('/api/presentation').send({
      name: `${T}DupStepPres`,
      items: [
        {
          order: 0, type: 'module_ref', moduleId: moduleAB.id,
          steps: [{ stepOrder: 0, textBefore: 'a' }, { stepOrder: 0, textBefore: 'b' }],
        },
      ],
    });
    expect(res.status).toBe(406);
  });

  it('rejects duplicate item order within the presentation (406)', async () => {
    const { moduleAB } = await fixtures('DupOrder');
    const res = await request(app).post('/api/presentation').send({
      name: `${T}DupOrderPres`,
      items: [
        { order: 0, type: 'module_ref', moduleId: moduleAB.id, steps: [] },
        { order: 0, type: 'text', text: 'x', textType: 'filler' },
      ],
    });
    expect(res.status).toBe(406);
  });

  it('returns 406 when name is missing', async () => {
    const res = await request(app).post('/api/presentation').send({ items: [] });
    expect(res.status).toBe(406);
  });
});

// ── GET /api/presentation/:id ───────────────────────────────────────────────

describe('GET /api/presentation/:id', () => {
  it('returns full nested items, steps, and mirrored moduleStep', async () => {
    const { moduleAB } = await fixtures('Get');
    const created = await request(app).post('/api/presentation').send({
      name: `${T}GetPres`,
      items: [
        { order: 0, type: 'module_ref', moduleId: moduleAB.id, steps: [{ stepOrder: 0, textBefore: 'Easy' }] },
        { order: 1, type: 'text', text: 'yeehaw', textType: 'filler' },
      ],
    });
    const id = created.body.data.id;
    const res = await request(app).get(`/api/presentation/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.data.items.length).toBe(2);
    const ref = res.body.data.items.find((i: any) => i.type === 'module_ref');
    expect(ref.steps[0].textBefore).toBe('Easy');
    expect(ref.steps[0].moduleStep.order).toBe(0);
    expect(typeof ref.steps[0].moduleStep.callId).toBe('number');
    expect(ref.steps[0].moduleStep.call.name).toBe(`${T}GetX`); // callX from fixtures('Get')
  });

  it('returns 404 with data:null for an unknown id', async () => {
    const res = await request(app).get('/api/presentation/999999');
    expect(res.status).toBe(404);
    expect(res.body.data).toBeNull();
  });

  it('returns 406 for a non-numeric id', async () => {
    const res = await request(app).get('/api/presentation/abc');
    expect(res.status).toBe(406);
  });
});

// ── PUT /api/presentation/:id ───────────────────────────────────────────────

describe('PUT /api/presentation/:id', () => {
  it('replaces all items and recomputes flowWarnings', async () => {
    const { moduleAB, moduleBC, moduleC } = await fixtures('Put');
    const created = await request(app).post('/api/presentation').send({
      name: `${T}PutPres`,
      items: [
        { order: 0, type: 'module_ref', moduleId: moduleAB.id, steps: [] },
        { order: 1, type: 'module_ref', moduleId: moduleBC.id, steps: [] },
      ],
    });
    const id = created.body.data.id;
    const res = await request(app).put(`/api/presentation/${id}`).send({
      name: `${T}PutPres`,
      items: [
        { order: 0, type: 'module_ref', moduleId: moduleAB.id, steps: [] }, // ends B
        { order: 1, type: 'module_ref', moduleId: moduleC.id, steps: [] },  // starts C → gap
      ],
    });
    expect(res.status).toBe(200);
    expect(res.body.data.items.length).toBe(2);
    expect(res.body.flowWarnings.length).toBeGreaterThan(0);
  });

  it('returns 404 for an unknown id', async () => {
    const res = await request(app).put('/api/presentation/999999').send({ name: `${T}Ghost`, items: [] });
    expect(res.status).toBe(404);
  });
});

// ── PATCH /api/presentation/:id ─────────────────────────────────────────────

describe('PATCH /api/presentation/:id', () => {
  it('updates metadata without touching items', async () => {
    const { moduleAB } = await fixtures('Patch');
    const created = await request(app).post('/api/presentation').send({
      name: `${T}PatchPres`,
      items: [{ order: 0, type: 'module_ref', moduleId: moduleAB.id, steps: [] }],
    });
    const id = created.body.data.id;
    const res = await request(app).patch(`/api/presentation/${id}`).send({ rating: 'excellent', notes: 'great tip' });
    expect(res.status).toBe(200);
    expect(res.body.data.rating).toBe('excellent');
    const full = await request(app).get(`/api/presentation/${id}`);
    expect(full.body.data.items.length).toBe(1); // items untouched
  });
});

// ── DELETE /api/presentation/:id ────────────────────────────────────────────

describe('DELETE /api/presentation/:id', () => {
  it('deletes a presentation and cascades items + steps', async () => {
    const { moduleAB } = await fixtures('Del');
    const created = await request(app).post('/api/presentation').send({
      name: `${T}DelPres`,
      items: [{ order: 0, type: 'module_ref', moduleId: moduleAB.id, steps: [{ stepOrder: 0 }] }],
    });
    const id = created.body.data.id;
    const res = await request(app).delete(`/api/presentation/${id}`);
    expect(res.status).toBe(200);
    const after = await request(app).get(`/api/presentation/${id}`);
    expect(after.status).toBe(404);
    expect(await prisma.presentation_item.count({ where: { presentationId: id } })).toBe(0);
  });
});

// ── POST /api/presentation/:id/items ────────────────────────────────────────

describe('POST /api/presentation/:id/items', () => {
  it('appends a single item with order = max + 1', async () => {
    const { moduleAB, moduleBC } = await fixtures('Append');
    const created = await request(app).post('/api/presentation').send({
      name: `${T}AppendPres`,
      items: [{ order: 0, type: 'module_ref', moduleId: moduleAB.id, steps: [] }],
    });
    const id = created.body.data.id;
    const res = await request(app).post(`/api/presentation/${id}/items`).send({
      type: 'module_ref', moduleId: moduleBC.id, steps: [],
    });
    expect(res.status).toBe(201);
    expect(res.body.data.order).toBe(1);
  });
});

// ── DELETE /api/presentation/:id/items/:itemId ──────────────────────────────

describe('DELETE /api/presentation/:id/items/:itemId', () => {
  it('removes an item and reorders the rest to close the gap', async () => {
    const { moduleAB, moduleBC } = await fixtures('DelItem');
    const created = await request(app).post('/api/presentation').send({
      name: `${T}DelItemPres`,
      items: [
        { order: 0, type: 'text', text: 'first', textType: 'filler' },
        { order: 1, type: 'module_ref', moduleId: moduleAB.id, steps: [] },
        { order: 2, type: 'module_ref', moduleId: moduleBC.id, steps: [] },
      ],
    });
    const id = created.body.data.id;
    const full = await request(app).get(`/api/presentation/${id}`);
    const middle = full.body.data.items.find((i: any) => i.order === 1);
    const res = await request(app).delete(`/api/presentation/${id}/items/${middle.id}`);
    expect(res.status).toBe(200);
    const after = await request(app).get(`/api/presentation/${id}`);
    const orders = after.body.data.items.map((i: any) => i.order).sort((a: number, b: number) => a - b);
    expect(orders).toEqual([0, 1]); // gap closed, contiguous
  });
});

// ── Presentation status ──────────────────────────────────────────────────────

describe('presentation status field', () => {
  it('defaults to draft on create', async () => {
    const res = await request(app).post('/api/presentation').send({ name: `${T}StatusDefault`, items: [] });
    expect(res.status).toBe(201);
    expect(res.body.data.status).toBe('draft');
  });

  it('PATCH can set status to active', async () => {
    const created = await request(app).post('/api/presentation').send({ name: `${T}StatusPatch`, items: [] });
    const id = created.body.data.id;
    const res = await request(app).patch(`/api/presentation/${id}`).send({ status: 'active' });
    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('active');
  });

  it('GET ?status=draft returns only drafts', async () => {
    const d = await request(app).post('/api/presentation').send({ name: `${T}FilterDraft`, items: [] });
    const dId = d.body.data.id;
    await request(app).patch(`/api/presentation/${dId}`).send({ status: 'active' });
    await request(app).post('/api/presentation').send({ name: `${T}FilterDraft2`, items: [] });
    const res = await request(app).get('/api/presentation?status=draft');
    expect(res.status).toBe(200);
    const names = res.body.data.map((p: any) => p.name);
    expect(names.some((n: string) => n === `${T}FilterDraft2`)).toBe(true);
    expect(names.some((n: string) => n === `${T}FilterDraft`)).toBe(false);
  });
});

// ── POST /api/presentation/bulk-intake ──────────────────────────────────────

describe('POST /api/presentation/bulk-intake', () => {
  it('creates draft presentations for new sequences', async () => {
    const res = await request(app).post('/api/presentation/bulk-intake').send({
      sequences: [
        { name: `${T}Bulk1`, sourceText: `${T}unique text one` },
        { name: `${T}Bulk2`, sourceText: `${T}unique text two` },
      ],
    });
    expect(res.status).toBe(201);
    expect(res.body.data.saved).toHaveLength(2);
    expect(res.body.data.skipped).toHaveLength(0);
  });

  it('skips sequences whose normalized sourceText already exists', async () => {
    const text = `${T}duplicate bulk text`;
    await request(app).post('/api/presentation/bulk-intake').send({
      sequences: [{ name: `${T}BulkOrig`, sourceText: text }],
    });
    const res = await request(app).post('/api/presentation/bulk-intake').send({
      sequences: [{ name: `${T}BulkDup`, sourceText: text }],
    });
    expect(res.status).toBe(201);
    expect(res.body.data.saved).toHaveLength(0);
    expect(res.body.data.skipped).toHaveLength(1);
  });

  it('returns 400 when sequences array is missing', async () => {
    const res = await request(app).post('/api/presentation/bulk-intake').send({});
    expect(res.status).toBe(406);
  });

  it('saved presentations have status draft', async () => {
    const res = await request(app).post('/api/presentation/bulk-intake').send({
      sequences: [{ name: `${T}BulkStatus`, sourceText: `${T}status check text` }],
    });
    expect(res.status).toBe(201);
    const id = res.body.data.saved[0].id;
    const get = await request(app).get(`/api/presentation/${id}`);
    expect(get.body.data.status).toBe('draft');
  });
});
