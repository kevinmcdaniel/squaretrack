'use client';

import { DataTable } from './DataTable';
import { defineTableConfig } from './registry';
import type { TableConfig } from './types';

type Row = Record<string, unknown>;
const obj = (v: unknown) => (v ?? {}) as Record<string, unknown>;

// ── Calls (accordion → FASRs) ────────────────────────────────────────────────

const fasrChildConfig: TableConfig = defineTableConfig({
  title: 'Formations (FASRs)',
  rowKey: (r) => `${r.callId}-${r.startId}`,
  columns: [
    {
      field: 'startId',
      label: 'Start',
      type: 'link',
      link: { table: 'formation', targetField: 'formId' },
      format: (_v, r) => String(obj(r.startForm).name ?? r.startId),
    },
    {
      field: 'endId',
      label: 'End',
      type: 'link',
      link: { table: 'formation', targetField: 'formId' },
      format: (_v, r) => String(obj(r.endForm).name ?? r.endId),
    },
    { field: 'inFlowRotation', label: 'In Rot', type: 'enum' },
    { field: 'outFlowRotation', label: 'Out Rot', type: 'enum' },
    { field: 'timing', label: 'Timing', type: 'number' },
    { field: 'taminationsDifficulty', label: 'Tam Diff', type: 'number' },
  ],
});

const callsConfig: TableConfig = defineTableConfig({
  title: 'Calls',
  searchPlaceholder: 'Search calls…',
  rowKey: (r) => String(r.callId),
  defaultSort: { field: 'name', direction: 'asc' },
  columns: [
    { field: 'callId', label: 'ID', type: 'number', sortable: true, width: '4rem' },
    { field: 'name', label: 'Name', searchable: true, sortable: true },
    { field: 'preferredDisplay', label: 'Preferred' },
    {
      field: 'familyId',
      label: 'Family',
      type: 'link',
      link: { table: 'call-family', targetField: 'familyId' },
      format: (_v, r) => String(obj(r.callFamily).name ?? ''),
    },
    { field: 'tamSeq', label: 'Tam' },
    { field: 'sdSeq', label: 'SD' },
  ],
  rowDetail: { mode: 'accordion', childField: 'formations', childConfig: fasrChildConfig },
});

// ── Call families ────────────────────────────────────────────────────────────

const callFamiliesConfig: TableConfig = defineTableConfig({
  title: 'Call Families',
  searchPlaceholder: 'Search families…',
  rowKey: (r) => String(r.familyId),
  defaultSort: { field: 'name', direction: 'asc' },
  columns: [
    { field: 'familyId', label: 'ID', type: 'number', sortable: true, width: '4rem' },
    { field: 'name', label: 'Name', searchable: true, sortable: true },
    {
      field: 'callCount',
      label: 'Calls',
      type: 'link',
      link: { table: 'call', targetField: 'familyId', valueField: 'familyId' },
      format: (_v, r) => String(obj(r._count).calls ?? 0),
    },
  ],
});

// ── Programs (drill-in → teach orders) ───────────────────────────────────────

const programsConfig: TableConfig = defineTableConfig({
  title: 'Programs',
  searchPlaceholder: 'Search programs…',
  rowKey: (r) => String(r.programId),
  defaultSort: { field: 'order', direction: 'asc' },
  columns: [
    { field: 'programId', label: 'ID', type: 'number', sortable: true, width: '4rem' },
    { field: 'name', label: 'Name', searchable: true, sortable: true },
    { field: 'abbreviation', label: 'Abbr', searchable: true },
    { field: 'order', label: 'Order', type: 'number', sortable: true },
    { field: 'isActive', label: 'Active', format: (v) => (v ? 'Yes' : 'No') },
    { field: 'teachOrderCount', label: 'Teach Orders', type: 'number', format: (_v, r) => String(obj(r._count).teachOrders ?? 0) },
  ],
  rowDetail: {
    mode: 'drillIn',
    label: 'Teach orders',
    route: (r) => `/data/programs/${r.programId}/teach-orders`,
    hasChildren: (r) => Number(obj(r._count).teachOrders ?? 0) > 0,
  },
});

// ── Formations ───────────────────────────────────────────────────────────────

const formationsConfig: TableConfig = defineTableConfig({
  title: 'Formations',
  searchPlaceholder: 'Search formations…',
  rowKey: (r) => String(r.formId),
  defaultSort: { field: 'name', direction: 'asc' },
  columns: [
    { field: 'formId', label: 'ID', type: 'number', sortable: true, width: '4rem' },
    { field: 'name', label: 'Name', searchable: true, sortable: true },
    { field: 'description', label: 'Description' },
    { field: 'clCode', label: 'CL' },
    { field: 'sdCode', label: 'SD' },
  ],
});

// ── Call formations (per-FASR catalog) ───────────────────────────────────────

const callFormationsConfig: TableConfig = defineTableConfig({
  title: 'Call Formations',
  searchPlaceholder: 'Search by call…',
  rowKey: (r) => `${r.callId}-${r.startId}`,
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
});

// ── Sequences (modal → step list) ────────────────────────────────────────────

const stepDisplay = (step: Row): string => {
  if (step.text) return String(step.text);
  const cf = obj(step.callFormation);
  const call = obj(cf.call);
  return String(call.name ?? step.type ?? '');
};

const sequencesConfig: TableConfig = defineTableConfig({
  title: 'Sequences',
  searchPlaceholder: 'Search sequences…',
  rowKey: (r) => String(r.seqId),
  defaultSort: { field: 'name', direction: 'asc' },
  columns: [
    { field: 'seqId', label: 'ID', type: 'number', sortable: true, width: '4rem' },
    { field: 'name', label: 'Name', searchable: true, sortable: true },
    { field: 'startFormation.name', label: 'Start Formation' },
    { field: 'rating', label: 'Rating', type: 'enum' },
    { field: 'isValid', label: 'Valid', format: (v) => (v ? 'Yes' : 'No') },
    { field: 'isVerified', label: 'Verified', format: (v) => (v ? 'Yes' : 'No') },
  ],
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
});

// ── Program teach orders (drill-in target) ───────────────────────────────────

const programTeachOrdersConfig: TableConfig = defineTableConfig({
  title: 'Teach Orders',
  searchPlaceholder: 'Search teach orders…',
  rowKey: (r) => String(r.id),
  defaultSort: { field: 'name', direction: 'asc' },
  columns: [
    { field: 'id', label: 'ID', type: 'number', sortable: true, width: '4rem' },
    { field: 'name', label: 'Name', searchable: true, sortable: true },
    { field: 'entryCount', label: 'Entries', type: 'number', format: (_v, r) => String(obj(r._count).entries ?? 0) },
  ],
  rowDetail: {
    mode: 'drillIn',
    label: 'Entries',
    route: (r) => `/data/teach-orders/${r.id}/entries`,
    hasChildren: (r) => Number(obj(r._count).entries ?? 0) > 0,
  },
});

// ── Teach orders (top-level, drill-in → entries) ─────────────────────────────

const teachOrdersConfig: TableConfig = defineTableConfig({
  title: 'Teach Orders',
  searchPlaceholder: 'Search teach orders…',
  rowKey: (r) => String(r.id),
  defaultSort: { field: 'name', direction: 'asc' },
  columns: [
    { field: 'id', label: 'ID', type: 'number', sortable: true, width: '4rem' },
    { field: 'name', label: 'Name', searchable: true, sortable: true },
    {
      field: 'programId',
      label: 'Program',
      type: 'link',
      link: { table: 'program', targetField: 'programId' },
      format: (_v, r) => String(obj(r.program).name ?? ''),
    },
    { field: 'entryCount', label: 'Entries', type: 'number', format: (_v, r) => String(obj(r._count).entries ?? 0) },
  ],
  rowDetail: {
    mode: 'drillIn',
    label: 'Entries',
    route: (r) => `/data/teach-orders/${r.id}/entries`,
    hasChildren: (r) => Number(obj(r._count).entries ?? 0) > 0,
  },
});

// ── Teach order entries (drill-in target, accordion → FASRs) ─────────────────

const fasrEntryChildConfig: TableConfig = defineTableConfig({
  title: 'FASRs',
  rowKey: (r) => `${r.callId}-${r.startId}-${r.fasrOrder}`,
  columns: [
    {
      field: 'callId',
      label: 'Call',
      type: 'link',
      link: { table: 'call', targetField: 'callId' },
      format: (_v, r) => String(obj(obj(r.callFormation).call).name ?? r.callId),
    },
    {
      field: 'startId',
      label: 'Start',
      type: 'link',
      link: { table: 'formation', targetField: 'formId' },
      format: (_v, r) => String(obj(obj(r.callFormation).startForm).name ?? r.startId),
    },
    {
      field: 'endId',
      label: 'End',
      link: { table: 'formation', targetField: 'formId' },
      type: 'link',
      format: (_v, r) => String(obj(obj(r.callFormation).endForm).name ?? ''),
    },
  ],
});

const teachOrderEntriesConfig: TableConfig = defineTableConfig({
  title: 'Entries',
  searchPlaceholder: 'Search entries…',
  rowKey: (r) => `${r.teachOrderId}-${r.entryOrder}`,
  defaultSort: { field: 'entryOrder', direction: 'asc' },
  columns: [
    { field: 'displayOrder', label: '#', sortable: true, width: '4rem' },
    { field: 'entryType', label: 'Type', type: 'enum', sortable: true },
    {
      field: 'callId',
      label: 'Call / Family',
      type: 'link',
      searchable: true,
      link: { table: 'call', targetField: 'callId' },
      format: (_v, r) =>
        String(obj(r.call).name ?? obj(r.callFamily).name ?? r.label ?? ''),
    },
    { field: 'week', label: 'Week', type: 'number', sortable: true },
  ],
  rowDetail: { mode: 'accordion', childField: 'fasrs', childConfig: fasrEntryChildConfig },
});

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

export function TableView({
  table,
  data,
  focus,
  on,
}: {
  table: keyof typeof configs;
  data: Row[];
  focus?: string | null;
  on?: string | null;
}) {
  return <DataTable config={configs[table]} data={data} focus={focus} focusOn={on} />;
}
