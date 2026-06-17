'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import { splitText, bulkIntake, type SplitItem, type BulkIntakeResult } from './actions';

type PreviewItem = SplitItem & { selected: boolean };

export function BulkImport() {
  const [text, setText] = useState('');
  const [preview, setPreview] = useState<PreviewItem[] | null>(null);
  const [result, setResult] = useState<BulkIntakeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [splitPending, startSplit] = useTransition();
  const [savePending, startSave] = useTransition();

  const handleSplit = () => {
    setError(null);
    setPreview(null);
    setResult(null);
    startSplit(async () => {
      const res = await splitText(text);
      if (!res.ok) return setError(res.error);
      setPreview(res.data.map((item) => ({ ...item, selected: true })));
    });
  };

  const handleSave = () => {
    if (!preview) return;
    const selected = preview.filter((p) => p.selected).map(({ name, sourceText }) => ({ name, sourceText }));
    if (selected.length === 0) return setError('Select at least one sequence to save.');
    setError(null);
    startSave(async () => {
      const res = await bulkIntake(selected);
      if (!res.ok) return setError(res.error);
      setResult(res.data);
      setPreview(null);
      setText('');
    });
  };

  const toggleAll = (on: boolean) =>
    setPreview((p) => p?.map((item) => ({ ...item, selected: on })) ?? null);

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Paste a full session document. Sequences separated by asterisk lines
        (<code className="rounded bg-gray-100 px-1 text-xs">* * * * * * * * * * * * * * *</code>) are
        split automatically. Names come from <code className="rounded bg-gray-100 px-1 text-xs">[bracket headers]</code>.
      </p>

      <textarea
        value={text}
        onChange={(e) => { setText(e.target.value); setPreview(null); setResult(null); }}
        rows={10}
        placeholder={"[w02 basics review]\nCircle Left\nForward and back\nAllemande Left\nPromenade home\n* * * * * * * * * * * * * * *\n[w02 sashay]\n{H/S} Rollaway\nand Pass thru\n…"}
        className="w-full rounded border border-gray-300 p-3 font-mono text-sm focus:border-blue-400 focus:outline-none"
      />

      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleSplit}
          disabled={!text.trim() || splitPending}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {splitPending ? 'Splitting…' : 'Split & Preview'}
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result && (
        <div className="rounded border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
          <p>
            Saved {result.saved.length} new draft{result.saved.length === 1 ? '' : 's'}.
            {result.skipped.length > 0 && ` Skipped ${result.skipped.length} duplicate${result.skipped.length === 1 ? '' : 's'}.`}
          </p>
          {result.saved.length > 0 && (
            <p className="mt-1">
              <Link href="/sequences" className="font-medium underline hover:no-underline">
                View drafts to continue editing
              </Link>
            </p>
          )}
        </div>
      )}

      {preview && preview.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">
              Found {preview.length} sequence{preview.length === 1 ? '' : 's'}
            </p>
            <div className="flex gap-3 text-xs text-blue-600">
              <button type="button" onClick={() => toggleAll(true)}>select all</button>
              <button type="button" onClick={() => toggleAll(false)}>deselect all</button>
            </div>
          </div>

          <ul className="divide-y divide-gray-100 rounded border border-gray-200 bg-white">
            {preview.map((item, i) => (
              <li key={i} className="flex items-start gap-3 px-3 py-2">
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={(e) =>
                    setPreview((p) => p?.map((x, j) => j === i ? { ...x, selected: e.target.checked } : x) ?? null)
                  }
                  className="mt-1 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  <p className="truncate text-xs text-gray-400">
                    {item.sourceText.split('\n').filter(Boolean).slice(0, 3).join(' · ')}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={handleSave}
            disabled={savePending || preview.every((p) => !p.selected)}
            className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {savePending ? 'Saving…' : `Save ${preview.filter((p) => p.selected).length} as drafts`}
          </button>
        </div>
      )}
    </div>
  );
}
