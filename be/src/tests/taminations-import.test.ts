import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { prisma } from '../database.js';
import { T, cleanupTestData } from './setup.js';
import {
  importPrograms,
  importFamilies,
  importCalls,
} from '../scripts/import-taminations.js';

beforeAll(async () => { await cleanupTestData(); });
afterAll(async () => { await cleanupTestData(); });

describe('importPrograms', () => {
  it('inserts and is idempotent on re-run', async () => {
    const programs = [
      { abbreviation: `${T}msx`, name: `${T}Mainstream X` },
      { abbreviation: `${T}plx`, name: `${T}Plus X` },
    ];

    const first = await importPrograms(programs);
    expect(first).toBe(2);

    const second = await importPrograms(programs);
    expect(second).toBe(2);

    const rows = await prisma.program.findMany({
      where: { abbreviation: { in: programs.map((p) => p.abbreviation) } },
    });
    expect(rows).toHaveLength(2);
  });

  it('updates the name on re-import when changed', async () => {
    await importPrograms([{ abbreviation: `${T}upd`, name: `${T}Old Name` }]);
    await importPrograms([{ abbreviation: `${T}upd`, name: `${T}New Name` }]);
    const row = await prisma.program.findUnique({ where: { abbreviation: `${T}upd` } });
    expect(row?.name).toBe(`${T}New Name`);
  });
});

describe('importFamilies', () => {
  it('deduplicates families by name across taminations links', async () => {
    const families = [
      { name: `${T}Thar Family`, link: `ms/thar` },
      { name: `${T}Thar Family`, link: `p26/thar` }, // same name, different link
      { name: `${T}Circle Family`, link: `b1/circle` },
    ];
    const ids = await importFamilies(families);
    expect(ids.size).toBe(2);
    expect(ids.has(`${T}Thar Family`)).toBe(true);
    expect(ids.has(`${T}Circle Family`)).toBe(true);
  });

  it('returns existing familyId on re-run', async () => {
    const families = [{ name: `${T}Idempotent Family`, link: `b1/foo` }];
    const first = await importFamilies(families);
    const firstId = first.get(`${T}Idempotent Family`);
    const second = await importFamilies(families);
    expect(second.get(`${T}Idempotent Family`)).toBe(firstId);
  });
});

describe('importCalls', () => {
  it('inserts calls, sets tamSeq from link, links to family', async () => {
    const families = [{ name: `${T}Test Family`, link: `ms/test` }];
    const familyIds = await importFamilies(families);
    const entries = [
      { title: `${T}Test Family`, level: 'ms', link: 'ms/test' }, // family header — should be skipped
      { title: `${T}Call A`, level: 'ms', link: 'ms/test' },
      { title: `${T}Call B`, level: 'ms', link: 'ms/test' },
    ];

    const result = await importCalls(entries, families, familyIds);
    expect(result.inserted).toBe(2);
    expect(result.updated).toBe(0);

    const calls = await prisma.call.findMany({
      where: { name: { startsWith: T } },
      orderBy: { name: 'asc' },
    });
    expect(calls).toHaveLength(2);
    expect(calls[0].tamSeq).toBe('ms/test');
    expect(calls[0].familyId).toBe(familyIds.get(`${T}Test Family`));
  });

  it('deduplicates by call title when same call appears under multiple links', async () => {
    const families = [{ name: `${T}Dup Family`, link: 'plus/dup' }];
    const familyIds = await importFamilies(families);
    const entries = [
      { title: `${T}Repeated Call`, level: 'plus', link: 'plus/dup' },
      { title: `${T}Repeated Call`, level: 'p26', link: 'p26/dup' },
    ];
    const result = await importCalls(entries, families, familyIds);
    expect(result.inserted).toBe(1);
    expect(result.updated).toBe(0);

    const rows = await prisma.call.findMany({ where: { name: `${T}Repeated Call` } });
    expect(rows).toHaveLength(1);
  });

  it('is idempotent on re-run', async () => {
    const families = [{ name: `${T}Idem Family`, link: 'a1/idem' }];
    const familyIds = await importFamilies(families);
    const entries = [{ title: `${T}Idem Call`, level: 'a1', link: 'a1/idem' }];

    await importCalls(entries, families, familyIds);
    const second = await importCalls(entries, families, familyIds);

    expect(second.inserted).toBe(0);
    expect(second.updated).toBe(1);
  });

  it('preserves existing familyId on update (does not clobber manual edits)', async () => {
    const otherFamily = await prisma.call_family.create({ data: { name: `${T}Manual Family` } });
    await prisma.call.create({
      data: { name: `${T}Preserve Call`, familyId: otherFamily.familyId },
    });

    const families = [{ name: `${T}Auto Family`, link: 'ms/preserve' }];
    const familyIds = await importFamilies(families);
    const entries = [{ title: `${T}Preserve Call`, level: 'ms', link: 'ms/preserve' }];
    await importCalls(entries, families, familyIds);

    const row = await prisma.call.findUnique({ where: { name: `${T}Preserve Call` } });
    expect(row?.familyId).toBe(otherFamily.familyId);
  });
});
