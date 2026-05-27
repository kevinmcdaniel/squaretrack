# DataTable

A generic, config-driven, read-only table for the data-review surface (`/data`). It knows
nothing about the calls/programs domain — behavior comes entirely from a `TableConfig`.

Features: in-memory search and sort, typed column rendering, FK cross-links (`?focus=`),
and three row-detail modes (`accordion`, `modal`, `drillIn`).

## Server/client boundary

`TableConfig` holds functions (`format`, `rowKey`, modal `render`, drill-in `route`), which
**cannot** cross the server→client boundary. So:

- Configs live in a `'use client'` module ([`configs.tsx`](./configs.tsx)) and are selected by
  key inside the client `TableView`.
- Server route pages fetch data and pass plain rows + the `?focus=`/`?on=` params via
  [`DataTablePage`](./DataTablePage.tsx); they never pass a config across the boundary.

## Cross-links & focus safety

A `link` column renders as an anchor to `/<target route>?focus=<value>&on=<targetField>`. The
target table scrolls to and highlights the row where `row[targetField] === focus`.

Only tables marked `focusSafe` in [`registry.ts`](./registry.ts) may be link targets — a
`?focus=` against a large table would force the whole table to load. `defineTableConfig`
**throws at module-eval time** (i.e. fails the build) if a column links to a non-focus-safe
or unknown table. Wrap every config in `defineTableConfig`.

## Usage

```tsx
<DataTable config={config} data={rows} focus={focus} focusOn={on} />
```

### Accordion — child rows inline beneath the parent

```ts
const callsConfig = defineTableConfig({
  title: 'Calls',
  rowKey: (r) => String(r.callId),
  columns: [
    { field: 'callId', label: 'ID', type: 'number', sortable: true },
    { field: 'name', label: 'Name', searchable: true, sortable: true },
  ],
  rowDetail: {
    mode: 'accordion',
    childField: 'formations',     // array on the parent row
    childConfig: fasrChildConfig, // sub-table rendered inline when expanded
  },
});
```

### Modal — detail that doesn't fit the grid

```tsx
const sequencesConfig = defineTableConfig({
  title: 'Sequences',
  rowKey: (r) => String(r.seqId),
  columns: [{ field: 'name', label: 'Name', searchable: true, sortable: true }],
  rowDetail: {
    mode: 'modal',
    title: (r) => `${r.name} — steps`,
    render: (r) => <ol>{(r.calls as Row[]).map((s) => <li key={s.order}>{s.text}</li>)}</ol>,
  },
});
```

### Drill-in — push a route for a large child collection

```ts
const programsConfig = defineTableConfig({
  title: 'Programs',
  rowKey: (r) => String(r.programId),
  columns: [{ field: 'name', label: 'Name', searchable: true, sortable: true }],
  rowDetail: {
    mode: 'drillIn',
    label: 'Teach orders', // optional text beside the chevron; makes the link discoverable
    route: (r) => `/data/programs/${r.programId}/teach-orders`,
  },
});
```

Drill-in renders a real `<Link>` (not a JS push), so it supports hover, open-in-new-tab, and
browser back/forward. Accordion and modal keep the
parent table's scroll position. Embed child data in the list response only for `accordion` and
`modal`; `drillIn` targets fetch their own data on the drilled-in route.
