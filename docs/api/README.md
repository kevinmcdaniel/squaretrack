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
| [Programs](programs.md) | `/api/program` | Dance programs, FASR vocabulary, and difficulty ratings |
| [Teach Orders](teach-orders.md) | `/api/teach-order` | Curriculum teach sequences |
| [Groups](groups.md) | `/api/group` | Dance groups (clubs and organizations) |
