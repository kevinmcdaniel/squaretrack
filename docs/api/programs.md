# Programs API

A **program** is a Callerlab dance level (e.g. Mainstream, Plus, A1). It defines which `(call, FASR)` pairs are part of its vocabulary and how difficult each is at that level. Difficulty is program-relative: a FASR that is `challenging` in Mainstream is `easy` in Plus because the dancer is more advanced.

---

## Program Fields

| Field | Type | Description |
|---|---|---|
| programId | integer | Auto-incremented primary key |
| name | string | Full name (e.g. `Mainstream 26`) |
| abbreviation | string | Short unique identifier (e.g. `ms26`) |
| order | integer | Display sort order |
| isActive | boolean | When `false`, hidden from default list responses. Used to retire superseded programs (e.g. legacy Basic 1/2) without breaking historical references from teach orders, sequences, or `program_call_formation`. |

---

## GET /api/program/list

Returns programs ordered by `order`. **By default, only active programs are returned** (those with `isActive: true`). Inactive programs remain queryable and continue to resolve via related-resource endpoints (e.g. teach orders that reference them).

### Query Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| showInactive | boolean | no | When `true`, include inactive programs in the response. Any other value is treated as `false`. |

### Expected Results

#### Success — active only (default)

HTTP **200**

```json
{
  "data": [
    { "programId": 6, "name": "Mainstream 2026", "abbreviation": "m26", "order": 6, "isActive": true },
    { "programId": 8, "name": "Plus 2026",       "abbreviation": "p26", "order": 8, "isActive": true }
  ],
  "message": "List of all programs"
}
```

#### Success — including inactive

`GET /api/program/list?showInactive=true`

HTTP **200**

```json
{
  "data": [
    { "programId": 1, "name": "Basic and Mainstream", "abbreviation": "bms", "order": 1, "isActive": false },
    { "programId": 6, "name": "Mainstream 2026",      "abbreviation": "m26", "order": 6, "isActive": true  }
  ],
  "message": "List of all programs (including inactive)"
}
```

#### Empty

HTTP **200**, `data: []`

### Business Rules

- The active filter is **only** applied to this list endpoint. `GET /api/program/:programId/call-formations`, teach-order resolution, and `program_call_formation` lookups all return data regardless of `isActive` — historical references must continue to resolve.
- `isActive` defaults to `true` for newly created programs (schema default). Inactive programs are typically flipped via the seed JSON (`be/src/prisma/seed-data/taminations/programs.json`).

---

## POST /api/program

Creates a new program.

### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| name | string | **yes** | Full program name |
| abbreviation | string | **yes** | Short unique identifier |
| order | integer | **yes** | Display sort order |

### Expected Results

#### Success

HTTP **201**

```json
{
  "data": { "programId": 1, "name": "Mainstream 26", "abbreviation": "ms26", "order": 1 },
  "message": "Program created"
}
```

#### Missing required fields

HTTP **406**

```json
{
  "data": {},
  "message": "Validation Error: name, abbreviation, and order are required.",
  "status": 406
}
```

#### Duplicate abbreviation

HTTP **409**

```json
{
  "data": {},
  "message": "Conflict Error: Program abbreviation already exists.",
  "status": 409
}
```

### Business Rules

- `abbreviation` must be unique across all programs.
- `order` controls the display sequence (lower = first).

---

## GET /api/program/:programId/call-formations

Returns all `program_call_formation` entries for a program — the FASRs valid at that level with their difficulty ratings.

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| programId | integer | **yes** | The program's ID |

### Expected Results

#### Success

HTTP **200**

```json
{
  "data": [
    {
      "programId": 1,
      "callId": 5,
      "startId": 1,
      "difficulty": "easy",
      "call": { "callId": 5, "name": "Circle Left" },
      "startForm": { "formId": 1, "name": "Squared Set" }
    },
    {
      "programId": 1,
      "callId": 10,
      "startId": 3,
      "difficulty": "challenging",
      "call": { "callId": 10, "name": "Right and Left Thru" },
      "startForm": { "formId": 3, "name": "Ocean Wave" }
    }
  ],
  "message": "Program call formations"
}
```

#### Empty

HTTP **200**, `data: []`

#### Invalid programId

HTTP **406**

---

## POST /api/program/:programId/call-formation

Adds a FASR to a program with a difficulty rating.

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| programId | integer | **yes** | The program's ID |

### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| callId | integer | **yes** | The call |
| startId | integer | **yes** | The starting formation |
| difficulty | string | **yes** | `easy` \| `hard` \| `challenging` |

### Expected Results

#### Success

HTTP **201**

```json
{
  "data": {
    "programId": 1,
    "callId": 10,
    "startId": 3,
    "difficulty": "challenging"
  },
  "message": "Program call formation added"
}
```

#### Missing required fields

HTTP **406**

```json
{
  "data": {},
  "message": "Validation Error: callId, startId, and difficulty are required.",
  "status": 406
}
```

#### Invalid difficulty value

HTTP **406**

```json
{
  "data": {},
  "message": "Validation Error: difficulty must be easy, hard, or challenging.",
  "status": 406
}
```

#### Duplicate

HTTP **409**

```json
{
  "data": {},
  "message": "Conflict Error: This call formation is already in the program.",
  "status": 409
}
```

#### Invalid callId/startId (call_formation does not exist)

HTTP **409**

```json
{
  "data": {},
  "message": "Conflict Error: callId/startId does not exist.",
  "status": 409
}
```

### Business Rules

- The `call_formation` record for `(callId, startId)` must exist before it can be added to a program.
- A FASR that is `challenging` in Mainstream should be recorded as `easy` in Plus — the same `call_formation` row, two different `program_call_formation` rows with different difficulty.
