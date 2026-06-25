import Link from 'next/link';
import { BulkImport } from './BulkImport';

export const dynamic = 'force-dynamic';

// Import is bulk-only: paste a session document, split it, and save the pieces as
// raw drafts. Parsing/correcting a draft happens later, from the sequences list
// (/sequences/[id]/edit). See issue #20.
export default function Page() {
  return (
    <section className="max-w-4xl">
      <h1 className="mb-1 text-2xl font-semibold">Import sequences</h1>
      <p className="mb-4 max-w-prose text-gray-600">
        Paste a full session document to split and save multiple sequences as drafts at once. Then
        open each draft from the{' '}
        <Link href="/sequences" className="text-blue-600 hover:underline">
          sequences list
        </Link>{' '}
        to parse and correct it.
      </p>
      <BulkImport />
    </section>
  );
}
