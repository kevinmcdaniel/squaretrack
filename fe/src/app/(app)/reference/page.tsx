import Link from 'next/link';

const tables = [
  { name: 'Calls', href: '/reference/calls', desc: 'Every call, expandable to its FASRs' },
  { name: 'Call Families', href: '/reference/call-families', desc: 'Call family groupings' },
  { name: 'Formations', href: '/reference/formations', desc: 'Start/end formations' },
  { name: 'Call Formations', href: '/reference/call-formations', desc: 'Per-FASR catalog' },
  { name: 'Programs', href: '/reference/programs', desc: 'Programs, drilling into teach orders' },
  { name: 'Teach Orders', href: '/reference/teach-orders', desc: 'Teach orders, drilling into entries & FASRs' },
  { name: 'Sequences', href: '/reference/sequences', desc: 'Sequences with full step lists' },
];

export default function Page() {
  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold">Reference</h1>
      <p className="mb-6 text-gray-600">
        Read-only reference data for the calls &amp; programs domain. Search, sort, and follow
        cross-links between tables.
      </p>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tables.map((t) => (
          <li key={t.href}>
            <Link
              href={t.href}
              className="block rounded-lg border border-gray-200 p-4 transition hover:border-blue-400 hover:bg-blue-50"
            >
              <div className="font-medium text-blue-700">{t.name}</div>
              <div className="text-sm text-gray-500">{t.desc}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
