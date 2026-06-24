'use client';

import type { DraftImport } from './types';

export type FormationLite = { formId: number; name: string };

// Metadata that spans both layers: name / source / activator / rating / notes land
// on the presentation; start formation lands on the choreo module. Kept in one form
// because the caller fills them together before saving.
export function MetaForm({
  draft,
  formations,
  onMeta,
}: {
  draft: DraftImport;
  formations: FormationLite[];
  onMeta: (patch: Partial<DraftImport>) => void;
}) {
  return (
    <fieldset className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-gray-700">Name</span>
        <input
          type="text"
          value={draft.name}
          onChange={(e) => onMeta({ name: e.target.value })}
          placeholder="Optional — a placeholder is generated if blank"
          className="rounded border border-gray-300 px-2 py-1.5 focus:border-blue-500 focus:outline-none"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-gray-700">Source</span>
        <input
          type="text"
          value={draft.source ?? ''}
          onChange={(e) => onMeta({ source: e.target.value || null })}
          placeholder="taminations | callerlab | personal | caller"
          className="rounded border border-gray-300 px-2 py-1.5 focus:border-blue-500 focus:outline-none"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-gray-700">Activator</span>
        <select
          value={draft.activator ?? ''}
          onChange={(e) => onMeta({ activator: (e.target.value || null) as DraftImport['activator'] })}
          className="rounded border border-gray-300 px-2 py-1.5 focus:border-blue-500 focus:outline-none"
        >
          <option value="">none</option>
          <option value="heads">heads</option>
          <option value="sides">sides</option>
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-gray-700">Start formation</span>
        <select
          value={draft.startFormationId}
          onChange={(e) => onMeta({ startFormationId: Number(e.target.value) })}
          className="rounded border border-gray-300 px-2 py-1.5 focus:border-blue-500 focus:outline-none"
        >
          {formations.length === 0 && <option value={draft.startFormationId}>Squared Set</option>}
          {formations.map((f) => (
            <option key={f.formId} value={f.formId}>
              {f.name}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-gray-700">Rating</span>
        <input
          type="text"
          value={draft.rating ?? ''}
          onChange={(e) => onMeta({ rating: e.target.value || null })}
          placeholder="optional"
          className="rounded border border-gray-300 px-2 py-1.5 focus:border-blue-500 focus:outline-none"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm sm:col-span-2">
        <span className="font-medium text-gray-700">Notes</span>
        <textarea
          value={draft.notes ?? ''}
          onChange={(e) => onMeta({ notes: e.target.value || null })}
          rows={2}
          className="rounded border border-gray-300 px-2 py-1.5 focus:border-blue-500 focus:outline-none"
        />
      </label>
    </fieldset>
  );
}
