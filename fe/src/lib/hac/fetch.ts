export type ApiEnvelope<T = unknown> = {
  data: T;
  message: string;
  status: number;
};

type Shape = 'list' | 'single';

const TIMEOUT_MS = Number(process.env.BE_TIMEOUT_MS ?? 3000);
const FAILURE_THRESHOLD = Number(process.env.BE_BREAKER_THRESHOLD ?? 3);
const COOLDOWN_MS = Number(process.env.BE_BREAKER_COOLDOWN_MS ?? 15_000);

const apiBase = `${process.env.BE_URL}:${process.env.BE_PORT_INT}`;

const breaker = { failures: 0, openUntil: 0 };

const sentinel = <T>(shape: Shape, message: string): ApiEnvelope<T> =>
  (shape === 'list'
    ? { data: [], message, status: 503 }
    : { data: null, message, status: 503 }) as ApiEnvelope<T>;

const detectShape = (uri: string): Shape => {
  const path = uri.split('?')[0].replace(/\/$/, '');
  return path.endsWith('/list') ? 'list' : 'single';
};

const buildUrl = (uri: string): string => {
  const trimmed = uri.replace(/^\/+/, '');
  const withApi = trimmed.startsWith('api/') ? trimmed : `api/${trimmed}`;
  return `${apiBase}/${withApi}`;
};

const tripBreaker = () => {
  breaker.failures += 1;
  if (breaker.failures >= FAILURE_THRESHOLD) {
    breaker.openUntil = Date.now() + COOLDOWN_MS;
  }
};

const resetBreaker = () => {
  breaker.failures = 0;
  breaker.openUntil = 0;
};

export const fetchData = async <T = unknown>(
  fetchURI: string,
  opts?: { shape?: Shape },
): Promise<ApiEnvelope<T>> => {
  const shape = opts?.shape ?? detectShape(fetchURI);
  const fullUrl = buildUrl(fetchURI);

  if (Date.now() < breaker.openUntil) {
    return sentinel<T>(shape, 'Backend unavailable (circuit open)');
  }

  let res: Response;
  try {
    res = await fetch(fullUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: 'no-cache',
    });
  } catch (err) {
    const reason = err instanceof Error ? `${err.name}: ${err.message}` : 'unknown';
    console.error('fetchData transport failure', { fullUrl, reason });
    tripBreaker();
    return sentinel<T>(shape, 'Backend unavailable');
  }

  if (res.status >= 500) {
    console.error('fetchData 5xx', { fullUrl, status: res.status });
    tripBreaker();
    return sentinel<T>(shape, `Backend error (${res.status})`);
  }

  try {
    const body = (await res.json()) as ApiEnvelope<T>;
    resetBreaker();
    return body;
  } catch (err) {
    const reason = err instanceof Error ? err.message : 'unknown';
    console.error('fetchData parse error', { fullUrl, reason });
    tripBreaker();
    return sentinel<T>(shape, 'Backend response unparseable');
  }
};
