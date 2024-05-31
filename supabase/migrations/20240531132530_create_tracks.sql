create table tracks (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references profiles on delete cascade not null,
  created_at timestamptz default now(),
  audio_url text not null default '',
  title text not null default '',
  about text not null default '',
  is_public boolean default false
);

alter table tracks enable row level security;

create policy users_can_create_tracks on tracks for
  insert with check (auth.uid() = profile_id);

create policy users_can_read_their_own_and_public_tracks on tracks for
  select using (auth.uid() = profile_id or is_public = true);

create policy users_can_update_their_own_tracks on tracks for
  update using (auth.uid() = profile_id);
