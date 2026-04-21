# Synonyms API

A **synonym** (alias) is an alternate name for a call used by the sequence parser to resolve pasted text. When a user pastes a sequence and the parser encounters an unknown line, they can resolve it manually and optionally save the raw text as a synonym so future imports resolve automatically.

---

## POST /api/call/:callId/synonym

Adds an alias to an existing call.

### Path Parameters

| Parameter | Type    | Required | Description                 |
|-----------|---------| ---------|-----------------------------|
| callId    | integer | **yes**  | ID of the call to add to    |

### Request Body

| Field | Type   | Required | Description                              |
|-------|--------|----------|------------------------------------------|
| alias | string | **yes**  | The alternate name to map to this call   |

### Expected Results

#### Success

HTTP **201**

```json
{
  "data": {
    "id": 7,
    "callId": 1,
    "alias": "sq thru"
  },
  "message": "Synonym added"
}
```

#### Missing alias

HTTP **406**

```json
{
  "data": {},
  "message": "Validation Error: alias is required.",
  "status": 406
}
```

#### Duplicate alias

HTTP **409**

```json
{
  "data": {},
  "message": "Conflict Error: Alias already exists.",
  "status": 409
}
```

- Aliases are globally unique across all calls. The same text cannot map to two different calls. Attempting to save a duplicate returns **409**.

#### Call not found

HTTP **404**

```json
{
  "data": null,
  "message": "Not Found: Call id:999 not found!",
  "status": 404
}
```

#### Invalid callId (non-numeric)

HTTP **406**

```json
{
  "data": {},
  "message": "Validation Error: Call ID is an integer. Invalid value:abc.",
  "status": 406
}
```

### Business Rules

- Aliases are case-insensitive during parser lookup (stored as-is, compared with `mode: insensitive`).
- A single call may have any number of aliases.
- **Aliases are globally unique.** If two calls could share the same informal name (e.g. "swing" could mean "Swing" or "Swing Thru"), the call names lack sufficient specificity. The correct resolution is to rename one or both calls to be unambiguous — not to allow a duplicate alias. A synonym that can't be saved because it already exists on another call is a signal that the call library needs more specific naming.
- Common use: user pastes "do sa do", parser marks it unresolved, user picks "Do-Sa-Do" from picker, system offers to save "do sa do" as a synonym.
