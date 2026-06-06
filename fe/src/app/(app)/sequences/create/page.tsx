import { fetchData } from '@/lib/hac/fetch';
import { StartFormationPicker, type PickableFormation } from './StartFormationPicker';

// Dancer counts the picker can filter to; anything else falls back to full square.
const ALLOWED_DANCERS = new Set([2, 4, 8]);

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ dancers?: string }>;
}) {
  const sp = await searchParams;
  const requested = Number(sp.dancers);
  const dancers = ALLOWED_DANCERS.has(requested) ? requested : 8; // default: full square
  const { data } = await fetchData<PickableFormation[]>(`formation?dancers=${dancers}`);

  return (
    <section>
      <h1 className="mb-2 text-2xl font-semibold">Create sequence</h1>
      <p className="mb-4 max-w-prose text-gray-600">
        Choose the starting formation. Full-square (8-dancer) formations are shown by default; switch to
        smaller formations for teaching drills.
      </p>
      <StartFormationPicker formations={data ?? []} dancers={dancers} />
    </section>
  );
}
