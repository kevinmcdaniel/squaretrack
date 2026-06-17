import { fetchData } from '@/lib/hac/fetch';
import type { FormationLite } from './MetaForm';
import { BulkImport } from './BulkImport';
import { SequenceImport } from './SequenceImport';

export const dynamic = 'force-dynamic';

type PresentationRecord = { id: number; name: string; sourceText: string | null; status: string };

// Choreo modules start from a full square; the start-formation picker is seeded with
// the 8-dancer formations and defaults to Squared Set (issue #18 / #70).
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ presentationId?: string }>;
}) {
  const params = await searchParams;
  const presentationId = params.presentationId ? Number(params.presentationId) : null;

  const [formationsRes, draftRes] = await Promise.all([
    fetchData<FormationLite[]>('formation?dancers=8'),
    presentationId != null
      ? fetchData<PresentationRecord>(`presentation/${presentationId}`)
      : Promise.resolve(null),
  ]);

  const formations = formationsRes.data ?? [];
  const squaredSet = formations.find((f) => /squared set/i.test(f.name)) ?? formations[0];
  const startFormationId = squaredSet?.formId ?? 0;

  const draft = draftRes?.data ?? null;

  return (
    <section className="max-w-4xl space-y-10">
      <div>
        <h1 className="mb-1 text-2xl font-semibold">Import sequence</h1>
        <p className="mb-4 max-w-prose text-gray-600">
          Paste calling text, parse it into choreo steps with interleaved cueing text, then resolve
          any unmatched calls before saving.
        </p>
        <SequenceImport
          formations={formations}
          startFormationId={startFormationId}
          initialPresentationId={draft?.id}
          initialSourceText={draft?.sourceText ?? undefined}
        />
      </div>

      <div>
        <h2 className="mb-1 text-xl font-semibold">Bulk import</h2>
        <p className="mb-4 max-w-prose text-gray-600">
          Paste a full session document to split and save multiple sequences as drafts at once.
        </p>
        <BulkImport />
      </div>
    </section>
  );
}
