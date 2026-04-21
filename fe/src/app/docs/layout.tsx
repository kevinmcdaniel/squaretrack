import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

function getDocLinks() {
  const docsDir = path.join(process.cwd(), 'docs', 'api');
  try {
    const files = fs.readdirSync(docsDir).filter((f) => f.endsWith('.md'));
    return files.map((f) => ({
      slug: f.replace(/\.md$/, ''),
      label: f.replace(/\.md$/, '').replace(/-/g, ' '),
    }));
  } catch {
    return [];
  }
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const links = getDocLinks();

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <aside className="w-full flex-none md:w-56 bg-gray-50 border-r border-gray-200">
        <div className="px-3 py-4">
          <Link href="/docs" className="flex items-center gap-2 mb-4 px-2 py-2 font-semibold text-blue-700 text-sm">
            <DocumentTextIcon className="w-5" />
            API Docs
          </Link>
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.slug}
                href={`/docs/${link.slug}`}
                className="px-3 py-2 rounded-md text-sm capitalize hover:bg-sky-100 hover:text-blue-600 text-gray-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-10">
        {children}
      </div>
    </div>
  );
}
