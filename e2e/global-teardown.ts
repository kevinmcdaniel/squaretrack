import { Client } from 'pg';
import { readFileSync, rmSync } from 'node:fs';

export default async function globalTeardown() {
  let seed: {
    callId: number;
    startId: number;
    seqId: number;
    presentationId?: number;
    moduleId?: number;
    draftPresentationId?: number;
  };
  try {
    seed = JSON.parse(readFileSync(new URL('./.seed.json', import.meta.url), 'utf8'));
  } catch {
    return; // nothing seeded
  }

  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  // Presentation before module (item.moduleId is onDelete: Restrict), module before
  // call_formation (choreo_module_step references it); each cascades its own children.
  if (seed.presentationId != null) await client.query(`DELETE FROM presentation WHERE id = $1`, [seed.presentationId]);
  if (seed.draftPresentationId != null) await client.query(`DELETE FROM presentation WHERE id = $1`, [seed.draftPresentationId]);
  if (seed.moduleId != null) await client.query(`DELETE FROM choreo_module WHERE id = $1`, [seed.moduleId]);
  await client.query(`DELETE FROM sequence_calls WHERE "seqId" = $1`, [seed.seqId]);
  await client.query(`DELETE FROM sequence WHERE "seqId" = $1`, [seed.seqId]);
  await client.query(`DELETE FROM call_formation WHERE "callId" = $1 AND "startId" = $2`, [seed.callId, seed.startId]);
  await client.end();

  rmSync(new URL('./.seed.json', import.meta.url), { force: true });
}
