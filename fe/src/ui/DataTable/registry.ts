import type { TableConfig, TableId } from './types';

/**
 * Central registry of reviewable tables. `route` is where a cross-link navigates;
 * `focusSafe` declares whether the table is small enough to be loaded whole and so
 * can be a `?focus=` target. Cross-links pointing at a non-focus-safe table are
 * rejected by `validateTableConfig` at module-eval time.
 */
export const tableRegistry: Record<TableId, { route: string; focusSafe: boolean }> = {
  call: { route: '/data/calls', focusSafe: true },
  'call-family': { route: '/data/call-families', focusSafe: true },
  program: { route: '/data/programs', focusSafe: true },
  formation: { route: '/data/formations', focusSafe: true },
  'call-formation': { route: '/data/call-formations', focusSafe: false },
  sequence: { route: '/data/sequences', focusSafe: true },
};

/**
 * Validates a table config and returns it. Throws if any `link` column targets a
 * table that is not focus-safe, since `?focus=` against a large table would force
 * the whole table to load. Run at config-definition time so a bad config fails the build.
 */
export function defineTableConfig(config: TableConfig): TableConfig {
  for (const col of config.columns) {
    if (!col.link) continue;
    const target = tableRegistry[col.link.table];
    if (!target) {
      throw new Error(
        `DataTable config "${config.title}": column "${col.field}" links to unknown table "${col.link.table}".`,
      );
    }
    if (!target.focusSafe) {
      throw new Error(
        `DataTable config "${config.title}": column "${col.field}" links to non-focus-safe table "${col.link.table}". ` +
          `Cross-links may only target focus-safe tables.`,
      );
    }
  }
  return config;
}
