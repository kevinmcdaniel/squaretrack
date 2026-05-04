# Teach Order Seed

Seeds Callerlab official teaching orders into `teach_order` + `teach_order_entry`. Sources are committed JSON files; the script reads them and resolves `callId` / `familyId` by name lookup against the seeded `call` / `call_family` tables.

## Currently seeded

| Program | File | Source | Entries |
|---|---|---|---|
| `m26` (New Mainstream) | `mainstream.json` | Callerlab Mainstream26 Teaching Order, Dec 2025; effective 2026-09-01 | 91 |
| `p26` (New Plus) | `plus.json` | Callerlab Plus Press Release, Mar 2026; effective 2026-09-01 | 56 |
| `a1` (A-1) | `a1.json` | Callerlab Advanced Program Teaching Order, 2025-06-12 | 50 |
| `a2` (A-2) | `a2.json` | Callerlab Advanced Program Teaching Order, 2025-06-12 | 45 |

Total: **242 teach order entries**.

## Running the seed

```bash
docker exec square.be sh -c "cd /app && npx tsx src/scripts/seed-teach-orders.ts"
```

The script reads every `*.json` file in `be/src/prisma/seed-data/teach-orders/`. Idempotent — re-running wipes existing entries for each teach order (matched by `name`) and re-inserts. FASR children cascade-delete via the FK.

The script prints a per-order summary at the end:
- `entryCount` — total entries inserted
- `unresolvedCalls` — entries where `callName` couldn't be matched in `call` or `call_synonym` (still inserted with null `callId`)
- `unresolvedFamilies` — same for family entries

Unresolved entries are not failures — they capture intent in `label` even when the underlying call/family hasn't been seeded yet. Re-running after #33 lands more `call_formation` data should reduce the unresolved count.

## JSON format

```jsonc
{
  "name": "Callerlab New Mainstream Suggested Teaching Order (2026-09-01)",
  "programAbbreviation": "m26",   // must match an existing program.abbreviation
  "source": "...",                 // free-form provenance string
  "entries": [
    {
      "displayOrder": "1",         // human label; unique per teach order
      "type": "family",            // 'family' | 'call'
      "familyName": "Circle Family",
      "label": "Circle Family"     // free-form display text; preserves source wording
    },
    {
      "displayOrder": "1a",
      "type": "call",
      "callName": "Circle Left / Right",
      "label": "Circle Left/Right (1/4, 1/2, 3/4, Full)",
      "delayed": true              // optional; mirrors Callerlab "italics — delay until later"
    }
  ]
}
```

Field rules:
- `entryOrder` is generated from array position (1-based).
- `callName` is matched case-insensitively against `call.name` first, then `call_synonym.alias`.
- `familyName` is matched case-insensitively against `call_family.name`.
- For `entryType='call'`, set `callName` to the canonical call you want linked. Use `null` to capture intent without a link.
- `label` should preserve the original Callerlab source text — useful when the call name is paraphrased or when multiple calls collapse into one entry (e.g. `Right/Left Arm Turn` → `callName: "Right Arm Turn"`, `label: "Right/Left Arm Turn"`).

## Adding a new teach order

1. Drop a new `.json` file in `be/src/prisma/seed-data/teach-orders/`.
2. Set `programAbbreviation` to an existing program (run `import-taminations` first if not already done).
3. Re-run the seed; check the unresolved-entries report.
4. Iterate on `callName` values to match what's in the DB; commit.

## Known gaps

About 14 % of entries are unresolved at the moment because the underlying call rows aren't in the seeded data yet (or have slightly different upstream names). These are tracked in #33 and will resolve naturally as the call catalog fills out. The seed report makes it easy to spot what's missing.
