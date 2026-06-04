'use client';

import { useState } from 'react';
import SideNav from '@/ui/nav/sidebar';

/**
 * Client shell that owns the sidebar collapse state. It lives in `(app)/layout.tsx`,
 * which Next keeps mounted across navigations within the group, so the open/collapsed
 * choice persists as you move between sections.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div
        className={`w-full flex-none transition-[width] duration-200 ${
          collapsed ? 'md:w-20' : 'md:w-64'
        }`}
      >
        <SideNav collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
