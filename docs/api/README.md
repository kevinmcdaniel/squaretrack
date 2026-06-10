# SquareTrack API Reference

**Base URL:** `http://localhost:5002/api`

All endpoints return JSON. Response envelope:

```json
{
  "data":    <object | array | null>,
  "message": "Human-readable description",
  "status":  <HTTP status code>
}
```

## Response Conventions

These rules are enforced across every endpoint. New endpoints must follow them.

### List endpoints (`/list`, collection routes)

- Always return `data: <array>`. **Empty collection → `[]`, never `null`.**
- HTTP **200** in both cases.
- Consumers should be able to call `.map`, `.length`, etc. without null-guards.

### Single-resource endpoints (`/:id`, GET-by-key)

- **Found:** `data: <object>`, HTTP **200**.
- **Not found:** `data: null`, HTTP **404**. Use `notFoundError`, not the legacy `emptyError`.

### Why

Returning `null` for an empty list lost information (consumers had to check both shapes), broke generic FE list components, and made tests fragile against seeded reference data. The convention above eliminates that ambiguity: shape is determined by route, not by data presence.

### Create endpoints — usually 201, sometimes 200

`POST` creates a resource and returns **201**. One deliberate exception:

- [**`POST /api/module`**](modules.md#post-apimodule) is find-or-adopt (#21).
  When the posted steps are a literal duplicate of an existing module's, no new
  row is created — it returns **200** with `data` = the existing module and a
  top-level `reusedExisting: true`. This lets multiple presentations share one
  choreographic unit. FE create flows must treat `200 + reusedExisting` as
  success, not just `201`.

### Sidecar fields (beside `data`)

Some endpoints add advisory fields next to `data` in the envelope (not inside it):

- [**`POST`/`PUT /api/module`**](modules.md) → `chainBreaks: number[]` — step
  `order`s whose start formation doesn't follow the prior step's end. The module
  still saves (`isValid: false`); a broken chain is not an error.
- [**`POST`/`PUT /api/presentation`**](presentations.md) → `flowWarnings: { afterItemOrder: number }[]`
  — boundaries where adjacent modules don't chain. Saves regardless.

### Error responses

Always include the same envelope. The `data` value depends on error class:

| Class | HTTP | `data` | Use for |
|---|---|---|---|
| `validationError` | 406 | `{}` | Missing or invalid request fields |
| `conflictError` | 409 | `{}` | Duplicate unique value, broken FK |
| `notFoundError` | 404 | `null` | Resource referenced in path does not exist |
| `authError` | 401 | `null` | Auth/authorization failure |
| (default) | 500 | `{}` | Unexpected server error |

## Status Codes

| Code | Meaning |
|------|---------|
| 200  | Success — request fulfilled (lists return arrays, may be empty) |
| 201  | Resource created |
| 404  | Resource referenced in the path does not exist (single-resource endpoints) |
| 406  | Validation error — missing or invalid field |
| 409  | Conflict — duplicate unique value or broken foreign key |
| 401  | Authorization error |
| 500  | Unexpected server error |

## Domains

| Domain | Prefix | Description |
|--------|--------|-------------|
| [Calls](calls.md) | `/api/call` | Square dance calls and call families |
| [Synonyms](synonyms.md) | `/api/call/:id/synonym` | Alternate names for parser resolution |
| [Formations](formations.md) | `/api/formation` | Starting/ending formations |
| [Call Formations](call-formations.md) | `/api/call-formation` | Call-to-formation mappings |
| [Sequences](sequences.md) | `/api/sequence` | Calling sequences and step management |
| [Modules](modules.md) | `/api/module` | Reusable choreographic units (the two-layer model's choreo layer) |
| [Presentations](presentations.md) | `/api/presentation` | Speakable, cued sequences that wrap modules (the cueing layer) |
| [Programs](programs.md) | `/api/program` | Dance programs, FASR vocabulary, and difficulty ratings |
| [Teach Orders](teach-orders.md) | `/api/teach-order` | Curriculum teach sequences |
| [Groups](groups.md) | `/api/group` | Dance groups (clubs and organizations) |
