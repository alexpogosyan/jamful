drop table if exists profiles;

create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  created_at timestamptz default now(),
  username varchar(50) unique not null check (char_length(username) >= 2),
  display_name varchar(100) not null default '',
  avatar_url text not null default '',
  about text not null default ''
);


alter table profiles enable row level security;

create policy profiles_read_by_everyone on profiles for
  select using (true);

create policy users_can_create_their_own_profile on profiles for
  insert with check (auth.uid() = id);

create policy users_can_update_their_own_profile on profiles for
  update using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data->>'username');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
