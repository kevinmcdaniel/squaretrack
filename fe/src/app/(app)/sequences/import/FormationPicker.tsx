'use client';

import { useMemo, useState, useTransition } from 'react';
import { addCallFormation, addFormation, type FormationOption } from './actions';

// Picks a choreo step's start formation from the FASRs registered for its call. When
// the call has no registered FASR (or the right one is missing), the caller can link
// an existing formation to the call or mint a new formation and link it in one go.
// A freshly linked FASR defaults endFormation = startFormation; the module validator
// flags the resulting chain break on save (#21/#71).
export function FormationPicker({
  callId,
  options,
  selectedId,
  allFormations,
  onPick,
}: {
  callId: number;
  options: FormationOption[];
  selectedId: number | null;
  allFormations: FormationOption[];
  onPick: (opt: FormationOption) => void;
}) {
  const [open, setOpen] = useState(false);
  const [linkId, setLinkId] = useState<string>('');
  const [newName, setNewName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const linkable = useMemo(() => {
    const have = new Set(options.map((o) => o.startId));
    return allFormations.filter((f) => !have.has(f.startId));
  }, [options, allFormations]);

  const linkExisting = () => {
    if (!linkId) return;
    const startId = Number(linkId);
    setError(null);
    startTransition(async () => {
      const res = await addCallFormation({ callId, startId, endId: startId });
      if (!res.ok) return setError(res.error);
      onPick(res.data);
      setOpen(false);
      setLinkId('');
    });
  };

  const createAndLink = () => {
    const name = newName.trim();
    if (!name) return;
    setError(null);
    startTransition(async () => {
      const created = await addFormation(name);
      if (!created.ok) return setError(created.error);
      const link = await addCallFormation({ callId, startId: created.data.startId, endId: created.data.startId });
      if (!link.ok) return setError(link.error);
      onPick(created.data);
      setNewName('');
      setOpen(false);
    });
  };

  return (
    <span className="inline-flex flex-wrap items-center gap-1">
      {options.length > 0 ? (
        <select
          value={selectedId ?? ''}
          onChange={(e) => {
            const opt = options.find((o) => o.startId === Number(e.target.value));
            if (opt) onPick(opt);
          }}
          className={`rounded border px-1.5 py-0.5 text-xs ${selectedId == null ? 'border-amber-400 bg-amber-50 text-amber-800' : 'border-slate-300 bg-slate-50 text-slate-700'}`}
        >
          <option value="" disabled>
            choose formation…
          </option>
          {options.map((o) => (
            <option key={o.startId} value={o.startId}>
              {o.name}
            </option>
          ))}
        </select>
      ) : (
        <span className="rounded bg-amber-50 px-1.5 py-0.5 text-xs text-amber-800">no start formation</span>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600 hover:bg-gray-200"
      >
        {open ? 'close' : '+ formation'}
      </button>

      {open && (
        <span className="inline-flex flex-wrap items-center gap-1 rounded border border-gray-200 bg-white p-1">
          <select
            value={linkId}
            onChange={(e) => setLinkId(e.target.value)}
            className="rounded border border-gray-300 px-1.5 py-0.5 text-xs"
          >
            <option value="">link existing…</option>
            {linkable.map((f) => (
              <option key={f.startId} value={f.startId}>
                {f.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            disabled={pending || !linkId}
            onClick={linkExisting}
            className="rounded bg-blue-600 px-1.5 py-0.5 text-[10px] font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            link
          </button>
          <span className="text-[10px] text-gray-400">or</span>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="new formation name"
            className="w-32 rounded border border-gray-300 px-1.5 py-0.5 text-xs"
          />
          <button
            type="button"
            disabled={pending || !newName.trim()}
            onClick={createAndLink}
            className="rounded bg-emerald-600 px-1.5 py-0.5 text-[10px] font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            create
          </button>
        </span>
      )}
      {error && <span className="text-[10px] text-red-600">{error}</span>}
    </span>
  );
}
