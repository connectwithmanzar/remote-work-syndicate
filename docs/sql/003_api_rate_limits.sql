-- Remote Work Syndicate
-- 003_api_rate_limits.sql
-- Adds Supabase-backed API rate limiting.

create table if not exists public.api_rate_limits (
  id uuid primary key default gen_random_uuid(),
  namespace text not null,
  identifier_hash text not null,
  request_count integer not null default 0,
  window_start timestamptz not null default now(),
  reset_at timestamptz not null,
  updated_at timestamptz not null default now(),
  unique (namespace, identifier_hash)
);

alter table public.api_rate_limits enable row level security;

create index if not exists api_rate_limits_namespace_identifier_idx
on public.api_rate_limits (namespace, identifier_hash);

create index if not exists api_rate_limits_reset_at_idx
on public.api_rate_limits (reset_at);

create or replace function public.check_api_rate_limit(
  p_namespace text,
  p_identifier_hash text,
  p_limit integer,
  p_window_seconds integer
)
returns table (
  allowed boolean,
  remaining integer,
  reset_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  existing public.api_rate_limits%rowtype;
  next_reset_at timestamptz;
begin
  if p_limit < 1 then
    raise exception 'p_limit must be at least 1';
  end if;

  if p_window_seconds < 1 then
    raise exception 'p_window_seconds must be at least 1';
  end if;

  next_reset_at := now() + make_interval(secs => p_window_seconds);

  select *
  into existing
  from public.api_rate_limits
  where namespace = p_namespace
  and identifier_hash = p_identifier_hash
  for update;

  if not found then
    insert into public.api_rate_limits (
      namespace,
      identifier_hash,
      request_count,
      window_start,
      reset_at,
      updated_at
    )
    values (
      p_namespace,
      p_identifier_hash,
      1,
      now(),
      next_reset_at,
      now()
    );

    allowed := true;
    remaining := greatest(p_limit - 1, 0);
    reset_at := next_reset_at;
    return next;
    return;
  end if;

  if existing.reset_at <= now() then
    update public.api_rate_limits
    set
      request_count = 1,
      window_start = now(),
      reset_at = next_reset_at,
      updated_at = now()
    where id = existing.id;

    allowed := true;
    remaining := greatest(p_limit - 1, 0);
    reset_at := next_reset_at;
    return next;
    return;
  end if;

  if existing.request_count >= p_limit then
    allowed := false;
    remaining := 0;
    reset_at := existing.reset_at;
    return next;
    return;
  end if;

  update public.api_rate_limits
  set
    request_count = request_count + 1,
    updated_at = now()
  where id = existing.id
  returning * into existing;

  allowed := true;
  remaining := greatest(p_limit - existing.request_count, 0);
  reset_at := existing.reset_at;
  return next;
end;
$$;

revoke execute on function public.check_api_rate_limit(text, text, integer, integer) from public;
revoke execute on function public.check_api_rate_limit(text, text, integer, integer) from anon;
revoke execute on function public.check_api_rate_limit(text, text, integer, integer) from authenticated;
grant execute on function public.check_api_rate_limit(text, text, integer, integer) to service_role;
