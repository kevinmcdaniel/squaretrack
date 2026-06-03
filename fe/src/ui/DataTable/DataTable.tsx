'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronDoubleRightIcon,
  ChevronDoubleDownIcon,
} from '@heroicons/react/24/outline';
import type { ColumnConfig, ParentConfig, ParentFieldConfig, TableConfig } from './types';
import { tableRegistry } from './registry';

type Row = Record<string, unknown>;

const getByPath = (row: Row, path: string): unknown =>
  path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[key];
    return undefined;
  }, row);

const formatByType = (value: unknown, type: ColumnConfig['type']): string => {
  if (value === null || value === undefined) return '';
  if (type === 'date') return new Date(value as string).toLocaleDateString();
  return String(value);
};

const cellText = (row: Row, col: ColumnConfig): string => {
  const raw = getByPath(row, col.field);
  return col.format ? col.format(raw, row) : formatByType(raw, col.type);
};

const rowKeyOf = (config: TableConfig, row: Row, index: number): string => {
  if (config.rowKey) return String(config.rowKey(row));
  if (row.id !== undefined) return String(row.id);
  return String(index);
};

export function DataTable({
  config,
  data,
  parent,
  focus,
  focusOn,
  nested = false,
}: {
  config: TableConfig;
  data: Row[];
  /** Parent-context row for the sticky header; rendered only when `config.parent` is set. */
  parent?: Row;
  /** Cross-link target value, from the page's `?focus=` search param. */
  focus?: string | null;
  /** Field on this table's rows that `focus` matches against, from `?on=`. */
  focusOn?: string | null;
  nested?: boolean;
}) {
  const focusValue = nested ? null : focus ?? null;
  const focusOnField = nested ? null : focusOn ?? null;

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState(config.defaultSort ?? null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [modalRow, setModalRow] = useState<Row | null>(null);
  const focusRef = useRef<HTMLTableRowElement | null>(null);

  const searchableFields = config.columns.filter((c) => c.searchable).map((c) => c.field);

  const filtered = useMemo(() => {
    if (!search.trim() || searchableFields.length === 0) return data;
    const q = search.trim().toLowerCase();
    return data.filter((row) =>
      searchableFields.some((f) => {
        const v = getByPath(row, f);
        return v != null && String(v).toLowerCase().includes(q);
      }),
    );
  }, [data, search, searchableFields]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;
    const dir = sort.direction === 'asc' ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const av = getByPath(a, sort.field);
      const bv = getByPath(b, sort.field);
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
  }, [filtered, sort]);

  // Scroll to + highlight the focused row (cross-link target).
  useEffect(() => {
    if (focusValue && focusRef.current) {
      focusRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [focusValue, sorted]);

  const toggleSort = (col: ColumnConfig) => {
    if (!col.sortable) return;
    setSort((prev) =>
      prev?.field === col.field
        ? { field: col.field, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { field: col.field, direction: 'asc' },
    );
  };

  const detail = config.rowDetail;
  const expandable = Boolean(detail);

  // drillIn rows navigate via a real <Link> (see FragmentRow); only modal/accordion toggle here.
  const handleExpand = (key: string, row: Row) => {
    if (!detail) return;
    if (detail.mode === 'modal') {
      setModalRow(row);
    } else if (detail.mode === 'accordion') {
      setExpanded((prev) => (prev === key ? null : key));
    }
  };

  const isFocused = (row: Row): boolean =>
    Boolean(focusValue && focusOnField && String(getByPath(row, focusOnField)) === focusValue);

  return (
    <div className={nested ? 'pl-6' : ''}>
      {!nested && config.parent && parent && <ParentHeader config={config.parent} parent={parent} />}

      {!nested && (
        <div className="mb-4 flex items-center justify-between gap-4">
          <h1 className="text-xl font-semibold">{config.title}</h1>
          {searchableFields.length > 0 && (
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={config.searchPlaceholder ?? 'Search…'}
              className="w-64 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
            />
          )}
        </div>
      )}

      <div className="overflow-x-auto rounded-md border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {expandable && <th className="w-10 px-2 py-2" />}
              {config.columns.map((col) => (
                <th
                  key={col.field}
                  style={col.width ? { width: col.width } : undefined}
                  onClick={() => toggleSort(col)}
                  className={`px-3 py-2 text-left font-medium text-gray-600 ${
                    col.sortable ? 'cursor-pointer select-none hover:text-blue-600' : ''
                  }`}
                >
                  {col.label}
                  {sort?.field === col.field && (sort.direction === 'asc' ? ' ▲' : ' ▼')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sorted.length === 0 && (
              <tr>
                <td
                  colSpan={config.columns.length + (expandable ? 1 : 0)}
                  className="px-3 py-6 text-center text-gray-400"
                >
                  No rows
                </td>
              </tr>
            )}
            {sorted.map((row, index) => {
              const key = rowKeyOf(config, row, index);
              const focused = isFocused(row);
              const isOpen = expanded === key && detail?.mode === 'accordion';
              return (
                <FragmentRow
                  key={key}
                  row={row}
                  config={config}
                  expandable={expandable}
                  isOpen={isOpen}
                  focused={focused}
                  focusRef={focused ? focusRef : undefined}
                  onExpand={() => handleExpand(key, row)}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      {modalRow && detail?.mode === 'modal' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setModalRow(null)}
        >
          <div
            className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {detail.title ? detail.title(modalRow) : config.title}
              </h2>
              <button
                onClick={() => setModalRow(null)}
                aria-label="Close"
                className="rounded px-2 py-1 text-gray-500 hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
            {detail.render(modalRow)}
          </div>
        </div>
      )}
    </div>
  );
}

function FragmentRow({
  row,
  config,
  expandable,
  isOpen,
  focused,
  focusRef,
  onExpand,
}: {
  row: Row;
  config: TableConfig;
  expandable: boolean;
  isOpen: boolean;
  focused: boolean;
  focusRef?: React.RefObject<HTMLTableRowElement | null>;
  onExpand: () => void;
}) {
  const detail = config.rowDetail;

  // Only offer an affordance when the row actually has something to show — no dead ends.
  const accordionHasChildren =
    detail?.mode === 'accordion' && ((getByPath(row, detail.childField) as Row[] | undefined)?.length ?? 0) > 0;
  const drillInHasChildren =
    detail?.mode === 'drillIn' && (!detail.hasChildren || detail.hasChildren(row));

  return (
    <>
      <tr
        ref={focusRef}
        className={focused ? 'bg-yellow-100' : 'hover:bg-gray-50'}
      >
        {expandable && (
          <td className="px-2 py-2">
            {detail?.mode === 'drillIn' && drillInHasChildren && (
              <Link
                href={detail.route(row)}
                aria-label="Drill in"
                className="inline-flex items-center gap-1 whitespace-nowrap rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 hover:bg-blue-100"
              >
                {detail.label ?? 'Open'}
                <ChevronRightIcon className="h-3.5 w-3.5" />
              </Link>
            )}
            {detail?.mode === 'modal' && (
              <button
                onClick={onExpand}
                aria-label="Expand row"
                className="text-gray-500 hover:text-blue-600"
              >
                <ChevronRightIcon className="h-5 w-5" strokeWidth={2} />
              </button>
            )}
            {detail?.mode === 'accordion' && accordionHasChildren && (
              <button
                onClick={onExpand}
                aria-label="Expand row"
                className="text-gray-500 hover:text-blue-600"
              >
                {isOpen ? (
                  <ChevronDownIcon className="h-5 w-5" strokeWidth={2} />
                ) : (
                  <ChevronRightIcon className="h-5 w-5" strokeWidth={2} />
                )}
              </button>
            )}
          </td>
        )}
        {config.columns.map((col) => (
          <td key={col.field} className="px-3 py-2 text-gray-800">
            <Cell row={row} col={col} />
          </td>
        ))}
      </tr>
      {isOpen && detail?.mode === 'accordion' && (
        <tr>
          <td colSpan={config.columns.length + 1} className="bg-gray-50 px-2 py-3">
            <DataTable
              config={detail.childConfig}
              data={(getByPath(row, detail.childField) as Row[]) ?? []}
              nested
            />
          </td>
        </tr>
      )}
    </>
  );
}

const parentFieldText = (parent: Row, f: ParentFieldConfig): string => {
  const raw = getByPath(parent, f.field);
  if (f.format) return f.format(raw, parent);
  return raw == null ? '' : String(raw);
};

/** Sticky, accordion parent-context header. Collapsed shows a one-line summary; expanded shows the field list. */
function ParentHeader({ config, parent }: { config: ParentConfig; parent: Row }) {
  const [open, setOpen] = useState(config.defaultExpanded);
  const collapsed = config.summary
    ? config.summary(parent)
    : config.fields
        .slice(0, 2)
        .map((f) => parentFieldText(parent, f))
        .join(' · ');

  return (
    <div className="sticky top-0 z-10 mb-4 rounded-md border border-gray-200 bg-white/95 px-3 py-2 shadow-sm backdrop-blur">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Toggle details"
        className="flex w-full items-center gap-2 text-left text-sm"
      >
        {open ? (
          <ChevronDoubleDownIcon className="h-3.5 w-3.5 shrink-0 text-green-600" strokeWidth={2} />
        ) : (
          <ChevronDoubleRightIcon className="h-3.5 w-3.5 shrink-0 text-green-600" strokeWidth={2} />
        )}
        {!open && <span className="truncate text-sm text-gray-600">{collapsed}</span>}
      </button>
      {open && (
        <dl className="mt-2 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2">
          {config.fields.map((f) => (
            <div key={f.field} className="flex gap-2 text-sm">
              <dt className="shrink-0 text-gray-500">{f.label}</dt>
              <dd className="font-medium text-gray-800">{parentFieldText(parent, f)}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

function Cell({ row, col }: { row: Row; col: ColumnConfig }) {
  const text = cellText(row, col);
  if (col.type === 'link' && col.link) {
    const value = getByPath(row, col.link.valueField ?? col.field);
    if (value === null || value === undefined) return <span className="text-gray-400">—</span>;
    const route = tableRegistry[col.link.table].route;
    const href = `${route}?focus=${encodeURIComponent(String(value))}&on=${encodeURIComponent(col.link.targetField)}`;
    return (
      <Link href={href} className="text-blue-600 hover:underline">
        {text}
      </Link>
    );
  }
  return <span>{text}</span>;
}
