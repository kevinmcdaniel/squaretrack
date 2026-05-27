import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import { prisma } from '../database.js';
import { T, cleanupTestData } from './setup.js';

beforeAll(async () => { await cleanupTestData(); });
afterAll(async () => { await cleanupTestData(); });

// ── GET /api/call-family/list ───────────────────────────────────────────────

describe('GET /api/call-family/list', () => {
  it('returns 200 with data and call counts', async () => {
    const family = await prisma.call_family.create({ data: { name: `${T}Fam` } });
    await prisma.call.create({ data: { name: `${T}FamCall`, familyId: family.familyId } });

    const res = await request(app).get('/api/call-family/list');
    expect(res.status).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
    const row = res.body.data.find((r: any) => r.familyId === family.familyId);
    expect(row).toBeDefined();
    expect(row._count.calls).toBe(1);
  });
});

// ── GET /api/call-family/list/:familyId ─────────────────────────────────────

describe('GET /api/call-family/list/:familyId', () => {
  it('returns 200 with the family and its calls when id exists', async () => {
    const family = await prisma.call_family.create({ data: { name: `${T}FamById` } });
    await prisma.call.create({ data: { name: `${T}FamByIdCall`, familyId: family.familyId } });

    const res = await request(app).get(`/api/call-family/list/${family.familyId}`);
    expect(res.status).toBe(200);
    expect(res.body.data.familyId).toBe(family.familyId);
    expect(res.body.data.calls.some((c: any) => c.name === `${T}FamByIdCall`)).toBe(true);
  });

  it('returns 404 for nonexistent id', async () => {
    const res = await request(app).get('/api/call-family/list/999999');
    expect(res.status).toBe(404);
    expect(res.body.data).toBeNull();
  });

  it('returns 406 for non-numeric id', async () => {
    const res = await request(app).get('/api/call-family/list/abc');
    expect(res.status).toBe(406);
  });
});
