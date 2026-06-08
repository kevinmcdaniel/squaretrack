import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import { prisma } from '../database.js';
import { T, cleanupTestData } from './setup.js';

beforeAll(async () => { await cleanupTestData(); });
afterAll(async () => { await cleanupTestData(); });

// ── GET /api/sequence/list ──────────────────────────────────────────────────

describe('GET /api/sequence/list', () => {
  it('returns 200 with sequences and embedded steps when they exist', async () => {
    const form = await prisma.formation.create({ data: { name: `${T}SeqListForm` } });
    const call = await prisma.call.create({ data: { name: `${T}SeqListCall` } });
    await prisma.call_formation.create({
      data: { callId: call.callId, startId: form.formId, endId: form.formId },
    });
    await prisma.sequence.create({
      data: {
        name: `${T}SeqList1`,
        startFormationId: form.formId,
        calls: { create: [{ order: 1, type: 'call', callId: call.callId, startId: form.formId }] },
      },
    });
    const res = await request(app).get('/api/sequence/list');
    expect(res.status).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
    const row = res.body.data.find((s: any) => s.name === `${T}SeqList1`);
    expect(row.calls).toBeInstanceOf(Array);
    expect(row.calls[0].callFormation.call.name).toBe(`${T}SeqListCall`);
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
  it('parses plain call lines into module steps (#70)', async () => {
    const res = await request(app)
      .post('/api/sequence/parse')
      .send({ text: 'circle left\ndo-sa-do' });
    expect(res.status).toBe(200);
    expect(res.body.data.module.steps).toBeInstanceOf(Array);
    expect(res.body.data.module.steps.length).toBe(2);
    expect(res.body.data.module.steps[0].rawLine).toBe('circle left');
    expect(res.body.data.module.steps[0].order).toBe(0);
  });

  it('returns both a module draft and a presentation draft (#70)', async () => {
    const res = await request(app)
      .post('/api/sequence/parse')
      .send({ text: 'circle left' });
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('module');
    expect(res.body.data).toHaveProperty('presentation');
    expect(res.body.data.presentation.sourceText).toBe('circle left');
    const moduleRef = res.body.data.presentation.items.find((i: any) => i.type === 'module_ref');
    expect(moduleRef).toBeDefined();
  });

  it('module steps carry no spoken text (#70)', async () => {
    const res = await request(app)
      .post('/api/sequence/parse')
      .send({ text: 'circle left' });
    const step = res.body.data.module.steps[0];
    expect(step).not.toHaveProperty('text');
    expect(step).not.toHaveProperty('textBefore');
    expect(step).not.toHaveProperty('helperText');
  });

  it('routes non-call lines to presentation text items (#70)', async () => {
    const res = await request(app)
      .post('/api/sequence/parse')
      .send({ text: 'circle left\n[tip] smooth dancing' });
    expect(res.status).toBe(200);
    expect(res.body.data.module.steps.length).toBe(1);
    const textItem = res.body.data.presentation.items.find((i: any) => i.type === 'text');
    expect(textItem.textType).toBe('tip');
    expect(textItem.text).toBe('smooth dancing');
  });

  it('strips leading filler into presentation textBefore (#70)', async () => {
    const res = await request(app)
      .post('/api/sequence/parse')
      .send({ text: 'circle left\nand do-sa-do' });
    expect(res.body.data.module.steps.length).toBe(2);
    expect(res.body.data.module.steps[1].rawLine).toBe('and do-sa-do');
    const moduleRef = res.body.data.presentation.items.find((i: any) => i.type === 'module_ref');
    const decoration = moduleRef.steps.find((s: any) => s.stepOrder === 1);
    expect(decoration.textBefore).toBe('and');
  });

  it('keeps filler that precedes the designator, still extracting it (#70)', async () => {
    const res = await request(app)
      .post('/api/sequence/parse')
      .send({ text: 'now heads square thru 4' });
    expect(res.status).toBe(200);
    const step = res.body.data.module.steps[0];
    expect(step.designator).toBe('heads'); // designator still recognized
    expect(step.count).toBe(4);
    const moduleRef = res.body.data.presentation.items.find((i: any) => i.type === 'module_ref');
    expect(moduleRef.steps[0].textBefore).toBe('now'); // filler preserved
  });

  it('preserves caller casing on the presentation layer (#70)', async () => {
    const res = await request(app)
      .post('/api/sequence/parse')
      .send({ text: 'circle left\nAnd do-sa-do\n[warning] STOP NOW' });
    expect(res.status).toBe(200);
    const moduleRef = res.body.data.presentation.items.find((i: any) => i.type === 'module_ref');
    const deco = moduleRef.steps.find((s: any) => s.stepOrder === 1);
    expect(deco.textBefore).toBe('And'); // not lower-cased
    const warn = res.body.data.presentation.items.find((i: any) => i.type === 'text');
    expect(warn.text).toBe('STOP NOW'); // stored verbatim
  });

  it('interleaves text items in source order (#70)', async () => {
    const res = await request(app)
      .post('/api/sequence/parse')
      .send({ text: '[tip] ready\ncircle left' });
    expect(res.status).toBe(200);
    const items = res.body.data.presentation.items;
    expect(items[0].type).toBe('text'); // tip stays before the call
    expect(items[0].textType).toBe('tip');
    expect(items[1].type).toBe('module_ref');
    expect(items[1].steps[0].stepOrder).toBe(0);
  });

  it('extracts designator and count onto the module step', async () => {
    const res = await request(app)
      .post('/api/sequence/parse')
      .send({ text: 'heads square thru 4' });
    expect(res.status).toBe(200);
    expect(res.body.data.module.steps[0].designator).toBe('heads');
    expect(res.body.data.module.steps[0].count).toBe(4);
  });

  it('resolves call by exact name match', async () => {
    await prisma.call.create({ data: { name: `${T}parse circle` } });
    const res = await request(app)
      .post('/api/sequence/parse')
      .send({ text: `${T}parse circle` });
    expect(res.status).toBe(200);
    expect(res.body.data.module.steps[0].resolution).toBe('resolved');
    expect(res.body.data.module.steps[0].callMatches.length).toBe(1);
  });

  it('resolves call by synonym', async () => {
    const call = await prisma.call.create({ data: { name: `${T}parse do-sa-do` } });
    await prisma.call_synonym.create({ data: { callId: call.callId, alias: `${T}parse dosado` } });
    const res = await request(app)
      .post('/api/sequence/parse')
      .send({ text: `${T}parse dosado` });
    expect(res.status).toBe(200);
    expect(res.body.data.module.steps[0].resolution).toBe('resolved');
  });

  it('marks unresolved when no match found', async () => {
    const res = await request(app)
      .post('/api/sequence/parse')
      .send({ text: 'xyzzy_no_such_call_9999' });
    expect(res.status).toBe(200);
    expect(res.body.data.module.steps[0].resolution).toBe('unresolved');
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
