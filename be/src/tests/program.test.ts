import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import { prisma } from '../database.js';
import { T, cleanupTestData } from './setup.js';

beforeAll(async () => { await cleanupTestData(); });
afterAll(async () => { await cleanupTestData(); });

// ── POST /api/program ───────────────────────────────────────────────────────

describe('POST /api/program', () => {
  it('creates a program and returns 201 with abbreviation', async () => {
    const res = await request(app).post('/api/program').send({
      name: `${T}Mainstream 26`,
      abbreviation: `${T}ms26`,
      order: 1,
    });
    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe(`${T}Mainstream 26`);
    expect(res.body.data.abbreviation).toBe(`${T}ms26`);
    expect(res.body.data.order).toBe(1);
    expect(res.body.data.programId).toBeDefined();
  });

  it('returns 406 when name is missing', async () => {
    const res = await request(app).post('/api/program').send({
      abbreviation: `${T}ms26b`,
      order: 1,
    });
    expect(res.status).toBe(406);
    expect(res.body.message).toMatch(/name/i);
  });

  it('returns 406 when abbreviation is missing', async () => {
    const res = await request(app).post('/api/program').send({
      name: `${T}Missing Abbrev`,
      order: 1,
    });
    expect(res.status).toBe(406);
    expect(res.body.message).toMatch(/abbreviation/i);
  });

  it('returns 406 when order is missing', async () => {
    const res = await request(app).post('/api/program').send({
      name: `${T}Missing Order`,
      abbreviation: `${T}mo1`,
    });
    expect(res.status).toBe(406);
    expect(res.body.message).toMatch(/order/i);
  });

  it('returns 409 on duplicate abbreviation', async () => {
    await prisma.program.create({
      data: { name: `${T}Dup Prog`, abbreviation: `${T}dup`, order: 99 },
    });
    const res = await request(app).post('/api/program').send({
      name: `${T}Dup Prog 2`,
      abbreviation: `${T}dup`,
      order: 99,
    });
    expect(res.status).toBe(409);
    expect(res.body.message).toMatch(/abbreviation/i);
  });
});

// ── GET /api/program/list ───────────────────────────────────────────────────

describe('GET /api/program/list', () => {
  it('returns 200 with programs including abbreviation and isActive', async () => {
    await prisma.program.create({
      data: { name: `${T}Plus`, abbreviation: `${T}plus`, order: 2 },
    });
    const res = await request(app).get('/api/program/list');
    expect(res.status).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
    const prog = res.body.data.find((p: any) => p.abbreviation === `${T}plus`);
    expect(prog).toBeDefined();
    expect(prog.name).toBe(`${T}Plus`);
    expect(prog.abbreviation).toBe(`${T}plus`);
    expect(prog.isActive).toBe(true);
  });

  it('hides inactive programs by default', async () => {
    await prisma.program.create({
      data: { name: `${T}Basic 2`, abbreviation: `${T}b2`, order: 50, isActive: false },
    });
    const res = await request(app).get('/api/program/list');
    expect(res.status).toBe(200);
    const inactive = res.body.data.find((p: any) => p.abbreviation === `${T}b2`);
    expect(inactive).toBeUndefined();
  });

  it('includes inactive programs when showInactive=true', async () => {
    await prisma.program.create({
      data: { name: `${T}Basic 1`, abbreviation: `${T}b1`, order: 51, isActive: false },
    });
    const res = await request(app).get('/api/program/list?showInactive=true');
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/including inactive/i);
    const inactive = res.body.data.find((p: any) => p.abbreviation === `${T}b1`);
    expect(inactive).toBeDefined();
    expect(inactive.isActive).toBe(false);
  });

  it('treats showInactive values other than "true" as false', async () => {
    await prisma.program.create({
      data: { name: `${T}Basic Mainstream`, abbreviation: `${T}bms`, order: 52, isActive: false },
    });
    for (const value of ['false', '1', 'yes', '']) {
      const res = await request(app).get(`/api/program/list?showInactive=${value}`);
      expect(res.status).toBe(200);
      const inactive = res.body.data.find((p: any) => p.abbreviation === `${T}bms`);
      expect(inactive, `value=${value!}`).toBeUndefined();
    }
  });
});

// ── /api/program/:programId/call-formations ignores active filter ───────────

describe('related-resource lookups ignore isActive', () => {
  it('returns call formations for an inactive program', async () => {
    const prog = await prisma.program.create({
      data: { name: `${T}Inactive Prog`, abbreviation: `${T}inact`, order: 60, isActive: false },
    });
    const formation = await prisma.formation.create({ data: { name: `${T}Inact Start` } });
    const endFormation = await prisma.formation.create({ data: { name: `${T}Inact End` } });
    const call = await prisma.call.create({ data: { name: `${T}Inact Call` } });
    await prisma.call_formation.create({
      data: { callId: call.callId, startId: formation.formId, endId: endFormation.formId },
    });
    await prisma.program_call_formation.create({
      data: { programId: prog.programId, callId: call.callId, startId: formation.formId, difficulty: 'easy' },
    });

    const res = await request(app).get(`/api/program/${prog.programId}/call-formations`);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].callId).toBe(call.callId);
  });
});

// ── GET /api/program/:programId/call-formations ─────────────────────────────

describe('GET /api/program/:programId/call-formations', () => {
  it('returns call formations with difficulty for a program', async () => {
    const prog = await prisma.program.create({
      data: { name: `${T}CF Program`, abbreviation: `${T}cfp`, order: 3 },
    });
    const formation = await prisma.formation.create({ data: { name: `${T}CF Formation` } });
    const endFormation = await prisma.formation.create({ data: { name: `${T}CF End Formation` } });
    const call = await prisma.call.create({ data: { name: `${T}CF Call` } });
    await prisma.call_formation.create({
      data: { callId: call.callId, startId: formation.formId, endId: endFormation.formId },
    });
    await prisma.program_call_formation.create({
      data: { programId: prog.programId, callId: call.callId, startId: formation.formId, difficulty: 'easy' },
    });

    const res = await request(app).get(`/api/program/${prog.programId}/call-formations`);
    expect(res.status).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
    const entry = res.body.data[0];
    expect(entry.callId).toBe(call.callId);
    expect(entry.startId).toBe(formation.formId);
    expect(entry.difficulty).toBe('easy');
  });

  it('returns 200 empty array when program has no call formations', async () => {
    const prog = await prisma.program.create({
      data: { name: `${T}Empty CF Program`, abbreviation: `${T}ecfp`, order: 4 },
    });
    const res = await request(app).get(`/api/program/${prog.programId}/call-formations`);
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
  });

  it('returns 406 for non-numeric programId', async () => {
    const res = await request(app).get('/api/program/abc/call-formations');
    expect(res.status).toBe(406);
  });
});

// ── POST /api/program/:programId/call-formation ─────────────────────────────

describe('POST /api/program/:programId/call-formation', () => {
  it('adds a call formation to a program with difficulty and returns 201', async () => {
    const prog = await prisma.program.create({
      data: { name: `${T}Add CF Program`, abbreviation: `${T}acfp`, order: 5 },
    });
    const formation = await prisma.formation.create({ data: { name: `${T}Add CF Start` } });
    const endFormation = await prisma.formation.create({ data: { name: `${T}Add CF End` } });
    const call = await prisma.call.create({ data: { name: `${T}Add CF Call` } });
    await prisma.call_formation.create({
      data: { callId: call.callId, startId: formation.formId, endId: endFormation.formId },
    });

    const res = await request(app)
      .post(`/api/program/${prog.programId}/call-formation`)
      .send({ callId: call.callId, startId: formation.formId, difficulty: 'hard' });

    expect(res.status).toBe(201);
    expect(res.body.data.programId).toBe(prog.programId);
    expect(res.body.data.callId).toBe(call.callId);
    expect(res.body.data.startId).toBe(formation.formId);
    expect(res.body.data.difficulty).toBe('hard');
  });

  it('returns 406 when callId is missing', async () => {
    const prog = await prisma.program.create({
      data: { name: `${T}Val Program 1`, abbreviation: `${T}vp1`, order: 6 },
    });
    const res = await request(app)
      .post(`/api/program/${prog.programId}/call-formation`)
      .send({ startId: 1, difficulty: 'easy' });
    expect(res.status).toBe(406);
  });

  it('returns 406 when startId is missing', async () => {
    const prog = await prisma.program.create({
      data: { name: `${T}Val Program 2`, abbreviation: `${T}vp2`, order: 7 },
    });
    const res = await request(app)
      .post(`/api/program/${prog.programId}/call-formation`)
      .send({ callId: 1, difficulty: 'easy' });
    expect(res.status).toBe(406);
  });

  it('returns 406 when difficulty is missing', async () => {
    const prog = await prisma.program.create({
      data: { name: `${T}Val Program 3`, abbreviation: `${T}vp3`, order: 8 },
    });
    const res = await request(app)
      .post(`/api/program/${prog.programId}/call-formation`)
      .send({ callId: 1, startId: 1 });
    expect(res.status).toBe(406);
  });

  it('returns 406 for invalid difficulty value', async () => {
    const prog = await prisma.program.create({
      data: { name: `${T}Val Program 4`, abbreviation: `${T}vp4`, order: 9 },
    });
    const res = await request(app)
      .post(`/api/program/${prog.programId}/call-formation`)
      .send({ callId: 1, startId: 1, difficulty: 'medium' });
    expect(res.status).toBe(406);
    expect(res.body.message).toMatch(/difficulty/i);
  });

  it('returns 409 when call_formation does not exist', async () => {
    const prog = await prisma.program.create({
      data: { name: `${T}Val Program 5`, abbreviation: `${T}vp5`, order: 10 },
    });
    const res = await request(app)
      .post(`/api/program/${prog.programId}/call-formation`)
      .send({ callId: 999999, startId: 999999, difficulty: 'easy' });
    expect(res.status).toBe(409);
  });

  it('returns 409 on duplicate (programId, callId, startId)', async () => {
    const prog = await prisma.program.create({
      data: { name: `${T}Dup CF Program`, abbreviation: `${T}dcfp`, order: 11 },
    });
    const formation = await prisma.formation.create({ data: { name: `${T}Dup CF Start` } });
    const endFormation = await prisma.formation.create({ data: { name: `${T}Dup CF End` } });
    const call = await prisma.call.create({ data: { name: `${T}Dup CF Call` } });
    await prisma.call_formation.create({
      data: { callId: call.callId, startId: formation.formId, endId: endFormation.formId },
    });
    await prisma.program_call_formation.create({
      data: { programId: prog.programId, callId: call.callId, startId: formation.formId, difficulty: 'easy' },
    });

    const res = await request(app)
      .post(`/api/program/${prog.programId}/call-formation`)
      .send({ callId: call.callId, startId: formation.formId, difficulty: 'hard' });
    expect(res.status).toBe(409);
    expect(res.body.message).toMatch(/already/i);
  });
});
