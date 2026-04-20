# Build Plan: Sequence & Teach Order Import UI

## Scope

Two import flows, similar shape, different data:

- **A. Sequence import** — paste calling text → parse → edit per-step → save as `sequence` + `sequence_calls[]`
- **B. Teach order import** — paste a program curriculum → parse → save as `teach_order` + `teach_order_entry[]`

Both share parser primitives: call name resolution (with synonyms), designator extraction, formation lookup.

---

## Schema additions (next migration)

```prisma
model sequence {
  // ...existing fields
  startFormationId Int                  // required; application default = "squared set"
  startFormation   formation            @relation(fields: [startFormationId], references: [formId])
  variantGroupId   String?              // shared uuid across sequences whose Taminations rendering matches
  isValid          Boolean              @default(false)
  @@index([variantGroupId])
}
```

- **`startFormationId`** — a sequence may open with a non-call entry (activator, filler), so the starting formation can't always be inferred from step 1. Seed a `"squared set"` formation row and use its id as the app-layer default when the user doesn't specify.
- **`variantGroupId`** — implements "same Taminations → link them." Computed at save time, not user-set.
- **`isValid`** — denormalized flag for fast "callable" filtering. True iff every `sequence_calls` row with `type='call'` has non-null `callId` and `startId`.

---

## Backend (`be/`)

### Parser service — `be/src/service/parser.ts`

Pure functions. No DB writes. Backend-only (no frontend mirror). Parse happens once on paste; latency acceptable.

```ts
type Resolution = 'resolved' | 'unresolved' | 'ambiguous'

type ParsedStep = {
  rawLine: string
  type: 'call' | 'activator' | 'filler' | 'warning' | 'tip' | 'recovery'
  designator?: string
  count?: number
  callMatches: { callId: number; name: string; confidence: number }[]
  formationMatches: { startId: number; name: string }[]
  resolution: Resolution
  text?: string
}
```

Parse rules per line:
1. Strip bullets/line numbers, lowercase, collapse whitespace
2. Match leading designator (`heads|sides|boys|girls|centers|ends|leads|trailers|beaus|belles`)
3. Extract trailing integer → `count`
4. Remainder → match against `call.name` → fall back to `call_synonym.alias`
5. Exact match → `resolved`; no match → `unresolved`; multiple matches → `ambiguous`
6. If resolved call has multiple `call_formation` entries, list options and mark ambiguous unless step-chaining disambiguates (see below)
7. Lines wrapped in specific markers (e.g. `// …`, `[warning] …`) → non-call types

**Formation chaining**: auto-pick a `call_formation` whose `startId` equals the previous step's `endId`. Falls back to ambiguous when the prior step is non-call, the chain breaks, or it's step 1 with multiple candidate formations.

**Step 1 formation**: auto-pick `call_formation` whose `startId` matches `sequence.startFormationId` (defaults to squared set).

### Routes

- `POST /api/sequence/parse` — body `{ text, startFormationId? }` → `ParsedStep[]`. Stateless.
- `POST /api/sequence` — save full draft. Computes `safeAfterPosition`, `variantGroupId`, `isValid` in txn.
- `PUT /api/sequence/:id` — replace steps in txn; recompute derived fields.
- `GET /api/sequence/:id` — load for re-edit.
- `POST /api/teach-order/parse` — body `{ text }` → parsed entries.
- `POST /api/teach-order` — body `{ name, programId, entries[] }`.
- `GET /api/call?search=…&limit=20` — autocomplete.
- `GET /api/formation?callId=X` — formations valid for a given call.
- `GET /api/formation?search=…` — general formation search.
- **Quick-add endpoints** (dataset grows as sequences are built):
  - `POST /api/call` — new call
  - `POST /api/formation` — new formation
  - `POST /api/call-formation` — new `(call, startFormation) → endFormation` tuple with optional flow fields
  - `POST /api/call/:id/synonym` — add alias; used when user resolves an unknown line

### Controllers + validation

- Zod schemas for every body
- Shared `DraftSequenceSchema` reused by POST and PUT
- Thin controllers, logic in services

### Save-time variant detection

On `POST/PUT /api/sequence`:

1. Generate `taminationsText` from `type='call'` steps (`designator + call.tamSeq + count`, skipping non-call entries)
2. Query for existing sequences whose computed Taminations text matches
3. If matches: adopt their `variantGroupId` (create one if the group is unassigned and update all members)
4. If no matches: `variantGroupId = null`

Generated Taminations text is not stored — derived on the fly for comparison and export. Only `variantGroupId` is persistent.

---

## Frontend (`fe/`)

### Routes

- `/calling/sequences/new`
- `/calling/sequences/[id]/edit`
- `/calling/teach-orders/new`
- `/calling/teach-orders/[id]/edit`

### Client state shape

```ts
type DraftStep = {
  localId: string                   // uuid for React keys; not persisted
  order: number
  type: 'call' | 'activator' | 'filler' | 'warning' | 'tip' | 'recovery'
  callId: number | null
  startId: number | null
  designator: string | null
  count: number | null
  text: string | null
  helperText: string | null
  resolution: 'resolved' | 'unresolved' | 'ambiguous'
  rawLine: string                   // preserved for display next to structured form
  candidates?: { callId: number; name: string }[]
}

type DraftSequence = {
  name: string
  teachOrderId: number | null
  startFormationId: number         // defaults to "squared set" id
  activator: 'heads' | 'sides' | null
  rating: string | null
  notes: string | null
  sourceText: string
  steps: DraftStep[]
}
```

Single `useReducer`. Actions: `UPDATE_STEP`, `ADD_STEP`, `DELETE_STEP`, `REORDER_STEP`, `RESOLVE_CALL`, `SET_META`.

### Component tree — sequence editor

```
SequenceEditor (page)
 ├── SequenceMetaForm         — name, teach order, start formation, activator, rating, notes
 ├── PasteDropzone            — textarea + Parse button; only shown when steps empty
 ├── StepList
 │    └── StepRow (per step)
 │         ├── TypeBadge       — call | activator | filler | warning | tip | recovery
 │         ├── DesignatorPill
 │         ├── CallPicker      — autocomplete; red border if unresolved; inline "add new call"
 │         ├── FormationPicker — appears when call has >1 valid formation; inline "add new call_formation"
 │         ├── CountInput
 │         ├── TextInput       — display override
 │         ├── HelperTextInput
 │         └── RowActions      — delete, drag-handle reorder, insert-before
 ├── UnresolvedBanner          — "3 steps need attention" → scrolls to next
 └── FooterBar                 — Save (always enabled; shows WIP vs Valid), Cancel
```

### Key interactions

- **Paste + Parse**: `POST /api/sequence/parse`; hydrate `DraftSequence.steps`. Preserve `rawLine` per step.
- **Unresolved call**: `CallPicker` opens with debounced search against `/api/call`; "Add new call" opens a modal. On resolve, offer "save '<rawLine>' as synonym for <call>" (fires `POST /api/call/:id/synonym`).
- **Ambiguous formation**: inline radio list under the row; selecting resolves.
- **Missing `call_formation`**: `FormationPicker` offers "add this call from <formation>" → modal collects end formation + optional flow fields → `POST /api/call-formation`.
- **Non-call type**: row collapses to a single text field.
- **Reorder**: drag handle; `order` recomputed on drop.
- **Save**: always allowed. Posts to backend, which computes `isValid`, `safeAfterPosition`, `variantGroupId`. Redirect to view page.

### Teach order import — simpler variant

Same paste-then-edit pattern. Each entry: `{ callId, startId, position, week }`. No types, designator, or count. Header form: `{ name, programId }`. Stripped-down `StepList` with only call picker, formation picker, position, week.

---

## Build order

1. Migration: `startFormationId`, `variantGroupId`, `isValid`; seed "squared set" formation
2. Parser service + unit tests (with user-provided fixtures)
3. Parse endpoint + lookup endpoints (`/call`, `/formation`, `/formation?callId=`)
4. Quick-add endpoints (`POST /call`, `POST /formation`, `POST /call-formation`, `POST /call/:id/synonym`)
5. Sequence save endpoint with variant detection + `isValid` computation
6. `SequenceEditor` skeleton + paste flow (read-only render of parsed output)
7. Per-step editing with pickers supporting quick-add
8. Save flow (WIP saves + valid saves)
9. Reorder + add/delete steps
10. Load for re-edit
11. Teach order import variant

---

## Policy decisions (resolved)

| Question | Decision |
|---|---|
| Parser location | Backend only |
| Formation defaulting | Chain off prior step's `endId`; fall back to `sequence.startFormationId` at step 1 |
| Unresolved policy on save | Allow save; `isValid=false` marks it as draft |
| Sample sequences | Kevin will provide — parser fixtures |
| Sequence uniqueness | `name` is unique (existing); `variantGroupId` handles choreography-level dedup |
| On-the-fly dataset growth | Every picker must support inline quick-add; dataset grows with use |

## Open items

- Sample sequences from Kevin (parser fixtures)
- Taminations text format spec — need exact output format for `call.tamSeq` concatenation
- FASR per-dancer flow model — deferred until reference document arrives
