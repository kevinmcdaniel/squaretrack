import { DataTablePage } from '@/ui/DataTable/DataTablePage';

export default function Page({ searchParams }: { searchParams: Promise<{ focus?: string; on?: string }> }) {
  return <DataTablePage table="formation" uri="formation/list" searchParams={searchParams} />;
}
