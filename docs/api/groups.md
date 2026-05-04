# Groups API

A **group** represents a square dance club or organization. Groups have a geographic location (country + state) and a type. Dancers belong to groups.

---

## GET /api/group/list

Returns all groups.

### Request

No parameters.

### Expected Results

#### Success

HTTP **200**

```json
{
  "data": [
    {
      "id": "3f7a1c2e-...",
      "name": "Promenaders Square Dance Club",
      "type": "club",
      "countryCode": "US",
      "state": "CA"
    }
  ],
  "message": "List of all groups"
}
```

#### Empty

HTTP **200**, `data: []`

---

## GET /api/group/list/:groupId

Returns a single group by its UUID.

### Path Parameters

| Parameter | Type   | Required | Description     |
|-----------|--------|----------|-----------------|
| groupId   | string | **yes**  | The group's UUID |

### Expected Results

#### Success

HTTP **200**

```json
{
  "data": {
    "id": "3f7a1c2e-...",
    "name": "Promenaders Square Dance Club",
    "type": "club",
    "countryCode": "US",
    "state": "CA"
  },
  "message": "Unique group by id"
}
```

#### Not found

HTTP **404**, `data: null`

### Business Rules

- Group IDs are UUIDs (auto-generated), not integers.
- `type` is a free-text string (e.g. `club`, `association`, `federation`).
- `countryCode` + `state` must reference a valid `state` record.
- Dancer-to-group membership is managed through the `dance_group` join table (no direct API endpoint yet).
