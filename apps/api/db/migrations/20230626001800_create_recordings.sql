-- migrate:up
create table "recordings" (
    "id" serial primary key,
    "artistId" int references users(id),
    "parentId" int references recordings(id),
    "title" text not null,
    "url" text not null,
    "createdAt" timestamp default current_timestamp,
    "updatedAt" timestamp default current_timestamp
);

-- migrate:down
drop table if exists "recordings";