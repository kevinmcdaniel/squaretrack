# Callerlab seed data

Authoritative reference data transcribed from official Callerlab publications. This is distinct from `seed-data/taminations/`, which is derived from the taminations-flutter repo.

## Files

| File | Source | Contents |
|---|---|---|
| `formations.json` | [Formation Pictograms 2025-06-17](https://www.callerlab.org/) | Canonical formation names with primary names, alternate names, pictogram numbers, program assignment, and handedness for BMS, Plus, and Advanced. |

## Schema (`formations.json`)

```ts
type FormationRow = {
  name: string;                                       // primary name
  alternateNames: string[];                           // names listed on the same pictogram
  introducedAt: 'bms' | 'plus' | 'adv' | 'c1' | 'c2' | 'c3a';
  pictogramId: number;
  handedness: 'right' | 'left' | 'facing' | 'general';
  description: string;
};
```

Stored on the `formation` table:
- `name` → `formation.name`
- `description` → `formation.description`
- `pictogramId` → `formation.clCode` (string-encoded)

`alternateNames`, `introducedAt`, and `handedness` are kept in the seed JSON for traceability but are not stored on the row today. A future migration can promote them (alternates likely become a `formation_alias` table parallel to `call_synonym`).

### `introducedAt` is metadata, not a relationship

Formations are **not** structurally linked to programs. The program a formation belongs to is derived from `formation` ← `call_formation` ← `call` → `program_call_formation` → `program`. The `introducedAt` field here only records the program section in the source PDF where the formation first appears — it's a documentation breadcrumb, not a foreign key.

### Right-hand and left-hand are distinct rows

Every handed formation has its left-hand mirror as a separate row. They cannot be one row with a handedness flag because:

- **Hand flow** differs (right shoulder vs left shoulder adjacent at the centers).
- **Standard Position** difficulty for a given call can differ between the two variants.
- `call_formation` carries per-FASR `inFlowRotation` / `outFlowRotation` values that depend on which hand is in play at the start formation.

### `pictogramId` numbering

| Range | Source |
|---|---|
| 1–621 | Main body of the PDF (numbered pictograms, primarily right-hand variants) |
| 800–990 | Appendix mirrors explicitly drawn in the PDF |
| 1000+ | **Synthesized** left-hand mirrors of right-hand formations that the PDF does not draw in its appendix. Convention: `1000 + RH-id`, so 1021 is the LH mirror of pictogram #21. These are real formations that exist by Callerlab's right/left convention; they're absent from the PDF only because the PDF chose not to draw a mirror for every handed formation. |

## Why separate from taminations

Taminations uses ~278 internal formation names like "Box RH Compact" or "Wave LH GBBG" — descriptive but non-canonical. Callerlab's Formation Pictograms gives ~125 canonical names that the rest of the application uses (call definitions reference these). The two data sources flow into different tables:

- `seed-data/taminations/` → `program`, `call_family`, `call`, eventually `call_formation` once a name map exists.
- `seed-data/callerlab/` → `formation`. Bridges the two via the upcoming `formation-name-map.json` (issue follow-up).

## Scope

This first pass covers BMS + Plus + Advanced (the programs the user has Definitions PDFs for). Challenge formations (C-1, C-2, C-3A) are a separate follow-up — pictograms 301–621 plus their appendix mirrors.

## Re-extraction

The transcription is hand-done (the PDF uses LaTeX-rendered pictograms; OCR won't recover the structured names). To refresh from a newer Pictograms PDF:

1. Read the PDF page-by-page.
2. For each numbered pictogram, capture: primary name, alternate names (separated by horizontal rules in the PDF), pictogram number, program section.
3. The Appendix (pictograms 801–990) provides explicit left-hand mirrors — these get their own JSON rows.
4. Update the document date in this README.

Source PDF version currently transcribed: **June 17, 2025**.
