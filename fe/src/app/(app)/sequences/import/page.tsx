import { fetchData } from '@/lib/hac/fetch';
import type { FormationLite } from './MetaForm';
import { SequenceImport } from './SequenceImport';

// Choreo modules start from a full square; the start-formation picker is seeded with
// the 8-dancer formations and defaults to Squared Set (issue #18 / #70).
export default async function Page() {
  const { data } = await fetchData<FormationLite[]>('formation?dancers=8');
  const formations = data ?? [];
  const squaredSet = formations.find((f) => /squared set/i.test(f.name)) ?? formations[0];
  const startFormationId = squaredSet?.formId ?? 0;

  return (
    <section className="max-w-4xl">
      <h1 className="mb-1 text-2xl font-semibold">Import sequence</h1>
      <p className="mb-4 max-w-prose text-gray-600">
        Paste calling text, parse it into choreo steps with interleaved cueing text, then resolve any
        unmatched calls before saving.
      </p>
      <SequenceImport formations={formations} startFormationId={startFormationId} />
    </section>
  );
}
