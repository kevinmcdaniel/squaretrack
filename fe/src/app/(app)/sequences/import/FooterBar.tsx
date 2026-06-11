'use client';

import { useState, useTransition } from 'react';

export type SaveOutcome = { ok: boolean; message: string };

// Sticky save bar. Save is gated on every choreo step being fully resolved
// (call + formation) — the module endpoint rejects a step without a valid
// (callId, startId). A saved-but-chain-broken module is allowed and reported.
export function FooterBar({
  canSave,
  blockedCount,
  onSave,
}: {
  canSave: boolean;
  blockedCount: number;
  onSave: () => Promise<SaveOutcome>;
}) {
  const [pending, startTransition] = useTransition();
  const [outcome, setOutcome] = useState<SaveOutcome | null>(null);

  const save = () => {
    setOutcome(null);
    startTransition(async () => setOutcome(await onSave()));
  };

  return (
    <div className="sticky bottom-0 z-10 mt-4 flex flex-wrap items-center gap-3 border-t border-gray-200 bg-white/95 py-3 backdrop-blur">
      <button
        type="button"
        onClick={save}
        disabled={!canSave || pending}
        className="rounded bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        {pending ? 'Saving…' : 'Save sequence'}
      </button>
      {!canSave && blockedCount > 0 && (
        <span className="text-sm text-amber-700">
          Resolve {blockedCount} step{blockedCount === 1 ? '' : 's'} (call + formation) before saving.
        </span>
      )}
      {outcome && (
        <span className={`text-sm ${outcome.ok ? 'text-emerald-700' : 'text-red-600'}`}>{outcome.message}</span>
      )}
    </div>
  );
}
