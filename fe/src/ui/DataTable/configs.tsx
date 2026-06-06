'use client';

import { notFound } from 'next/navigation';
import { DataTable } from './DataTable';
import { defineTable } from './registry';
import type { TableConfig } from './types';

type Row = Record<string, unknown>;
const obj = (v: unknown) => (v ?? {}) as Record<string, unknown>;

// ── Calls (accordion → FASRs) ────────────────────────────────────────────────

const fasrChildConfig: TableConfig = defineTable(
  {
    tableId: 'call.fasrs',
    title: 'Formations (FASRs)',
    columns: [
      { field: 'startId', label: 'Start', type: 'link', link: { table: 'formation', targetField: 'formId' } },
      { field: 'endId', label: 'End', type: 'link', link: { table: 'formation', targetField: 'formId' } },
      { field: 'inFlowRotation', label: 'In Rot', type: 'enum' },
      { field: 'outFlowRotation', label: 'Out Rot', type: 'enum' },
      { field: 'timing', label: 'Timing', type: 'number' },
      { field: 'taminationsDifficulty', label: 'Tam Diff', type: 'number' },
    ],
  },
  {
    rowKey: (r) => `${r.callId}-${r.startId}`,
    columns: {
      startId: { format: (_v, r) => String(obj(r.startForm).name ?? r.startId) },
      endId: { format: (_v, r) => String(obj(r.endForm).name ?? r.endId) },
    },
  },
);

const callsConfig: TableConfig = defineTable(
  {
    tableId: 'call',
    title: 'Calls',
    searchPlaceholder: 'Search calls…',
    rowKey: 'callId',
    defaultSort: { field: 'name', direction: 'asc' },
    columns: [
      { field: 'callId', label: 'ID', type: 'number', sortable: true, width: '4rem' },
      { field: 'name', label: 'Name', searchable: true, sortable: true },
      { field: 'preferredDisplay', label: 'Preferred' },
      { field: 'familyId', label: 'Family', type: 'link', link: { table: 'call-family', targetField: 'familyId' } },
      { field: 'tamSeq', label: 'Tam' },
      { field: 'sdSeq', label: 'SD' },
    ],
  },
  {
    columns: { familyId: { format: (_v, r) => String(obj(r.callFamily).name ?? '') } },
    rowDetail: { mode: 'accordion', childField: 'formations', childConfig: fasrChildConfig },
  },
);

// ── Call families ────────────────────────────────────────────────────────────

const callFamiliesConfig: TableConfig = defineTable(
  {
    tableId: 'call-family',
    title: 'Call Families',
    searchPlaceholder: 'Search families…',
    rowKey: 'familyId',
    defaultSort: { field: 'name', direction: 'asc' },
    columns: [
      { field: 'familyId', label: 'ID', type: 'number', sortable: true, width: '4rem' },
      { field: 'name', label: 'Name', searchable: true, sortable: true },
      {
        field: 'callCount',
        label: 'Calls',
        type: 'link',
        link: { table: 'call', targetField: 'familyId', valueField: 'familyId' },
      },
    ],
  },
  {
    columns: { callCount: { format: (_v, r) => String(obj(r._count).calls ?? 0) } },
  },
);

// ── Programs (drill-in → teach orders) ───────────────────────────────────────

const programsConfig: TableConfig = defineTable(
  {
    tableId: 'program',
    title: 'Programs',
    searchPlaceholder: 'Search programs…',
    rowKey: 'programId',
    defaultSort: { field: 'order', direction: 'asc' },
    columns: [
      { field: 'programId', label: 'ID', type: 'number', sortable: true, width: '4rem' },
      { field: 'name', label: 'Name', searchable: true, sortable: true },
      { field: 'abbreviation', label: 'Abbr', searchable: true },
      { field: 'order', label: 'Order', type: 'number', sortable: true },
      { field: 'isActive', label: 'Active' },
      { field: 'teachOrderCount', label: 'Teach Orders', type: 'number' },
    ],
  },
  {
    columns: {
      isActive: { format: (v) => (v ? 'Yes' : 'No') },
      teachOrderCount: { format: (_v, r) => String(obj(r._count).teachOrders ?? 0) },
    },
    rowDetail: {
      mode: 'drillIn',
      label: 'Teach orders',
      route: (r) => `/reference/programs/${r.programId}/teach-orders`,
      hasChildren: (r) => Number(obj(r._count).teachOrders ?? 0) > 0,
    },
  },
);

// ── Formations ───────────────────────────────────────────────────────────────

const formationsConfig: TableConfig = defineTable({
  tableId: 'formation',
  title: 'Formations',
  searchPlaceholder: 'Search formations…',
  rowKey: 'formId',
  defaultSort: { field: 'name', direction: 'asc' },
  columns: [
    { field: 'formId', label: 'ID', type: 'number', sortable: true, width: '4rem' },
    { field: 'name', label: 'Name', searchable: true, sortable: true },
    { field: 'description', label: 'Description' },
    { field: 'dancerCount', label: 'Dancers', type: 'number', sortable: true, width: '6rem' },
    { field: 'clCode', label: 'CL' },
    { field: 'sdCode', label: 'SD' },
  ],
});

// ── Call formations (per-FASR catalog) ───────────────────────────────────────

const callFormationsConfig: TableConfig = defineTable(
  {
    tableId: 'call-formation',
    title: 'Call Formations',
    searchPlaceholder: 'Search by call…',
    defaultSort: { field: 'call.name', direction: 'asc' },
    columns: [
      {
        field: 'call.name',
        label: 'Call',
        type: 'link',
        searchable: true,
        sortable: true,
        link: { table: 'call', targetField: 'callId', valueField: 'callId' },
      },
      {
        field: 'startForm.name',
        label: 'Start',
        type: 'link',
        sortable: true,
        link: { table: 'formation', targetField: 'formId', valueField: 'startId' },
      },
      {
        field: 'endForm.name',
        label: 'End',
        type: 'link',
        link: { table: 'formation', targetField: 'formId', valueField: 'endId' },
      },
      { field: 'inFlowRotation', label: 'In Rot', type: 'enum' },
      { field: 'outFlowRotation', label: 'Out Rot', type: 'enum' },
      { field: 'timing', label: 'Timing', type: 'number' },
      { field: 'taminationsDifficulty', label: 'Tam Diff', type: 'number' },
    ],
  },
  {
    rowKey: (r) => `${r.callId}-${r.startId}`,
  },
);

// ── Sequences (modal → step list) ────────────────────────────────────────────

const stepDisplay = (step: Row): string => {
  if (step.text) return String(step.text);
  const cf = obj(step.callFormation);
  const call = obj(cf.call);
  return String(call.name ?? step.type ?? '');
};

const sequencesConfig: TableConfig = defineTable(
  {
    tableId: 'sequence',
    title: 'Sequences',
    searchPlaceholder: 'Search sequences…',
    rowKey: 'seqId',
    defaultSort: { field: 'name', direction: 'asc' },
    columns: [
      { field: 'seqId', label: 'ID', type: 'number', sortable: true, width: '4rem' },
      { field: 'name', label: 'Name', searchable: true, sortable: true },
      { field: 'startFormation.name', label: 'Start Formation' },
      { field: 'rating', label: 'Rating', type: 'enum' },
      { field: 'isValid', label: 'Valid' },
      { field: 'isVerified', label: 'Verified' },
    ],
  },
  {
    columns: {
      isValid: { format: (v) => (v ? 'Yes' : 'No') },
      isVerified: { format: (v) => (v ? 'Yes' : 'No') },
    },
    rowDetail: {
      mode: 'modal',
      title: (r) => `${r.name} — steps`,
      render: (r) => {
        const steps = (r.calls as Row[]) ?? [];
        if (steps.length === 0) return <p className="text-gray-500">No steps.</p>;
        return (
          <ol className="list-decimal space-y-1 pl-6">
            {steps.map((s) => (
              <li key={String(s.order)}>
                <span className="font-medium">{stepDisplay(s)}</span>
                <span className="ml-2 text-xs uppercase text-gray-400">{String(s.type)}</span>
                {Boolean(s.helperText) && (
                  <span className="ml-2 text-sm italic text-gray-500">{String(s.helperText)}</span>
                )}
              </li>
            ))}
          </ol>
        );
      },
    },
  },
);

// ── Program teach orders (drill-in target) ───────────────────────────────────

const programTeachOrdersConfig: TableConfig = defineTable(
  {
    tableId: 'program-teach-orders',
    title: 'Teach Orders',
    searchPlaceholder: 'Search teach orders…',
    rowKey: 'id',
    defaultSort: { field: 'name', direction: 'asc' },
    columns: [
      { field: 'id', label: 'ID', type: 'number', sortable: true, width: '4rem' },
      { field: 'name', label: 'Name', searchable: true, sortable: true },
      { field: 'entryCount', label: 'Entries', type: 'number' },
    ],
  },
  {
    columns: { entryCount: { format: (_v, r) => String(obj(r._count).entries ?? 0) } },
    rowDetail: {
      mode: 'drillIn',
      label: 'Entries',
      route: (r) => `/reference/teach-orders/${r.id}/entries`,
      hasChildren: (r) => Number(obj(r._count).entries ?? 0) > 0,
    },
  },
);

// ── Teach orders (top-level, drill-in → entries) ─────────────────────────────

const teachOrdersConfig: TableConfig = defineTable(
  {
    tableId: 'teach-order',
    title: 'Teach Orders',
    searchPlaceholder: 'Search teach orders…',
    rowKey: 'id',
    defaultSort: { field: 'name', direction: 'asc' },
    columns: [
      { field: 'id', label: 'ID', type: 'number', sortable: true, width: '4rem' },
      { field: 'name', label: 'Name', searchable: true, sortable: true },
      { field: 'programId', label: 'Program', type: 'link', link: { table: 'program', targetField: 'programId' } },
      { field: 'entryCount', label: 'Entries', type: 'number' },
    ],
  },
  {
    columns: {
      programId: { format: (_v, r) => String(obj(r.program).name ?? '') },
      entryCount: { format: (_v, r) => String(obj(r._count).entries ?? 0) },
    },
    rowDetail: {
      mode: 'drillIn',
      label: 'Entries',
      route: (r) => `/reference/teach-orders/${r.id}/entries`,
      hasChildren: (r) => Number(obj(r._count).entries ?? 0) > 0,
    },
  },
);

// ── Teach order entries (drill-in target, sticky parent header + accordion) ──

const fasrEntryChildConfig: TableConfig = defineTable(
  {
    tableId: 'teach-order-entries.fasrs',
    title: 'FASRs',
    columns: [
      { field: 'callId', label: 'Call', type: 'link', link: { table: 'call', targetField: 'callId' } },
      { field: 'startId', label: 'Start', type: 'link', link: { table: 'formation', targetField: 'formId' } },
      { field: 'endId', label: 'End', type: 'link', link: { table: 'formation', targetField: 'formId' } },
    ],
  },
  {
    rowKey: (r) => `${r.callId}-${r.startId}-${r.fasrOrder}`,
    columns: {
      callId: { format: (_v, r) => String(obj(obj(r.callFormation).call).name ?? r.callId) },
      startId: { format: (_v, r) => String(obj(obj(r.callFormation).startForm).name ?? r.startId) },
      endId: { format: (_v, r) => String(obj(obj(r.callFormation).endForm).name ?? '') },
    },
  },
);

const teachOrderEntriesConfig: TableConfig = defineTable(
  {
    tableId: 'teach-order-entries',
    title: 'Entries',
    searchPlaceholder: 'Search entries…',
    defaultSort: { field: 'entryOrder', direction: 'asc' },
    columns: [
      { field: 'displayOrder', label: '#', sortable: true, width: '4rem' },
      { field: 'entryType', label: 'Type', type: 'enum', sortable: true },
      { field: 'callId', label: 'Call / Family', type: 'link', searchable: true, link: { table: 'call', targetField: 'callId' } },
      { field: 'week', label: 'Week', type: 'number', sortable: true },
    ],
    parent: {
      defaultExpanded: false,
      fields: [
        { field: 'program.name', label: 'Program', order: 1 },
        { field: 'name', label: 'Name', order: 2 },
        { field: 'source', label: 'Source', order: 3 },
        { field: 'notes', label: 'Notes', order: 4 },
        { field: 'callCount', label: 'Calls', order: 5 },
        { field: 'entries', label: 'Entries', order: 6 },
      ],
    },
  },
  {
    rowKey: (r) => `${r.teachOrderId}-${r.entryOrder}`,
    columns: {
      callId: { format: (_v, r) => String(obj(r.call).name ?? obj(r.callFamily).name ?? r.label ?? '') },
    },
    parent: {
      summary: (p) => {
        const program = obj(p.program).name;
        const n = Array.isArray(p.entries) ? p.entries.length : 0;
        const parts = [program, p.name].filter(Boolean);
        return `${parts.join(' · ')} · ${n} ${n === 1 ? 'entry' : 'entries'}`;
      },
      fields: {
        // `callCount` is a synthetic field (no path on the row) — the format derives it from entries.
        callCount: {
          format: (_v, p) =>
            String((Array.isArray(p.entries) ? p.entries : []).filter((e) => obj(e).entryType === 'call').length),
        },
        entries: { format: (v) => String(Array.isArray(v) ? v.length : 0) },
      },
    },
    rowDetail: { mode: 'accordion', childField: 'fasrs', childConfig: fasrEntryChildConfig },
  },
);

const configs: Record<string, TableConfig> = {
  call: callsConfig,
  'call-family': callFamiliesConfig,
  program: programsConfig,
  formation: formationsConfig,
  'call-formation': callFormationsConfig,
  sequence: sequencesConfig,
  'teach-order': teachOrdersConfig,
  'teach-order-entries': teachOrderEntriesConfig,
  'program-teach-orders': programTeachOrdersConfig,
};

const knownTables = new Set(Object.keys(configs));

/**
 * Resolves a `?focus=`/`?on=` param for a specific table. Accepts both the namespaced form
 * `<tableId>:<value>` (consumed only by the matching table; ignored by others) and the legacy
 * bare form `<value>` (applies to single-table pages). A colon that isn't a known-table prefix
 * is treated as part of the value, so values may safely contain colons.
 *
 * `focus` and `on` are resolved independently. A mismatched pair — e.g. `focus=call:1&on=program:x`
 * on the call table — resolves `focus` to `1` but `on` to null, so nothing highlights (no error).
 * In practice link cells always emit a matched pair, so this only arises from hand-built URLs.
 */
function resolveFocus(table: string, raw: string | null): string | null {
  if (!raw) return null;
  const idx = raw.indexOf(':');
  if (idx === -1) return raw;
  const prefix = raw.slice(0, idx);
  if (!knownTables.has(prefix)) return raw;
  return prefix === table ? raw.slice(idx + 1) : null;
}

export function TableView({
  table,
  data,
  parent,
  focus,
  on,
}: {
  table: string;
  data: Row[];
  /** Parent-context row rendered in the sticky header (when the config declares a `parent` block). */
  parent?: Row;
  focus?: string | null;
  on?: string | null;
}) {
  const config = configs[table];
  if (!config) notFound();
  return (
    <DataTable
      config={config}
      data={data}
      parent={parent}
      focus={resolveFocus(table, focus ?? null)}
      focusOn={resolveFocus(table, on ?? null)}
    />
  );
}
