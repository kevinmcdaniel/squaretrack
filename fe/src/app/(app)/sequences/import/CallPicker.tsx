'use client';

import { useMemo, useState, useTransition } from 'react';
import { addCall, addSynonym, type CallOption } from './actions';

// Resolves one choreo step's call. Filters the catalog client-side; when nothing
// matches, the caller can mint a new call or attach the unmatched text as a synonym
// of an existing one — both persist so later steps (and future parses) resolve too.
export function CallPicker({
  callText,
  options,
  onResolve,
  onCatalogAdd,
}: {
  callText: string;
  options: CallOption[];
  onResolve: (call: CallOption) => void;
  onCatalogAdd: (call: CallOption) => void; // a brand-new call to fold into the shared catalog
}) {
  const [query, setQuery] = useState(callText);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const trimmed = query.trim();
  const filtered = useMemo(() => {
    const q = trimmed.toLowerCase();
    const matches = q ? options.filter((o) => o.name.toLowerCase().includes(q)) : options;
    return matches.slice(0, 8);
  }, [trimmed, options]);
  const exact = options.find((o) => o.name.toLowerCase() === trimmed.toLowerCase());

  const handleAddCall = () => {
    setError(null);
    startTransition(async () => {
      const res = await addCall(trimmed);
      if (!res.ok) return setError(res.error);
      onCatalogAdd(res.data);
      onResolve(res.data);
    });
  };

  const handleAddSynonym = (target: CallOption) => {
    setError(null);
    startTransition(async () => {
      const res = await addSynonym(target.callId, callText);
      if (!res.ok) return setError(res.error);
      onResolve(target);
    });
  };

  return (
    <div className="w-full max-w-md rounded border border-gray-300 bg-white p-2 shadow-sm">
      <input
        autoFocus
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search calls…"
        className="mb-2 w-full rounded border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
      />
      <ul className="max-h-44 divide-y divide-gray-100 overflow-auto">
        {filtered.length === 0 && <li className="px-1 py-1.5 text-xs text-gray-400">No matching calls.</li>}
        {filtered.map((o) => {
          const aliasDiffers = o.name.toLowerCase() !== callText.trim().toLowerCase();
          return (
            <li key={o.callId} className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => onResolve(o)}
                className="flex-1 rounded px-1 py-1.5 text-left text-sm hover:bg-blue-50"
              >
                {o.name}
              </button>
              {aliasDiffers && (
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => handleAddSynonym(o)}
                  title={`Save “${callText}” as a synonym of ${o.name}`}
                  className="shrink-0 rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                >
                  + syn
                </button>
              )}
            </li>
          );
        })}
      </ul>
      {trimmed && !exact && (
        <button
          type="button"
          disabled={pending}
          onClick={handleAddCall}
          className="mt-2 w-full rounded bg-emerald-600 px-2 py-1 text-xs font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          + Add new call “{trimmed}”
        </button>
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
