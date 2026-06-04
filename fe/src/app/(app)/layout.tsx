import { AppShell } from '@/ui/nav/AppShell';

// Shared sidebar shell for /, /sequences, /classes, /reference (not /docs).
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
