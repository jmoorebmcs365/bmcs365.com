-- Ensure pgcrypto for gen_random_uuid
create extension if not exists pgcrypto;

-- BMCS Supabase Schema (v3)
create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  domain text,
  created_at timestamp with time zone default now()
);
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text,
  role text check (role in ('admin','client','vendor')) default 'client',
  company_id uuid references companies(id) on delete cascade,
  created_at timestamp with time zone default now()
);
create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  client_name text not null,
  amount numeric(12,2) not null,
  status text check (status in ('draft','sent','paid','overdue')) default 'draft',
  created_at timestamp with time zone default now()
);
alter table companies enable row level security;
alter table users enable row level security;
alter table invoices enable row level security;
create policy if not exists "read own invoices"
on invoices for select
using ( exists ( select 1 from users u where u.id = auth.uid() and u.company_id = invoices.company_id ) );
create policy if not exists "insert own invoices"
on invoices for insert
with check ( exists ( select 1 from users u where u.id = auth.uid() and u.company_id = invoices.company_id ) );
create policy if not exists "update own invoices"
on invoices for update
using ( exists ( select 1 from users u where u.id = auth.uid() and u.company_id = invoices.company_id ) );
-- Seed
insert into companies (id, name, domain)
values ('00000000-0000-0000-0000-000000000001', 'B&M Commercial Services', 'bmcs365.com')
on conflict (id) do nothing;
insert into users (id, email, full_name, role, company_id)
values ('00000000-0000-0000-0000-00000000000a', 'corey@bmcs365.com', 'Corey Brown', 'admin', '00000000-0000-0000-0000-000000000001')
on conflict (email) do nothing;

-- v3.5 line items
create table if not exists invoice_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid references invoices(id) on delete cascade,
  description text, quantity numeric default 1, rate numeric default 0, tax numeric default 0,
  created_at timestamp default now()
);
