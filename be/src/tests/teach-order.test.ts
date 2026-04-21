import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import { prisma } from '../database.js';
import { T, cleanupTestData } from './setup.js';

beforeAll(async () => { await cleanupTestData(); });
afterAll(async () => { await cleanupTestData(); });

// Shared test fixtures — uid on every record prevents unique constraint collisions across invocations
let _seq = 0;
async function createTestFixtures() {
  const uid = ++_seq;
  const program = await prisma.program.create({
    data: { name: `${T}TO Program ${uid}`, abbreviation: `${T}top${uid}`, order: uid },
  });
  const startForm = await prisma.formation.create({ data: { name: `${T}TO Start ${uid}` } });
  const endForm = await prisma.formation.create({ data: { name: `${T}TO End ${uid}` } });
  const call = await prisma.call.create({ data: { name: `${T}TO Call ${uid}` } });
  await prisma.call_formation.create({
    data: { callId: call.callId, startId: startForm.formId, endId: endForm.formId },
  });
  await prisma.program_call_formation.create({
    data: { programId: program.programId, callId: call.callId, startId: startForm.formId, difficulty: 'easy' },
  });
  return { program, startForm, endForm, call };
}

// ── GET /api/teach-order/list ───────────────────────────────────────────────

describe('GET /api/teach-order/list', () => {
  it('returns 200 with list when teach orders exist', async () => {
    const { program } = await createTestFixtures();
    await prisma.teach_order.create({
      data: { name: `${T}TO List`, programId: program.programId },
    });
    const res = await request(app).get('/api/teach-order/list');
    expect(res.status).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
    const to = res.body.data.find((t: any) => t.name === `${T}TO List`);
    expect(to).toBeDefined();
    expect(to.programId).toBe(program.programId);
  });

  it('returns 200 null when no teach orders exist', async () => {
    await prisma.teach_order.deleteMany({ where: { name: { startsWith: T } } });
    const res = await request(app).get('/api/teach-order/list');
    expect(res.status).toBe(200);
    expect(res.body.data).toBeNull();
  });
});

// ── GET /api/teach-order/:id ────────────────────────────────────────────────

describe('GET /api/teach-order/:id', () => {
  it('returns teach order with entries ordered by sortOrder', async () => {
    const { program, call, startForm } = await createTestFixtures();
    const to = await prisma.teach_order.create({
      data: {
        name: `${T}TO Get`,
        programId: program.programId,
        entries: {
          create: [
            { sortOrder: 1, position: 1, entryType: 'family', label: 'Test Family' },
            { sortOrder: 2, position: 1, subPosition: 'a', entryType: 'call', callId: call.callId, startId: startForm.formId, week: 1 },
          ],
        },
      },
    });

    const res = await request(app).get(`/api/teach-order/${to.id}`);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(to.id);
    expect(res.body.data.entries).toHaveLength(2);
    expect(res.body.data.entries[0].sortOrder).toBe(1);
    expect(res.body.data.entries[0].entryType).toBe('family');
    expect(res.body.data.entries[1].sortOrder).toBe(2);
    expect(res.body.data.entries[1].callId).toBe(call.callId);
    expect(res.body.data.entries[1].startId).toBe(startForm.formId);
    expect(res.body.data.entries[1].subPosition).toBe('a');
    expect(res.body.data.entries[1].week).toBe(1);
  });

  it('returns 200 null for nonexistent id', async () => {
    const res = await request(app).get('/api/teach-order/999999');
    expect(res.status).toBe(200);
    expect(res.body.data).toBeNull();
  });

  it('returns 406 for non-numeric id', async () => {
    const res = await request(app).get('/api/teach-order/abc');
    expect(res.status).toBe(406);
  });
});

// ── POST /api/teach-order ───────────────────────────────────────────────────

describe('POST /api/teach-order', () => {
  it('creates a teach order with family and call entries', async () => {
    const { program, call, startForm } = await createTestFixtures();

    const res = await request(app).post('/api/teach-order').send({
      name: `${T}TO Create`,
      programId: program.programId,
      entries: [
        { sortOrder: 1, position: 1, entryType: 'family', label: 'Circle Family' },
        { sortOrder: 2, position: 1, subPosition: 'a', entryType: 'call', callId: call.callId, startId: startForm.formId, week: 1 },
      ],
    });

    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe(`${T}TO Create`);
    expect(res.body.data.programId).toBe(program.programId);
    expect(res.body.data.entries).toHaveLength(2);
    expect(res.body.data.entries[0].entryType).toBe('family');
    expect(res.body.data.entries[0].label).toBe('Circle Family');
    expect(res.body.data.entries[1].callId).toBe(call.callId);
    expect(res.body.data.entries[1].week).toBe(1);
  });

  it('creates a call entry with null week (week is optional)', async () => {
    const { program, call, startForm } = await createTestFixtures();

    const res = await request(app).post('/api/teach-order').send({
      name: `${T}TO No Week`,
      programId: program.programId,
      entries: [
        { sortOrder: 1, position: 1, entryType: 'call', callId: call.callId, startId: startForm.formId },
      ],
    });

    expect(res.status).toBe(201);
    expect(res.body.data.entries[0].week).toBeNull();
  });

  it('returns 406 when name is missing', async () => {
    const { program } = await createTestFixtures();
    const res = await request(app).post('/api/teach-order').send({
      programId: program.programId,
      entries: [],
    });
    expect(res.status).toBe(406);
    expect(res.body.message).toMatch(/name/i);
  });

  it('returns 406 when programId is missing', async () => {
    const res = await request(app).post('/api/teach-order').send({
      name: `${T}TO No Program`,
      entries: [],
    });
    expect(res.status).toBe(406);
    expect(res.body.message).toMatch(/programId/i);
  });

  it('returns 406 when entries is missing', async () => {
    const { program } = await createTestFixtures();
    const res = await request(app).post('/api/teach-order').send({
      name: `${T}TO No Entries`,
      programId: program.programId,
    });
    expect(res.status).toBe(406);
    expect(res.body.message).toMatch(/entries/i);
  });

  it('returns 409 when programId does not exist', async () => {
    const res = await request(app).post('/api/teach-order').send({
      name: `${T}TO Bad Program`,
      programId: 999999,
      entries: [],
    });
    expect(res.status).toBe(409);
  });

  it('returns 406 when call entry is missing callId', async () => {
    const { program, startForm } = await createTestFixtures();
    const res = await request(app).post('/api/teach-order').send({
      name: `${T}TO Missing CallId`,
      programId: program.programId,
      entries: [
        { sortOrder: 1, position: 1, entryType: 'call', startId: startForm.formId },
      ],
    });
    expect(res.status).toBe(406);
    expect(res.body.message).toMatch(/callId/i);
  });

  it('returns 406 when call entry is missing startId', async () => {
    const { program, call } = await createTestFixtures();
    const res = await request(app).post('/api/teach-order').send({
      name: `${T}TO Missing StartId`,
      programId: program.programId,
      entries: [
        { sortOrder: 1, position: 1, entryType: 'call', callId: call.callId },
      ],
    });
    expect(res.status).toBe(406);
    expect(res.body.message).toMatch(/startId/i);
  });

  it('returns 409 when call_formation is not in the program', async () => {
    const { program } = await createTestFixtures();
    const startForm = await prisma.formation.create({ data: { name: `${T}Orphan Start` } });
    const endForm = await prisma.formation.create({ data: { name: `${T}Orphan End` } });
    const call = await prisma.call.create({ data: { name: `${T}Orphan Call` } });
    await prisma.call_formation.create({
      data: { callId: call.callId, startId: startForm.formId, endId: endForm.formId },
    });
    // call_formation exists but is NOT in program_call_formation for this program

    const res = await request(app).post('/api/teach-order').send({
      name: `${T}TO Not In Program`,
      programId: program.programId,
      entries: [
        { sortOrder: 1, position: 1, entryType: 'call', callId: call.callId, startId: startForm.formId },
      ],
    });
    expect(res.status).toBe(409);
    expect(res.body.message).toMatch(/not valid for this program/i);
  });

  it('returns 409 on duplicate sortOrder within a teach order', async () => {
    const { program, call, startForm } = await createTestFixtures();
    const res = await request(app).post('/api/teach-order').send({
      name: `${T}TO Dup SortOrder`,
      programId: program.programId,
      entries: [
        { sortOrder: 1, position: 1, entryType: 'family', label: 'Family A' },
        { sortOrder: 1, position: 2, entryType: 'call', callId: call.callId, startId: startForm.formId },
      ],
    });
    expect(res.status).toBe(409);
  });
});

// ── PUT /api/teach-order/:id ────────────────────────────────────────────────

describe('PUT /api/teach-order/:id', () => {
  it('replaces entries and returns updated teach order', async () => {
    const { program, call, startForm } = await createTestFixtures();
    const to = await prisma.teach_order.create({
      data: {
        name: `${T}TO Update`,
        programId: program.programId,
        entries: {
          create: [{ sortOrder: 1, position: 1, entryType: 'family', label: 'Old Family' }],
        },
      },
    });

    const startForm2 = await prisma.formation.create({ data: { name: `${T}TO Update Start2` } });
    const endForm2 = await prisma.formation.create({ data: { name: `${T}TO Update End2` } });
    const call2 = await prisma.call.create({ data: { name: `${T}TO Update Call2` } });
    await prisma.call_formation.create({
      data: { callId: call2.callId, startId: startForm2.formId, endId: endForm2.formId },
    });
    await prisma.program_call_formation.create({
      data: { programId: program.programId, callId: call2.callId, startId: startForm2.formId, difficulty: 'hard' },
    });

    const res = await request(app).put(`/api/teach-order/${to.id}`).send({
      entries: [
        { sortOrder: 1, position: 1, entryType: 'family', label: 'New Family' },
        { sortOrder: 2, position: 1, subPosition: 'a', entryType: 'call', callId: call2.callId, startId: startForm2.formId, week: 2 },
      ],
    });

    expect(res.status).toBe(200);
    expect(res.body.data.entries).toHaveLength(2);
    expect(res.body.data.entries[0].label).toBe('New Family');
    expect(res.body.data.entries[1].callId).toBe(call2.callId);
  });

  it('returns 404 for nonexistent teach order', async () => {
    const res = await request(app).put('/api/teach-order/999999').send({ entries: [] });
    expect(res.status).toBe(404);
  });
});

// ── POST /api/teach-order/parse ─────────────────────────────────────────────

describe('POST /api/teach-order/parse', () => {
  it('parses family header line', async () => {
    const { program } = await createTestFixtures();
    const res = await request(app).post('/api/teach-order/parse').send({
      text: '1. Circle Family',
      programId: program.programId,
    });
    expect(res.status).toBe(200);
    const entry = res.body.data[0];
    expect(entry.position).toBe(1);
    expect(entry.subPosition).toBeNull();
    expect(entry.entryType).toBe('family');
    expect(entry.label).toMatch(/circle family/i);
    expect(entry.resolution).toBe('resolved');
  });

  it('parses numbered call line', async () => {
    const { program, call, startForm } = await createTestFixtures();
    const res = await request(app).post('/api/teach-order/parse').send({
      text: `2. ${call.name.replace(T, '')}`,
      programId: program.programId,
    });
    expect(res.status).toBe(200);
    expect(res.body.data[0].position).toBe(2);
    expect(res.body.data[0].subPosition).toBeNull();
  });

  it('parses lettered sub-entry and strips variant notation', async () => {
    const { program } = await createTestFixtures();
    const res = await request(app).post('/api/teach-order/parse').send({
      text: 'a. Circle Left/Right (1/4, 1/2, 3/4, Full)',
      programId: program.programId,
    });
    expect(res.status).toBe(200);
    const entry = res.body.data[0];
    expect(entry.subPosition).toBe('a');
    // variant notation stripped from label
    expect(entry.label ?? entry.rawLine).not.toMatch(/1\/4/);
  });

  it('returns unresolved for unknown call', async () => {
    const { program } = await createTestFixtures();
    const res = await request(app).post('/api/teach-order/parse').send({
      text: '5. Some Unknown Call XYZ',
      programId: program.programId,
    });
    expect(res.status).toBe(200);
    expect(res.body.data[0].resolution).toBe('unresolved');
  });

  it('returns formation matches with difficulty for resolved call', async () => {
    const { program, call, startForm } = await createTestFixtures();
    const res = await request(app).post('/api/teach-order/parse').send({
      text: `3. ${call.name}`,
      programId: program.programId,
    });
    expect(res.status).toBe(200);
    const entry = res.body.data[0];
    if (entry.resolution === 'resolved') {
      expect(entry.formationMatches[0].difficulty).toBe('easy');
      expect(entry.formationMatches[0].startId).toBe(startForm.formId);
    }
  });

  it('returns 406 when text is missing', async () => {
    const { program } = await createTestFixtures();
    const res = await request(app).post('/api/teach-order/parse').send({
      programId: program.programId,
    });
    expect(res.status).toBe(406);
    expect(res.body.message).toMatch(/text/i);
  });

  it('returns 406 when programId is missing', async () => {
    const res = await request(app).post('/api/teach-order/parse').send({
      text: '1. Circle Left',
    });
    expect(res.status).toBe(406);
    expect(res.body.message).toMatch(/programId/i);
  });
});
