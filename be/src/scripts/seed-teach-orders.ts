// Seeds teach_order + teach_order_entry rows from JSON files in
// be/src/prisma/seed-data/teach-orders/. One JSON file per teach order.
//
// Each entry resolves its callId / familyId by name lookup against the seeded
// call / call_family tables. Unresolved names are inserted with null FKs and
// reported in the run summary so we can fix the source JSON or add the missing
// upstream call.
//
// Idempotent: existing teach orders (matched by name) are wiped of entries
// before re-inserting. teach_order_entry_fasr children cascade-delete.
//
// Usage (inside the BE container):
//   tsx src/scripts/seed-teach-orders.ts
//
// FASR rows are not seeded by this script — see #33 for FASR catalog import.

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { prisma } from '../database.js';

export type RawEntry = {
  displayOrder: string;
  type: 'family' | 'call';
  familyName?: string | null;
  callName?: string | null;
  label?: string | null;
  delayed?: boolean;
};

export type RawTeachOrder = {
  name: string;
  programAbbreviation: string;
  source?: string;
  notes?: string;
  entries: RawEntry[];
};

export type SeedSummary = {
  teachOrder: string;
  programAbbreviation: string;
  entryCount: number;
  unresolvedCalls: { displayOrder: string; callName: string | null; label?: string | null }[];
  unresolvedFamilies: { displayOrder: string; familyName: string | null; label?: string | null }[];
};

const SEED_DIR = join(process.cwd(), 'src/prisma/seed-data/teach-orders');

async function findCallId(name: string): Promise<number | null> {
  const direct = await prisma.call.findFirst({
    where: { name: { equals: name, mode: 'insensitive' } },
  });
  if (direct) return direct.callId;
  const synonym = await prisma.call_synonym.findFirst({
    where: { alias: { equals: name, mode: 'insensitive' } },
  });
  return synonym?.callId ?? null;
}

async function findFamilyId(name: string): Promise<number | null> {
  const family = await prisma.call_family.findFirst({
    where: { name: { equals: name, mode: 'insensitive' } },
  });
  return family?.familyId ?? null;
}

export async function seedTeachOrder(raw: RawTeachOrder): Promise<SeedSummary> {
  const program = await prisma.program.findUnique({
    where: { abbreviation: raw.programAbbreviation },
  });
  if (!program) {
    throw new Error(
      `Program abbreviation "${raw.programAbbreviation}" not found. Run import-taminations first.`
    );
  }

  const summary: SeedSummary = {
    teachOrder: raw.name,
    programAbbreviation: raw.programAbbreviation,
    entryCount: raw.entries.length,
    unresolvedCalls: [],
    unresolvedFamilies: [],
  };

  // Upsert the teach_order header (matched by name).
  const existing = await prisma.teach_order.findFirst({ where: { name: raw.name } });
  let teachOrderId: number;
  if (existing) {
    teachOrderId = existing.id;
    if (existing.programId !== program.programId) {
      await prisma.teach_order.update({
        where: { id: teachOrderId },
        data: { programId: program.programId },
      });
    }
    // Cascade delete entries (and FASR children via FK cascade).
    await prisma.teach_order_entry.deleteMany({ where: { teachOrderId } });
  } else {
    const created = await prisma.teach_order.create({
      data: { name: raw.name, programId: program.programId },
    });
    teachOrderId = created.id;
  }

  // Insert entries in order. entryOrder = 1-based array index.
  for (let i = 0; i < raw.entries.length; i++) {
    const entry = raw.entries[i];
    const entryOrder = i + 1;

    let familyId: number | null = null;
    let callId: number | null = null;

    if (entry.type === 'family' && entry.familyName) {
      familyId = await findFamilyId(entry.familyName);
      if (familyId == null) {
        summary.unresolvedFamilies.push({
          displayOrder: entry.displayOrder,
          familyName: entry.familyName,
          label: entry.label,
        });
      }
    } else if (entry.type === 'family') {
      summary.unresolvedFamilies.push({
        displayOrder: entry.displayOrder,
        familyName: null,
        label: entry.label,
      });
    }

    if (entry.type === 'call' && entry.callName) {
      callId = await findCallId(entry.callName);
      if (callId == null) {
        summary.unresolvedCalls.push({
          displayOrder: entry.displayOrder,
          callName: entry.callName,
          label: entry.label,
        });
      }
    } else if (entry.type === 'call') {
      summary.unresolvedCalls.push({
        displayOrder: entry.displayOrder,
        callName: null,
        label: entry.label,
      });
    }

    await prisma.teach_order_entry.create({
      data: {
        teachOrderId,
        entryOrder,
        displayOrder: entry.displayOrder,
        entryType: entry.type,
        label: entry.label ?? null,
        familyId,
        callId,
      },
    });
  }

  return summary;
}

export async function runSeed(): Promise<SeedSummary[]> {
  const files = readdirSync(SEED_DIR)
    .filter((f) => f.endsWith('.json'))
    .sort();

  const results: SeedSummary[] = [];
  for (const file of files) {
    const raw = JSON.parse(readFileSync(join(SEED_DIR, file), 'utf-8')) as RawTeachOrder;
    const summary = await seedTeachOrder(raw);
    results.push(summary);
  }
  return results;
}

async function main() {
  const summaries = await runSeed();
  for (const s of summaries) {
    // eslint-disable-next-line no-console
    console.log(`\n${s.teachOrder} [${s.programAbbreviation}] — ${s.entryCount} entries`);
    if (s.unresolvedCalls.length) {
      // eslint-disable-next-line no-console
      console.log(`  unresolved calls (${s.unresolvedCalls.length}):`);
      for (const u of s.unresolvedCalls) {
        // eslint-disable-next-line no-console
        console.log(`    ${u.displayOrder}  ${u.callName ?? '(null)'}  — ${u.label ?? ''}`);
      }
    }
    if (s.unresolvedFamilies.length) {
      // eslint-disable-next-line no-console
      console.log(`  unresolved families (${s.unresolvedFamilies.length}):`);
      for (const u of s.unresolvedFamilies) {
        // eslint-disable-next-line no-console
        console.log(`    ${u.displayOrder}  ${u.familyName ?? '(null)'}  — ${u.label ?? ''}`);
      }
    }
  }
  await prisma.$disconnect();
}

const isDirectInvocation =
  import.meta.url === `file://${process.argv[1]}` ||
  process.argv[1]?.endsWith('seed-teach-orders.ts');

if (isDirectInvocation) {
  main().catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  });
}
