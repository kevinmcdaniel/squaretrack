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

## Status Codes

| Code | Meaning |
|------|---------|
| 200  | Success (includes "not found" empty results — see `data: null`) |
| 201  | Resource created |
| 406  | Validation error — missing or invalid field |
| 409  | Conflict — duplicate unique value or broken foreign key |
| 404  | Record referenced in path does not exist |
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
