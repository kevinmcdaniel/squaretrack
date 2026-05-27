import Link from 'next/link';
import { fetchData } from '@/lib/hac/fetch';
import { DataTablePage } from '@/ui/DataTable/DataTablePage';

type TeachOrder = { id: number; programId: number; name: string; program?: { name?: string } };

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ programId: string }>;
  searchParams: Promise<{ focus?: string; on?: string }>;
}) {
  const { programId } = await params;
  const id = Number(programId);
  const res = await fetchData<TeachOrder[]>('teach-order/list');
  const rows = (res.data ?? []).filter((t) => t.programId === id);
  const programName = rows[0]?.program?.name ?? `Program ${programId}`;

  return (
    <div>
      <Link href="/data/programs" className="text-sm text-blue-600 hover:underline">
        ← Programs
      </Link>
      <p className="mb-4 mt-1 text-sm text-gray-500">Teach orders for {programName}</p>
      <DataTablePage table="program-teach-orders" rows={rows} searchParams={searchParams} />
    </div>
  );
}
