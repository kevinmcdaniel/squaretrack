# Modules API

A **choreo module** is the reusable, presentation-free choreographic unit of the two-layer sequence model (issue #70). It is an ordered list of calls — what is danced, from what formations, in what order — with **no spoken text**. The cueing layer lives separately on [presentations](presentations.md), which reference modules.

A module is **valid** (`isValid: true`) when every step chains: step 0 starts from the module's `startFormId`, and each subsequent step starts from the formation the previous step left dancers in. A broken chain still saves (`isValid: false`) and the offending steps are reported in `chainBreaks` — it is not an error.

See [Presentations API](presentations.md) for the cueing layer that wraps modules.

---

## Schema

### Module fields

| Field | Type | Description |
|---|---|---|
| id | integer | Auto-incremented module ID |
| name | string | Module name (not unique — choreo-equivalent variants may share a name) |
| startFormId | integer | Formation the module begins from |
| endFormId | integer | Formation the module leaves dancers in. **Derived** from the last step; never trusted from the request body |
| inFlowRotation | string | Flow entering the module (advisory) |
| inFlowDirection | string | |
| outFlowRotation | string | Flow exiting the module (advisory) |
| outFlowDirection | string | |
| isValid | boolean | True only when every step chains. Computed server-side |
| isVerified | boolean | Whether a caller has confirmed this module dances correctly |
| variantGroupId | string | Shared UUID across choreo-equivalent modules (see [variant detection](#variant-detection)); null when the module is unique |
| safeAfterEntryOrder | integer | Latest teach-order entry position any step occupies; null when no teach order is set or no step appears in it |
| safeAfterFasrOrder | integer | Latest teach-order FASR position any step occupies |
| teachOrderId | integer | Optional teach order this module's safety positions are computed against |

List and single-resource responses also include `startForm`/`endForm` (`{ name }`) and the nested `steps[]` array.

### Step fields (`choreo_module_step`)

| Field | Type | Description |
|---|---|---|
| moduleId | integer | Parent module |
| order | integer | Position within the module (unique per module) |
| callId | integer | The call |
| startId | integer | The starting formation (FASR) this call is executed from |
| designator | string | Sub-group modifier, e.g. `heads`, `sides`, `centers`, `beaus` |
| count | integer | Repetition count, e.g. `4` for "square thru 4" |
| warning | string | **Inherent** choreographic warning — true regardless of presentation. Distinct from a presentation's contextual warning |

Each step also includes `callFormation` (with nested `call { name }`, `startForm { name }`, `endForm { name }`) for display.

### Sidecar field — `chainBreaks`

`POST` and `PUT` return `chainBreaks: number[]` **beside** `data` (not inside it): the `order` of each step whose start formation doesn't follow the prior step's end. An empty array means a clean chain.

---

## GET /api/module

Returns all choreo modules with nested steps and formation names.

### Query Parameters

| Parameter | Type | Description |
|---|---|---|
| startFormId | integer | Only modules beginning from this formation |
| teachOrderId | integer | Only modules tied to this teach order |
| safeAfterMax | integer | Only modules whose `safeAfterEntryOrder` ≤ this value (session-conductor use) |
| search | string | Case-insensitive substring match on `name` |
| variantGroupId | string | All members of a variant group |

All filters are optional and combine.

### Expected Results

#### Success

HTTP **200**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Heads Square Thru module",
      "startFormId": 1,
      "endFormId": 3,
      "inFlowRotation": null,
      "inFlowDirection": null,
      "outFlowRotation": null,
      "outFlowDirection": null,
      "isValid": true,
      "isVerified": false,
      "variantGroupId": null,
      "safeAfterEntryOrder": null,
      "safeAfterFasrOrder": null,
      "teachOrderId": null,
      "startForm": { "name": "Squared Set" },
      "endForm": { "name": "Ocean Wave" },
      "steps": [
        {
          "moduleId": 1,
          "order": 0,
          "callId": 5,
          "startId": 1,
          "designator": "heads",
          "count": 4,
          "warning": null,
          "callFormation": {
            "call": { "name": "Square Thru" },
            "startForm": { "name": "Squared Set" },
            "endForm": { "name": "Ocean Wave" }
          }
        }
      ]
    }
  ],
  "message": "List of choreo modules"
}
```

#### Empty

HTTP **200**, `data: []`

---

## GET /api/module/:id

Returns a single module with its full steps, ordered by `order`.

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| id | integer | **yes** | The module's ID |

### Expected Results

#### Success

HTTP **200** — same module shape as the list above (`message: "Choreo module by id"`).

#### Not found

HTTP **404**, `data: null`

#### Invalid ID

HTTP **406**

---

## POST /api/module

Creates a module and its steps in a single transaction. Computes `isValid`, derives `endFormId` from the last step, computes `safeAfter*` positions, and runs [variant detection](#variant-detection).

### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| name | string | **yes** | Module name |
| startFormId | integer | **yes** | Formation the module begins from |
| endFormId | integer | no | Derived from the last step; if supplied and it disagrees with the derived value, the request is rejected. **Required** for an empty-steps module (no last step to derive from) |
| steps | array | no | Ordered step objects (see below); defaults to `[]` |
| inFlowRotation | string | no | |
| inFlowDirection | string | no | |
| outFlowRotation | string | no | |
| outFlowDirection | string | no | |
| teachOrderId | integer | no | Teach order to compute `safeAfter*` against |
| isVerified | boolean | no | Defaults to `false` |

#### Step Object

| Field | Type | Required | Description |
|---|---|---|---|
| order | integer | **yes** | Position; must be unique within the module |
| callId | integer | **yes** | The call |
| startId | integer | **yes** | The starting formation; `(callId, startId)` must exist in `call_formation` |
| designator | string | no | Sub-group modifier |
| count | integer | no | Repetition count |
| warning | string | no | Inherent choreographic warning |

### Expected Results

#### Success — created

HTTP **201**

```json
{
  "data": { "id": 7, "name": "Heads Square Thru module", "isValid": true, "endFormId": 3, "variantGroupId": null, "steps": [ /* … */ ] },
  "chainBreaks": [],
  "message": "Choreo module created"
}
```

#### Success — existing module reused (find-or-adopt, #21)

HTTP **200**

When the posted steps are a literal duplicate of an existing module's, **no new module is created**. The existing module is returned with `reusedExisting: true`, so multiple presentations share one choreographic unit. **Create flows must treat `200 + reusedExisting` as success, not just `201`.**

```json
{
  "data": { "id": 4, "name": "Heads Square Thru module", "isValid": true, "steps": [ /* … */ ] },
  "chainBreaks": [],
  "reusedExisting": true,
  "message": "Identical choreo module already exists"
}
```

#### Broken chain

Still HTTP **201** with `isValid: false` and the offending step orders in `chainBreaks`:

```json
{
  "data": { "id": 8, "isValid": false, "endFormId": 3, "steps": [ /* … */ ] },
  "chainBreaks": [1],
  "message": "Choreo module created"
}
```

#### Invalid

HTTP **406** — missing `name`/`startFormId`; a step without `callId`/`startId`; an unknown `(callId, startId)` (no `call_formation` row); a duplicate step `order`; or a body `endFormId` that contradicts the last step's end formation.

#### Conflict

HTTP **409** — `startFormId` / `endFormId` / `teachOrderId` / a step's `call_formation` does not exist; or a concurrent write conflict (retry).

---

## PUT /api/module/:id

Replaces a module's metadata and steps wholesale in a single transaction. Recomputes `endFormId`, `isValid`, `safeAfter*`, returns `chainBreaks`, and re-runs variant detection. A `PUT` never merges modules — the id is preserved; the module joins or leaves a variant group as its steps change.

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| id | integer | **yes** | The module's ID |

### Request Body

Same shape as `POST`.

### Expected Results

#### Success

HTTP **200** — updated module + `chainBreaks` (`message: "Choreo module updated"`).

#### Not found

HTTP **404**

#### Invalid / Conflict

HTTP **406** / **409** — same validation as `POST`.

---

## DELETE /api/module/:id

Deletes a module and its steps (cascade).

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| id | integer | **yes** | The module's ID |

### Expected Results

#### Success

HTTP **200**

```json
{ "data": { "id": 7 }, "message": "Choreo module deleted" }
```

#### Not found

HTTP **404**

#### Conflict — referenced by a presentation

HTTP **409** — a `presentation_item` still references this module. Delete or re-point those presentations first; the reference is `onDelete: Restrict` so a module is never deleted out from under a presentation.

---

## GET /api/module/:id/presentations

Lists every presentation that includes this module (via `presentation_item`). Shallow rows — no nested items.

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| id | integer | **yes** | The module's ID |

### Expected Results

#### Success

HTTP **200**, `data: [ /* presentations */ ]` (`message: "Presentations that include this module"`). Empty → `[]`.

#### Not found

HTTP **404** — the module id does not exist.

---

## Variant detection

On every `POST`/`PUT`, the service derives a comparison key per step from `startId : designator : (call.tamSeq ?? call#id) : count` and compares it against existing modules:

- **Exact step-row duplicate** (`POST`) → no new module; returns the existing one with `reusedExisting: true` (HTTP 200). This is what lets multiple presentations share one choreo unit.
- **Choreo-equivalent but not identical** (same key via `tamSeq`, e.g. a synonym-level twin call such as "Wheel the Ocean" / "Wheel the Sea") → a new module is created and all matches adopt a shared `variantGroupId` UUID.
- **No match** → `variantGroupId: null`.
- A `PUT` that moves a module out of a group dissolves the group if a single member is left behind.

The key uses `tamSeq` (not `callId`) so synonym-level twins compare equal, and includes `startId` so the same calls from a different FASR don't group. It is derived on the fly and never stored — the format can evolve without a migration.

### Business Rules

- `isValid`, `endFormId`, `safeAfter*`, and `variantGroupId` are all computed server-side, never passed by the client.
- A module with no steps is always `isValid: false` and never participates in variant detection.
- Modules are deduplicated by choreography (`variantGroupId` / exact-row reuse), not by name — names are free to collide.
