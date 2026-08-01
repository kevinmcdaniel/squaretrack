'use client';

import { useState, useTransition } from 'react';
import { deleteDraft } from './actions';

// Destructive, so it confirms first. The server action revalidates /sequences,
// which re-renders the list without the deleted row.
export function DeleteDraftButton({ id, name }: { id: number; name: string }) {
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const onClick = () => {
    if (!window.confirm(`Delete draft “${name}”? This can't be undone.`)) return;
    setError(null);
    start(async () => {
      const res = await deleteDraft(id);
      if (!res.ok) setError(res.error ?? 'Delete failed.');
    });
  };

  return (
    <span className="inline-flex items-center gap-2">
      {error && <span className="text-xs text-red-600">{error}</span>}
      <button
        type="button"
        onClick={onClick}
        disabled={pending}
        className="text-sm text-red-600 hover:underline disabled:opacity-50"
      >
        {pending ? 'Deleting…' : 'Delete'}
      </button>
    </span>
  );
}
