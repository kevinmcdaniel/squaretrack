// Idempotent seed orchestration.
//
// Runs as part of `prisma db seed`, which is invoked by the `seed` service in
// docker-compose.yml after migrations apply. Both upstream scripts use
// upsert / wipe-and-replace semantics, so re-running against a populated DB
// is a no-op for unchanged rows.
//
// Order matters: taminations populates call_family, call, and program first;
// callerlab formations are independent (no FK on call_formation yet); teach
// orders resolve callId / familyId against the call/call_family tables.

import { runImport as importTaminations } from '../scripts/import-taminations.js';
import { runImport as importCallerlabFormations } from '../scripts/import-callerlab-formations.js';
import { runSeed as seedTeachOrders } from '../scripts/seed-teach-orders.js';
import { prisma } from '../database.js';

async function main() {
  console.log('seed: importing taminations reference data…');
  const tam = await importTaminations();
  console.log('seed: taminations done', tam);

  console.log('seed: importing Callerlab canonical formations…');
  const formations = await importCallerlabFormations();
  console.log('seed: Callerlab formations done', formations);

  console.log('seed: importing teach orders…');
  const teach = await seedTeachOrders();
  const totalEntries = teach.reduce((sum, t) => sum + t.entryCount, 0);
  const totalUnresolvedCalls = teach.reduce((sum, t) => sum + t.unresolvedCalls.length, 0);
  const totalUnresolvedFamilies = teach.reduce((sum, t) => sum + t.unresolvedFamilies.length, 0);
  console.log(
    `seed: teach orders done — ${teach.length} orders, ${totalEntries} entries ` +
      `(${totalUnresolvedCalls} unresolved calls, ${totalUnresolvedFamilies} unresolved families)`,
  );
}

main()
  .catch((e) => {
    console.error('seed: FAILED', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
