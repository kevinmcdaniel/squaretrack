import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import { prisma } from '../database.js';
import { T, cleanupTestData } from './setup.js';

beforeAll(async () => { await cleanupTestData(); });
afterAll(async () => { await cleanupTestData(); });

// Build a small choreography graph:
//   formA --callX--> formB --callY--> formC
// plus a stray (callY, formA) -> formC so a chain break can be expressed with
// valid call_formation references (break = wrong start, not unknown ref).
async function fixtures(tag: string) {
  const formA = await prisma.formation.create({ data: { name: `${T}${tag}A` } });
  const formB = await prisma.formation.create({ data: { name: `${T}${tag}B` } });
  const formC = await prisma.formation.create({ data: { name: `${T}${tag}C` } });
  const callX = await prisma.call.create({ data: { name: `${T}${tag}X` } });
  const callY = await prisma.call.create({ data: { name: `${T}${tag}Y` } });
  await prisma.call_formation.create({ data: { callId: callX.callId, startId: formA.formId, endId: formB.formId } });
  await prisma.call_formation.create({ data: { callId: callY.callId, startId: formB.formId, endId: formC.formId } });
  await prisma.call_formation.create({ data: { callId: callY.callId, startId: formA.formId, endId: formC.formId } });
  return { formA, formB, formC, callX, callY };
}

// ── GET /api/module ─────────────────────────────────────────────────────────

describe('GET /api/module', () => {
  it('returns 200 with an array', async () => {
    const res = await request(app).get('/api/module');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('returns [] (not null) when no modules match the filter', async () => {
    const res = await request(app).get(`/api/module?search=${T}NoSuchModuleXYZ`);
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
  });

  it('lists a created module with nested steps and formation names', async () => {
    const { formA, formB, formC, callX, callY } = await fixtures('List');
    await request(app).post('/api/module').send({
      name: `${T}ListMod`,
      startFormId: formA.formId,
      steps: [
        { order: 0, callId: callX.callId, startId: formA.formId },
        { order: 1, callId: callY.callId, startId: formB.formId },
      ],
    });
    const res = await request(app).get(`/api/module?search=${T}ListMod`);
    expect(res.status).toBe(200);
    const row = res.body.data.find((m: any) => m.name === `${T}ListMod`);
    expect(row).toBeDefined();
    expect(row.endFormId).toBe(formC.formId);
    expect(row.steps).toBeInstanceOf(Array);
    expect(row.steps[0].callFormation.call.name).toBe(`${T}ListX`);
  });
});

// ── POST /api/module ────────────────────────────────────────────────────────

describe('POST /api/module', () => {
  it('creates a module with a valid chain, isValid=true, endFormId derived', async () => {
    const { formA, formB, formC, callX, callY } = await fixtures('Valid');
    const res = await request(app).post('/api/module').send({
      name: `${T}ValidMod`,
      startFormId: formA.formId,
      steps: [
        { order: 0, callId: callX.callId, startId: formA.formId },
        { order: 1, callId: callY.callId, startId: formB.formId },
      ],
    });
    expect(res.status).toBe(201);
    expect(res.body.data.isValid).toBe(true);
    expect(res.body.data.endFormId).toBe(formC.formId);
    expect(res.body.chainBreaks).toEqual([]);
  });

  it('creates a module with a broken chain, isValid=false, broken step indicated', async () => {
    const { formA, formC, callX, callY } = await fixtures('Broken');
    const res = await request(app).post('/api/module').send({
      name: `${T}BrokenMod`,
      startFormId: formA.formId,
      steps: [
        { order: 0, callId: callX.callId, startId: formA.formId }, // ends at B
        { order: 1, callId: callY.callId, startId: formA.formId }, // starts at A, not B → break
      ],
    });
    expect(res.status).toBe(201);
    expect(res.body.data.isValid).toBe(false);
    expect(res.body.chainBreaks).toContain(1);
    // endFormId still derived from the last step
    expect(res.body.data.endFormId).toBe(formC.formId);
  });

  it('rejects a step whose (callId, startId) is not a known call_formation (406)', async () => {
    const { formA, callX, formC } = await fixtures('Unknown');
    const res = await request(app).post('/api/module').send({
      name: `${T}UnknownMod`,
      startFormId: formA.formId,
      steps: [
        { order: 0, callId: callX.callId, startId: formC.formId }, // no (callX, formC) row
      ],
    });
    expect(res.status).toBe(406);
  });

  it('rejects when body endFormId disagrees with derived endFormId (406)', async () => {
    const { formA, formB, callX } = await fixtures('Mismatch');
    const res = await request(app).post('/api/module').send({
      name: `${T}MismatchMod`,
      startFormId: formA.formId,
      endFormId: formA.formId, // wrong; step ends at B
      steps: [{ order: 0, callId: callX.callId, startId: formA.formId }],
    });
    expect(res.status).toBe(406);
    void formB;
  });

  it('returns 406 when name is missing', async () => {
    const { formA } = await fixtures('NoName');
    const res = await request(app).post('/api/module').send({
      startFormId: formA.formId,
      endFormId: formA.formId,
      steps: [],
    });
    expect(res.status).toBe(406);
  });

  it('returns 406 when startFormId is missing', async () => {
    const res = await request(app).post('/api/module').send({
      name: `${T}NoStart`,
      endFormId: 1,
      steps: [],
    });
    expect(res.status).toBe(406);
  });

  it('returns 409 for a nonexistent startFormId on an empty module', async () => {
    const res = await request(app).post('/api/module').send({
      name: `${T}BadStartMod`,
      startFormId: 999999,
      endFormId: 999999,
      steps: [],
    });
    expect(res.status).toBe(409);
  });
});

// ── GET /api/module/:id ─────────────────────────────────────────────────────

describe('GET /api/module/:id', () => {
  it('returns a module with full steps', async () => {
    const { formA, formB, callX, callY } = await fixtures('Get');
    const created = await request(app).post('/api/module').send({
      name: `${T}GetMod`,
      startFormId: formA.formId,
      steps: [
        { order: 0, callId: callX.callId, startId: formA.formId },
        { order: 1, callId: callY.callId, startId: formB.formId },
      ],
    });
    const id = created.body.data.id;
    const res = await request(app).get(`/api/module/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(id);
    expect(res.body.data.steps.length).toBe(2);
  });

  it('returns 404 with data:null for an unknown id', async () => {
    const res = await request(app).get('/api/module/999999');
    expect(res.status).toBe(404);
    expect(res.body.data).toBeNull();
  });

  it('returns 406 for a non-numeric id', async () => {
    const res = await request(app).get('/api/module/abc');
    expect(res.status).toBe(406);
  });
});

// ── PUT /api/module/:id ─────────────────────────────────────────────────────

describe('PUT /api/module/:id', () => {
  it('replaces steps and recomputes isValid + endFormId', async () => {
    const { formA, formB, callX, callY } = await fixtures('Put');
    const created = await request(app).post('/api/module').send({
      name: `${T}PutMod`,
      startFormId: formA.formId,
      steps: [
        { order: 0, callId: callX.callId, startId: formA.formId },
        { order: 1, callId: callY.callId, startId: formB.formId },
      ],
    });
    const id = created.body.data.id;
    // Replace with a single step ending at formB.
    const res = await request(app).put(`/api/module/${id}`).send({
      name: `${T}PutMod`,
      startFormId: formA.formId,
      steps: [{ order: 0, callId: callX.callId, startId: formA.formId }],
    });
    expect(res.status).toBe(200);
    expect(res.body.data.steps.length).toBe(1);
    expect(res.body.data.endFormId).toBe(formB.formId);
    expect(res.body.data.isValid).toBe(true);
  });

  it('returns 404 for an unknown id', async () => {
    const res = await request(app).put('/api/module/999999').send({
      name: `${T}Ghost`,
      startFormId: 1,
      steps: [],
    });
    expect(res.status).toBe(404);
  });
});

// ── DELETE /api/module/:id ──────────────────────────────────────────────────

describe('DELETE /api/module/:id', () => {
  it('deletes a module with no references', async () => {
    const { formA, callX } = await fixtures('Del');
    const created = await request(app).post('/api/module').send({
      name: `${T}DelMod`,
      startFormId: formA.formId,
      steps: [{ order: 0, callId: callX.callId, startId: formA.formId }],
    });
    const id = created.body.data.id;
    const res = await request(app).delete(`/api/module/${id}`);
    expect(res.status).toBe(200);
    const after = await request(app).get(`/api/module/${id}`);
    expect(after.status).toBe(404);
  });

  it('returns 409 when a presentation references the module', async () => {
    const { formA, callX } = await fixtures('DelRef');
    const created = await request(app).post('/api/module').send({
      name: `${T}DelRefMod`,
      startFormId: formA.formId,
      steps: [{ order: 0, callId: callX.callId, startId: formA.formId }],
    });
    const id = created.body.data.id;
    await prisma.presentation.create({
      data: {
        name: `${T}RefPres`,
        items: { create: [{ order: 0, type: 'module_ref', moduleId: id }] },
      },
    });
    const res = await request(app).delete(`/api/module/${id}`);
    expect(res.status).toBe(409);
  });
});

// ── GET /api/module/:id/presentations ───────────────────────────────────────

describe('GET /api/module/:id/presentations', () => {
  it('lists presentations that include the module', async () => {
    const { formA, callX } = await fixtures('Pres');
    const created = await request(app).post('/api/module').send({
      name: `${T}PresMod`,
      startFormId: formA.formId,
      steps: [{ order: 0, callId: callX.callId, startId: formA.formId }],
    });
    const id = created.body.data.id;
    await prisma.presentation.create({
      data: {
        name: `${T}PresWrap`,
        items: { create: [{ order: 0, type: 'module_ref', moduleId: id }] },
      },
    });
    const res = await request(app).get(`/api/module/${id}/presentations`);
    expect(res.status).toBe(200);
    expect(res.body.data.some((p: any) => p.name === `${T}PresWrap`)).toBe(true);
  });
});
