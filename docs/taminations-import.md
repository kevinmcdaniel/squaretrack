# Taminations Reference Data Import

The [taminations-flutter](https://github.com/taminations/taminations-flutter) repo is the reference data source for square dance call definitions, families, and FASR (Formation-Arrangement-Sequence-Rotation) catalogs. We import a curated subset of its data into the squaretrack database to seed `program`, `call_family`, and `call` tables.

## What's imported (this PR)

- **Programs** — Callerlab levels (`b1`, `b2`, `ms`, `ssd`, `m26`, `plus`, `p26`, `a1`, `a2`, `c1`, `c2`, `c3a`, `c3b`, plus the umbrella levels `bms` and `adv`). Sourced from `lib/level_data.dart` in upstream order.
- **Call families** — e.g. *Circle Family*, *Thar Family*. Sourced from `CallEntry` rows whose title ends in `Family` and from the `titleIndex` map in `lib/call_index.dart`. Deduplicated by name (the same family appears under multiple program links upstream).
- **Calls** — sourced from `CallEntry` in `lib/call_index.dart`. Deduplicated by call title (the same call appears under multiple programs upstream). Each call gets:
  - `name` — the call title
  - `tamSeq` — the upstream `link` (e.g. `ms/thar`)
  - `familyId` — resolved from the upstream link's family, if any

## What's deferred

- **`call_formation` rows** (the per-FASR catalog) — needs a hand-curated `formation-name-map.json` translating Taminations internal formation names ("Box RH", "Wave LH GBBG", "Right-Hand Box Compact") into Callerlab terminology. Tracked in #28 follow-up.
- **`call_formation.taminationsDifficulty`** — the schema column exists; population happens once formation mapping lands so we can resolve `(callId, startId)` from the extracted data.
- **`program_call_formation`** — depends on `call_formation` rows existing.

## Refreshing from upstream

When the taminations repo is updated and we want to pull new calls:

```bash
# 1. Pull the latest taminations source somewhere local
cd ~/repos/taminations-flutter && git pull

# 2. Re-run extraction (writes JSON to be/src/prisma/seed-data/taminations/)
cd ~/repos/squaretrack/be
npx tsx src/scripts/extract-taminations.ts --tam-root ~/repos/taminations-flutter

# 3. Inspect the diff in seed-data/taminations/ and commit if changes look reasonable
git diff src/prisma/seed-data/taminations/

# 4. Re-run the import inside the BE container
docker exec square.be sh -c "cd /app && npx tsx src/scripts/import-taminations.ts"
```

The import is idempotent — re-running updates existing rows but never duplicates.

## Files

| Path | Purpose |
|---|---|
| `be/src/scripts/extract-taminations.ts` | Reads Dart sources, writes JSON dumps |
| `be/src/scripts/import-taminations.ts` | Reads JSON dumps, upserts into DB |
| `be/src/prisma/seed-data/taminations/programs.json` | Extracted from `lib/level_data.dart` |
| `be/src/prisma/seed-data/taminations/call-entries.json` | Extracted from `lib/call_index.dart` `CallEntry` list |
| `be/src/prisma/seed-data/taminations/families.json` | Derived from CallEntry titles + `titleIndex` map |
| `be/src/prisma/seed-data/taminations/call-formations.json` | Extracted from `lib/calls/<program>/*.dart` `AnimatedCall` blocks; **not yet imported** (waiting on formation-name-map) |

## Caveats

- **Program assignments are upstream-historical, not authoritative Callerlab.** A call may sit at one level in taminations even after Callerlab has reclassified it. Treat the import as a starting point; manual edits to `call.familyId` (and eventually `program_call_formation` rows) are preserved on re-run.
- **Internal formation names ≠ Callerlab.** `call-formations.json` uses upstream descriptive names ("Right-Hand Box Compact", "Tidal Inverted Line RH") that need explicit mapping before they can be linked to our `formation` table.
- **`call.familyId` is preserved on re-import** when already set. The import only fills `familyId` if it is null, so manual overrides survive a refresh.
