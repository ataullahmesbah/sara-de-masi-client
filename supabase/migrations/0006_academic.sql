-- =====================================================================
-- Academic website additions (run after 0005_cv.sql). Safe to re-run.
-- Publications, talks, teaching, gallery + new profile fields.
-- =====================================================================

-- ---------- Publications (with unlimited research links) ----------
create table if not exists public.publications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  pub_type text not null default 'journal' check (pub_type in ('journal', 'book', 'chapter', 'proceedings', 'working', 'other')),
  authors text not null,
  year int not null,
  venue text,
  details text,
  doi text,
  isbn text,
  abstract text,
  topics text[] not null default '{}',
  abs_stars int not null default 0 check (abs_stars between 0 and 4),
  impact_factor text,
  badge text,
  status text not null default 'published' check (status in ('published', 'forthcoming', 'working')),
  featured boolean not null default false,
  language text not null default 'en',
  links jsonb not null default '[]'::jsonb,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- Talks & events ----------
create table if not exists public.talks (
  id uuid primary key default gen_random_uuid(),
  year int not null,
  event text not null,
  location text,
  dates text,
  role text not null default 'presenter' check (role in ('presenter', 'chair', 'discussant', 'organizer', 'mentor', 'invited', 'participant')),
  title text,
  link_url text,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- Courses ----------
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  institution text not null,
  programme text,
  level text,
  language text,
  years text,
  status text not null default 'current' check (status in ('current', 'past')),
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- Gallery ----------
create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text not null,
  alt_text text not null,
  caption text,
  credit text,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

do $$
declare t text;
begin
  foreach t in array array['publications', 'talks', 'courses', 'gallery_items'] loop
    execute format('drop trigger if exists trg_%1$s_updated on public.%1$s', t);
    execute format('create trigger trg_%1$s_updated before update on public.%1$s for each row execute function public.set_updated_at()', t);
    execute format('alter table public.%1$s enable row level security', t);
    execute format('drop policy if exists "public read %1$s" on public.%1$s', t);
    execute format('drop policy if exists "admin insert %1$s" on public.%1$s', t);
    execute format('drop policy if exists "admin update %1$s" on public.%1$s', t);
    execute format('drop policy if exists "admin delete %1$s" on public.%1$s', t);
    execute format('create policy "public read %1$s" on public.%1$s for select using (active or public.is_admin())', t);
    execute format('create policy "admin insert %1$s" on public.%1$s for insert to authenticated with check (public.is_admin())', t);
    execute format('create policy "admin update %1$s" on public.%1$s for update to authenticated using (public.is_admin()) with check (public.is_admin())', t);
    execute format('create policy "admin delete %1$s" on public.%1$s for delete to authenticated using (public.is_admin())', t);
  end loop;
end $$;

-- ---------- Positions / education / visiting / service use the resume table ----------
alter table public.resume_items drop constraint if exists resume_items_type_check;
alter table public.resume_items add constraint resume_items_type_check
  check (type in ('education', 'experience', 'visiting', 'service'));

-- ---------- Awards do not need an image ----------
alter table public.awards alter column image_url drop not null;

-- ---------- News: optional external link (e.g. a LinkedIn post) ----------
alter table public.blog_posts add column if not exists link_url text;

-- ---------- Profile: academic fields ----------
alter table public.profile
  add column if not exists affiliation text,
  add column if not exists research_interests text[] not null default '{}',
  add column if not exists press_bio text,
  add column if not exists cv_updated text;

-- ---------- Tables of the old portfolio template that are no longer used ----------
drop table if exists public.projects cascade;
drop table if exists public.pricing_plans cascade;
drop table if exists public.process_steps cascade;
drop table if exists public.testimonials cascade;

-- ---------- Storage: allow the "gallery" upload folder ----------
drop policy if exists "admin upload media" on storage.objects;
create policy "admin upload media" on storage.objects for insert to authenticated
  with check (bucket_id = 'portfolio-media' and public.is_admin()
    and (storage.foldername(name))[1] in ('profile', 'projects', 'services', 'testimonials', 'clients', 'awards', 'blog', 'documents', 'settings', 'gallery'));
