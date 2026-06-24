import { Client } from 'pg';
import { writeFileSync } from 'node:fs';

const SEQ_NAME = '_TEST_E2E';
const PRES_NAME = '_TEST_E2E_PRES';
const MOD_NAME = '_TEST_E2E_MOD';
const DRAFT_NAME = '_TEST_E2E_DRAFT';
const DRAFT_SOURCE = 'Heads square thru four\nswing thru\npass thru';

/**
 * Seeds one call_formation (so a call has a FASR for the accordion + the call-formations
 * table has a cross-link row), one legacy sequence with steps (for the modal), and one
 * two-layer presentation — a choreo_module with one step, wrapped by a presentation with an
 * activator text item + a module_ref item (for the /sequences/[id] view). Records the ids in
 * .seed.json for the tests and teardown. Run against the live dockerized DB.
 */
export default async function globalSetup() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  // Clear any leftover from a previous crashed run. Presentation before module
  // (presentation_item.moduleId is onDelete: Restrict), module before its
  // call_formation (choreo_module_step references it).
  await client.query(`DELETE FROM presentation WHERE name = $1`, [PRES_NAME]);
  await client.query(`DELETE FROM presentation WHERE name = $1`, [DRAFT_NAME]);
  await client.query(`DELETE FROM choreo_module WHERE name = $1`, [MOD_NAME]);
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

  // Two-layer fixture: a valid choreo_module with one resolved step, wrapped by an
  // active presentation that interleaves an activator text item with a module_ref.
  const modRes = await client.query(
    `INSERT INTO choreo_module (name,"startFormId","endFormId","isValid","isVerified") VALUES ($1,$2,$3,true,false) RETURNING id`,
    [MOD_NAME, startId, endId],
  );
  const moduleId = modRes.rows[0].id;

  await client.query(
    `INSERT INTO choreo_module_step ("moduleId","order","callId","startId") VALUES ($1,0,$2,$3)`,
    [moduleId, callId, startId],
  );

  const presRes = await client.query(
    `INSERT INTO presentation (name,status,source) VALUES ($1,'active','personal') RETURNING id`,
    [PRES_NAME],
  );
  const presentationId = presRes.rows[0].id;

  await client.query(
    `INSERT INTO presentation_item ("presentationId","order",type,text,"textType") VALUES ($1,0,'text','Heads','activator')`,
    [presentationId],
  );
  const refItemRes = await client.query(
    `INSERT INTO presentation_item ("presentationId","order",type,"moduleId") VALUES ($1,1,'module_ref',$2) RETURNING id`,
    [presentationId, moduleId],
  );
  await client.query(
    `INSERT INTO presentation_item_step ("itemId","stepOrder","textBefore","helperText") VALUES ($1,0,'Easy','smooth')`,
    [refItemRes.rows[0].id],
  );

  // Raw draft fixture: sourceText, no items — the parse-on-load path hydrates the
  // step review from this when opened via ?presentationId=N.
  const draftRes = await client.query(
    `INSERT INTO presentation (name,status,"sourceText") VALUES ($1,'draft',$2) RETURNING id`,
    [DRAFT_NAME, DRAFT_SOURCE],
  );
  const draftPresentationId = draftRes.rows[0].id;

  writeFileSync(
    new URL('./.seed.json', import.meta.url),
    JSON.stringify({
      callId, callName, startId, startName, endId, seqId, seqName: SEQ_NAME,
      moduleId, presentationId, presentationName: PRES_NAME, draftPresentationId,
    }),
  );

  await client.end();
}
