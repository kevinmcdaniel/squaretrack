# Calls API

A **call** is a named square dance movement (e.g. "Square Thru", "Do-Sa-Do"). Calls belong optionally to a **call family** (e.g. "Swing" family). Each call may carry identifiers for export to external tools (Taminations, SD).

---

## GET /api/call/list

Returns all calls in the system.

### Request

No parameters.

### Expected Results

#### Success — calls exist

```json
{
  "data": [
    {
      "callId": 1,
      "name": "Square Thru",
      "tamSeq": "sq_thru",
      "sdSeq": "sq thru",
      "preferredDisplay": "Square Thru",
      "familyId": null
    }
  ],
  "message": "List of all calls",
  "status": 200
}
```

- `data` is a non-empty array.
- Each item includes `callId`, `name`, and all optional fields (`tamSeq`, `sdSeq`, `preferredDisplay`, `familyId`). Optional fields are `null` when not set.

#### Empty — no calls exist

```json
{
  "data": null,
  "message": "Empty result: No calls found!",
  "status": 200
}
```

- HTTP status is still **200**.
- `data` is `null`.

---

## GET /api/call/list/:callId

Returns a single call by its numeric ID.

### Path Parameters

| Parameter | Type    | Required | Description       |
|-----------|---------|----------|-------------------|
| callId    | integer | yes      | The call's ID     |

### Expected Results

#### Success

```json
{
  "data": {
    "callId": 1,
    "name": "Square Thru",
    "tamSeq": "sq_thru",
    "sdSeq": "sq thru",
    "preferredDisplay": null,
    "familyId": 2
  },
  "message": "Unique call by id"
}
```

#### Not found

```json
{
  "data": null,
  "message": "Empty result: Call id:999 not found!",
  "status": 200
}
```

- HTTP status is **200**, not 404. Absence of a record is not an error.

#### Invalid ID (non-numeric)

```json
{
  "data": {},
  "message": "Validation Error: Call ID is an integer. Invalid value:abc.",
  "status": 406
}
```

- HTTP status **406**.

---

## POST /api/call

Creates a new call.

### Request Body

| Field            | Type    | Required | Description                                      |
|------------------|---------|----------|--------------------------------------------------|
| name             | string  | **yes**  | Unique call name                                 |
| tamSeq           | string  | no       | Taminations sequence identifier                  |
| sdSeq            | string  | no       | SD program call identifier                       |
| preferredDisplay | string  | no       | Caller's preferred display name; falls back to `name` |
| familyId         | integer | no       | ID of the call family this call belongs to       |

### Expected Results

#### Success

HTTP **201**

```json
{
  "data": {
    "callId": 42,
    "name": "Circle Left",
    "tamSeq": null,
    "sdSeq": null,
    "preferredDisplay": null,
    "familyId": null
  },
  "message": "Call created"
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

#### Duplicate name

HTTP **409**

```json
{
  "data": {},
  "message": "Conflict Error: Call name already exists.",
  "status": 409
}
```

#### Invalid familyId (does not exist)

HTTP **409**

```json
{
  "data": {},
  "message": "Conflict Error: familyId does not exist.",
  "status": 409
}
```

### Business Rules

- `name` must be unique across all calls.
- `preferredDisplay` is used at render time; if absent, `name` is shown.
- `tamSeq` and `sdSeq` are used when exporting sequences to Taminations and SD respectively. They may be added later via a separate update.
