import Link from 'next/link';
import { fetchData } from '@/lib/hac/fetch';

export const dynamic = 'force-dynamic';

type DraftPresentation = { id: number; name: string; sourceText: string | null; status: string };

export default async function Page() {
  const [draftRes, activeRes] = await Promise.all([
    fetchData<DraftPresentation[]>('presentation?status=draft', { shape: 'list' }),
    fetchData<DraftPresentation[]>('presentation?status=active', { shape: 'list' }),
  ]);
  const drafts = draftRes.data ?? [];
  const active = activeRes.data ?? [];

  return (
    <section className="max-w-4xl">
      <h1 className="mb-1 text-2xl font-semibold">Sequences</h1>
      <p className="mb-6 max-w-prose text-gray-600">
        Active sequences are searchable by program and teach order. Drafts are saved raw text
        awaiting parsing and validation.
      </p>

      <div className="mb-8">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Sequences{active.length > 0 ? ` (${active.length})` : ''}
        </h2>
        {active.length === 0 ? (
          <p className="text-sm text-gray-500">No saved sequences yet.</p>
        ) : (
          <ul className="divide-y divide-gray-100 rounded border border-gray-200 bg-white">
            {active.map((s) => (
              <li key={s.id} className="flex items-center justify-between px-4 py-3">
                <Link href={`/sequences/${s.id}`} className="min-w-0 flex-1 truncate text-sm font-medium text-blue-600 hover:underline">
                  {s.name}
                </Link>
                <Link href={`/sequences/${s.id}`} className="ml-4 shrink-0 text-sm text-gray-500 hover:text-gray-700">
                  View
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Drafts{drafts.length > 0 ? ` (${drafts.length})` : ''}
        </h2>
        <Link
          href="/sequences/import"
          className="rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Import
        </Link>
      </div>

      {drafts.length === 0 ? (
        <p className="text-sm text-gray-500">
          No drafts yet.{' '}
          <Link href="/sequences/import" className="text-blue-600 hover:underline">
            Import a sequence
          </Link>{' '}
          to get started.
        </p>
      ) : (
        <ul className="divide-y divide-gray-100 rounded border border-gray-200 bg-white">
          {drafts.map((d) => (
            <li key={d.id} className="flex items-center justify-between px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">{d.name}</p>
                {d.sourceText && (
                  <p className="truncate text-xs text-gray-400">
                    {d.sourceText.split('\n').filter(Boolean).slice(0, 2).join(' · ')}
                  </p>
                )}
              </div>
              <Link
                href={`/sequences/import?presentationId=${d.id}`}
                className="ml-4 shrink-0 text-sm text-blue-600 hover:underline"
              >
                Continue
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
