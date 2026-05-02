# Teach Orders API

A **teach order** is a named, program-specific sequence in which a caller introduces calls to their dancers. The atomic unit is a `(call, FASR)` pair — a specific call executed from a specific starting formation. The same call appears multiple times in a teach order when it is valid from multiple starting formations, each introduced at a potentially different point in the curriculum.

See [Programs API](programs.md) for managing programs and their `(call, FASR)` vocabularies.

---

## Schema

A teach order has two layers:

1. **`teach_order_entry` (display row)** — what the caller sees in the curriculum list. One row per Callerlab numbered/lettered slot. Family rows have `entryType='family'` and no FASR children. Call rows have `entryType='call'` and one or more FASR children.
2. **`teach_order_entry_fasr` (per-FASR row)** — one row per `(call, FASR)` the caller actually teaches. Ordered by `(entryOrder, fasrOrder)` — that ordering drives `safeAfterPosition` for sequences.

### Display row fields

| Field | Type | Description |
|---|---|---|
| teachOrderId | integer | Parent teach order |
| entryOrder | integer | Monotonic within the teach order; the canonical sort key |
| displayOrder | string | Human label for UI: `'1'`, `'1a'`, `'1b'`, `'2'`, `'3a'` … |
| entryType | string | `family` \| `call` |
| label | string | Family header text; or display override on call rows |
| familyId | integer | Set when `entryType = family` |
| callId | integer | Set when `entryType = call`. Denormalized for query convenience — all FASR children share this callId. |
| week | integer | Class night this entry is introduced; null until scheduled. Applies to all FASRs of this entry. |

### FASR row fields

| Field | Type | Description |
|---|---|---|
| teachOrderId | integer | |
| entryOrder | integer | Composite FK to `teach_order_entry` |
| fasrOrder | integer | 1, 2, 3 … within an entry |
| callId | integer | Must equal the parent entry's callId |
| startId | integer | The starting formation (FASR) being introduced |

> **Why split:** the display row mirrors the curriculum text the caller writes — Callerlab text only specifies position/subPosition, never FASR. The FASR row is what the parser/editor places into sequences. Sequence safety math runs on the FASR table; UI rendering reads the display table.

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

Returns a single teach order with all entries ordered by `entryOrder`, each with its FASR children ordered by `fasrOrder`.

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
        "teachOrderId": 1,
        "entryOrder": 1,
        "displayOrder": "1",
        "entryType": "family",
        "label": "Circle Family",
        "familyId": 12,
        "callId": null,
        "week": null,
        "fasrs": []
      },
      {
        "teachOrderId": 1,
        "entryOrder": 2,
        "displayOrder": "1a",
        "entryType": "call",
        "label": null,
        "familyId": null,
        "callId": 5,
        "week": 1,
        "fasrs": [
          { "teachOrderId": 1, "entryOrder": 2, "fasrOrder": 1, "callId": 5, "startId": 1 },
          { "teachOrderId": 1, "entryOrder": 2, "fasrOrder": 2, "callId": 5, "startId": 7 }
        ]
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
| `10. Right and Left Thru` | call entry, displayOrder=`'10'` |
| `a. Circle Left/Right (1/4, 1/2, 3/4, Full)` | call entry (two calls), displayOrder=`'1a'` (combines current position with sub-letter); variants in `()` stripped |
| `1. Circle Family` | family header, displayOrder=`'1'` |
| Any line ending in "Family" | family header |

Parser behavior:
1. Strip leading `N.` → numeric position; record as current position
2. Strip leading `a.` → sub-letter; combine with current position into `displayOrder`
3. Strip parenthetical variant notations
4. Lines ending in "Family" → `entryType = 'family'`
5. Handle `Left/Right` pattern → multiple `callMatches` entries
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
      "displayOrder": "1",
      "entryType": "family",
      "label": "Circle Family",
      "callMatches": [],
      "formationMatches": [],
      "resolution": "resolved"
    },
    {
      "rawLine": "a. Circle Left/Right (1/4, 1/2, 3/4, Full)",
      "displayOrder": "1a",
      "entryType": "call",
      "label": "circle left/right",
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
      "displayOrder": "2",
      "entryType": "call",
      "label": "dosado",
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

> **Note:** parser output is a per-line preview. For `Left/Right` lines the preview holds multiple `callMatches`; the persistence step (POST /api/teach-order) is where the user decides whether to expand them into separate display entries or one entry.

---

## POST /api/teach-order

Creates a new teach order with all entries (and their FASR children) in a single transaction.

### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| name | string | **yes** | Teach order name |
| programId | integer | **yes** | Program this teach order belongs to |
| entries | array | **yes** | Ordered array of entry objects (see below) |

#### Entry Object

| Field | Type | Required | Description |
|---|---|---|---|
| entryOrder | integer | **yes** | Monotonic within this teach order |
| displayOrder | string | **yes** | Human label, e.g. `'1'`, `'1a'`. Unique within this teach order. |
| entryType | string | **yes** | `family` \| `call` |
| label | string | no | Family header text or display override |
| familyId | integer | no | Set when `entryType = family` |
| callId | integer | required when `entryType = call` | The call being introduced; all `fasrs` must share this callId |
| week | integer | no | Class night; null until scheduled |
| fasrs | array | required when `entryType = call` | One or more FASR entries (see below); empty/omitted for family rows |

#### FASR Object

| Field | Type | Required | Description |
|---|---|---|---|
| fasrOrder | integer | **yes** | Position within the parent entry |
| callId | integer | **yes** | Must equal the parent entry's callId |
| startId | integer | **yes** | Starting formation; `(callId, startId)` must exist in `program_call_formation` for the program |

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
        "teachOrderId": 1,
        "entryOrder": 1,
        "displayOrder": "1",
        "entryType": "family",
        "label": "Circle Family",
        "familyId": 12,
        "callId": null,
        "week": null,
        "fasrs": []
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

#### call entry missing callId or fasrs

HTTP **406**

```json
{
  "data": {},
  "message": "Validation Error: call entries require callId.",
  "status": 406
}
```

#### fasr callId/entry callId mismatch

HTTP **406**

```json
{
  "data": {},
  "message": "Validation Error: fasr callId 5 does not match entry callId 8.",
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

#### Duplicate entryOrder or displayOrder

HTTP **409**

```json
{
  "data": {},
  "message": "Conflict Error: Duplicate entryOrder or displayOrder within this teach order.",
  "status": 409
}
```

### Business Rules

- All FASR `(callId, startId)` pairs must exist in `program_call_formation` for the given program.
- `entryOrder` must be unique within the teach order.
- `displayOrder` must be unique within the teach order.
- Family header entries (`entryType = family`) have no FASR children; if `fasrs` is provided it must be empty.
- Each FASR's `callId` must equal its parent entry's `callId`.
- `week` is optional at save time; a teach order can be saved before the caller has assigned class nights.

---

## PUT /api/teach-order/:id

Replaces all entries (and their FASR children) for an existing teach order in a single transaction.

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| id | integer | **yes** | The teach order's ID |

### Request Body

Same shape as `POST /api/teach-order` entries array. Replaces all existing entries (cascades to delete existing FASR rows).

### Expected Results

#### Success

HTTP **200** — same envelope as GET, with updated entries.

#### Not found

HTTP **404**

### Business Rules

- All existing entries are deleted and replaced in a single transaction. FASR rows cascade-delete with their parent entry.
- Same validation rules as POST apply to the new entries.
