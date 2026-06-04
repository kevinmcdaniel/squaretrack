import { AppShell } from '@/ui/nav/AppShell';

/**
 * Shared app shell for every sidebar-wrapped section — the home page (`/`),
 * `/sequences`, `/classes`, and `/reference`. Adding a new top-level section only
 * needs a nav entry, not a layout copy. The self-contained `/docs` stays outside
 * this route group, so it renders without the sidebar.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
