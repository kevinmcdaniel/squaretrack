import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import { prisma } from '../database.js';
import { T, cleanupTestData } from './setup.js';

beforeAll(async () => { await cleanupTestData(); });
afterAll(async () => { await cleanupTestData(); });

// ── GET /api/call-formation/list ────────────────────────────────────────────

describe('GET /api/call-formation/list', () => {
  it('returns 200 with data and embedded call/formation names', async () => {
    const startForm = await prisma.formation.create({ data: { name: `${T}CflStart` } });
    const endForm = await prisma.formation.create({ data: { name: `${T}CflEnd` } });
    const call = await prisma.call.create({ data: { name: `${T}CflCall` } });
    await prisma.call_formation.create({
      data: { callId: call.callId, startId: startForm.formId, endId: endForm.formId },
    });

    const res = await request(app).get('/api/call-formation/list');
    expect(res.status).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
    const row = res.body.data.find(
      (r: any) => r.callId === call.callId && r.startId === startForm.formId,
    );
    expect(row).toBeDefined();
    expect(row.call.name).toBe(`${T}CflCall`);
    expect(row.startForm.name).toBe(`${T}CflStart`);
    expect(row.endForm.name).toBe(`${T}CflEnd`);
  });
});
