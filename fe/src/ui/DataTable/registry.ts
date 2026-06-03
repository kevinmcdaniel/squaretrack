import type {
  ColumnConfig,
  ParentConfig,
  TableBehaviors,
  TableConfig,
  TableData,
  TableId,
} from './types';

/**
 * Central registry of reviewable tables. `route` is where a cross-link navigates;
 * `focusSafe` declares whether the table is small enough to be loaded whole and so
 * can be a `?focus=` target. Cross-links pointing at a non-focus-safe table are
 * rejected by `defineTable` at module-eval time.
 */
export const tableRegistry: Record<TableId, { route: string; focusSafe: boolean }> = {
  call: { route: '/data/calls', focusSafe: true },
  'call-family': { route: '/data/call-families', focusSafe: true },
  program: { route: '/data/programs', focusSafe: true },
  formation: { route: '/data/formations', focusSafe: true },
  'call-formation': { route: '/data/call-formations', focusSafe: false },
  sequence: { route: '/data/sequences', focusSafe: true },
};

const getByPath = (row: Record<string, unknown>, path: string): unknown =>
  path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[key];
    return undefined;
  }, row);

/** Stable sort by explicit `order`, falling back to original array position. */
const byOrder = <T extends { order?: number }>(items: T[]): T[] =>
  items
    .map((item, index) => ({ item, index }))
    .sort((a, b) => (a.item.order ?? a.index) - (b.item.order ?? b.index))
    .map(({ item }) => item);

/**
 * Merges a plain-data `TableData` with its code-only `TableBehaviors` into a resolved
 * `TableConfig` that <DataTable> consumes. Validates that every `link` column targets a
 * focus-safe, known table — throws at module-eval time (failing the build) otherwise, since
 * `?focus=` against a large table would force the whole table to load. Wrap every config in
 * `defineTable`.
 */
export function defineTable(data: TableData, behaviors: TableBehaviors = {}): TableConfig {
  for (const col of data.columns) {
    if (!col.link) continue;
    const target = tableRegistry[col.link.table];
    if (!target) {
      throw new Error(
        `DataTable config "${data.title}": column "${col.field}" links to unknown table "${col.link.table}".`,
      );
    }
    if (!target.focusSafe) {
      throw new Error(
        `DataTable config "${data.title}": column "${col.field}" links to non-focus-safe table "${col.link.table}". ` +
          `Cross-links may only target focus-safe tables.`,
      );
    }
  }

  const columns: ColumnConfig[] = byOrder(data.columns).map((col) => ({
    ...col,
    format: behaviors.columns?.[col.field]?.format,
  }));

  let parent: ParentConfig | undefined;
  if (data.parent) {
    parent = {
      fields: byOrder(data.parent.fields).map((f) => ({
        ...f,
        format: behaviors.parent?.fields?.[f.field]?.format,
      })),
      defaultExpanded: data.parent.defaultExpanded ?? false,
      summary: behaviors.parent?.summary,
    };
  }

  const rowKeyField = data.rowKey;
  const rowKey =
    behaviors.rowKey ?? (rowKeyField ? (row: Record<string, unknown>) => String(getByPath(row, rowKeyField)) : undefined);

  return {
    tableId: data.tableId,
    title: data.title,
    columns,
    rowKey,
    defaultSort: data.defaultSort,
    searchPlaceholder: data.searchPlaceholder,
    parent,
    rowDetail: behaviors.rowDetail,
  };
}
