// Imports the canonical Callerlab formation list (transcribed from
// "Formation Pictograms 2025-06-17") into the squaretrack database.
//
// Source: be/src/prisma/seed-data/callerlab/formations.json — hand-transcribed
// from the PDF, see seed-data/callerlab/README.md for re-extraction notes.
//
// Idempotent: re-running updates existing rows (matched by name), never duplicates.
// Sets clCode to the pictogram identifier from the PDF so future audits can
// trace back to the source. The seed JSON also carries program / handedness /
// alternateNames for traceability — these are not stored on the formation row
// today; future schema work (#28 follow-ups) can promote them.
//
// Usage (inside the BE container):
//   tsx src/scripts/import-callerlab-formations.ts

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { prisma } from '../database.js';

type FormationRow = {
  name: string;
  alternateNames: string[];
  // Metadata only: the program section in the PDF where this formation is first
  // introduced. Formations are NOT structurally linked to programs — that
  // relationship is derived from the call → call_formation → program_call_formation
  // chain. The string here is purely for documentation and traceability.
  introducedAt: 'bms' | 'plus' | 'adv' | 'c1' | 'c2' | 'c3a';
  // Pictogram identifier from the source PDF. IDs in the 1000+ range are
  // synthesized for left-hand mirrors that are not explicitly drawn in the
  // PDF appendix; convention is `1000 + RH-id` (e.g. 1021 = LH mirror of #21).
  pictogramId: number;
  handedness: 'right' | 'left' | 'facing' | 'general';
  description: string;
};

const SEED_DIR = join(process.cwd(), 'src/prisma/seed-data/callerlab');

function readJson<T>(name: string): T {
  return JSON.parse(readFileSync(join(SEED_DIR, name), 'utf-8')) as T;
}

export async function runImport(): Promise<{ inserted: number; updated: number; total: number }> {
  const rows = readJson<FormationRow[]>('formations.json');
  let inserted = 0;
  let updated = 0;
  for (const r of rows) {
    const existing = await prisma.formation.findFirst({ where: { name: r.name } });
    if (existing) {
      await prisma.formation.update({
        where: { formId: existing.formId },
        data: {
          description: r.description,
          clCode: String(r.pictogramId),
        },
      });
      updated++;
    } else {
      await prisma.formation.create({
        data: {
          name: r.name,
          description: r.description,
          clCode: String(r.pictogramId),
        },
      });
      inserted++;
    }
  }
  return { inserted, updated, total: rows.length };
}

async function main() {
  const summary = await runImport();
  // eslint-disable-next-line no-console
  console.log('Imported Callerlab formations:', summary);
  await prisma.$disconnect();
}

const isDirectInvocation =
  import.meta.url === `file://${process.argv[1]}` ||
  process.argv[1]?.endsWith('import-callerlab-formations.ts');

if (isDirectInvocation) {
  main().catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  });
}
