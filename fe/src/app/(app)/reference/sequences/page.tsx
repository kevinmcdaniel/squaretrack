import { DataTablePage } from '@/ui/DataTable/DataTablePage';

export default function Page({ searchParams }: { searchParams: Promise<{ focus?: string; on?: string }> }) {
  return <DataTablePage table="sequence" uri="sequence/list" searchParams={searchParams} />;
}
