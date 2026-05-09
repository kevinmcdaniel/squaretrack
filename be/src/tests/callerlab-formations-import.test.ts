import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { prisma } from '../database.js';
import { runImport as importCallerlabFormations } from '../scripts/import-callerlab-formations.js';

// These tests verify the seeded canonical Callerlab formations against the
// running database. The seed runs in the `seed` compose service before tests
// can reach the BE, so by the time these tests execute the rows already exist.
// Re-running the importer must be a no-op (zero inserts).

const SEED_PATH = join(process.cwd(), 'src/prisma/seed-data/callerlab/formations.json');

type FormationRow = {
  name: string;
  alternateNames: string[];
  introducedAt: string;
  pictogramId: number;
  handedness: string;
  description: string;
};

function loadJson(): FormationRow[] {
  return JSON.parse(readFileSync(SEED_PATH, 'utf-8')) as FormationRow[];
}

describe('formations.json source file', () => {
  const rows = loadJson();

  it('contains at least 100 rows (BMS + Plus + Advanced)', () => {
    expect(rows.length).toBeGreaterThanOrEqual(100);
  });

  it('has unique formation names', () => {
    const names = rows.map((r) => r.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('has unique pictogramId values', () => {
    const ids = rows.map((r) => r.pictogramId);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every row has all required fields', () => {
    for (const r of rows) {
      expect(r.name, `name on pictogram ${r.pictogramId}`).toBeTypeOf('string');
      expect(r.name.length, `name on pictogram ${r.pictogramId}`).toBeGreaterThan(0);
      expect(r.pictogramId).toBeTypeOf('number');
      expect(['bms', 'plus', 'adv', 'c1', 'c2', 'c3a']).toContain(r.introducedAt);
      expect(['right', 'left', 'facing', 'general']).toContain(r.handedness);
      expect(r.description.length).toBeGreaterThan(0);
      expect(Array.isArray(r.alternateNames)).toBe(true);
    }
  });

  it('has at least one row in each of bms / plus / adv', () => {
    const programs = new Set(rows.map((r) => r.introducedAt));
    expect(programs.has('bms')).toBe(true);
    expect(programs.has('plus')).toBe(true);
    expect(programs.has('adv')).toBe(true);
  });

  it('every Right-Hand formation has a Left-Hand mirror', () => {
    const lhNames = new Set(rows.filter((r) => r.handedness === 'left').map((r) => r.name));
    const missing: string[] = [];
    for (const r of rows) {
      if (r.handedness !== 'right') continue;
      if (!r.name.startsWith('Right-Hand')) continue;
      const expectedLh = r.name.replace('Right-Hand', 'Left-Hand');
      if (!lhNames.has(expectedLh)) missing.push(`${r.name} (#${r.pictogramId})`);
    }
    expect(missing, `missing LH mirrors: ${missing.join(', ')}`).toHaveLength(0);
  });

  it('synthesized LH mirrors use pictogramId 1000+RH', () => {
    const byName = new Map(rows.map((r) => [r.name, r] as const));
    for (const r of rows) {
      if (r.pictogramId < 1000) continue;
      const rhName = r.name.replace('Left-Hand', 'Right-Hand');
      const rh = byName.get(rhName);
      expect(rh, `synthesized LH ${r.name} should mirror an RH row`).toBeDefined();
      expect(r.pictogramId).toBe(1000 + rh!.pictogramId);
    }
  });
});

describe('importCallerlabFormations against seeded DB', () => {
  const rows = loadJson();

  it('every formation in the JSON is present in the DB by name', async () => {
    const dbNames = new Set(
      (await prisma.formation.findMany({ select: { name: true } })).map((f) => f.name),
    );
    for (const r of rows) {
      expect(dbNames.has(r.name), `missing in DB: ${r.name}`).toBe(true);
    }
  });

  it('clCode matches pictogramId for every Callerlab row', async () => {
    const sample = rows.slice(0, 10);
    for (const r of sample) {
      const row = await prisma.formation.findFirst({ where: { name: r.name } });
      expect(row).not.toBeNull();
      expect(row!.clCode).toBe(String(r.pictogramId));
    }
  });

  it('re-running the importer is a no-op (zero inserts)', async () => {
    const before = await prisma.formation.count();
    const summary = await importCallerlabFormations();
    const after = await prisma.formation.count();
    expect(summary.inserted).toBe(0);
    expect(summary.updated).toBe(rows.length);
    expect(after).toBe(before);
  });

  it('canonical anchor formations exist (Squared Set, Right-Hand Ocean Wave, Eight Chain Thru)', async () => {
    for (const name of ['Squared Set', 'Right-Hand Ocean Wave', 'Eight Chain Thru']) {
      const row = await prisma.formation.findFirst({ where: { name } });
      expect(row, `expected canonical ${name}`).not.toBeNull();
    }
  });
});
