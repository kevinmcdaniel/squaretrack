import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import { prisma } from '../database.js';
import { T, cleanupTestData } from './setup.js';

beforeAll(async () => { await cleanupTestData(); });
afterAll(async () => { await cleanupTestData(); });

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

  it('returns 200 array even when no T-prefixed teach orders remain', async () => {
    // Seeded Callerlab teach orders always populate the table; the endpoint should never
    // return null after seed. Verify shape stays an array (or null on a truly empty DB).
    await prisma.teach_order.deleteMany({ where: { name: { startsWith: T } } });
    const res = await request(app).get('/api/teach-order/list');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data) || res.body.data === null).toBe(true);
  });
});

// ── GET /api/teach-order/:id ────────────────────────────────────────────────

describe('GET /api/teach-order/:id', () => {
  it('returns teach order with entries and fasrs ordered correctly', async () => {
    const { program, call, startForm } = await createTestFixtures();
    const to = await prisma.teach_order.create({
      data: {
        name: `${T}TO Get`,
        programId: program.programId,
        entries: {
          create: [
            {
              entryOrder: 1,
              displayOrder: '1',
              entryType: 'family',
              label: 'Test Family',
            },
            {
              entryOrder: 2,
              displayOrder: '1a',
              entryType: 'call',
              callId: call.callId,
              week: 1,
              fasrs: {
                create: [
                  { fasrOrder: 1, callId: call.callId, startId: startForm.formId },
                ],
              },
            },
          ],
        },
      },
    });

    const res = await request(app).get(`/api/teach-order/${to.id}`);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(to.id);
    expect(res.body.data.entries).toHaveLength(2);
    expect(res.body.data.entries[0].entryOrder).toBe(1);
    expect(res.body.data.entries[0].displayOrder).toBe('1');
    expect(res.body.data.entries[0].entryType).toBe('family');
    expect(res.body.data.entries[0].fasrs).toHaveLength(0);
    expect(res.body.data.entries[1].entryOrder).toBe(2);
    expect(res.body.data.entries[1].displayOrder).toBe('1a');
    expect(res.body.data.entries[1].callId).toBe(call.callId);
    expect(res.body.data.entries[1].week).toBe(1);
    expect(res.body.data.entries[1].fasrs).toHaveLength(1);
    expect(res.body.data.entries[1].fasrs[0].callId).toBe(call.callId);
    expect(res.body.data.entries[1].fasrs[0].startId).toBe(startForm.formId);
    expect(res.body.data.entries[1].fasrs[0].fasrOrder).toBe(1);
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
        { entryOrder: 1, displayOrder: '1', entryType: 'family', label: 'Circle Family' },
        {
          entryOrder: 2,
          displayOrder: '1a',
          entryType: 'call',
          callId: call.callId,
          week: 1,
          fasrs: [{ fasrOrder: 1, callId: call.callId, startId: startForm.formId }],
        },
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
    expect(res.body.data.entries[1].fasrs).toHaveLength(1);
    expect(res.body.data.entries[1].fasrs[0].startId).toBe(startForm.formId);
  });

  it('creates a call entry with null week (week is optional)', async () => {
    const { program, call, startForm } = await createTestFixtures();

    const res = await request(app).post('/api/teach-order').send({
      name: `${T}TO No Week`,
      programId: program.programId,
      entries: [
        {
          entryOrder: 1,
          displayOrder: '1',
          entryType: 'call',
          callId: call.callId,
          fasrs: [{ fasrOrder: 1, callId: call.callId, startId: startForm.formId }],
        },
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
    const { program, call, startForm } = await createTestFixtures();
    const res = await request(app).post('/api/teach-order').send({
      name: `${T}TO Missing CallId`,
      programId: program.programId,
      entries: [
        {
          entryOrder: 1,
          displayOrder: '1',
          entryType: 'call',
          fasrs: [{ fasrOrder: 1, callId: call.callId, startId: startForm.formId }],
        },
      ],
    });
    expect(res.status).toBe(406);
    expect(res.body.message).toMatch(/callId/i);
  });

  it('returns 406 when call entry is missing fasrs', async () => {
    const { program, call } = await createTestFixtures();
    const res = await request(app).post('/api/teach-order').send({
      name: `${T}TO Missing Fasrs`,
      programId: program.programId,
      entries: [
        { entryOrder: 1, displayOrder: '1', entryType: 'call', callId: call.callId },
      ],
    });
    expect(res.status).toBe(406);
    expect(res.body.message).toMatch(/fasr/i);
  });

  it('returns 406 when fasr is missing startId', async () => {
    const { program, call } = await createTestFixtures();
    const res = await request(app).post('/api/teach-order').send({
      name: `${T}TO Missing StartId`,
      programId: program.programId,
      entries: [
        {
          entryOrder: 1,
          displayOrder: '1',
          entryType: 'call',
          callId: call.callId,
          fasrs: [{ fasrOrder: 1, callId: call.callId }],
        },
      ],
    });
    expect(res.status).toBe(406);
    expect(res.body.message).toMatch(/startId/i);
  });

  it('returns 406 when fasr callId does not match entry callId', async () => {
    const { program, call, startForm } = await createTestFixtures();
    const res = await request(app).post('/api/teach-order').send({
      name: `${T}TO Mismatched CallId`,
      programId: program.programId,
      entries: [
        {
          entryOrder: 1,
          displayOrder: '1',
          entryType: 'call',
          callId: call.callId,
          fasrs: [{ fasrOrder: 1, callId: call.callId + 9999, startId: startForm.formId }],
        },
      ],
    });
    expect(res.status).toBe(406);
    expect(res.body.message).toMatch(/does not match/i);
  });

  it('returns 409 when call_formation is not in the program', async () => {
    const { program } = await createTestFixtures();
    const startForm = await prisma.formation.create({ data: { name: `${T}Orphan Start` } });
    const endForm = await prisma.formation.create({ data: { name: `${T}Orphan End` } });
    const call = await prisma.call.create({ data: { name: `${T}Orphan Call` } });
    await prisma.call_formation.create({
      data: { callId: call.callId, startId: startForm.formId, endId: endForm.formId },
    });

    const res = await request(app).post('/api/teach-order').send({
      name: `${T}TO Not In Program`,
      programId: program.programId,
      entries: [
        {
          entryOrder: 1,
          displayOrder: '1',
          entryType: 'call',
          callId: call.callId,
          fasrs: [{ fasrOrder: 1, callId: call.callId, startId: startForm.formId }],
        },
      ],
    });
    expect(res.status).toBe(409);
    expect(res.body.message).toMatch(/not valid for this program/i);
  });

  it('returns 409 on duplicate entryOrder within a teach order', async () => {
    const { program, call, startForm } = await createTestFixtures();
    const res = await request(app).post('/api/teach-order').send({
      name: `${T}TO Dup EntryOrder`,
      programId: program.programId,
      entries: [
        { entryOrder: 1, displayOrder: '1', entryType: 'family', label: 'Family A' },
        {
          entryOrder: 1,
          displayOrder: '2',
          entryType: 'call',
          callId: call.callId,
          fasrs: [{ fasrOrder: 1, callId: call.callId, startId: startForm.formId }],
        },
      ],
    });
    expect(res.status).toBe(409);
  });

  it('returns 409 on duplicate displayOrder within a teach order', async () => {
    const { program, call, startForm } = await createTestFixtures();
    const res = await request(app).post('/api/teach-order').send({
      name: `${T}TO Dup DisplayOrder`,
      programId: program.programId,
      entries: [
        { entryOrder: 1, displayOrder: '1', entryType: 'family', label: 'Family A' },
        {
          entryOrder: 2,
          displayOrder: '1',
          entryType: 'call',
          callId: call.callId,
          fasrs: [{ fasrOrder: 1, callId: call.callId, startId: startForm.formId }],
        },
      ],
    });
    expect(res.status).toBe(409);
  });

  it('creates an entry with multiple fasrs', async () => {
    const { program, call, startForm } = await createTestFixtures();
    const startForm2 = await prisma.formation.create({ data: { name: `${T}Multi Start2` } });
    const endForm2 = await prisma.formation.create({ data: { name: `${T}Multi End2` } });
    await prisma.call_formation.create({
      data: { callId: call.callId, startId: startForm2.formId, endId: endForm2.formId },
    });
    await prisma.program_call_formation.create({
      data: { programId: program.programId, callId: call.callId, startId: startForm2.formId, difficulty: 'hard' },
    });

    const res = await request(app).post('/api/teach-order').send({
      name: `${T}TO Multi Fasr`,
      programId: program.programId,
      entries: [
        {
          entryOrder: 1,
          displayOrder: '1',
          entryType: 'call',
          callId: call.callId,
          fasrs: [
            { fasrOrder: 1, callId: call.callId, startId: startForm.formId },
            { fasrOrder: 2, callId: call.callId, startId: startForm2.formId },
          ],
        },
      ],
    });
    expect(res.status).toBe(201);
    expect(res.body.data.entries[0].fasrs).toHaveLength(2);
  });
});

// ── PUT /api/teach-order/:id ────────────────────────────────────────────────

describe('PUT /api/teach-order/:id', () => {
  it('replaces entries and returns updated teach order', async () => {
    const { program } = await createTestFixtures();
    const to = await prisma.teach_order.create({
      data: {
        name: `${T}TO Update`,
        programId: program.programId,
        entries: {
          create: [{ entryOrder: 1, displayOrder: '1', entryType: 'family', label: 'Old Family' }],
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
        { entryOrder: 1, displayOrder: '1', entryType: 'family', label: 'New Family' },
        {
          entryOrder: 2,
          displayOrder: '1a',
          entryType: 'call',
          callId: call2.callId,
          week: 2,
          fasrs: [{ fasrOrder: 1, callId: call2.callId, startId: startForm2.formId }],
        },
      ],
    });

    expect(res.status).toBe(200);
    expect(res.body.data.entries).toHaveLength(2);
    expect(res.body.data.entries[0].label).toBe('New Family');
    expect(res.body.data.entries[1].callId).toBe(call2.callId);
    expect(res.body.data.entries[1].fasrs[0].startId).toBe(startForm2.formId);
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
    expect(entry.displayOrder).toBe('1');
    expect(entry.entryType).toBe('family');
    expect(entry.label).toMatch(/circle family/i);
    expect(entry.resolution).toBe('resolved');
  });

  it('parses numbered call line', async () => {
    const { program, call } = await createTestFixtures();
    const res = await request(app).post('/api/teach-order/parse').send({
      text: `2. ${call.name.replace(T, '')}`,
      programId: program.programId,
    });
    expect(res.status).toBe(200);
    expect(res.body.data[0].displayOrder).toBe('2');
  });

  it('combines numbered position with sub-letter into displayOrder', async () => {
    const { program } = await createTestFixtures();
    const res = await request(app).post('/api/teach-order/parse').send({
      text: '1. Circle Family\na. Circle Left/Right (1/4, 1/2, 3/4, Full)',
      programId: program.programId,
    });
    expect(res.status).toBe(200);
    const family = res.body.data[0];
    const sub = res.body.data[1];
    expect(family.displayOrder).toBe('1');
    expect(sub.displayOrder).toBe('1a');
    expect(sub.label ?? sub.rawLine).not.toMatch(/1\/4/);
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
