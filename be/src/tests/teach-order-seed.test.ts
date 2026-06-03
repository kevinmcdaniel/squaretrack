import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { prisma } from '../database.js';
import { T, cleanupTestData } from './setup.js';
import { seedTeachOrder, type RawTeachOrder } from '../scripts/seed-teach-orders.js';

beforeAll(async () => { await cleanupTestData(); });
afterAll(async () => { await cleanupTestData(); });

let _seq = 0;
async function fixtures() {
  const uid = ++_seq;
  const program = await prisma.program.create({
    data: { name: `${T}seed program ${uid}`, abbreviation: `${T}sp${uid}`, order: uid },
  });
  const family = await prisma.call_family.create({ data: { name: `${T}TestFam ${uid}` } });
  const callA = await prisma.call.create({ data: { name: `${T}CallA ${uid}` } });
  const callB = await prisma.call.create({ data: { name: `${T}CallB ${uid}` } });
  return { program, family, callA, callB };
}

describe('seedTeachOrder', () => {
  it('inserts entries and resolves callId/familyId by name', async () => {
    const { program, family, callA, callB } = await fixtures();
    const raw: RawTeachOrder = {
      name: `${T}TO Resolve`,
      programAbbreviation: program.abbreviation,
      entries: [
        { displayOrder: '1', type: 'family', familyName: family.name, label: 'fam' },
        { displayOrder: '1a', type: 'call', callName: callA.name, label: 'a' },
        { displayOrder: '1b', type: 'call', callName: callB.name, label: 'b' },
      ],
    };
    const summary = await seedTeachOrder(raw);
    expect(summary.entryCount).toBe(3);
    expect(summary.unresolvedCalls).toHaveLength(0);
    expect(summary.unresolvedFamilies).toHaveLength(0);

    const entries = await prisma.teach_order_entry.findMany({
      where: { teachOrder: { name: `${T}TO Resolve` } },
      orderBy: { entryOrder: 'asc' },
    });
    expect(entries).toHaveLength(3);
    expect(entries[0].entryType).toBe('family');
    expect(entries[0].familyId).toBe(family.familyId);
    expect(entries[0].displayOrder).toBe('1');
    expect(entries[1].callId).toBe(callA.callId);
    expect(entries[1].displayOrder).toBe('1a');
    expect(entries[2].callId).toBe(callB.callId);
  });

  it('reports unresolved entries with null FK and continues', async () => {
    const { program, callA } = await fixtures();
    const raw: RawTeachOrder = {
      name: `${T}TO Unresolved`,
      programAbbreviation: program.abbreviation,
      entries: [
        { displayOrder: '1', type: 'call', callName: callA.name, label: 'a' },
        { displayOrder: '2', type: 'call', callName: `${T}DoesNotExist`, label: 'missing' },
        { displayOrder: '3', type: 'family', familyName: `${T}MissingFam`, label: 'missing fam' },
      ],
    };
    const summary = await seedTeachOrder(raw);
    expect(summary.unresolvedCalls).toHaveLength(1);
    expect(summary.unresolvedCalls[0].displayOrder).toBe('2');
    expect(summary.unresolvedFamilies).toHaveLength(1);

    const entries = await prisma.teach_order_entry.findMany({
      where: { teachOrder: { name: `${T}TO Unresolved` } },
      orderBy: { entryOrder: 'asc' },
    });
    expect(entries).toHaveLength(3);
    expect(entries[1].callId).toBeNull();
    expect(entries[2].familyId).toBeNull();
  });

  it('is idempotent — re-running replaces existing entries', async () => {
    const { program, callA, callB } = await fixtures();
    const raw: RawTeachOrder = {
      name: `${T}TO Idem`,
      programAbbreviation: program.abbreviation,
      entries: [
        { displayOrder: '1', type: 'call', callName: callA.name, label: 'first' },
      ],
    };
    await seedTeachOrder(raw);

    const updated: RawTeachOrder = {
      ...raw,
      entries: [
        { displayOrder: '1', type: 'call', callName: callA.name, label: 'updated' },
        { displayOrder: '2', type: 'call', callName: callB.name, label: 'added' },
      ],
    };
    await seedTeachOrder(updated);

    const orders = await prisma.teach_order.findMany({ where: { name: `${T}TO Idem` } });
    expect(orders).toHaveLength(1);

    const entries = await prisma.teach_order_entry.findMany({
      where: { teachOrderId: orders[0].id },
      orderBy: { entryOrder: 'asc' },
    });
    expect(entries).toHaveLength(2);
    expect(entries[0].label).toBe('updated');
    expect(entries[1].label).toBe('added');
  });

  it('persists source and notes, refreshing them on re-seed', async () => {
    const { program, callA } = await fixtures();
    const raw: RawTeachOrder = {
      name: `${T}TO Source`,
      programAbbreviation: program.abbreviation,
      source: 'CALLERLAB Test Press Release',
      notes: 'interspersed items',
      entries: [{ displayOrder: '1', type: 'call', callName: callA.name, label: 'a' }],
    };
    await seedTeachOrder(raw);
    let order = await prisma.teach_order.findFirst({ where: { name: `${T}TO Source` } });
    expect(order?.source).toBe('CALLERLAB Test Press Release');
    expect(order?.notes).toBe('interspersed items');

    // Re-seed with a changed source and omitted notes → source updated, notes cleared.
    await seedTeachOrder({ ...raw, source: 'Updated Source', notes: undefined });
    order = await prisma.teach_order.findFirst({ where: { name: `${T}TO Source` } });
    expect(order?.source).toBe('Updated Source');
    expect(order?.notes).toBeNull();
  });

  it('throws when programAbbreviation does not exist', async () => {
    const raw: RawTeachOrder = {
      name: `${T}TO Bad Program`,
      programAbbreviation: `${T}nonexistent`,
      entries: [],
    };
    await expect(seedTeachOrder(raw)).rejects.toThrow(/not found/i);
  });

  it('resolves call name case-insensitively', async () => {
    const { program, callA } = await fixtures();
    const raw: RawTeachOrder = {
      name: `${T}TO Case`,
      programAbbreviation: program.abbreviation,
      entries: [
        { displayOrder: '1', type: 'call', callName: callA.name.toUpperCase(), label: 'upper' },
      ],
    };
    const summary = await seedTeachOrder(raw);
    expect(summary.unresolvedCalls).toHaveLength(0);
    const entry = await prisma.teach_order_entry.findFirst({
      where: { teachOrder: { name: `${T}TO Case` } },
    });
    expect(entry?.callId).toBe(callA.callId);
  });

  it('resolves call via call_synonym alias', async () => {
    const { program, callA } = await fixtures();
    await prisma.call_synonym.create({
      data: { callId: callA.callId, alias: `${T}AliasFor A` },
    });
    const raw: RawTeachOrder = {
      name: `${T}TO Alias`,
      programAbbreviation: program.abbreviation,
      entries: [
        { displayOrder: '1', type: 'call', callName: `${T}AliasFor A`, label: 'via alias' },
      ],
    };
    const summary = await seedTeachOrder(raw);
    expect(summary.unresolvedCalls).toHaveLength(0);
    const entry = await prisma.teach_order_entry.findFirst({
      where: { teachOrder: { name: `${T}TO Alias` } },
    });
    expect(entry?.callId).toBe(callA.callId);
  });
});
