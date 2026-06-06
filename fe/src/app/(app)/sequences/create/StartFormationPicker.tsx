'use client';

import Link from 'next/link';
import { useState } from 'react';

export type PickableFormation = {
  formId: number;
  name: string;
  dancerCount: number | null;
};

// Dancer-count buckets the starting-formation picker offers. Full square (8) is
// the default; smaller counts are teaching drills. Wired to `?dancers=` on the
// formations endpoint (issue #66).
const TABS: { value: number; label: string }[] = [
  { value: 8, label: 'Full square (8)' },
  { value: 4, label: 'Lines & boxes (4)' },
  { value: 2, label: 'Pairs (2)' },
];

export function StartFormationPicker({
  formations,
  dancers,
}: {
  formations: PickableFormation[];
  dancers: number;
}) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selected = formations.find((f) => f.formId === selectedId) ?? null;

  return (
    <div className="space-y-4">
      <div role="tablist" aria-label="Dancer count" className="flex flex-wrap gap-2">
        {TABS.map((t) => {
          const active = t.value === dancers;
          return (
            <Link
              key={t.value}
              href={`/sequences/create?dancers=${t.value}`}
              role="tab"
              aria-selected={active}
              className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t.label}
            </Link>
          );
        })}
      </div>

      <p className="text-sm text-gray-600">
        Starting formation:{' '}
        <span className="font-medium text-gray-900">{selected ? selected.name : 'none selected'}</span>
      </p>

      <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
        {formations.length === 0 && (
          <li className="text-gray-500">No formations for this dancer count.</li>
        )}
        {formations.map((f) => {
          const active = f.formId === selectedId;
          return (
            <li key={f.formId}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedId(f.formId)}
                className={`w-full rounded border px-3 py-2 text-left text-sm transition-colors ${
                  active ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {f.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
