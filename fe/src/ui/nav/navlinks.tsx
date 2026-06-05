import {
  QueueListIcon,
  UserGroupIcon,
  TableCellsIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

// No Home link (header picture links to /); API Docs sits at the sidebar bottom.
const links = [
  { name: 'Sequences', href: '/sequences', icon: QueueListIcon },
  { name: 'Classes', href: '/classes', icon: UserGroupIcon },
  { name: 'Reference', href: '/reference', icon: TableCellsIcon },
];

export default function NavLinks({ collapsed = false }: { collapsed?: boolean }) {
  const labelClass = collapsed ? 'hidden' : 'hidden md:block';
  const rowJustify = collapsed ? 'md:justify-center' : 'md:justify-start';

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            title={collapsed ? link.name : undefined}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:p-2 md:px-3 ${rowJustify}`}
          >
            <LinkIcon className="w-6" />
            <p className={labelClass}>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
