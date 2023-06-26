-- migrate:up
create table "users" (
    "id" serial primary key,
    "userId" varchar(255) unique not null,
    "email" varchar(255) unique not null,
    "passwordHash" text not null,
    "displayName" varchar(255),
    "bio" text,
    "avatarUrl" text,
    "createdAt" timestamp default current_timestamp,
    "updatedAt" timestamp default current_timestamp
);

-- migrate:down
drop table if exists "users";
