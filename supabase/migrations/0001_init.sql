-- ============================================================================
-- Personal Trainer intake → AI plan app — initial schema
-- ============================================================================
-- Run this in the Supabase SQL editor (or via the Supabase CLI) against a
-- fresh project. It creates the four tables, a trigger to compute
-- parq_flagged on submit, and Row Level Security policies.
--
-- Security model:
--   * There is exactly one trainer account (created manually in Supabase Auth).
--   * Authenticated (trainer) requests may read/write everything.
--   * The public intake page runs on the server with the service-role key,
--     which bypasses RLS. No anon client ever touches these tables directly,
--     so RLS denies all access to the `anon` role by default.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ── clients ────────────────────────────────────────────────────────────────
create table if not exists public.clients (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  created_at timestamptz not null default now()
);

-- ── intake_links ───────────────────────────────────────────────────────────
create table if not exists public.intake_links (
  id         uuid primary key default gen_random_uuid(),
  client_id  uuid not null references public.clients(id) on delete cascade,
  token      text not null unique,
  status     text not null default 'pending'
             check (status in ('pending', 'submitted', 'expired')),
  created_at timestamptz not null default now()
);

create index if not exists intake_links_token_idx on public.intake_links (token);
create index if not exists intake_links_client_idx on public.intake_links (client_id);

-- ── intake_submissions ─────────────────────────────────────────────────────
create table if not exists public.intake_submissions (
  id                     uuid primary key default gen_random_uuid(),
  intake_link_id         uuid not null references public.intake_links(id) on delete cascade,

  -- Your Goals
  purpose_goal_tag       text not null,
  purpose_goal_text      text not null,
  purpose_success_90d    text not null,
  purpose_timeline       text,

  -- Your Preferences
  pref_location          text not null,
  pref_days_per_week     int  not null,
  pref_session_length    text not null,
  pref_training_style    text not null,
  pref_communication     text not null,

  -- Where You're Starting From
  status_activity_level  text not null,
  status_training_history text not null,
  status_injuries        text,
  status_height          text,
  status_weight          text,
  status_age             int,
  status_sex             text,

  -- Health Screening (PAR-Q)
  parq_answers           jsonb not null,
  parq_flagged           boolean not null default false,

  -- Nutrition
  nutrition_pattern      text not null,
  nutrition_allergies    text,
  nutrition_dislikes     text,
  nutrition_meals_per_day int not null,
  nutrition_cooking_time text not null,
  nutrition_supplements  text,

  submitted_at           timestamptz not null default now()
);

create index if not exists intake_submissions_link_idx
  on public.intake_submissions (intake_link_id);

-- Compute parq_flagged from parq_answers on insert/update: true if ANY of the
-- boolean answers is true. This is enforced server-side so a client cannot
-- lie about it. Keeps the plan's needs_clearance gate honest.
create or replace function public.compute_parq_flagged()
returns trigger
language plpgsql
as $$
declare
  v      jsonb;
  flagged boolean := false;
begin
  for v in select value from jsonb_each(new.parq_answers)
  loop
    if v = 'true'::jsonb then
      flagged := true;
      exit;
    end if;
  end loop;
  new.parq_flagged := flagged;
  return new;
end;
$$;

drop trigger if exists set_parq_flagged on public.intake_submissions;
create trigger set_parq_flagged
  before insert or update on public.intake_submissions
  for each row execute function public.compute_parq_flagged();

-- ── plans ──────────────────────────────────────────────────────────────────
create table if not exists public.plans (
  id                      uuid primary key default gen_random_uuid(),
  intake_submission_id    uuid not null references public.intake_submissions(id) on delete cascade,
  nutrition_plan_text     text not null default '',
  workout_plan_text       text not null default '',
  needs_clearance         boolean not null default false,
  clearance_acknowledged  boolean not null default false,
  status                  text not null default 'draft'
                          check (status in ('draft', 'approved', 'sent')),
  generated_at            timestamptz not null default now(),
  sent_at                 timestamptz
);

create index if not exists plans_submission_idx
  on public.plans (intake_submission_id);

-- ── Row Level Security ─────────────────────────────────────────────────────
alter table public.clients            enable row level security;
alter table public.intake_links       enable row level security;
alter table public.intake_submissions enable row level security;
alter table public.plans              enable row level security;

-- Authenticated trainer has full access. Server-side service-role calls bypass
-- RLS entirely (used for the public intake flow), so the anon role gets no
-- policy and is therefore denied by default.
create policy "trainer full access — clients"
  on public.clients for all to authenticated using (true) with check (true);

create policy "trainer full access — intake_links"
  on public.intake_links for all to authenticated using (true) with check (true);

create policy "trainer full access — intake_submissions"
  on public.intake_submissions for all to authenticated using (true) with check (true);

create policy "trainer full access — plans"
  on public.plans for all to authenticated using (true) with check (true);
