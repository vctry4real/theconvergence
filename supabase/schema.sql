-- Run this in your Supabase SQL editor to set up the database

-- Registrations table
create table public.registrations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,

  -- Status
  status text not null default 'pending' check (status in ('pending', 'approved', 'paid', 'invite_sent')),

  -- 1. Basic Info
  full_name text not null,
  email text not null unique,
  phone text not null,
  city_state text not null,
  linkedin text,
  organization text not null,
  industry text not null,
  industry_other text,

  -- 2. Registration Type
  registration_type text not null check (registration_type in ('individual', 'business', 'corporate')),

  -- 3. Individual Professional
  job_title text,
  department text,
  years_experience text,
  career_level text,
  salary_bracket text,
  career_challenge text,
  individual_convergence_goal text,

  -- 4. Business Owner
  business_name text,
  business_stage text,
  employee_count text,
  annual_revenue text,
  primary_market text,
  scaling_challenge text,
  business_convergence_goal text,

  -- 5. Corporate Team
  company_size text,
  corporate_revenue text,
  staff_count text,
  staff_list jsonb,
  corporate_reason text,

  -- 6. Strategic Screening
  current_focus text,
  attended_conference text,
  decision_authority text,

  -- 7. Commitment
  willing_to_network text,
  heard_from text
);

-- Enable Row Level Security
alter table public.registrations enable row level security;

-- Allow anyone to insert (public registration form)
create policy "Allow public insert"
  on public.registrations
  for insert
  to anon
  with check (true);

-- Only authenticated users (admins) can read and update
create policy "Allow authenticated read"
  on public.registrations
  for select
  to authenticated
  using (true);

create policy "Allow authenticated update"
  on public.registrations
  for update
  to authenticated
  using (true);
