# Sequences API

A **sequence** is an ordered list of steps (calls, activators, fillers) that a caller uses during a tip. Each sequence tracks its starting formation, validity, and optional metadata like rating and notes.

A sequence is **valid** (`isValid: true`) when every step of `type: "call"` has both a `callId` and a `startId` (formation) resolved. A sequence with no call steps, or any unresolved call step, is invalid.

---

## GET /api/sequence/list

Returns all sequences (summary, no steps).

### Request

No parameters.

### Expected Results

#### Success

HTTP **200**

```json
{
  "data": [
    {
      "seqId": 1,
      "name": "Heads Square Thru opener",
      "activator": "heads",
      "rating": null,
      "notes": null,
      "isValid": true,
      "isVerified": false,
      "startFormationId": 1,
      "sourceText": null,
      "teachOrderId": null,
      "variantGroupId": null
    }
  ],
  "message": "List of all sequences"
}
```

#### Empty

HTTP **200**, `data: []`

---

## GET /api/sequence/:seqId

Returns a single sequence with all its steps, ordered by `order`.

### Path Parameters

| Parameter | Type    | Required | Description       |
|-----------|---------|----------|-------------------|
| seqId     | integer | **yes**  | The sequence's ID |

### Expected Results

#### Success

HTTP **200**

```json
{
  "data": {
    "seqId": 1,
    "name": "Heads Square Thru opener",
    "activator": "heads",
    "rating": null,
    "notes": null,
    "isValid": true,
    "isVerified": false,
    "startFormationId": 1,
    "sourceText": null,
    "teachOrderId": null,
    "variantGroupId": null,
    "calls": [
      {
        "id": 1,
        "seqId": 1,
        "order": 1,
        "type": "call",
        "callId": 5,
        "startId": 1,
        "designator": "heads",
        "count": null,
        "text": null,
        "helperText": null
      },
      {
        "id": 2,
        "seqId": 1,
        "order": 2,
        "type": "call",
        "callId": 12,
        "startId": 3,
        "designator": null,
        "count": null,
        "text": null,
        "helperText": null
      }
    ]
  },
  "message": "Sequence with steps"
}
```

#### Not found

HTTP **404**, `data: null`

#### Invalid ID

HTTP **406**

### Step Object Fields

| Field       | Type    | Description                                                        |
|-------------|---------|--------------------------------------------------------------------|
| id          | integer | Auto-incremented step record ID                                    |
| seqId       | integer | Parent sequence ID                                                 |
| order       | integer | 1-based position within the sequence                              |
| type        | string  | `call` \| `activator` \| `filler` \| `warning` \| `tip` \| `recovery` |
| callId      | integer | Resolved call (only meaningful when `type: "call"`)               |
| startId     | integer | Starting formation for this call execution                        |
| designator  | string  | Sub-group modifier, e.g. `heads`, `sides`, `centers`              |
| count       | integer | Repetition count extracted from raw text (e.g. "2" in "Square Thru 2") |
| text        | string  | Raw text for non-call steps or unresolved calls                    |
| helperText  | string  | Caller coaching note for this step                                 |

---

## POST /api/sequence/parse

Parses raw pasted sequence text into structured steps. Does **not** persist anything — returns a preview for the user to review and confirm before saving.

### Request Body

| Field    | Type   | Required | Description                   |
|----------|--------|----------|-------------------------------|
| text     | string | **yes**  | Raw multi-line sequence text  |

### Line Classification Rules

| Input Pattern        | Classified As |
|----------------------|---------------|
| `// comment` or `# comment` | `warning`   |
| `[tip] …`            | `tip`         |
| `[filler] …`         | `filler`      |
| `[recovery] …`       | `recovery`    |
| `[warning] …`        | `warning`     |
| `heads` or `sides` alone | `activator` |
| Anything else        | `call`        |

For `call` lines, the parser:
1. Strips a leading designator (`heads`, `sides`, `boys`, `girls`, `centers`, `ends`, `leads`, `trailers`, `beaus`, `belles`)
2. Strips a trailing numeric count
3. Looks up the remaining text against `call.name` (exact, case-insensitive), then against `call_synonym.alias`
4. Returns `callMatches` and, if exactly one match, `formationMatches`

### Expected Results

#### Success

HTTP **200**

```json
{
  "data": [
    {
      "rawLine": "heads square thru 4",
      "type": "call",
      "designator": "heads",
      "count": 4,
      "callMatches": [
        { "callId": 5, "name": "Square Thru", "confidence": 1 }
      ],
      "formationMatches": [
        { "startId": 1, "name": "Squared Set" }
      ],
      "resolution": "resolved"
    },
    {
      "rawLine": "do sa do",
      "type": "call",
      "designator": null,
      "count": null,
      "callMatches": [],
      "formationMatches": [],
      "resolution": "unresolved"
    },
    {
      "rawLine": "// note for caller",
      "type": "warning",
      "text": "note for caller",
      "callMatches": [],
      "formationMatches": [],
      "resolution": "resolved"
    }
  ],
  "message": "Parsed sequence"
}
```

#### Resolution Values

| Value        | Meaning                                                              |
|--------------|----------------------------------------------------------------------|
| `resolved`   | Exactly one call matched; ready to save                             |
| `unresolved` | No call matched; user must manually select or create a synonym      |
| `ambiguous`  | Multiple calls matched — indicates a data integrity problem: two calls share a name or a call name collides with another call's synonym. Resolve by renaming one of the calls to be more specific before retrying. |

#### Missing text

HTTP **406**

```json
{
  "data": {},
  "message": "Validation Error: text is required.",
  "status": 406
}
```

### Business Rules

- Non-call types (`activator`, `filler`, `warning`, `tip`, `recovery`) always resolve immediately.
- A line marked `unresolved` blocks `isValid` on the saved sequence if saved as-is.
- After a user resolves an unresolved line, they can save a synonym via `POST /api/call/:callId/synonym` so future parses auto-resolve.

---

## POST /api/sequence

Creates a new sequence with all its steps in a single transaction.

### Request Body

| Field           | Type    | Required | Description                                                     |
|-----------------|---------|----------|-----------------------------------------------------------------|
| name            | string  | **yes**  | Sequence name                                                   |
| startFormationId| integer | **yes**  | Formation dancers are in at the start of the sequence (usually Squared Set) |
| steps           | array   | **yes**  | Ordered array of step objects (see below)                       |
| activator       | string  | no       | `heads` \| `sides` — which couples activate first              |
| rating          | string  | no       | Caller's quality rating                                         |
| notes           | string  | no       | Free-text notes                                                 |
| isVerified      | boolean | no       | Whether a caller has confirmed this sequence dances correctly   |
| sourceText      | string  | no       | Original pasted text before parsing                             |
| teachOrderId    | integer | no       | Links this sequence to a teach-order curriculum entry           |

#### Step Object

| Field      | Type    | Required | Description                                              |
|------------|---------|----------|----------------------------------------------------------|
| order      | integer | **yes**  | 1-based position                                         |
| type       | string  | **yes**  | `call` \| `activator` \| `filler` \| `warning` \| `tip` \| `recovery` |
| callId     | integer | no       | Required for `isValid` when `type: "call"`              |
| startId    | integer | no       | Required for `isValid` when `type: "call"`              |
| designator | string  | no       | Sub-group modifier                                       |
| count      | integer | no       | Repetition count                                         |
| text       | string  | no       | Raw text (non-call steps or unresolved)                  |
| helperText | string  | no       | Caller coaching note                                     |

### Expected Results

#### Success

HTTP **201**

```json
{
  "data": {
    "seqId": 7,
    "name": "Heads Square Thru opener",
    "activator": "heads",
    "rating": null,
    "notes": null,
    "isValid": true,
    "isVerified": false,
    "startFormationId": 1,
    "sourceText": null,
    "teachOrderId": null,
    "variantGroupId": null,
    "calls": [
      {
        "id": 11,
        "seqId": 7,
        "order": 1,
        "type": "call",
        "callId": 5,
        "startId": 1,
        "designator": "heads",
        "count": null,
        "text": null,
        "helperText": null
      }
    ]
  },
  "message": "Sequence created"
}
```

#### Invalid — missing required fields

HTTP **406**

```json
{
  "data": {},
  "message": "Validation Error: name, startFormationId, and steps are required.",
  "status": 406
}
```

#### Invalid — startFormationId does not exist

HTTP **409**

```json
{
  "data": {},
  "message": "Conflict Error: startFormationId does not exist.",
  "status": 409
}
```

### Business Rules

- `isValid` is computed server-side, never passed by the client.
- A sequence with no `type: "call"` steps is always `isValid: false`.
- A sequence is `isValid: true` only when **every** call step has a non-null `callId` and `startId`.
- Steps with `type` other than `call` do not affect validity.
- `startFormationId` defaults to the Squared Set formation in the sequence editor UI, but must be explicitly provided in the API.
- A `call_formation` record must exist for a given `(callId, startId)` pair for the step to be fully resolvable. If the mapping is missing, the step should be flagged unresolved before save.
