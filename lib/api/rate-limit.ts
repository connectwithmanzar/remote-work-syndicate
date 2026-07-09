type RateLimitOptions = {
  namespace: string;
  limit: number;
  windowMs: number;
};

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
};

const buckets = new Map<string, RateLimitBucket>();

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function cleanExpiredBuckets(now: number) {
  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

export function checkRateLimit(
  request: Request,
  options: RateLimitOptions,
): RateLimitResult {
  const now = Date.now();

  cleanExpiredBuckets(now);

  const clientIp = getClientIp(request);
  const key = `${options.namespace}:${clientIp}`;
  const existingBucket = buckets.get(key);

  if (!existingBucket || existingBucket.resetAt <= now) {
    buckets.set(key, {
      count: 1,
      resetAt: now + options.windowMs,
    });

    return {
      allowed: true,
      limit: options.limit,
      remaining: options.limit - 1,
      resetAt: now + options.windowMs,
    };
  }

  if (existingBucket.count >= options.limit) {
    return {
      allowed: false,
      limit: options.limit,
      remaining: 0,
      resetAt: existingBucket.resetAt,
    };
  }

  existingBucket.count += 1;
  buckets.set(key, existingBucket);

  return {
    allowed: true,
    limit: options.limit,
    remaining: options.limit - existingBucket.count,
    resetAt: existingBucket.resetAt,
  };
}
