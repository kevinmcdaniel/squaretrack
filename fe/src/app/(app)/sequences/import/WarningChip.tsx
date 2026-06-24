// Surfaces the two warning levels from #70 distinctly. An *inherent* warning lives
// on the choreo step — it is true for this call wherever it appears. A *contextual*
// warning lives on the presentation decoration — true only in this spot of this
// routine. They read differently to the caller, so they look different.
export function WarningChip({ level, text }: { level: 'inherent' | 'contextual'; text: string }) {
  const styles =
    level === 'inherent'
      ? 'border-amber-400 bg-amber-50 text-amber-900'
      : 'border-rose-300 bg-rose-50 text-rose-800';
  const label = level === 'inherent' ? 'Inherent' : 'Contextual';
  return (
    <span
      className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-xs ${styles}`}
      title={`${label} warning`}
    >
      <span aria-hidden>⚠</span>
      <span className="font-medium">{label}:</span>
      <span>{text}</span>
    </span>
  );
}
