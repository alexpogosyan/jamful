-- migrate:up
create table users (
    id serial primary key,
    userid varchar(255) unique not null,
    email varchar(255) unique not null,
    password_hash text not null,
    display_name varchar(255),
    bio text,
    avatar_url text,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

-- migrate:down

drop table if exists users;