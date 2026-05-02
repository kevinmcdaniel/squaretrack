// Imports the taminations JSON dumps (produced by extract-taminations.ts) into the
// squaretrack database. Idempotent: re-running updates existing rows, never duplicates.
//
// This first pass populates: program, call_family, call.
// call_formation and program_call_formation are deferred — they require a hand-curated
// formation-name-map.json to translate Taminations internal formation names to Callerlab
// terminology.
//
// Usage (inside the BE container):
//   tsx src/scripts/import-taminations.ts
//
// Reads from be/src/prisma/seed-data/taminations/.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { prisma } from '../database.js';

type ProgramRow = { abbreviation: string; name: string };
type CallEntryRow = { title: string; level: string; link: string };
type FamilyRow = { name: string; link: string };

const SEED_DIR = join(process.cwd(), 'src/prisma/seed-data/taminations');

function readJson<T>(name: string): T {
  return JSON.parse(readFileSync(join(SEED_DIR, name), 'utf-8')) as T;
}

// Programs from level_data.dart in the order they appear there.
function programOrder(programs: ProgramRow[]): Map<string, number> {
  const order = new Map<string, number>();
  programs.forEach((p, i) => order.set(p.abbreviation, i + 1));
  return order;
}

export async function importPrograms(programs: ProgramRow[]) {
  const order = programOrder(programs);
  for (const p of programs) {
    await prisma.program.upsert({
      where: { abbreviation: p.abbreviation },
      create: { abbreviation: p.abbreviation, name: p.name, order: order.get(p.abbreviation)! },
      update: { name: p.name, order: order.get(p.abbreviation)! },
    });
  }
  return programs.length;
}

// Returns map of family name → familyId.
export async function importFamilies(families: FamilyRow[]): Promise<Map<string, number>> {
  // Collapse by name — taminations has same family name under multiple program links
  // (e.g. "Thar Family" at both ms/thar and p26/thar). One row per name.
  const distinct = new Map<string, FamilyRow>();
  for (const f of families) {
    if (!distinct.has(f.name)) distinct.set(f.name, f);
  }
  const result = new Map<string, number>();
  for (const f of distinct.values()) {
    const existing = await prisma.call_family.findFirst({ where: { name: f.name } });
    if (existing) {
      result.set(f.name, existing.familyId);
    } else {
      const created = await prisma.call_family.create({ data: { name: f.name } });
      result.set(f.name, created.familyId);
    }
  }
  return result;
}

export async function importCalls(
  callEntries: CallEntryRow[],
  families: FamilyRow[],
  familyIds: Map<string, number>
): Promise<{ inserted: number; updated: number }> {
  // Build link → familyName map for resolving each call's family from its link.
  const linkToFamilyName = new Map<string, string>();
  for (const f of families) linkToFamilyName.set(f.link, f.name);

  // Deduplicate by title — same title may appear under multiple links/programs.
  // Pick the first occurrence for tamSeq and familyId.
  const distinct = new Map<string, CallEntryRow>();
  for (const e of callEntries) {
    if (/Family$/i.test(e.title)) continue; // family headers are not calls
    if (!distinct.has(e.title)) distinct.set(e.title, e);
  }

  let inserted = 0;
  let updated = 0;
  for (const e of distinct.values()) {
    const familyName = linkToFamilyName.get(e.link);
    const familyId = familyName ? familyIds.get(familyName) ?? null : null;
    const existing = await prisma.call.findUnique({ where: { name: e.title } });
    if (existing) {
      await prisma.call.update({
        where: { name: e.title },
        data: {
          tamSeq: e.link,
          // Only set familyId if the call doesn't already have one (preserve manual edits)
          ...(existing.familyId == null && familyId != null ? { familyId } : {}),
        },
      });
      updated++;
    } else {
      await prisma.call.create({
        data: { name: e.title, tamSeq: e.link, familyId },
      });
      inserted++;
    }
  }
  return { inserted, updated };
}

export async function runImport() {
  const programs = readJson<ProgramRow[]>('programs.json');
  const callEntries = readJson<CallEntryRow[]>('call-entries.json');
  const families = readJson<FamilyRow[]>('families.json');

  const programCount = await importPrograms(programs);
  const familyIds = await importFamilies(families);
  const { inserted, updated } = await importCalls(callEntries, families, familyIds);

  return {
    programs: programCount,
    families: familyIds.size,
    calls: { inserted, updated, total: inserted + updated },
  };
}

async function main() {
  const summary = await runImport();
  // eslint-disable-next-line no-console
  console.log('Imported:', summary);
  await prisma.$disconnect();
}

const isDirectInvocation =
  import.meta.url === `file://${process.argv[1]}` ||
  process.argv[1]?.endsWith('import-taminations.ts');

if (isDirectInvocation) {
  main().catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  });
}
