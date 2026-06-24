'use client';

import { useState, useTransition } from 'react';

// Step 1 of the editor: the caller pastes raw calling text. The Parse button hands
// the text up to the page, which persists the raw presentation and parses it. While
// that round trip is in flight the textarea stays mounted so the paste is never lost.
export function PasteDropzone({
  initialText,
  hasDraft,
  onParse,
}: {
  initialText: string;
  hasDraft: boolean;
  onParse: (text: string) => Promise<string | null>; // resolves to an error message, or null on success
}) {
  const [text, setText] = useState(initialText);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const submit = () => {
    setError(null);
    startTransition(async () => {
      const err = await onParse(text);
      if (err) setError(err);
    });
  };

  return (
    <div className="space-y-2">
      <label htmlFor="paste" className="block text-sm font-medium text-gray-700">
        Calling text
      </label>
      <textarea
        id="paste"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        placeholder={'Heads\nSquare Thru 4\nRight and Left Thru\n// watch the timing'}
        className="w-full rounded border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={submit}
          disabled={pending || text.trim().length === 0}
          className="rounded bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {pending ? 'Parsing…' : hasDraft ? 'Re-parse' : 'Parse'}
        </button>
        {hasDraft && !pending && (
          <span className="text-xs text-amber-700">Re-parsing replaces the step review below.</span>
        )}
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}
