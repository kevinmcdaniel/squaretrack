# Formations API

A **formation** describes a physical arrangement of dancers (e.g. "Squared Set", "Two-Faced Line", "Ocean Wave"). Formations are the starting and ending state of a call execution. They are referenced by `call_formation` mappings and by sequences.

## Canonical source

Names and pictogram identifiers come from Callerlab's [**Formation Pictograms** (2025-06-17)](https://www.callerlab.org/). The seed JSON is at [`be/src/prisma/seed-data/callerlab/formations.json`](../../be/src/prisma/seed-data/callerlab/formations.json) and the importer is [`be/src/scripts/import-callerlab-formations.ts`](../../be/src/scripts/import-callerlab-formations.ts) — runs as part of the `seed` compose service.

The `formation.clCode` column carries the pictogram number from the PDF (e.g. `clCode: "10"` for Right-Hand Ocean Wave). This is how teach orders, parsers, and call definitions trace back to the official reference.

The current seed covers Basic/Mainstream/SSD, Plus, and Advanced (139 rows). Challenge formations (C-1, C-2, C-3A) are tracked in a follow-up issue.

### `dancerCount`

Each formation carries `dancerCount` — the number of dancers in the arrangement: `2` (a single couple / pair), `4` (one line, wave, box, column, diamond, star, …), or `8` (full square: parallel pairs, Squared Set, Tidal formations, …). `1` is reserved for single-dancer Taminations edge cases not used in SquareTrack. `null` means not yet assigned.

The seed derives it from the singular = one-unit / plural = two-parallel-units naming pattern combined with the arrangement in `description` (e.g. "Eight-dancer …", "2x4", "Line of 4"). The sequence builder filters starting formations by this value (see [`GET /api/formation?dancers=`](#get-apiformationdancers)).

---

## GET /api/formation/list

Returns all formations.

### Request

No parameters.

### Expected Results

#### Success

HTTP **200**

```json
{
  "data": [
    {
      "formId": 1,
      "name": "Squared Set",
      "description": "Eight dancers in a square",
      "clCode": null,
      "sdCode": null,
      "dancerCount": 8
    }
  ],
  "message": "List of all formations"
}
```

#### Empty

HTTP **200**, `data: []`

---

## GET /api/formation/list/:formationId

Returns a single formation by ID.

### Path Parameters

| Parameter   | Type    | Required | Description          |
|-------------|---------|----------|----------------------|
| formationId | integer | **yes**  | The formation's ID   |

### Expected Results

#### Success

HTTP **200**

```json
{
  "data": {
    "formId": 1,
    "name": "Squared Set",
    "description": null,
    "clCode": null,
    "sdCode": null,
    "dancerCount": 8
  },
  "message": "Unique formation by id"
}
```

#### Not found

HTTP **404**, `data: null`

#### Invalid ID

HTTP **406**

---

## GET /api/formation?search=

Full-text search across formation names. Used for autocomplete in the sequence editor.

### Query Parameters

| Parameter | Type   | Required | Description                        |
|-----------|--------|----------|------------------------------------|
| search    | string | **yes**  | Partial name to match (case-insensitive) |

### Expected Results

#### Matches found

HTTP **200**

```json
{
  "data": [
    { "formId": 1, "name": "Squared Set", "description": null, "clCode": null, "sdCode": null },
    { "formId": 3, "name": "Square Thru Setup", "description": null, "clCode": null, "sdCode": null }
  ],
  "message": "Formation search results"
}
```

#### No matches

HTTP **200**

```json
{
  "data": [],
  "message": "Formation search results"
}
```

- Returns an empty array (not `null`) when no formations match.

---

## GET /api/formation?callId=

Returns the valid **start formations** for a given call — formations from which that call can be executed.

### Query Parameters

| Parameter | Type    | Required | Description                           |
|-----------|---------|----------|---------------------------------------|
| callId    | integer | **yes**  | The call to find start formations for |

### Expected Results

#### Success

HTTP **200**

```json
{
  "data": [
    { "formId": 1, "name": "Squared Set", "description": null, "clCode": null, "sdCode": null },
    { "formId": 4, "name": "Two-Faced Line", "description": null, "clCode": null, "sdCode": null }
  ],
  "message": "Formations for call"
}
```

- Returns only formations that appear as `startId` in a `call_formation` row for the given call.
- Returns empty array if the call exists but has no formations mapped yet.

#### Invalid callId

HTTP **406**

### Business Rules

- This endpoint drives the **FormationPicker** in the sequence editor step rows.
- When a call has exactly one valid start formation, the editor auto-selects it.
- When multiple formations are returned, the user must pick one.

---

## GET /api/formation?dancers=

Returns only formations with the given `dancerCount`. Used by the sequence builder's starting-formation picker, which defaults to `?dancers=8` (full square) and offers a toggle to show 2- and 4-dancer teaching formations.

### Query Parameters

| Parameter | Type    | Required | Description                              |
|-----------|---------|----------|------------------------------------------|
| dancers   | integer | **yes**  | Dancer count to filter by (`2`, `4`, `8`) |

### Expected Results

#### Success

HTTP **200**

```json
{
  "data": [
    { "formId": 1, "name": "Squared Set", "description": null, "clCode": null, "sdCode": null, "dancerCount": 8 },
    { "formId": 7, "name": "Facing Lines", "description": null, "clCode": null, "sdCode": null, "dancerCount": 8 }
  ],
  "message": "Formations by dancer count"
}
```

- Returns an empty array (not `null`) when no formations match the count.

#### Invalid dancers (non-numeric)

HTTP **406**

---

## POST /api/formation

Creates a new formation.

### Request Body

| Field       | Type   | Required | Description                                  |
|-------------|--------|----------|----------------------------------------------|
| name        | string | **yes**  | Formation name                               |
| description | string | no       | Plain-text description of dancer arrangement |
| clCode      | string | no       | Callerlab formation code                     |
| sdCode      | string | no       | SD program formation identifier              |

### Expected Results

#### Success

HTTP **201**

```json
{
  "data": {
    "formId": 12,
    "name": "Right-Hand Wave",
    "description": null,
    "clCode": null,
    "sdCode": null,
    "dancerCount": null
  },
  "message": "Formation created"
}
```

#### Missing name

HTTP **406**

```json
{
  "data": {},
  "message": "Validation Error: name is required.",
  "status": 406
}
```

### Business Rules

- Formation names are not enforced unique at the DB level; callers may have multiple variations with the same conceptual name. Use `clCode` and `sdCode` to distinguish precisely.
- The system seeds a **"Squared Set"** formation on first setup. Its ID is used as the default `startFormationId` for new sequences.
- `dancerCount` is **not** set via this endpoint — it is assigned by the Callerlab seed importer. Formations created through POST start with `dancerCount: null` until assigned.
