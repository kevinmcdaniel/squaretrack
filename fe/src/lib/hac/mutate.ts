// Server-only write path to the backend API. The read sibling (./fetch.ts) is
// GET-only and runs inside Server Components; this handles POST/PUT/PATCH/DELETE
// and is meant to be called from Server Actions.
//
// BE_URL / BE_PORT_INT are not exposed to the browser (no NEXT_PUBLIC_ prefix), so
// this must never execute client-side — Server Actions are the bridge between the
// interactive editor and the backend. The URL wiring mirrors ./fetch.ts; the
// circuit breaker is intentionally omitted so a failed mutation surfaces to the
// caller instead of being swallowed by an open-breaker sentinel.

type Method = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const TIMEOUT_MS = Number(process.env.BE_TIMEOUT_MS ?? 5000);
const apiBase = `${process.env.BE_URL}:${process.env.BE_PORT_INT}`;

const buildUrl = (uri: string): string => {
  const trimmed = uri.replace(/^\/+/, '');
  const withApi = trimmed.startsWith('api/') ? trimmed : `api/${trimmed}`;
  return `${apiBase}/${withApi}`;
};

// The backend wraps every response in { data, message } and tacks on
// endpoint-specific extras (chainBreaks, reusedExisting, flowWarnings). Callers
// read the fields they need off the parsed body.
export type ApiBody<T = unknown> = {
  data: T | null;
  message: string;
  [key: string]: unknown;
};

export type MutateResult<T = unknown> = {
  ok: boolean;
  status: number;
  body: ApiBody<T>;
};

export const mutateData = async <T = unknown>(
  uri: string,
  method: Method,
  payload?: unknown,
): Promise<MutateResult<T>> => {
  if (typeof window !== 'undefined') {
    throw new Error('mutateData is server-only; call it from a Server Action.');
  }

  const fullUrl = buildUrl(uri);

  let res: Response;
  try {
    res = await fetch(fullUrl, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: payload === undefined ? undefined : JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: 'no-store',
    });
  } catch (err) {
    const reason = err instanceof Error ? `${err.name}: ${err.message}` : 'unknown';
    console.error('mutateData transport failure', { fullUrl, method, reason });
    return { ok: false, status: 503, body: { data: null, message: 'Backend unavailable' } };
  }

  let body: ApiBody<T>;
  try {
    body = (await res.json()) as ApiBody<T>;
  } catch {
    body = { data: null, message: `Backend response unparseable (${res.status})` };
  }

  return { ok: res.ok, status: res.status, body };
};
