type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const store = new Map<string, RateLimitEntry>();

export function checkRateLimit(
  ip: string,
  max: number = 10,
  windowMs: number = 15 * 60 * 1000,
): { allowed: boolean; remaining: number; retryAfter: number } {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now >= entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1, retryAfter: 0 };
  }

  entry.count++;

  if (entry.count > max) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, remaining: 0, retryAfter };
  }

  return { allowed: true, remaining: max - entry.count, retryAfter: 0 };
}
