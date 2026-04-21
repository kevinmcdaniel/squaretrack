# Teach Orders API

A **teach order** is a named, program-specific sequence in which a caller introduces calls to their dancers. The atomic unit is a `(call, FASR)` pair — a specific call executed from a specific starting formation. The same call appears multiple times in a teach order when it is valid from multiple starting formations, each introduced at a potentially different point in the curriculum.

A **program** (e.g. Mainstream, Plus) defines which `call_formation` pairs are part of its vocabulary and how difficult each is at that level. Difficulty is program-relative: a FASR that is `challenging` in Mainstream is `easy` in Plus.

---

## Teach Order Entry Fields

| Field | Type | Description |
|---|---|---|
| id | integer | Auto-incremented row ID |
| teachOrderId | integer | Parent teach order |
| sortOrder | integer | Actual teaching sequence; unique per teach order; drives `safeAfterPosition` on sequences |
| position | integer | Callerlab curriculum number (e.g. `10` for Right and Left Thru) |
| subPosition | string | Callerlab sub-letter (`a`–`e`); null for top-level entries |
| entryType | string | `family` \| `call` |
| label | string | Family header text; or caller display override on call rows |
| callId | integer | Null when `entryType = family` |
| startId | integer | The starting formation (FASR) being introduced; null when `entryType = family` |
| week | integer | Class night this entry is introduced; null until scheduled |

> **sortOrder vs position:** `position` is the Callerlab reference number — it never changes. `sortOrder` is the actual teaching sequence. Some sub-entries at the same Callerlab position are taught weeks apart (e.g. Ocean Wave Family: Alamo Style at week 8, Step to a Wave at week 14 — both position 31, different `sortOrder` and `week`).

---

## GET /api/program/list

Returns all programs.

### Expected Results

#### Success

HTTP **200**

```json
{
  "data": [
    { "programId": 1, "name": "Mainstream", "order": 1 },
    { "programId": 2, "name": "Plus", "order": 2 }
  ],
  "message": "List of all programs"
}
```

#### Empty

HTTP **200**, `data: null`

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

#### Not found

HTTP **200**, `data: null`

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

---

## GET /api/teach-order/list

Returns all teach orders (summary only, no entries).

### Expected Results

#### Success

HTTP **200**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Callerlab MS26",
      "programId": 1,
      "program": { "programId": 1, "name": "Mainstream" }
    }
  ],
  "message": "List of all teach orders"
}
```

#### Empty

HTTP **200**, `data: null`

---

## GET /api/teach-order/:id

Returns a single teach order with all entries ordered by `sortOrder`.

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| id | integer | **yes** | The teach order's ID |

### Expected Results

#### Success

HTTP **200**

```json
{
  "data": {
    "id": 1,
    "name": "Callerlab MS26",
    "programId": 1,
    "entries": [
      {
        "id": 1,
        "sortOrder": 1,
        "position": 1,
        "subPosition": null,
        "entryType": "family",
        "label": "Circle Family",
        "callId": null,
        "startId": null,
        "week": null
      },
      {
        "id": 2,
        "sortOrder": 2,
        "position": 1,
        "subPosition": "a",
        "entryType": "call",
        "label": null,
        "callId": 5,
        "startId": 1,
        "week": 1
      }
    ]
  },
  "message": "Teach order with entries"
}
```

#### Not found

HTTP **200**, `data: null`

#### Invalid ID

HTTP **406**

---

## POST /api/teach-order/parse

Parses raw pasted curriculum text into structured entries. Does **not** persist anything — returns a preview for review before saving.

### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| text | string | **yes** | Raw multi-line curriculum text |
| programId | integer | **yes** | Program context for FASR and difficulty lookup |

### Line Classification Rules

| Input Pattern | Classified As |
|---|---|
| `10. Right and Left Thru` | call entry, position=10, subPosition=null |
| `a. Circle Left/Right (1/4, 1/2, 3/4, Full)` | call entry (two calls), subPosition='a'; variants in `()` stripped |
| `1. Circle Family` | family header, position=1 |
| Any line ending in "Family" | family header |

Parser behavior:
1. Strip leading `N.` → `position`
2. Strip leading `a.` → `subPosition`
3. Strip parenthetical variant notations — call parameters, not separate entries
4. Lines ending in "Family" → `entryType = 'family'`
5. Handle `Left/Right` pattern → two separate `callMatches` entries
6. Match call name against `call.name` and `call_synonym.alias`
7. For resolved calls, look up `program_call_formation` for `programId` → `formationMatches` with difficulty

### Expected Results

#### Success

HTTP **200**

```json
{
  "data": [
    {
      "rawLine": "1. Circle Family",
      "position": 1,
      "subPosition": null,
      "entryType": "family",
      "label": "Circle Family",
      "callMatches": [],
      "formationMatches": [],
      "resolution": "resolved"
    },
    {
      "rawLine": "a. Circle Left/Right (1/4, 1/2, 3/4, Full)",
      "position": 1,
      "subPosition": "a",
      "entryType": "call",
      "label": null,
      "callMatches": [
        { "callId": 5, "name": "Circle Left" },
        { "callId": 6, "name": "Circle Right" }
      ],
      "formationMatches": [
        { "startId": 1, "name": "Squared Set", "difficulty": "easy" }
      ],
      "resolution": "resolved"
    },
    {
      "rawLine": "2. Dosado",
      "position": 2,
      "subPosition": null,
      "entryType": "call",
      "label": null,
      "callMatches": [],
      "formationMatches": [],
      "resolution": "unresolved"
    }
  ],
  "message": "Parsed teach order"
}
```

#### Missing required fields

HTTP **406**

```json
{
  "data": {},
  "message": "Validation Error: text and programId are required.",
  "status": 406
}
```

### Resolution Values

| Value | Meaning |
|---|---|
| `resolved` | All calls matched and FASRs identified |
| `unresolved` | Call not found; user must select manually or add a synonym |
| `ambiguous` | Multiple calls matched; indicates a data integrity issue — call names need more specificity |

---

## POST /api/teach-order

Creates a new teach order with all entries in a single transaction.

### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| name | string | **yes** | Teach order name |
| programId | integer | **yes** | Program this teach order belongs to |
| entries | array | **yes** | Ordered array of entry objects (see below) |

#### Entry Object

| Field | Type | Required | Description |
|---|---|---|---|
| sortOrder | integer | **yes** | Teaching sequence position; unique within this teach order |
| position | integer | **yes** | Callerlab curriculum number |
| subPosition | string | no | Callerlab sub-letter; null for top-level entries |
| entryType | string | **yes** | `family` \| `call` |
| label | string | no | Family header text or display override |
| callId | integer | no | Required when `entryType = call` |
| startId | integer | no | Required when `entryType = call` |
| week | integer | no | Class night; null until scheduled |

### Expected Results

#### Success

HTTP **201**

```json
{
  "data": {
    "id": 1,
    "name": "Callerlab MS26",
    "programId": 1,
    "entries": [
      {
        "id": 1,
        "sortOrder": 1,
        "position": 1,
        "subPosition": null,
        "entryType": "family",
        "label": "Circle Family",
        "callId": null,
        "startId": null,
        "week": null
      }
    ]
  },
  "message": "Teach order created"
}
```

#### Missing required fields

HTTP **406**

```json
{
  "data": {},
  "message": "Validation Error: name, programId, and entries are required.",
  "status": 406
}
```

#### Invalid programId

HTTP **409**

```json
{
  "data": {},
  "message": "Conflict Error: programId does not exist.",
  "status": 409
}
```

#### call entry missing callId or startId

HTTP **406**

```json
{
  "data": {},
  "message": "Validation Error: call entries require callId and startId.",
  "status": 406
}
```

#### call_formation not in program

HTTP **409**

```json
{
  "data": {},
  "message": "Conflict Error: call formation (callId, startId) is not valid for this program.",
  "status": 409
}
```

### Business Rules

- All `(callId, startId)` pairs on call entries must exist in `program_call_formation` for the given program.
- `sortOrder` must be unique within the teach order. Duplicate sortOrder values return 409.
- Each `(callId, startId)` pair may appear at most once per teach order.
- Family header entries (`entryType = family`) must have null `callId` and `startId`.
- `week` is optional at save time; a teach order can be saved before the caller has assigned class nights.

---

## PUT /api/teach-order/:id

Replaces all entries for an existing teach order in a single transaction.

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| id | integer | **yes** | The teach order's ID |

### Request Body

Same shape as `POST /api/teach-order` entries array. Replaces all existing entries.

### Expected Results

#### Success

HTTP **200** — same envelope as GET, with updated entries.

#### Not found

HTTP **404**

### Business Rules

- All existing entries are deleted and replaced in a single transaction.
- Same validation rules as POST apply to the new entries.
