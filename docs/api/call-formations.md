# Call Formations API

A **call formation** (`call_formation`) is the atomic unit of choreography: a specific call executed from a specific starting formation, which produces a specific ending formation. The same call executed from two different starting formations are two separate `call_formation` records.

This is the unit referenced by teach orders and by individual steps in a sequence.

---

## POST /api/call-formation

Links a call to a (start formation → end formation) pair.

### Request Body

| Field            | Type    | Required | Description                                           |
|------------------|---------|----------|-------------------------------------------------------|
| callId           | integer | **yes**  | ID of the call                                        |
| startId          | integer | **yes**  | ID of the formation dancers are in before the call    |
| endId            | integer | **yes**  | ID of the formation dancers are in after the call     |
| inFlowRotation   | string  | no       | Rotational momentum entering: `left` \| `right` \| `none` |
| inFlowDirection  | string  | no       | Linear momentum entering: `forward` \| `backward` \| `slideLeft` \| `slideRight` |
| outFlowRotation  | string  | no       | Rotational momentum exiting: `left` \| `right` \| `none` |
| outFlowDirection | string  | no       | Linear momentum exiting: `forward` \| `backward` \| `slideLeft` \| `slideRight` |

> **Note:** Flow fields are stored but flow compatibility evaluation logic is not yet implemented (pending FASR reference document).

### Expected Results

#### Success

HTTP **201**

```json
{
  "data": {
    "callId": 1,
    "startId": 1,
    "endId": 3,
    "inFlowRotation": null,
    "inFlowDirection": null,
    "outFlowRotation": null,
    "outFlowDirection": null
  },
  "message": "Call formation created"
}
```

#### Missing required fields

HTTP **406**

```json
{
  "data": {},
  "message": "Validation Error: callId, startId, and endId are required.",
  "status": 406
}
```

#### Duplicate (callId + startId already exists)

HTTP **409**

```json
{
  "data": {},
  "message": "Conflict Error: Call formation (callId, startId) already exists.",
  "status": 409
}
```

- The primary key is `(callId, startId)`. A call may only have one mapping per starting formation.
- To map the same call from a different starting formation, create a second record with a different `startId`.

#### Invalid callId or formation IDs

HTTP **409**

```json
{
  "data": {},
  "message": "Conflict Error: callId or startId/endId does not exist.",
  "status": 409
}
```

### Business Rules

- On-the-fly creation: the sequence editor's **FormationPicker** offers "add this call from \<formation\>" when the needed mapping is missing. This triggers a modal that collects `endId` and optional flow fields, then calls this endpoint.
- A `call_formation` must exist before a sequence step can reference `type: "call"` with that `(callId, startId)` pair — otherwise the step is marked unresolved and `sequence.isValid` remains `false`.
