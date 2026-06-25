'use client';

import { useState, useTransition } from 'react';

export type SaveOutcome = { ok: boolean; message: string };

// Save bar for the editor. The Save action and label come from the parent so the
// same bar serves both modes: a draft saves choreo + presentation; a locked
// (activated) sequence saves metadata only. Activate is offered only for a valid
// draft; Save as copy is always available.
export function FooterBar({
  saveLabel,
  unresolvedCount,
  canActivate,
  onSave,
  onActivate,
  onCopy,
}: {
  saveLabel: string;
  unresolvedCount: number;
  canActivate: boolean;
  onSave: () => Promise<SaveOutcome>;
  onActivate?: () => Promise<SaveOutcome>;
  onCopy: () => Promise<SaveOutcome>;
}) {
  const [savePending, startSave] = useTransition();
  const [activatePending, startActivate] = useTransition();
  const [copyPending, startCopy] = useTransition();
  const [outcome, setOutcome] = useState<SaveOutcome | null>(null);
  const busy = savePending || activatePending || copyPending;

  const run = (fn: () => Promise<SaveOutcome>, start: (cb: () => Promise<void>) => void) => {
    setOutcome(null);
    start(async () => setOutcome(await fn()));
  };

  return (
    <div className="sticky bottom-0 z-10 mt-4 flex flex-wrap items-center gap-3 border-t border-gray-200 bg-white/95 py-3 backdrop-blur">
      <button
        type="button"
        onClick={() => run(onSave, startSave)}
        disabled={busy}
        className="rounded bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        {savePending ? 'Saving…' : saveLabel}
      </button>

      {canActivate && onActivate && (
        <button
          type="button"
          onClick={() => run(onActivate, startActivate)}
          disabled={busy}
          className="rounded bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {activatePending ? 'Activating…' : 'Activate'}
        </button>
      )}

      <button
        type="button"
        onClick={() => run(onCopy, startCopy)}
        disabled={busy}
        className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
      >
        {copyPending ? 'Copying…' : 'Save as copy'}
      </button>

      {unresolvedCount > 0 && (
        <span className="text-sm text-amber-700">
          {unresolvedCount} step{unresolvedCount === 1 ? '' : 's'} unresolved — save as draft or resolve before activating.
        </span>
      )}

      {outcome && (
        <span className={`text-sm ${outcome.ok ? 'text-emerald-700' : 'text-red-600'}`}>{outcome.message}</span>
      )}
    </div>
  );
}
