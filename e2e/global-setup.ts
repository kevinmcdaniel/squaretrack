import { Client } from 'pg';
import { writeFileSync } from 'node:fs';

const SEQ_NAME = '_TEST_E2E';

/**
 * Seeds one call_formation (so a call has a FASR for the accordion + the call-formations
 * table has a cross-link row) and one sequence with steps (for the modal). Records the ids
 * in .seed.json for the tests and teardown. Run against the live dockerized DB.
 */
export default async function globalSetup() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  // Clear any leftover from a previous crashed run.
  await client.query(`DELETE FROM sequence_calls WHERE "seqId" IN (SELECT "seqId" FROM sequence WHERE name = $1)`, [SEQ_NAME]);
  await client.query(`DELETE FROM sequence WHERE name = $1`, [SEQ_NAME]);

  const callRes = await client.query(
    `SELECT "callId", name FROM call WHERE "callId" NOT IN (SELECT "callId" FROM call_formation) ORDER BY "callId" LIMIT 1`,
  );
  const { callId, name: callName } = callRes.rows[0];

  const formRes = await client.query(`SELECT "formId", name FROM formation ORDER BY "formId" LIMIT 2`);
  const startId = formRes.rows[0].formId;
  const startName = formRes.rows[0].name;
  const endId = formRes.rows[1]?.formId ?? startId;

  await client.query(
    `INSERT INTO call_formation ("callId","startId","endId") VALUES ($1,$2,$3) ON CONFLICT DO NOTHING`,
    [callId, startId, endId],
  );

  const seqRes = await client.query(
    `INSERT INTO sequence (name,"startFormationId","isValid","isVerified") VALUES ($1,$2,false,false) RETURNING "seqId"`,
    [SEQ_NAME, startId],
  );
  const seqId = seqRes.rows[0].seqId;

  await client.query(
    `INSERT INTO sequence_calls ("seqId","order",type,"callId","startId",text,"helperText")
     VALUES ($1,1,'activator',null,null,'Heads',null),
            ($1,2,'call',$2,$3,null,'smooth')`,
    [seqId, callId, startId],
  );

  writeFileSync(
    new URL('./.seed.json', import.meta.url),
    JSON.stringify({ callId, callName, startId, startName, endId, seqId, seqName: SEQ_NAME }),
  );

  await client.end();
}
