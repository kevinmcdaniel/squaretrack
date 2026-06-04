import Link from 'next/link';
import Image from 'next/image';
import NavLinks from '@/ui/nav/navlinks';
import {
  BookOpenIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  PowerIcon,
} from '@heroicons/react/24/outline';

export default function SideNav({
  collapsed = false,
  onToggle,
}: {
  collapsed?: boolean;
  onToggle?: () => void;
}) {
  // Labels hide when collapsed; on mobile they're always hidden (icon-only row).
  const labelClass = collapsed ? 'hidden' : 'hidden md:block';
  const rowJustify = collapsed ? 'md:justify-center' : 'md:justify-start';

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      {/* Picture fixed top-left; wordmark shows when expanded; toggle on its own row. */}
      <div className="mb-4 flex flex-col gap-2">
        <div className="flex items-center gap-3 overflow-hidden">
          <Link href="/" aria-label="Home" className="flex flex-none items-center">
            <Image
              src="/squareset.png"
              width={44}
              height={44}
              alt="SquareTrack"
              className="rounded-md"
              priority
            />
          </Link>
          {!collapsed && (
            <span className="min-w-0 truncate text-sm font-medium text-gray-700">
              [SquareTrack]
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? 'Open menu' : 'Collapse menu'}
          aria-expanded={!collapsed}
          className="hidden self-start rounded-md p-1.5 text-gray-500 hover:bg-sky-100 hover:text-blue-600 md:block"
        >
          {collapsed ? (
            <ChevronDoubleRightIcon className="w-5" />
          ) : (
            <ChevronDoubleLeftIcon className="w-5" />
          )}
        </button>
      </div>

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks collapsed={collapsed} />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>

        {/* Dev-tools link: opens API docs in a new tab so there's no /docs dead-end. */}
        <a
          href="/docs"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium text-gray-400 hover:bg-sky-100 hover:text-blue-600 md:flex-none md:p-2 md:px-3 ${rowJustify}`}
        >
          <BookOpenIcon className="w-6" />
          <div className={labelClass}>API Docs</div>
        </a>

        <form>
          <button
            className={`flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:p-2 md:px-3 ${rowJustify}`}
          >
            {/* TODO: wire the sign-out action once auth is implemented. */}
            <PowerIcon className="w-6" />
            <div className={labelClass}>Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
