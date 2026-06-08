-- Star Consulting Engineering — Supabase schema
-- Run this in the Supabase SQL editor (or via the CLI) to create the
-- tables the contact and newsletter forms write to.

create table if not exists public.inquiries (
  id          uuid primary key default gen_random_uuid(),
  reference   text not null unique,
  name        text not null,
  email       text not null,
  phone       text,
  company     text,
  designation text,
  service     text not null,
  industry    text not null,
  message     text not null,
  timeline    text not null,
  created_at  timestamptz not null default now()
);

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_email_idx on public.inquiries (email);

create table if not exists public.newsletter_subscribers (
  id            uuid primary key default gen_random_uuid(),
  email         text not null unique,
  subscribed_at timestamptz not null default now()
);

-- Row Level Security: enabled with no public policies.
-- The app writes using the service role key, which bypasses RLS,
-- so no anon access is granted to these tables.
alter table public.inquiries enable row level security;
alter table public.newsletter_subscribers enable row level security;
