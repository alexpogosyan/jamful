insert into storage.buckets
  (id, name)
values
  ('avatars', 'avatars');

create policy avatars_read_by_anyone on storage.objects for
select using (bucket_id = 'avatars');

create policy avatars_upload_by_anyone on storage.objects for
insert with check (bucket_id = 'avatars');
