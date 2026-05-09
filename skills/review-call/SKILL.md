---
name: review-call
description: >
  Walk through the call catalog one call at a time, comparing taminations data to the
  authoritative Callerlab Definitions PDF, and capture corrections to seed JSON.
  State persists across sessions in a review ledger. Use when the user says
  "/review-call", "review next call", "review calls", "audit calls", or invokes
  call-audit work for issues #50, #51, #52.
---

# review-call

Audits the squaretrack call catalog against authoritative Callerlab definitions, **one call at a time**. Without this skill the audit pass for ~205 calls (Mainstream + Plus + Advanced) is unreasonable in a single session — calls require careful side-by-side comparison and decisions cascade into multiple seed JSON files.

## State

A ledger at `be/src/prisma/seed-data/callerlab/review-ledger.json` records progress across sessions. Schema:

```ts
type LedgerEntry = {
  callTitle: string;       // taminations title
  link: string;            // taminations link, e.g. "ms/walk_and_dodge"
  program: string;         // taminations level
  status: 'pending' | 'approved' | 'needs-fix' | 'fixed' | 'skipped';
  reviewedAt?: string;     // ISO timestamp
  decisions?: {
    nameChange?: string;
    programChange?: string;
    fasrAdded?: Array<{ from: string; end: string }>;
    fasrRemoved?: Array<{ from: string; end: string }>;
    standardDifficulty?: 'easy' | 'hard' | 'challenging';
    timing?: number;
    notes?: string;
  };
};
```

If the ledger doesn't exist on first invocation, **build it** by reading every entry in `be/src/prisma/seed-data/taminations/call-entries.json` whose `level` is in `{ms, m26, plus, p26, a1, a2}`. (Other levels are out of scope until their PDFs are shared.) Each gets `status: "pending"`.

## Reference data sources

The PDFs are at fixed paths in the user's filesystem:

- **Mainstream**: `/Users/kevin/SquareDance/Kevin/Teaching/MainStream/callerLab/New_Mainstream_Definitions_26-03-29-1.pdf`
- **Plus Definitions**: `/Users/kevin/SquareDance/Kevin/Teaching/Plus/callerLab/Plus-Definitions-25-08-20a.pdf`
- **Plus Standard Applications**: `/Users/kevin/SquareDance/Kevin/Teaching/Plus/callerLab/Plus-Standard-Applications-2021-B22.pdf`
- **Plus Timing**: `/Users/kevin/SquareDance/Kevin/Teaching/Plus/callerLab/Plus-Timing-21-11-03.pdf`
- **Advanced**: `/Users/kevin/SquareDance/Kevin/Teaching/Advanced/callerLab/Advanced-Definitions-2025-01-16.pdf`
- **Formation Pictograms**: `/Users/kevin/SquareDance/Kevin/Teaching/Reference/CallerLab/formation-pictograms-2025-06-17.pdf`

The MS and Advanced PDFs are large enough to require the `pages` parameter on `Read`. Find the call within the PDF by reading the index/table of contents on early pages, then read the specific page range covering that call.

## Per-invocation workflow

1. **Pick the next call.** Load the ledger; pick the first row with `status: "pending"`. The user may pass an arg to filter — e.g. `/review-call --program=ms` picks only Mainstream calls; `/review-call --call="Square Thru"` jumps to a specific call.
2. **Load taminations data for the call**:
   - Title, level, family, link from `seed-data/taminations/call-entries.json`.
   - All FASR rows from `seed-data/taminations/call-formations.json` matching the title — gives `(from, endFormation, taminationsDifficulty)` per row.
3. **Load Callerlab data for the call**:
   - Open the relevant Definitions PDF based on `level` (`ms`/`m26` → Mainstream, `plus`/`p26` → Plus, `a1`/`a2` → Advanced).
   - Find and read the page(s) covering this call. The call name is the heading.
   - Extract: official name, family/section, listed start formation(s), listed end formation(s), Standard Application notes, timing, definition body for spot-checks.
4. **Present a side-by-side diff** to the user as a single message:

   ```
   📋 Call: Walk and Dodge (taminations: ms/walk_and_dodge)

   Name           taminations: "Walk and Dodge"     Callerlab: "Walk and Dodge"     ✅
   Family         taminations: (none)                Callerlab: <section name>      ⚠️
   Program        taminations: ms                    Callerlab: Mainstream          ✅
   FASRs:
     Right-Hand Box → Right-Hand Box                 ✅ in def, diff=1
     Right-Hand Waves → Ocean Waves                  ⚠️ taminations name "Right-Hand Waves" — map to canonical?
     Right-Hand Columns → Columns                    ✅ in def, diff=2
   Std diff       (not yet captured)                 PDF: <if specified>
   Timing         (not yet captured)                 PDF: <if specified, else "—">
   ```
5. **Ask the user for decisions** via a single AskUserQuestion call with multiple-select questions:
   - Approve as-is? Fix name? Fix family? Apply name-map decision for FASR formations? Capture difficulty? Capture timing? Skip? Defer?
6. **Apply the decisions**:
   - **Name change** → update `call-entries.json` (find by link, change `title`) and synonym table consideration.
   - **Family change** → annotate the call's `familyId` post-import; for now record in ledger and surface in audit summary issue.
   - **FASR add/remove/rename** → update `call-formations.json`. Renames also update `formation-name-map.json` (issue #48).
   - **Standard difficulty** → record in ledger; will land in `program_call_formation` via #53.
   - **Timing** → record in ledger; will land in `call_formation.timing` via #54.
7. **Update the ledger** — set `status: approved | needs-fix | skipped`, `reviewedAt: <now>`, attach `decisions`.
8. **Report progress** at the end: `Reviewed N/<total> calls. Next pending: <title> (<level>).`

## Tips for the operator

- **Don't review more than ~5 calls per session** unless the user specifically asks. Quality over throughput.
- **When unsure**, mark `needs-fix` with notes rather than guessing. The audit issue PR can sweep through `needs-fix` later in batch.
- **When formation names disagree**, prefer the Callerlab canonical name and record the mapping. Multiple taminations names mapping to one canonical is normal and expected.
- **Resume cleanly**: if interrupted mid-call (e.g. the user switches topics), the ledger still has `status: pending`, so `/review-call` next session picks it back up.
- **Skill output should be terse**. Use the diff table format above. The user reads many of these per session.

## Boundaries

- This skill only edits seed JSON and the ledger. It does **not** change schema, run migrations, or touch the DB.
- It does **not** automate the audit — every decision goes through AskUserQuestion. The user is the source of truth on whether taminations or Callerlab wins on each disagreement.
- "Stop reviewing" or "exit review mode" → end the session by reporting current progress.

## First run setup

When the ledger doesn't yet exist:

1. Read `seed-data/taminations/call-entries.json`.
2. Filter to MS/m26/Plus/p26/A1/A2 levels.
3. Build the initial ledger array (each row pending).
4. Write to `seed-data/callerlab/review-ledger.json`.
5. Report: `Initialized ledger with N pending calls (X MS, Y m26, Z Plus, ...). Run /review-call again to start the first review.`
