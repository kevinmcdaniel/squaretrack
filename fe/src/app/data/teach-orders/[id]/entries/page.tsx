import Link from 'next/link';
import { fetchData } from '@/lib/hac/fetch';
import { DataTablePage } from '@/ui/DataTable/DataTablePage';

type TeachOrder = {
  id: number;
  name: string;
  program?: { name?: string };
  entries?: Record<string, unknown>[];
};

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ focus?: string; on?: string }>;
}) {
  const { id } = await params;
  const res = await fetchData<TeachOrder>(`teach-order/${id}`);
  const teachOrder = res.data;
  const entries = teachOrder?.entries ?? [];

  return (
    <div>
      <Link href="/data/teach-orders" className="mb-3 inline-block text-sm text-blue-600 hover:underline">
        ← Teach Orders
      </Link>
      <DataTablePage
        table="teach-order-entries"
        rows={entries}
        parent={teachOrder ?? undefined}
        searchParams={searchParams}
      />
    </div>
  );
}
