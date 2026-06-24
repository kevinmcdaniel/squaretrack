'use client';

// Sticky tally of choreo steps that still need a call or formation chosen. "Jump to
// next" scrolls to the next row marked data-unresolved (StepList tags them), so a
// caller can clear them without hunting.
export function UnresolvedBanner({ count }: { count: number }) {
  const jumpNext = () => {
    const rows = Array.from(document.querySelectorAll<HTMLElement>('[data-unresolved="true"]'));
    if (rows.length === 0) return;
    const y = window.scrollY;
    const next = rows.find((r) => r.getBoundingClientRect().top + y > y + 80) ?? rows[0];
    next.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  if (count === 0) {
    return (
      <div className="rounded border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
        All choreo steps resolved.
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between rounded border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
      <span>
        {count} step{count === 1 ? ' needs' : 's need'} attention.
      </span>
      <button
        type="button"
        onClick={jumpNext}
        className="rounded bg-amber-600 px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-amber-700"
      >
        Jump to next
      </button>
    </div>
  );
}
