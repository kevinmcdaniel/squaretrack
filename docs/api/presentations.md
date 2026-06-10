# Presentations API

A **presentation** is the speakable, caller-facing layer of the two-layer sequence model (issue #70). It is an ordered list of **items**: references to [choreo modules](modules.md) (the choreography) interleaved with pure **text** items (activator cues, fillers, tips, closers). Each module reference carries optional per-step cueing decoration — what the caller says before/after each call, alternate spoken names, and contextual warnings.

The same module can be wrapped by many presentations, so choreography is authored once and re-cued per caller, source, or context.

See [Modules API](modules.md) for the choreographic layer.

---

## Schema

### Presentation fields

| Field | Type | Description |
|---|---|---|
| id | integer | Auto-incremented presentation ID |
| name | string | Presentation name |
| source | string | `taminations` \| `callerlab` \| `personal` \| caller name |
| activator | string | `heads` \| `sides` |
| rating | string | `excellent` \| `good` \| `acceptable` \| `poor` |
| notes | string | Free-text caller notes |
| sourceText | string | Raw pasted input, preserved verbatim |

List responses are **shallow** (no `items`). The single-resource response includes the full nested `items[]`.

### Item fields (`presentation_item`)

| Field | Type | Description |
|---|---|---|
| id | integer | Auto-incremented item ID |
| order | integer | Position within the presentation (unique per presentation) |
| type | string | `module_ref` \| `text` |
| moduleId | integer | The referenced module (when `type: module_ref`) |
| text | string | Spoken text (when `type: text`) |
| textType | string | `activator` \| `filler` \| `tip` \| `warning` \| `closer` (when `type: text`) |

In the single-resource response, a `module_ref` item also includes a `module` summary (`{ id, name, startFormId, endFormId, isValid }`) and its `steps[]` cueing rows; a `text` item has `module: null`.

### Item-step fields (`presentation_item_step`)

Per-step cueing decoration for a module reference. Additive — it never replaces the choreographic data.

| Field | Type | Description |
|---|---|---|
| stepOrder | integer | Matches the referenced module's `choreo_module_step.order` |
| textBefore | string | Spoken before the call name, e.g. "And now", "Easy" |
| textAfter | string | Spoken after the call, e.g. "nice", "keep moving" |
| callNameAlternate | string | Caller's preferred spoken name for this call in this context |
| warning | string | **Contextual** warning for this step in this presentation (distinct from the module step's inherent warning) |
| helperText | string | Caller's private note; never shown to dancers |

In the single-resource response, each item step is **mirrored** with its choreographic `moduleStep` (`{ order, callId, startId, designator, count, warning, call: { name } }`) for display convenience.

### Sidecar field — `flowWarnings`

`POST` and `PUT` return `flowWarnings: { afterItemOrder: number }[]` **beside** `data`: boundaries where adjacent module references don't chain (the earlier module's `endFormId` ≠ the next module's `startFormId`). The presentation saves regardless — an incompatible boundary is valid data the caller may choose to fix, not an error.

---

## GET /api/presentation

Returns all presentations (shallow — no items).

### Query Parameters

| Parameter | Type | Description |
|---|---|---|
| search | string | Case-insensitive substring match on `name` |
| source | string | Filter by source tag |
| activator | string | `heads` \| `sides` |
| moduleId | integer | Presentations that include a specific module |
| safeAfterMax | integer | Presentations where every referenced module's `safeAfterEntryOrder` ≤ this value (session-conductor use) |

All filters are optional and combine.

### Expected Results

#### Success

HTTP **200**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Heads lead right tip",
      "source": "personal",
      "activator": "heads",
      "rating": null,
      "notes": null,
      "sourceText": "heads square thru four, and right and left thru"
    }
  ],
  "message": "List of presentations"
}
```

#### Empty

HTTP **200**, `data: []`

---

## GET /api/presentation/:id

Returns a single presentation with full nested items, item steps, and the mirrored `moduleStep` for each module-reference step.

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| id | integer | **yes** | The presentation's ID |

### Expected Results

#### Success

HTTP **200**

```json
{
  "data": {
    "id": 1,
    "name": "Heads lead right tip",
    "source": "personal",
    "activator": "heads",
    "rating": null,
    "notes": null,
    "sourceText": "…",
    "items": [
      {
        "id": 10,
        "order": 0,
        "type": "text",
        "moduleId": null,
        "text": "Heads",
        "textType": "activator",
        "module": null,
        "steps": []
      },
      {
        "id": 11,
        "order": 1,
        "type": "module_ref",
        "moduleId": 4,
        "text": null,
        "textType": null,
        "module": { "id": 4, "name": "Square Thru module", "startFormId": 1, "endFormId": 3, "isValid": true },
        "steps": [
          {
            "itemId": 11,
            "stepOrder": 0,
            "textBefore": "And now",
            "textAfter": null,
            "callNameAlternate": null,
            "warning": null,
            "helperText": null,
            "moduleStep": {
              "order": 0,
              "callId": 5,
              "startId": 1,
              "designator": "heads",
              "count": 4,
              "warning": null,
              "call": { "name": "Square Thru" }
            }
          }
        ]
      }
    ]
  },
  "message": "Presentation by id"
}
```

#### Not found

HTTP **404**, `data: null`

#### Invalid ID

HTTP **406**

---

## POST /api/presentation

Creates a presentation with all items and item steps in a single transaction.

### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| name | string | **yes** | Presentation name |
| source | string | no | Source tag |
| activator | string | no | `heads` \| `sides` |
| rating | string | no | Quality rating |
| notes | string | no | Free-text notes |
| sourceText | string | no | Raw pasted input |
| items | array | no | Ordered item objects (see below). **An empty `[]` is allowed** — used to persist a raw paste as a draft before parsing |

#### Item Object

| Field | Type | Required | Description |
|---|---|---|---|
| order | integer | **yes** | Position; unique within the presentation |
| type | string | **yes** | `module_ref` \| `text` |
| moduleId | integer | for `module_ref` | The referenced module (must exist) |
| steps | array | no | Item-step cueing rows (for `module_ref`); each `stepOrder` must match a step of the referenced module |
| text | string | for `text` | Spoken text |
| textType | string | no | `activator` \| `filler` \| `tip` \| `warning` \| `closer` |

### Expected Results

#### Success

HTTP **201**

```json
{
  "data": { "id": 7, "name": "Heads lead right tip", "items": [ /* … */ ] },
  "flowWarnings": [],
  "message": "Presentation created"
}
```

#### Flow warning (still saved)

When adjacent module references don't chain, the presentation saves and the boundary is reported:

```json
{
  "data": { "id": 8, "items": [ /* … */ ] },
  "flowWarnings": [{ "afterItemOrder": 0 }],
  "message": "Presentation created"
}
```

#### Draft (empty items)

`POST` with `{ "name": "Untitled paste", "sourceText": "…", "items": [] }` → HTTP **201** with an `id`. The import flow uses this to capture raw text before parsing, then fills items later via `PUT`.

#### Invalid

HTTP **406** — missing `name`; an unknown `moduleId`; a `stepOrder` not present on the referenced module; a duplicate item `order`; or a duplicate `stepOrder` within one item.

#### Conflict

HTTP **409** — a referenced module FK is missing, or a concurrent write collides on item order.

---

## PUT /api/presentation/:id

Replaces all items and item steps wholesale in a single transaction (the old items cascade away first). Recomputes `flowWarnings`.

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| id | integer | **yes** | The presentation's ID |

### Request Body

Same shape as `POST`.

### Expected Results

#### Success

HTTP **200** — updated presentation + `flowWarnings` (`message: "Presentation updated"`).

#### Not found

HTTP **404**

#### Invalid / Conflict

HTTP **406** / **409** — same validation as `POST`.

---

## PATCH /api/presentation/:id

Updates presentation **metadata only** (`name`, `source`, `activator`, `rating`, `notes`) without touching items. Useful for the session conductor logging a rating after calling a tip.

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| id | integer | **yes** | The presentation's ID |

### Request Body

Any subset of `name`, `source`, `activator`, `rating`, `notes`.

### Expected Results

#### Success

HTTP **200**, shallow `data` (`message: "Presentation metadata updated"`).

#### Not found

HTTP **404**

---

## DELETE /api/presentation/:id

Deletes a presentation and cascades its items and item steps. The referenced modules are left intact.

### Expected Results

#### Success

HTTP **200**

```json
{ "data": { "id": 7 }, "message": "Presentation deleted" }
```

#### Not found

HTTP **404**

---

## POST /api/presentation/:id/items

Appends a single item (module reference or text) to an existing presentation without a full replace. `order` is assigned as the current max + 1. Used by the session conductor to assemble a tip one module at a time.

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| id | integer | **yes** | The presentation's ID |

### Request Body

A single item object (same shape as a `POST` item, **without** `order` — it is assigned server-side).

### Expected Results

#### Success

HTTP **201**

```json
{
  "data": { "id": 31, "order": 3, "type": "text", "text": "thank you, partners", "textType": "closer", "steps": [] },
  "message": "Presentation item appended"
}
```

#### Not found

HTTP **404** — the presentation does not exist.

#### Invalid / Conflict

HTTP **406** unknown `moduleId` or bad `stepOrder`; HTTP **409** FK missing or order collision.

---

## DELETE /api/presentation/:id/items/:itemId

Removes one item (and its item steps), then reorders the remaining items to close the gap.

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| id | integer | **yes** | The presentation's ID |
| itemId | integer | **yes** | The item to remove |

### Expected Results

#### Success

HTTP **200**

```json
{ "data": { "id": 11 }, "message": "Presentation item deleted" }
```

#### Not found

HTTP **404** — the item is not on this presentation.

---

### Business Rules

- An empty-items presentation is a valid **draft** — the import flow persists raw `sourceText` first, then populates items after parsing the choreography.
- `flowWarnings` are advisory; a presentation with incompatible module boundaries still saves.
- Deleting a presentation never deletes the modules it references; deleting a module that a presentation references is blocked (see [Modules API](modules.md#delete-apimoduleid)).
- Item-step cueing is purely additive: removing it never changes the underlying choreography.
