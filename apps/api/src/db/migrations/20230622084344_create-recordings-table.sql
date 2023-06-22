-- migrate:up
create table recordings (
    id serial primary key,
    artist_id int references users(id),
    parent_id int references recordings(id),
    title text not null,
    url text not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

-- migrate:down
drop table if exists recordings;