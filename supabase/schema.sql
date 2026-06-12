-- Optional Nivara backend schema.
-- The public MVP works without this schema. Keep raw message content out of the database by default.

create table if not exists public.user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  completed_lessons text[] not null default '{}',
  completed_practice text[] not null default '{}',
  updated_at timestamptz not null default now()
);

create table if not exists public.family_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  display_name text not null,
  role text not null default 'family',
  created_at timestamptz not null default now()
);

create table if not exists public.safe_share_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  event_type text not null check (event_type in ('redacted_copy', 'template_copy')),
  created_at timestamptz not null default now()
);

alter table public.user_progress enable row level security;
alter table public.family_profiles enable row level security;
alter table public.safe_share_events enable row level security;

create policy "Users can read own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can modify own progress"
  on public.user_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can read own family profiles"
  on public.family_profiles for select
  using (auth.uid() = user_id);

create policy "Users can create own family profiles"
  on public.family_profiles for insert
  with check (auth.uid() = user_id);

create policy "Users can update own family profiles"
  on public.family_profiles for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own family profiles"
  on public.family_profiles for delete
  using (auth.uid() = user_id);

create policy "Users can create own safe share events"
  on public.safe_share_events for insert
  with check (auth.uid() = user_id or user_id is null);

create policy "Users can read own safe share events"
  on public.safe_share_events for select
  using (auth.uid() = user_id);
