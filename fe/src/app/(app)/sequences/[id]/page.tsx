import Link from 'next/link';
import { fetchData } from '@/lib/hac/fetch';

export const dynamic = 'force-dynamic';

// Shape of GET /api/presentation/:id (see be/src/service/presentation shapeItem):
// every item carries text/textType + module/steps; text items leave module null
// and steps [], module_ref items leave text null.
type ModuleStep = {
  designator: string | null;
  count: number | null;
  warning: string | null;
  call: { name: string | null } | null;
};
type ItemStep = {
  stepOrder: number;
  textBefore: string | null;
  textAfter: string | null;
  callNameAlternate: string | null;
  warning: string | null;
  helperText: string | null;
  moduleStep: ModuleStep | null;
};
type Item = {
  id: number;
  order: number;
  type: 'text' | 'module_ref';
  text: string | null;
  textType: string | null;
  module: { id: number; name: string; isValid: boolean } | null;
  steps: ItemStep[];
};
type Presentation = {
  id: number;
  name: string;
  status: string;
  source: string | null;
  activator: string | null;
  rating: string | null;
  notes: string | null;
  items: Item[];
};

// A flattened render row: one cueing (left) cell paired with one choreo (right)
// cell. Text items are cueing-only (no choreo); each module_ref step becomes its
// own row so the spoken layer aligns with the call it decorates.
type Row = { key: string; left: React.ReactNode; right: React.ReactNode };

function Chip({ children, tone = 'slate' }: { children: React.ReactNode; tone?: 'slate' | 'indigo' | 'amber' }) {
  const tones = {
    slate: 'bg-slate-100 text-slate-700',
    indigo: 'bg-indigo-100 text-indigo-800',
    amber: 'bg-amber-100 text-amber-800',
  } as const;
  return <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${tones[tone]}`}>{children}</span>;
}

function cueingFor(step: ItemStep): React.ReactNode {
  const spoken = [
    step.textBefore,
    step.callNameAlternate ? `“${step.callNameAlternate}”` : null,
    step.textAfter,
  ]
    .filter(Boolean)
    .join(' ');
  const hasAny = spoken || step.warning || step.helperText;
  if (!hasAny) return <span className="text-gray-300">—</span>;
  return (
    <span className="flex flex-wrap items-center gap-2">
      {spoken && <span className="italic text-gray-600">{spoken}</span>}
      {step.warning && <Chip tone="amber">⚠ {step.warning}</Chip>}
      {step.helperText && (
        <span className="rounded bg-yellow-50 px-1.5 py-0.5 text-xs italic text-yellow-700" title="Caller-private; never shown to dancers">
          🔒 {step.helperText}
        </span>
      )}
    </span>
  );
}

function choreoFor(step: ItemStep): React.ReactNode {
  const ms = step.moduleStep;
  if (!ms) return <span className="text-gray-400">unresolved step</span>;
  return (
    <span className="flex flex-wrap items-center gap-2">
      {ms.designator && <Chip tone="indigo">{ms.designator}</Chip>}
      <span className="font-medium text-gray-900">{ms.call?.name ?? <span className="text-gray-400">unnamed call</span>}</span>
      {ms.count != null && <Chip>×{ms.count}</Chip>}
      {ms.warning && <Chip tone="amber">⚠ {ms.warning}</Chip>}
    </span>
  );
}

function buildRows(items: Item[]): Row[] {
  const rows: Row[] = [];
  for (const item of [...items].sort((a, b) => a.order - b.order)) {
    if (item.type === 'text') {
      rows.push({
        key: `t-${item.id}`,
        left: (
          <span className="flex items-center gap-2">
            {item.textType && (
              <span className="rounded bg-gray-200 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-600">
                {item.textType}
              </span>
            )}
            <span className="italic text-gray-700">{item.text || <span className="text-gray-400">(empty)</span>}</span>
          </span>
        ),
        right: <span className="text-gray-300">—</span>,
      });
      continue;
    }
    for (const step of [...item.steps].sort((a, b) => a.stepOrder - b.stepOrder)) {
      rows.push({ key: `s-${item.id}-${step.stepOrder}`, left: cueingFor(step), right: choreoFor(step) });
    }
  }
  return rows;
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const seqId = Number(id);
  if (!Number.isInteger(seqId)) return <NotFound />;

  const { data } = await fetchData<Presentation>(`presentation/${seqId}`);
  if (!data) return <NotFound />;

  const rows = buildRows(data.items);
  const meta = [data.status, data.source, data.activator, data.rating].filter(Boolean);

  return (
    <section className="max-w-4xl">
      <div className="mb-1 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">{data.name}</h1>
        <Link href={`/sequences/import?presentationId=${data.id}`} className="shrink-0 text-sm text-blue-600 hover:underline">
          Edit
        </Link>
      </div>
      {meta.length > 0 && <p className="mb-5 text-sm text-gray-500">{meta.join(' · ')}</p>}

      {rows.length === 0 ? (
        <p className="text-sm text-gray-500">This sequence has no steps yet.</p>
      ) : (
        <div className="overflow-hidden rounded border border-gray-200">
          <div className="grid grid-cols-2 border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
            <div className="px-3 py-2">Cueing</div>
            <div className="border-l border-gray-200 px-3 py-2">Choreography</div>
          </div>
          {rows.map((row) => (
            <div key={row.key} className="grid grid-cols-2 border-b border-gray-100 text-sm last:border-b-0">
              <div data-col="text" className="px-3 py-1.5">{row.left}</div>
              <div data-col="choreo" className="border-l border-gray-100 px-3 py-1.5">{row.right}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function NotFound() {
  return (
    <section className="max-w-4xl">
      <h1 className="mb-2 text-2xl font-semibold">Sequence not found</h1>
      <p className="text-sm text-gray-500">
        No sequence with that id.{' '}
        <Link href="/sequences" className="text-blue-600 hover:underline">
          Back to sequences
        </Link>
        .
      </p>
    </section>
  );
}
