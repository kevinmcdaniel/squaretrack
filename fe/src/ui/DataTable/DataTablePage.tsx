import { fetchData } from '@/lib/hac/fetch';
import { TableView } from './configs';

type SearchParams = Promise<{ focus?: string; on?: string }>;

/**
 * Server helper for a reviewable-table route: fetches the list endpoint, reads the
 * `?focus=`/`?on=` cross-link params, and hands plain data + params to the client TableView.
 */
export async function DataTablePage({
  table,
  uri,
  searchParams,
  rows,
  parent,
}: {
  table: string;
  /** List endpoint to fetch (ignored when `rows` is provided). */
  uri?: string;
  searchParams: SearchParams;
  /** Pre-resolved rows, for routes that need to filter/derive data before rendering. */
  rows?: Record<string, unknown>[];
  /** Parent-context row for the sticky header, when the table config declares a `parent` block. */
  parent?: Record<string, unknown>;
}) {
  const data = rows ?? (uri ? ((await fetchData<Record<string, unknown>[]>(uri)).data ?? []) : []);
  const sp = await searchParams;
  return <TableView table={table} data={data} parent={parent} focus={sp.focus ?? null} on={sp.on ?? null} />;
}
