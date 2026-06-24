'use client';

import { useState, useTransition } from 'react';

export type SaveOutcome = { ok: boolean; message: string };

export function FooterBar({
  hasDraft,
  unresolvedCount,
  moduleId,
  isValid,
  onSaveDraft,
  onActivate,
}: {
  hasDraft: boolean;
  unresolvedCount: number;
  moduleId: number | null;
  isValid: boolean;
  onSaveDraft: () => Promise<SaveOutcome>;
  onActivate: () => Promise<SaveOutcome>;
}) {
  const [savePending, startSave] = useTransition();
  const [activatePending, startActivate] = useTransition();
  const [outcome, setOutcome] = useState<SaveOutcome | null>(null);

  const handleSave = () => {
    setOutcome(null);
    startSave(async () => setOutcome(await onSaveDraft()));
  };

  const handleActivate = () => {
    setOutcome(null);
    startActivate(async () => setOutcome(await onActivate()));
  };

  const canActivate = moduleId != null && isValid;

  return (
    <div className="sticky bottom-0 z-10 mt-4 flex flex-wrap items-center gap-3 border-t border-gray-200 bg-white/95 py-3 backdrop-blur">
      <button
        type="button"
        onClick={handleSave}
        disabled={!hasDraft || savePending || activatePending}
        className="rounded bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        {savePending ? 'Saving…' : 'Save draft'}
      </button>

      {canActivate && (
        <button
          type="button"
          onClick={handleActivate}
          disabled={activatePending || savePending}
          className="rounded bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {activatePending ? 'Activating…' : 'Activate'}
        </button>
      )}

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
