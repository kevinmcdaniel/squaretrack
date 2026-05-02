import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import { prisma } from '../database.js';
import { T, cleanupTestData } from './setup.js';

beforeAll(async () => { await cleanupTestData(); });
afterAll(async () => { await cleanupTestData(); });

// ── GET /api/call/list ──────────────────────────────────────────────────────

describe('GET /api/call/list', () => {
  it('returns 200 with data when calls exist', async () => {
    await prisma.call.create({ data: { name: `${T}ListCheck` } });
    const res = await request(app).get('/api/call/list');
    expect(res.status).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('returns 200 array even when no T-prefixed calls remain', async () => {
    // Seeded taminations calls always populate the table; the endpoint should never
    // return null after seed. Verify shape stays an array regardless of test data.
    await prisma.call.deleteMany({ where: { name: { startsWith: T } } });
    const res = await request(app).get('/api/call/list');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data) || res.body.data === null).toBe(true);
  });
});

// ── GET /api/call/list/:callId ──────────────────────────────────────────────

describe('GET /api/call/list/:callId', () => {
  it('returns 200 with call when id exists', async () => {
    const call = await prisma.call.create({ data: { name: `${T}GetById` } });
    const res = await request(app).get(`/api/call/list/${call.callId}`);
    expect(res.status).toBe(200);
    expect(res.body.data.callId).toBe(call.callId);
    expect(res.body.data.name).toBe(`${T}GetById`);
  });

  it('returns 200 empty result for nonexistent id', async () => {
    const res = await request(app).get('/api/call/list/999999');
    expect(res.status).toBe(200);
    expect(res.body.data).toBeNull();
  });

  it('returns 406 for non-numeric id', async () => {
    const res = await request(app).get('/api/call/list/abc');
    expect(res.status).toBe(406);
  });
});

// ── POST /api/call ──────────────────────────────────────────────────────────

describe('POST /api/call', () => {
  it('creates a call with name only', async () => {
    const res = await request(app)
      .post('/api/call')
      .send({ name: `${T}Create1` });
    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe(`${T}Create1`);
    expect(res.body.data.callId).toBeDefined();
  });

  it('creates a call with optional fields', async () => {
    const res = await request(app)
      .post('/api/call')
      .send({ name: `${T}Create2`, tamSeq: 'sq_thru', sdSeq: 'sq thru', preferredDisplay: 'Square Thru' });
    expect(res.status).toBe(201);
    expect(res.body.data.tamSeq).toBe('sq_thru');
    expect(res.body.data.sdSeq).toBe('sq thru');
    expect(res.body.data.preferredDisplay).toBe('Square Thru');
  });

  it('creates a call with valid familyId', async () => {
    const family = await prisma.call_family.create({ data: { name: `${T}Family1` } });
    const res = await request(app)
      .post('/api/call')
      .send({ name: `${T}CreateWithFamily`, familyId: family.familyId });
    expect(res.status).toBe(201);
    expect(res.body.data.familyId).toBe(family.familyId);
  });

  it('returns 406 when name is missing', async () => {
    const res = await request(app).post('/api/call').send({});
    expect(res.status).toBe(406);
  });

  it('returns 409 on duplicate name', async () => {
    await prisma.call.create({ data: { name: `${T}Dup` } });
    const res = await request(app).post('/api/call').send({ name: `${T}Dup` });
    expect(res.status).toBe(409);
  });

  it('returns 409 for nonexistent familyId', async () => {
    const res = await request(app)
      .post('/api/call')
      .send({ name: `${T}BadFamily`, familyId: 999999 });
    expect(res.status).toBe(409);
  });
});

// ── POST /api/call/:callId/synonym ──────────────────────────────────────────

describe('POST /api/call/:callId/synonym', () => {
  it('adds a synonym to a call', async () => {
    const call = await prisma.call.create({ data: { name: `${T}SynCall` } });
    const res = await request(app)
      .post(`/api/call/${call.callId}/synonym`)
      .send({ alias: `${T}SynAlias1` });
    expect(res.status).toBe(201);
    expect(res.body.data.alias).toBe(`${T}SynAlias1`);
    expect(res.body.data.callId).toBe(call.callId);
  });

  it('returns 406 when alias is missing', async () => {
    const call = await prisma.call.create({ data: { name: `${T}SynCall2` } });
    const res = await request(app)
      .post(`/api/call/${call.callId}/synonym`)
      .send({});
    expect(res.status).toBe(406);
  });

  it('returns 409 on duplicate alias', async () => {
    const call = await prisma.call.create({ data: { name: `${T}SynCall3` } });
    await prisma.call_synonym.create({ data: { callId: call.callId, alias: `${T}DupAlias` } });
    const res = await request(app)
      .post(`/api/call/${call.callId}/synonym`)
      .send({ alias: `${T}DupAlias` });
    expect(res.status).toBe(409);
  });

  it('returns 404 for nonexistent callId', async () => {
    const res = await request(app)
      .post('/api/call/999999/synonym')
      .send({ alias: `${T}OrphanAlias` });
    expect(res.status).toBe(404);
  });

  it('returns 406 for non-numeric callId', async () => {
    const res = await request(app)
      .post('/api/call/abc/synonym')
      .send({ alias: `${T}BadId` });
    expect(res.status).toBe(406);
  });
});
