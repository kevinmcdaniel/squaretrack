type Row = Record<string, unknown>;

/** Resolve a dot-path (e.g. "call.name", "program.name") against a row; undefined if any hop is missing. */
export const getByPath = (row: Row, path: string): unknown =>
  path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[key];
    return undefined;
  }, row);
