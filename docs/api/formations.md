# Formations API

A **formation** describes a physical arrangement of dancers (e.g. "Squared Set", "Two-Faced Line", "Ocean Wave"). Formations are the starting and ending state of a call execution. They are referenced by `call_formation` mappings and by sequences.

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
      "sdCode": null
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
    "sdCode": null
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
    "sdCode": null
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
