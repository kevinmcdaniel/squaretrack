# DataTable

A generic, config-driven, read-only table for the data-review surface (`/data`). It knows
nothing about the calls/programs domain — behavior comes entirely from a config.

Features: in-memory search and sort, typed column rendering, FK cross-links (`?focus=`), an
optional sticky parent-context header, and three row-detail modes (`accordion`, `modal`,
`drillIn`).

## Config = data + behaviors

A config is authored in two halves and stitched together by `defineTable(data, behaviors)`:

- **`TableData`** — plain, JSON-serializable shape. No closures. Describes `tableId`, `title`,
  `columns[]` (`field`, `label`, `order`, `type`, `sortable`, `searchable`, `width`, `link`),
  `defaultSort`, `searchPlaceholder`, `rowKey` (a field name), and an optional `parent` block.
  This half can be authored/edited as data without touching code.
- **`TableBehaviors`** — code-only escape hatches (closures + JSX), keyed by field name: column
  `format`, composite `rowKey`, parent `summary`/per-field `format`, and `rowDetail`
  (`render`, `route`, `title`, `hasChildren`).

The data half of `teach-order-entries` as JSON:

```json
{
  "tableId": "teach-order-entries",
  "title": "Entries",
  "searchPlaceholder": "Search entries…",
  "defaultSort": { "field": "entryOrder", "direction": "asc" },
  "columns": [
    { "field": "displayOrder", "label": "#", "order": 1, "sortable": true, "width": "4rem" },
    { "field": "entryType", "label": "Type", "order": 2, "type": "enum", "sortable": true },
    {
      "field": "callId",
      "label": "Call / Family",
      "order": 3,
      "type": "link",
      "searchable": true,
      "link": { "table": "call", "targetField": "callId" }
    },
    { "field": "week", "label": "Week", "order": 4, "type": "number", "sortable": true }
  ],
  "parent": {
    "defaultExpanded": false,
    "fields": [
      { "field": "name", "label": "Name", "order": 1 },
      { "field": "program.name", "label": "Program", "order": 2 },
      { "field": "entries", "label": "Total entries", "order": 3 }
    ]
  }
}
```

The matching behaviors (TS, keyed by `field`):

```ts
const config = defineTable(data /* the JSON above */, {
  rowKey: (r) => `${r.teachOrderId}-${r.entryOrder}`,
  columns: {
    callId: { format: (_v, r) => String(obj(r.call).name ?? obj(r.callFamily).name ?? '') },
  },
  parent: {
    summary: (p) => `${p.name} · ${obj(p.program).name} · ${(p.entries as unknown[]).length} entries`,
    fields: { entries: { format: (v) => String((v as unknown[]).length) } },
  },
  rowDetail: { mode: 'accordion', childField: 'fasrs', childConfig: fasrEntryChildConfig },
});
```

## Server/client boundary

Behaviors hold functions, which **cannot** cross the server→client boundary. So:

- Configs live in a `'use client'` module ([`configs.tsx`](./configs.tsx)) and are selected by
  key inside the client `TableView`.
- Server route pages fetch data and pass plain rows (+ an optional `parent` row and the
  `?focus=`/`?on=` params) via [`DataTablePage`](./DataTablePage.tsx); they never pass a config
  across the boundary.

## Parent header (sticky, accordion)

A config may declare a `parent` block; the page then supplies a `parent` row alongside `data`.
Rendered in a `position: sticky` region above the table — it stays pinned while rows scroll.
Collapsed shows `summary` (or the first 1–2 fields); expanded shows the full ordered field list
with labels. Open/closed state is local (`defaultExpanded`); not persisted to the URL.

```tsx
// server page
<DataTablePage table="teach-order-entries" rows={entries} parent={teachOrder} searchParams={searchParams} />
```

## Cross-links & focus safety

A `link` column renders as an anchor to `/<target route>?focus=<value>&on=<targetField>`. The
target table scrolls to and highlights the row where `row[targetField] === focus`.

Only tables marked `focusSafe` in [`registry.ts`](./registry.ts) may be link targets — a
`?focus=` against a large table would force the whole table to load. `defineTable`
**throws at module-eval time** (i.e. fails the build) if a column links to a non-focus-safe
or unknown table. Wrap every config in `defineTable`.

### Per-table focus namespacing

`?focus=`/`?on=` accept a namespaced form `<tableId>:<value>` so a page with more than one table
can address focus at a specific table — `TableView` resolves the param for its table and ignores
entries aimed at other tables. The legacy bare form `<value>` still applies on single-table pages
(a colon that isn't a known-table prefix is treated as part of the value). Cross-link cells emit
the bare form today; the namespaced form is parsed for forward-compatibility.

## Usage

```tsx
<DataTable config={config} data={rows} parent={parent} focus={focus} focusOn={on} />
```

### Accordion — child rows inline beneath the parent

```ts
const callsConfig = defineTable(
  {
    tableId: 'call',
    title: 'Calls',
    rowKey: 'callId',
    columns: [
      { field: 'callId', label: 'ID', type: 'number', sortable: true },
      { field: 'name', label: 'Name', searchable: true, sortable: true },
    ],
  },
  {
    rowDetail: {
      mode: 'accordion',
      childField: 'formations',     // array on the parent row
      childConfig: fasrChildConfig, // sub-table rendered inline when expanded
    },
  },
);
```

### Modal — detail that doesn't fit the grid

```tsx
const sequencesConfig = defineTable(
  {
    tableId: 'sequence',
    title: 'Sequences',
    rowKey: 'seqId',
    columns: [{ field: 'name', label: 'Name', searchable: true, sortable: true }],
  },
  {
    rowDetail: {
      mode: 'modal',
      title: (r) => `${r.name} — steps`,
      render: (r) => <ol>{(r.calls as Row[]).map((s) => <li key={s.order}>{s.text}</li>)}</ol>,
    },
  },
);
```

### Drill-in — push a route for a large child collection

```ts
const programsConfig = defineTable(
  {
    tableId: 'program',
    title: 'Programs',
    rowKey: 'programId',
    columns: [{ field: 'name', label: 'Name', searchable: true, sortable: true }],
  },
  {
    rowDetail: {
      mode: 'drillIn',
      label: 'Teach orders', // optional text beside the chevron; makes the link discoverable
      route: (r) => `/data/programs/${r.programId}/teach-orders`,
    },
  },
);
```

Drill-in renders a real `<Link>` (not a JS push), so it supports hover, open-in-new-tab, and
browser back/forward. Accordion and modal keep the parent table's scroll position. Embed child
data in the list response only for `accordion` and `modal`; `drillIn` targets fetch their own
data on the drilled-in route.
