import { DataTablePage } from '@/ui/DataTable/DataTablePage';

export default function Page({ searchParams }: { searchParams: Promise<{ focus?: string; on?: string }> }) {
  return <DataTablePage table="call-family" uri="call-family/list" searchParams={searchParams} />;
}
