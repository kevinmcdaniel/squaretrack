import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import { prisma } from '../database.js';
import { T, cleanupTestData } from './setup.js';

beforeAll(async () => { await cleanupTestData(); });
afterAll(async () => { await cleanupTestData(); });

// Variant detection (#21): modules whose steps produce identical Taminations
// text share a variantGroupId; literally identical step rows are not duplicated
// at all — POST returns the existing module.
//
// Fixture graph: formA --X--> formB --Y--> formC. callX2 is a *synonym-level*
// twin of callX: different call row, same tamSeq (the "Wheel the Ocean" /
// "Wheel the Sea" case) and the same call_formation shape.
async function fixtures(tag: string) {
  const formA = await prisma.formation.create({ data: { name: `${T}${tag}A` } });
  const formB = await prisma.formation.create({ data: { name: `${T}${tag}B` } });
  const formC = await prisma.formation.create({ data: { name: `${T}${tag}C` } });
  const callX = await prisma.call.create({ data: { name: `${T}${tag}X`, tamSeq: `${T}${tag}/x` } });
  const callX2 = await prisma.call.create({ data: { name: `${T}${tag}X2`, tamSeq: `${T}${tag}/x` } });
  const callY = await prisma.call.create({ data: { name: `${T}${tag}Y`, tamSeq: `${T}${tag}/y` } });
  await prisma.call_formation.create({ data: { callId: callX.callId, startId: formA.formId, endId: formB.formId } });
  await prisma.call_formation.create({ data: { callId: callX2.callId, startId: formA.formId, endId: formB.formId } });
  await prisma.call_formation.create({ data: { callId: callY.callId, startId: formB.formId, endId: formC.formId } });
  return { formA, formB, formC, callX, callX2, callY };
}

describe('variant detection on POST /api/module', () => {
  it('a module with unique steps gets variantGroupId null', async () => {
    const { formA, callX } = await fixtures('Solo');
    const res = await request(app).post('/api/module').send({
      name: `${T}SoloMod`,
      startFormId: formA.formId,
      steps: [{ order: 0, callId: callX.callId, startId: formA.formId }],
    });
    expect(res.status).toBe(201);
    expect(res.body.data.variantGroupId).toBeNull();
  });

  it('identical step rows are not duplicated: returns existing module, reusedExisting, 200', async () => {
    const { formA, formB, callX, callY } = await fixtures('Dup');
    const first = await request(app).post('/api/module').send({
      name: `${T}DupMod1`,
      startFormId: formA.formId,
      steps: [
        { order: 0, callId: callX.callId, startId: formA.formId, designator: 'heads', count: 4 },
        { order: 1, callId: callY.callId, startId: formB.formId },
      ],
    });
    expect(first.status).toBe(201);
    const second = await request(app).post('/api/module').send({
      name: `${T}DupMod2`,
      startFormId: formA.formId,
      steps: [
        { order: 0, callId: callX.callId, startId: formA.formId, designator: 'heads', count: 4 },
        { order: 1, callId: callY.callId, startId: formB.formId },
      ],
    });
    expect(second.status).toBe(200);
    expect(second.body.reusedExisting).toBe(true);
    expect(second.body.data.id).toBe(first.body.data.id);
    const count = await prisma.choreo_module.count({ where: { name: { in: [`${T}DupMod1`, `${T}DupMod2`] } } });
    expect(count).toBe(1); // no second row created
  });

  it('choreo-equivalent but not identical (same tamSeq, different call): both share a variantGroupId', async () => {
    const { formA, callX, callX2 } = await fixtures('Var');
    const first = await request(app).post('/api/module').send({
      name: `${T}VarMod1`,
      startFormId: formA.formId,
      steps: [{ order: 0, callId: callX.callId, startId: formA.formId }],
    });
    expect(first.body.data.variantGroupId).toBeNull(); // alone at creation
    const second = await request(app).post('/api/module').send({
      name: `${T}VarMod2`,
      startFormId: formA.formId,
      steps: [{ order: 0, callId: callX2.callId, startId: formA.formId }],
    });
    expect(second.status).toBe(201); // a variant is a new module, not a reuse
    expect(second.body.reusedExisting).toBeFalsy();
    expect(second.body.data.variantGroupId).toBeTruthy();
    const firstAfter = await prisma.choreo_module.findUnique({ where: { id: first.body.data.id } });
    expect(firstAfter!.variantGroupId).toBe(second.body.data.variantGroupId); // first adopted too
  });

  it('matching an already-grouped module adopts its existing variantGroupId', async () => {
    const { formA, callX, callX2 } = await fixtures('Adopt');
    await request(app).post('/api/module').send({
      name: `${T}AdoptMod1`,
      startFormId: formA.formId,
      steps: [{ order: 0, callId: callX.callId, startId: formA.formId }],
    });
    const second = await request(app).post('/api/module').send({
      name: `${T}AdoptMod2`,
      startFormId: formA.formId,
      steps: [{ order: 0, callId: callX2.callId, startId: formA.formId }],
    });
    const groupId = second.body.data.variantGroupId;
    // Third equivalent module: another callX2 spelling — reuse kicks in for an
    // exact row match, so use callX again (identical to first → reused) is not
    // what we want; instead make a third call with the same tamSeq.
    const callX3 = await prisma.call.create({ data: { name: `${T}AdoptX3`, tamSeq: `${T}Adopt/x` } });
    await prisma.call_formation.create({ data: { callId: callX3.callId, startId: formA.formId, endId: (await prisma.call_formation.findFirst({ where: { callId: callX2.callId } }))!.endId } });
    const third = await request(app).post('/api/module').send({
      name: `${T}AdoptMod3`,
      startFormId: formA.formId,
      steps: [{ order: 0, callId: callX3.callId, startId: formA.formId }],
    });
    expect(third.status).toBe(201);
    expect(third.body.data.variantGroupId).toBe(groupId); // joined the same group
  });

  it('different counts produce different variant text: no grouping', async () => {
    const { formA, callX, callX2 } = await fixtures('Count');
    await request(app).post('/api/module').send({
      name: `${T}CountMod1`,
      startFormId: formA.formId,
      steps: [{ order: 0, callId: callX.callId, startId: formA.formId, count: 4 }],
    });
    const second = await request(app).post('/api/module').send({
      name: `${T}CountMod2`,
      startFormId: formA.formId,
      steps: [{ order: 0, callId: callX2.callId, startId: formA.formId, count: 2 }],
    });
    expect(second.status).toBe(201);
    expect(second.body.data.variantGroupId).toBeNull();
  });

  it('detects identical choreo even when step orders are not 0-based', async () => {
    const { formA, formB, callX, callY } = await fixtures('NonZero');
    const body = {
      startFormId: formA.formId,
      steps: [
        { order: 1, callId: callX.callId, startId: formA.formId },
        { order: 2, callId: callY.callId, startId: formB.formId },
      ],
    };
    const first = await request(app).post('/api/module').send({ name: `${T}NonZero1`, ...body });
    expect(first.status).toBe(201);
    const second = await request(app).post('/api/module').send({ name: `${T}NonZero2`, ...body });
    expect(second.status).toBe(200); // narrowing must not pin order:0
    expect(second.body.reusedExisting).toBe(true);
    expect(second.body.data.id).toBe(first.body.data.id);
  });

  it('empty-step modules never participate in variant detection', async () => {
    const { formA } = await fixtures('Empty');
    const first = await request(app).post('/api/module').send({
      name: `${T}EmptyMod1`, startFormId: formA.formId, endFormId: formA.formId, steps: [],
    });
    const second = await request(app).post('/api/module').send({
      name: `${T}EmptyMod2`, startFormId: formA.formId, endFormId: formA.formId, steps: [],
    });
    expect(first.status).toBe(201);
    expect(second.status).toBe(201); // not reused
    expect(second.body.data.variantGroupId).toBeNull();
  });
});

describe('variant detection on PUT /api/module/:id', () => {
  it('editing steps to match another module joins its group', async () => {
    const { formA, formB, callX, callX2, callY } = await fixtures('Join');
    const target = await request(app).post('/api/module').send({
      name: `${T}JoinTarget`,
      startFormId: formA.formId,
      steps: [{ order: 0, callId: callX.callId, startId: formA.formId }],
    });
    const editing = await request(app).post('/api/module').send({
      name: `${T}JoinEditing`,
      startFormId: formA.formId,
      steps: [
        { order: 0, callId: callX.callId, startId: formA.formId },
        { order: 1, callId: callY.callId, startId: formB.formId },
      ],
    });
    expect(editing.body.data.variantGroupId).toBeNull();
    const res = await request(app).put(`/api/module/${editing.body.data.id}`).send({
      name: `${T}JoinEditing`,
      startFormId: formA.formId,
      steps: [{ order: 0, callId: callX2.callId, startId: formA.formId }], // equivalent to target
    });
    expect(res.status).toBe(200);
    expect(res.body.data.variantGroupId).toBeTruthy();
    const targetAfter = await prisma.choreo_module.findUnique({ where: { id: target.body.data.id } });
    expect(targetAfter!.variantGroupId).toBe(res.body.data.variantGroupId);
  });

  it('editing steps away from a group leaves it; a lone leftover member is ungrouped', async () => {
    const { formA, formB, callX, callX2, callY } = await fixtures('Leave');
    const stay = await request(app).post('/api/module').send({
      name: `${T}LeaveStay`,
      startFormId: formA.formId,
      steps: [{ order: 0, callId: callX.callId, startId: formA.formId }],
    });
    const leave = await request(app).post('/api/module').send({
      name: `${T}LeaveGo`,
      startFormId: formA.formId,
      steps: [{ order: 0, callId: callX2.callId, startId: formA.formId }],
    });
    expect(leave.body.data.variantGroupId).toBeTruthy();
    const res = await request(app).put(`/api/module/${leave.body.data.id}`).send({
      name: `${T}LeaveGo`,
      startFormId: formA.formId,
      steps: [
        { order: 0, callId: callX.callId, startId: formA.formId },
        { order: 1, callId: callY.callId, startId: formB.formId },
      ],
    });
    expect(res.status).toBe(200);
    expect(res.body.data.variantGroupId).toBeNull();
    const stayAfter = await prisma.choreo_module.findUnique({ where: { id: stay.body.data.id } });
    expect(stayAfter!.variantGroupId).toBeNull(); // lone member cleared
  });

  it('PUT making steps identical to another module does NOT silently merge — module keeps its id, joins group', async () => {
    const { formA, callX } = await fixtures('NoMerge');
    const a = await request(app).post('/api/module').send({
      name: `${T}NoMergeA`,
      startFormId: formA.formId,
      steps: [{ order: 0, callId: callX.callId, startId: formA.formId }],
    });
    const b = await request(app).post('/api/module').send({
      name: `${T}NoMergeB`,
      startFormId: formA.formId,
      endFormId: formA.formId,
      steps: [],
    });
    const res = await request(app).put(`/api/module/${b.body.data.id}`).send({
      name: `${T}NoMergeB`,
      startFormId: formA.formId,
      steps: [{ order: 0, callId: callX.callId, startId: formA.formId }], // identical rows to A
    });
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(b.body.data.id); // still module B
    expect(res.body.data.variantGroupId).toBeTruthy(); // grouped with A
    const aAfter = await prisma.choreo_module.findUnique({ where: { id: a.body.data.id } });
    expect(aAfter!.variantGroupId).toBe(res.body.data.variantGroupId);
  });
});

describe('GET /api/module?variantGroupId=', () => {
  it('lists all members of a variant group', async () => {
    const { formA, callX, callX2 } = await fixtures('ListGrp');
    await request(app).post('/api/module').send({
      name: `${T}ListGrp1`,
      startFormId: formA.formId,
      steps: [{ order: 0, callId: callX.callId, startId: formA.formId }],
    });
    const second = await request(app).post('/api/module').send({
      name: `${T}ListGrp2`,
      startFormId: formA.formId,
      steps: [{ order: 0, callId: callX2.callId, startId: formA.formId }],
    });
    const groupId = second.body.data.variantGroupId;
    const res = await request(app).get(`/api/module?variantGroupId=${groupId}`);
    expect(res.status).toBe(200);
    const names = res.body.data.map((m: any) => m.name).sort();
    expect(names).toEqual([`${T}ListGrp1`, `${T}ListGrp2`]);
  });
});
