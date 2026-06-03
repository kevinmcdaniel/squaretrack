import type { ReactNode } from 'react';

export type ColumnType = 'text' | 'number' | 'enum' | 'link' | 'date';

/**
 * For type 'link': where a click navigates (`table`), which field on the target table
 * `focus` matches (`targetField`), and which field on *this* row supplies the focus value
 * (`valueField`, defaults to `field`). Use `valueField` when the cell displays one field
 * (e.g. "call.name") but links by another (e.g. "callId").
 */
export type LinkSpec = { table: TableId; targetField: string; valueField?: string };

export type SortSpec = { field: string; direction: 'asc' | 'desc' };

// ── Data layer ───────────────────────────────────────────────────────────────
// Plain, JSON-serializable shape: no closures. This is the part a non-code config
// (JSON/YAML) can describe in full. Behaviors are attached separately, by field name.

export type ColumnData = {
  /** Field name on the row. Dot paths are supported (e.g. "call.name", "startForm.name"). */
  field: string;
  label: string;
  /** Explicit ordering; falls back to array order when omitted. */
  order?: number;
  type?: ColumnType;
  searchable?: boolean;
  sortable?: boolean;
  width?: string;
  link?: LinkSpec;
};

export type ParentFieldData = {
  /** Dot path on the parent row. */
  field: string;
  label: string;
  /** Explicit ordering; falls back to array order when omitted. */
  order?: number;
};

export type ParentData = {
  fields: ParentFieldData[];
  /** Accordion starts closed unless this is true. */
  defaultExpanded?: boolean;
};

export type TableData = {
  /** Stable identifier; also the `configs` map key and the focus namespace (`?focus=<tableId>:…`). */
  tableId: string;
  title: string;
  columns: ColumnData[];
  /** Row key as a plain field name. Use `behaviors.rowKey` for composite/derived keys. */
  rowKey?: string;
  defaultSort?: SortSpec;
  searchPlaceholder?: string;
  parent?: ParentData;
};

// ── Behaviors layer ──────────────────────────────────────────────────────────
// Code-only escape hatches (closures + JSX), keyed by field name so the data-only
// config above can be authored/edited without touching this object.

export type ColumnBehavior = {
  /** Custom display formatter; receives the resolved cell value and the whole row. */
  format?: (value: unknown, row: Record<string, unknown>) => string;
};

export type ParentFieldBehavior = {
  format?: (value: unknown, parent: Record<string, unknown>) => string;
};

export type ParentBehavior = {
  /** One-line collapsed view. Falls back to the first 1–2 fields when omitted. */
  summary?: (parent: Record<string, unknown>) => ReactNode;
  /** Per-field formatters, keyed by `field`. */
  fields?: Record<string, ParentFieldBehavior>;
};

export type TableBehaviors = {
  rowKey?: (row: Record<string, unknown>) => string | number;
  /** Per-column behaviors, keyed by `field`. */
  columns?: Record<string, ColumnBehavior>;
  parent?: ParentBehavior;
  rowDetail?: RowDetail;
};

// ── Resolved layer ───────────────────────────────────────────────────────────
// Produced by `defineTable(data, behaviors)`; this is what <DataTable> consumes.

// `order` is consumed by `defineTable` (it sorts columns/fields) and is dead afterwards,
// so the resolved layer omits it.
export type ColumnConfig = Omit<ColumnData, 'order'> & {
  format?: (value: unknown, row: Record<string, unknown>) => string;
};

export type ParentFieldConfig = Omit<ParentFieldData, 'order'> & {
  format?: (value: unknown, parent: Record<string, unknown>) => string;
};

export type ParentConfig = {
  /** Ordered field list, resolved from `ParentData.fields` + behaviors. */
  fields: ParentFieldConfig[];
  defaultExpanded: boolean;
  summary?: (parent: Record<string, unknown>) => ReactNode;
};

export type AccordionDetail = {
  mode: 'accordion';
  /** Field on the parent row holding the child array. Dot paths supported. */
  childField: string;
  childConfig: TableConfig;
};

export type ModalDetail = {
  mode: 'modal';
  title?: (row: Record<string, unknown>) => string;
  render: (row: Record<string, unknown>) => ReactNode;
};

export type DrillInDetail = {
  mode: 'drillIn';
  /** Navigated to, e.g. `/data/programs/${row.programId}/teach-orders`. Rendered as a real link. */
  route: (row: Record<string, unknown>) => string;
  /** Optional text shown beside the chevron to make the drill-in link discoverable. */
  label?: string;
  /** When provided, the drill-in link only renders for rows where this returns true — no dead-end links. */
  hasChildren?: (row: Record<string, unknown>) => boolean;
};

export type RowDetail = AccordionDetail | ModalDetail | DrillInDetail;

export type TableConfig = {
  tableId: string;
  title: string;
  columns: ColumnConfig[];
  /** Produces a stable key per row. Defaults to `row.id`, else the row index. */
  rowKey?: (row: Record<string, unknown>) => string | number;
  defaultSort?: SortSpec;
  searchPlaceholder?: string;
  /** Optional sticky parent-context header above the table. */
  parent?: ParentConfig;
  rowDetail?: RowDetail;
};

/** Tables reachable as cross-link / focus targets. Only focus-safe (small, fully in-memory) tables belong here. */
export type TableId =
  | 'call'
  | 'call-family'
  | 'program'
  | 'formation'
  | 'call-formation'
  | 'sequence';
