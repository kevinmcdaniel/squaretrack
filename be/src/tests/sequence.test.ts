import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import { prisma } from '../database.js';
import { T, cleanupTestData } from './setup.js';

beforeAll(async () => { await cleanupTestData(); });
afterAll(async () => { await cleanupTestData(); });

// ── GET /api/sequence/list ──────────────────────────────────────────────────

describe('GET /api/sequence/list', () => {
  it('returns 200 with sequences when they exist', async () => {
    const form = await prisma.formation.create({ data: { name: `${T}SeqListForm` } });
    await prisma.sequence.create({ data: { name: `${T}SeqList1`, startFormationId: form.formId } });
    const res = await request(app).get('/api/sequence/list');
    expect(res.status).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('returns 200 array (possibly empty) when no T-prefixed sequences remain', async () => {
    await prisma.sequence_calls.deleteMany({ where: { sequence: { name: { startsWith: T } } } });
    await prisma.sequence.deleteMany({ where: { name: { startsWith: T } } });
    const res = await request(app).get('/api/sequence/list');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

// ── GET /api/sequence/:seqId ────────────────────────────────────────────────

describe('GET /api/sequence/:seqId', () => {
  it('returns sequence with steps', async () => {
    const form = await prisma.formation.create({ data: { name: `${T}SeqGetForm` } });
    const call = await prisma.call.create({ data: { name: `${T}SeqGetCall` } });
    await prisma.call_formation.create({
      data: { callId: call.callId, startId: form.formId, endId: form.formId },
    });
    const seq = await prisma.sequence.create({
      data: {
        name: `${T}SeqWithSteps`,
        startFormationId: form.formId,
        calls: {
          create: [
            { order: 1, type: 'activator', text: 'Heads' },
            { order: 2, type: 'call', callId: call.callId, startId: form.formId },
          ],
        },
      },
    });
    const res = await request(app).get(`/api/sequence/${seq.seqId}`);
    expect(res.status).toBe(200);
    expect(res.body.data.seqId).toBe(seq.seqId);
    expect(res.body.data.calls).toBeInstanceOf(Array);
    expect(res.body.data.calls.length).toBe(2);
  });

  it('returns 404 for nonexistent id', async () => {
    const res = await request(app).get('/api/sequence/999999');
    expect(res.status).toBe(404);
    expect(res.body.data).toBeNull();
  });

  it('returns 406 for non-numeric id', async () => {
    const res = await request(app).get('/api/sequence/abc');
    expect(res.status).toBe(406);
  });
});

// ── POST /api/sequence/parse ────────────────────────────────────────────────

describe('POST /api/sequence/parse', () => {
  it('parses plain call lines and returns steps', async () => {
    const res = await request(app)
      .post('/api/sequence/parse')
      .send({ text: 'circle left\ndo-sa-do' });
    expect(res.status).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data.length).toBe(2);
    expect(res.body.data[0].rawLine).toBe('circle left');
    expect(res.body.data[0].type).toBe('call');
  });

  it('extracts designator from line', async () => {
    const res = await request(app)
      .post('/api/sequence/parse')
      .send({ text: 'heads square thru 4' });
    expect(res.status).toBe(200);
    expect(res.body.data[0].designator).toBe('heads');
    expect(res.body.data[0].count).toBe(4);
  });

  it('resolves call by exact name match', async () => {
    await prisma.call.create({ data: { name: `${T}parse circle` } });
    const res = await request(app)
      .post('/api/sequence/parse')
      .send({ text: `${T}parse circle` });
    expect(res.status).toBe(200);
    expect(res.body.data[0].resolution).toBe('resolved');
    expect(res.body.data[0].callMatches.length).toBe(1);
  });

  it('resolves call by synonym', async () => {
    const call = await prisma.call.create({ data: { name: `${T}parse do-sa-do` } });
    await prisma.call_synonym.create({ data: { callId: call.callId, alias: `${T}parse dosado` } });
    const res = await request(app)
      .post('/api/sequence/parse')
      .send({ text: `${T}parse dosado` });
    expect(res.status).toBe(200);
    expect(res.body.data[0].resolution).toBe('resolved');
  });

  it('marks unresolved when no match found', async () => {
    const res = await request(app)
      .post('/api/sequence/parse')
      .send({ text: 'xyzzy_no_such_call_9999' });
    expect(res.status).toBe(200);
    expect(res.body.data[0].resolution).toBe('unresolved');
  });

  it('returns 406 when text is missing', async () => {
    const res = await request(app).post('/api/sequence/parse').send({});
    expect(res.status).toBe(406);
  });
});

// ── POST /api/sequence ──────────────────────────────────────────────────────

describe('POST /api/sequence', () => {
  it('creates a minimal sequence, isValid=false with no call steps', async () => {
    const form = await prisma.formation.create({ data: { name: `${T}SaveSeqForm1` } });
    const res = await request(app)
      .post('/api/sequence')
      .send({
        name: `${T}MinSeq`,
        startFormationId: form.formId,
        steps: [{ order: 1, type: 'activator', text: 'Heads' }],
      });
    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe(`${T}MinSeq`);
    expect(res.body.data.isValid).toBe(false);
  });

  it('creates a sequence with all call steps resolved, isValid=true', async () => {
    const form = await prisma.formation.create({ data: { name: `${T}SaveSeqForm2` } });
    const call = await prisma.call.create({ data: { name: `${T}SaveSeqCall` } });
    await prisma.call_formation.create({
      data: { callId: call.callId, startId: form.formId, endId: form.formId },
    });
    const res = await request(app)
      .post('/api/sequence')
      .send({
        name: `${T}ValidSeq`,
        startFormationId: form.formId,
        steps: [
          { order: 1, type: 'call', callId: call.callId, startId: form.formId },
        ],
      });
    expect(res.status).toBe(201);
    expect(res.body.data.isValid).toBe(true);
  });

  it('creates sequence with metadata fields', async () => {
    const form = await prisma.formation.create({ data: { name: `${T}SaveSeqFormMeta` } });
    const res = await request(app)
      .post('/api/sequence')
      .send({
        name: `${T}MetaSeq`,
        startFormationId: form.formId,
        activator: 'heads',
        rating: 'good',
        notes: 'test notes',
        sourceText: 'raw text here',
        steps: [],
      });
    expect(res.status).toBe(201);
    expect(res.body.data.activator).toBe('heads');
    expect(res.body.data.rating).toBe('good');
    expect(res.body.data.notes).toBe('test notes');
  });

  it('saves steps with non-call types', async () => {
    const form = await prisma.formation.create({ data: { name: `${T}SaveSeqFormTypes` } });
    const res = await request(app)
      .post('/api/sequence')
      .send({
        name: `${T}TypedStepsSeq`,
        startFormationId: form.formId,
        steps: [
          { order: 1, type: 'activator', text: 'Heads' },
          { order: 2, type: 'filler', text: 'pass the ocean' },
          { order: 3, type: 'warning', text: 'check timing' },
        ],
      });
    expect(res.status).toBe(201);
    expect(res.body.data.calls.length).toBe(3);
    expect(res.body.data.isValid).toBe(false);
  });

  it('returns 406 when name is missing', async () => {
    const form = await prisma.formation.create({ data: { name: `${T}SaveSeqFormNoName` } });
    const res = await request(app)
      .post('/api/sequence')
      .send({ startFormationId: form.formId, steps: [] });
    expect(res.status).toBe(406);
  });

  it('returns 406 when startFormationId is missing', async () => {
    const res = await request(app)
      .post('/api/sequence')
      .send({ name: `${T}NoFormSeq`, steps: [] });
    expect(res.status).toBe(406);
  });

  it('returns 409 on duplicate name', async () => {
    const form = await prisma.formation.create({ data: { name: `${T}SaveSeqFormDup` } });
    await prisma.sequence.create({ data: { name: `${T}DupSeq`, startFormationId: form.formId } });
    const res = await request(app)
      .post('/api/sequence')
      .send({ name: `${T}DupSeq`, startFormationId: form.formId, steps: [] });
    expect(res.status).toBe(409);
  });

  it('returns 409 for nonexistent startFormationId', async () => {
    const res = await request(app)
      .post('/api/sequence')
      .send({ name: `${T}BadFormSeq`, startFormationId: 999999, steps: [] });
    expect(res.status).toBe(409);
  });

  it('cleans up all test sequence data after tests', async () => {
    await cleanupTestData();
    const seqs = await prisma.sequence.findMany({ where: { name: { startsWith: T } } });
    expect(seqs.length).toBe(0);
  });
});
