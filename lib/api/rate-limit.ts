import { createHash } from "crypto";

import { getSupabaseAdmin } from "@/lib/supabase/admin";

type RateLimitOptions = {
  namespace: string;
  limit: number;
  windowMs: number;
};

type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: string;
};

type SupabaseRateLimitRow = {
  allowed: boolean;
  remaining: number;
  reset_at: string;
};

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

function hashIdentifier(identifier: string) {
  return createHash("sha256").update(identifier).digest("hex");
}

export async function checkRateLimit(
  request: Request,
  options: RateLimitOptions,
): Promise<RateLimitResult> {
  const supabase = getSupabaseAdmin();
  const clientIp = getClientIp(request);
  const identifierHash = hashIdentifier(clientIp);
  const windowSeconds = Math.ceil(options.windowMs / 1000);

  const { data, error } = await supabase.rpc("check_api_rate_limit", {
    p_namespace: options.namespace,
    p_identifier_hash: identifierHash,
    p_limit: options.limit,
    p_window_seconds: windowSeconds,
  });

  if (error) {
    throw new Error(`Rate limit check failed: ${error.message}`);
  }

  const result = Array.isArray(data)
    ? (data[0] as SupabaseRateLimitRow | undefined)
    : (data as SupabaseRateLimitRow | undefined);

  if (!result) {
    throw new Error("Rate limit check returned no result.");
  }

  return {
    allowed: result.allowed,
    limit: options.limit,
    remaining: result.remaining,
    resetAt: result.reset_at,
  };
}
