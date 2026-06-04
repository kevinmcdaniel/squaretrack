import { DataTablePage } from '@/ui/DataTable/DataTablePage';

export default function Page({ searchParams }: { searchParams: Promise<{ focus?: string; on?: string }> }) {
  return <DataTablePage table="call-formation" uri="call-formation/list" searchParams={searchParams} />;
}
