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
      "isPositional": null,
      "isGenderCall": null,
      "waveRuleApplies": null,
      "dancerCount": null,
      "familyId": null
    }
  ],
  "message": "List of all calls",
  "status": 200
}
```

- `data` is an array — possibly empty (`[]`) when no calls exist.
- Each item includes `callId`, `name`, and all optional fields (`tamSeq`, `sdSeq`, `preferredDisplay`, the four metadata fields below, and `familyId`). Optional fields are `null` when not set.

### Metadata fields (#66)

These describe a call's gender-dependency, wave rule, and scale. They are **not** in the Taminations source — they come from Callerlab definitions and are `null` until a data-entry pass fills them.

| Field             | Type    | Description |
|-------------------|---------|-------------|
| `isPositional`    | boolean | Executable from each dancer's position + facing alone, no gender needed (e.g. Swing Thru, Cast Off 3/4). |
| `isGenderCall`    | boolean | The definition explicitly references boys / girls (e.g. Boys Run, Star Thru). Not mutually exclusive with `isPositional`. |
| `waveRuleApplies` | boolean | The wave rule adjusts who-does-what when starting from a wave rather than facing couples (e.g. Swing Thru). |
| `dancerCount`     | integer | The **atomic definition unit**: the fewest dancers the call is defined for (Star Thru = 2, Swing Thru = 4, Promenade = 8). When executed from a larger formation, multiple atomic groups do it at once. This is *not* the total dancers in the formation. |

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
    "isPositional": null,
    "isGenderCall": null,
    "waveRuleApplies": null,
    "dancerCount": null,
    "familyId": 2
  },
  "message": "Unique call by id"
}
```

#### Not found

```json
{
  "data": null,
  "message": "Not Found: Call id:999 not found!",
  "status": 404
}
```

- HTTP status is **404**. Single-resource endpoints return 404 when the record does not exist.

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
| isPositional     | boolean | no       | Executable by position alone, no gender (see [Metadata fields](#metadata-fields-66)) |
| isGenderCall     | boolean | no       | Definition references boys / girls               |
| waveRuleApplies  | boolean | no       | Wave rule adjusts execution from a wave          |
| dancerCount      | integer | no       | Atomic definition unit (fewest dancers the call is defined for) |
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
    "isPositional": null,
    "isGenderCall": null,
    "waveRuleApplies": null,
    "dancerCount": null,
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
