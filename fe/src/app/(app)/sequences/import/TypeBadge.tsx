import type { TextType } from './types';

// A choreo step renders as `call`; the five presentation text types keep the
// classification the parser assigned so the caller can see structure at a glance.
type BadgeKind = 'call' | TextType;

const STYLES: Record<BadgeKind, string> = {
  call: 'bg-blue-100 text-blue-800',
  activator: 'bg-purple-100 text-purple-800',
  filler: 'bg-gray-100 text-gray-600',
  tip: 'bg-emerald-100 text-emerald-800',
  warning: 'bg-amber-100 text-amber-900',
  recovery: 'bg-orange-100 text-orange-800',
};

export function TypeBadge({ kind }: { kind: BadgeKind }) {
  return (
    <span
      className={`inline-block shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${STYLES[kind]}`}
    >
      {kind}
    </span>
  );
}
