import type { ReactNode } from 'react';

export type ColumnType = 'text' | 'number' | 'enum' | 'link' | 'date';

export type ColumnConfig = {
  /** Field name on the row. Dot paths are supported (e.g. "call.name", "startForm.name"). */
  field: string;
  label: string;
  type?: ColumnType;
  searchable?: boolean;
  sortable?: boolean;
  width?: string;
  /**
   * For type 'link': where a click navigates (`table`), which field on the target table
   * `focus` matches (`targetField`), and which field on *this* row supplies the focus value
   * (`valueField`, defaults to `field`). Use `valueField` when the cell displays one field
   * (e.g. "call.name") but links by another (e.g. "callId").
   */
  link?: { table: TableId; targetField: string; valueField?: string };
  /** Custom display formatter; receives the resolved cell value and the whole row. */
  format?: (value: unknown, row: Record<string, unknown>) => string;
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
  title: string;
  columns: ColumnConfig[];
  /** Produces a stable key per row. Defaults to `row.id`, else the row index. */
  rowKey?: (row: Record<string, unknown>) => string | number;
  defaultSort?: { field: string; direction: 'asc' | 'desc' };
  searchPlaceholder?: string;
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
