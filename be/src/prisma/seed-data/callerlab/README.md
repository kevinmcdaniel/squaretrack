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
  program: 'bms' | 'plus' | 'adv' | 'c1' | 'c2' | 'c3a';
  pictogramId: number;                                // PDF pictogram identifier (also stored as clCode)
  handedness: 'right' | 'left' | 'facing' | 'general';
  description: string;
};
```

Stored on the `formation` table:
- `name` → `formation.name`
- `description` → `formation.description`
- `pictogramId` → `formation.clCode` (string-encoded)

`alternateNames`, `program`, and `handedness` are kept in the seed JSON for traceability but are not stored on the row today. A future migration can promote them (alternates likely become a `formation_alias` table parallel to `call_synonym`).

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
