import Link from 'next/link';
import { fetchData } from '@/lib/hac/fetch';
import type { FormationLite } from '../../import/MetaForm';
import type { LoadedPresentation } from '../../import/types';
import { SequenceImport } from '../../import/SequenceImport';

export const dynamic = 'force-dynamic';

// Parse / correct a single saved sequence. Reached by clicking a draft from the
// sequences list. The editor parses raw drafts on load and hydrates linked
// sequences (calls then locked); see SequenceImport.
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const seqId = Number(id);
  if (!Number.isInteger(seqId)) return <NotFound />;

  const [formationsRes, presRes] = await Promise.all([
    fetchData<FormationLite[]>('formation?dancers=8'),
    fetchData<LoadedPresentation>(`presentation/${seqId}`),
  ]);

  const presentation = presRes.data ?? null;
  if (!presentation) return <NotFound />;

  const formations = formationsRes.data ?? [];
  const squaredSet = formations.find((f) => /squared set/i.test(f.name)) ?? formations[0];
  const startFormationId = squaredSet?.formId ?? 0;

  return (
    <section className="max-w-4xl">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">{presentation.name || 'Edit sequence'}</h1>
        <Link href={`/sequences/${presentation.id}`} className="shrink-0 text-sm text-blue-600 hover:underline">
          View
        </Link>
      </div>
      <SequenceImport
        formations={formations}
        startFormationId={startFormationId}
        initialPresentation={presentation}
      />
    </section>
  );
}

function NotFound() {
  return (
    <section className="max-w-4xl">
      <h1 className="mb-2 text-2xl font-semibold">Sequence not found</h1>
      <p className="text-sm text-gray-500">
        No sequence with that id.{' '}
        <Link href="/sequences" className="text-blue-600 hover:underline">
          Back to sequences
        </Link>
        .
      </p>
    </section>
  );
}
