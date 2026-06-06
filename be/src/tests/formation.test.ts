import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import { prisma } from '../database.js';
import { T, cleanupTestData } from './setup.js';

beforeAll(async () => { await cleanupTestData(); });
afterAll(async () => { await cleanupTestData(); });

// ── GET /api/formation/list ─────────────────────────────────────────────────

describe('GET /api/formation/list', () => {
  it('returns 200 with data when formations exist', async () => {
    await prisma.formation.create({ data: { name: `${T}ListCheck` } });
    const res = await request(app).get('/api/formation/list');
    expect(res.status).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});

// ── GET /api/formation/list/:formationId ────────────────────────────────────

describe('GET /api/formation/list/:formationId', () => {
  it('returns 200 with formation when id exists', async () => {
    const form = await prisma.formation.create({ data: { name: `${T}GetById` } });
    const res = await request(app).get(`/api/formation/list/${form.formId}`);
    expect(res.status).toBe(200);
    expect(res.body.data.formId).toBe(form.formId);
    expect(res.body.data.name).toBe(`${T}GetById`);
  });

  it('returns 404 for nonexistent id', async () => {
    const res = await request(app).get('/api/formation/list/999999');
    expect(res.status).toBe(404);
    expect(res.body.data).toBeNull();
  });

  it('returns 406 for non-numeric id', async () => {
    const res = await request(app).get('/api/formation/list/abc');
    expect(res.status).toBe(406);
  });
});

// ── GET /api/formation?search= ──────────────────────────────────────────────

describe('GET /api/formation?search=', () => {
  it('returns formations matching search term', async () => {
    await prisma.formation.create({ data: { name: `${T}SquaredSet` } });
    const res = await request(app).get(`/api/formation?search=${T}Squared`);
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data[0].name).toContain(`${T}Squared`);
  });

  it('returns empty when no match', async () => {
    const res = await request(app).get('/api/formation?search=zzznomatch9999');
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
  });
});

// ── GET /api/formation?dancers= ─────────────────────────────────────────────

describe('GET /api/formation?dancers=', () => {
  it('returns only formations matching the dancer count (#66)', async () => {
    await prisma.formation.create({ data: { name: `${T}Eight`, dancerCount: 8 } });
    await prisma.formation.create({ data: { name: `${T}Four`, dancerCount: 4 } });
    const res = await request(app).get('/api/formation?dancers=8');
    expect(res.status).toBe(200);
    const names = res.body.data.map((f: any) => f.name);
    expect(names).toContain(`${T}Eight`);
    expect(names).not.toContain(`${T}Four`);
    expect(res.body.data.every((f: any) => f.dancerCount === 8)).toBe(true);
  });

  it('includes dancerCount on each formation', async () => {
    const res = await request(app).get('/api/formation/list');
    expect(res.status).toBe(200);
    expect(res.body.data[0]).toHaveProperty('dancerCount');
  });

  it('returns 406 for non-numeric dancers', async () => {
    const res = await request(app).get('/api/formation?dancers=abc');
    expect(res.status).toBe(406);
  });
});

// ── GET /api/formation?callId= ──────────────────────────────────────────────

describe('GET /api/formation?callId=', () => {
  it('returns valid start formations for a call', async () => {
    const startForm = await prisma.formation.create({ data: { name: `${T}StartForm` } });
    const endForm = await prisma.formation.create({ data: { name: `${T}EndForm` } });
    const call = await prisma.call.create({ data: { name: `${T}FormCall` } });
    await prisma.call_formation.create({
      data: { callId: call.callId, startId: startForm.formId, endId: endForm.formId },
    });
    const res = await request(app).get(`/api/formation?callId=${call.callId}`);
    expect(res.status).toBe(200);
    expect(res.body.data.some((f: any) => f.formId === startForm.formId)).toBe(true);
  });

  it('returns 406 for non-numeric callId', async () => {
    const res = await request(app).get('/api/formation?callId=abc');
    expect(res.status).toBe(406);
  });
});

// ── POST /api/formation ─────────────────────────────────────────────────────

describe('POST /api/formation', () => {
  it('creates a formation with name only', async () => {
    const res = await request(app)
      .post('/api/formation')
      .send({ name: `${T}NewForm` });
    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe(`${T}NewForm`);
    expect(res.body.data.formId).toBeDefined();
  });

  it('creates a formation with optional fields', async () => {
    const res = await request(app)
      .post('/api/formation')
      .send({ name: `${T}NewFormFull`, description: 'test desc', clCode: 'sq', sdCode: 'sq' });
    expect(res.status).toBe(201);
    expect(res.body.data.description).toBe('test desc');
    expect(res.body.data.clCode).toBe('sq');
  });

  it('returns 406 when name is missing', async () => {
    const res = await request(app).post('/api/formation').send({});
    expect(res.status).toBe(406);
  });
});

// ── POST /api/call-formation ────────────────────────────────────────────────

describe('POST /api/call-formation', () => {
  it('creates a call_formation link', async () => {
    const startForm = await prisma.formation.create({ data: { name: `${T}CfStart` } });
    const endForm = await prisma.formation.create({ data: { name: `${T}CfEnd` } });
    const call = await prisma.call.create({ data: { name: `${T}CfCall` } });
    const res = await request(app)
      .post('/api/call-formation')
      .send({ callId: call.callId, startId: startForm.formId, endId: endForm.formId });
    expect(res.status).toBe(201);
    expect(res.body.data.callId).toBe(call.callId);
    expect(res.body.data.startId).toBe(startForm.formId);
    expect(res.body.data.endId).toBe(endForm.formId);
  });

  it('returns 406 when required fields missing', async () => {
    const res = await request(app).post('/api/call-formation').send({ callId: 1 });
    expect(res.status).toBe(406);
  });

  it('returns 409 on duplicate (callId, startId)', async () => {
    const startForm = await prisma.formation.create({ data: { name: `${T}CfDupStart` } });
    const endForm = await prisma.formation.create({ data: { name: `${T}CfDupEnd` } });
    const call = await prisma.call.create({ data: { name: `${T}CfDupCall` } });
    await prisma.call_formation.create({
      data: { callId: call.callId, startId: startForm.formId, endId: endForm.formId },
    });
    const res = await request(app)
      .post('/api/call-formation')
      .send({ callId: call.callId, startId: startForm.formId, endId: endForm.formId });
    expect(res.status).toBe(409);
  });

  it('returns 409 for nonexistent callId', async () => {
    const startForm = await prisma.formation.create({ data: { name: `${T}CfBadCallStart` } });
    const endForm = await prisma.formation.create({ data: { name: `${T}CfBadCallEnd` } });
    const res = await request(app)
      .post('/api/call-formation')
      .send({ callId: 999999, startId: startForm.formId, endId: endForm.formId });
    expect(res.status).toBe(409);
  });

  it('returns 409 for nonexistent startId', async () => {
    const call = await prisma.call.create({ data: { name: `${T}CfBadStart` } });
    const endForm = await prisma.formation.create({ data: { name: `${T}CfBadStartEnd` } });
    const res = await request(app)
      .post('/api/call-formation')
      .send({ callId: call.callId, startId: 999999, endId: endForm.formId });
    expect(res.status).toBe(409);
  });
});
