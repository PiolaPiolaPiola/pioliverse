const VISITS_KEY = 'pioliverse:visits';
const SEEN_PREFIX = 'pioliverse:seen:';
const SEEN_TTL_SECONDS = 60 * 60 * 24;

interface RedisConfig {
  url: string;
  token: string;
}

type RedisReply = { result: unknown } | { error: string };

function redisConfig(): RedisConfig | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

async function redis(config: RedisConfig, command: (string | number)[]) {
  const res = await fetch(config.url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${config.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
  });
  const reply = (await res.json()) as RedisReply;
  if (!res.ok || 'error' in reply) throw new Error('Redis command failed');
  return reply.result;
}

async function hashVisitor(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`pioliverse:${ip}`));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}

const noStore = { 'Cache-Control': 'no-store' };
const shortCache = { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' };

async function readTotal(config: RedisConfig) {
  return Number(await redis(config, ['GET', VISITS_KEY])) || 0;
}

export async function GET() {
  const config = redisConfig();
  if (!config) return Response.json({ error: 'not configured' }, { status: 503, headers: noStore });

  try {
    return Response.json({ total: await readTotal(config) }, { headers: shortCache });
  } catch {
    return Response.json({ error: 'unavailable' }, { status: 502, headers: noStore });
  }
}

export async function POST(request: Request) {
  const config = redisConfig();
  if (!config) return Response.json({ error: 'not configured' }, { status: 503, headers: noStore });

  try {
    const seenKey = SEEN_PREFIX + (await hashVisitor(request));
    const isNew = (await redis(config, ['SET', seenKey, '1', 'NX', 'EX', SEEN_TTL_SECONDS])) === 'OK';
    const count = isNew ? Number(await redis(config, ['INCR', VISITS_KEY])) || 0 : await readTotal(config);
    const total = Math.max(count, 1);
    return Response.json({ visitor: total, total }, { headers: noStore });
  } catch {
    return Response.json({ error: 'unavailable' }, { status: 502, headers: noStore });
  }
}
