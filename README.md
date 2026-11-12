# Sara De Masi — Academic Website

A fast, accessible **academic portfolio** for Prof. Sara De Masi (University of Florence): research, searchable publications with DOI and research links, talks, teaching, service, awards and news — all editable from a secure admin dashboard.
Built on Website 04 (CV Portfolio): same design, stack and admin.

| | |
|---|---|
| **Framework** | Next.js 16 (App Router) + React 19 + TypeScript |
| **Styling** | Tailwind CSS v4 · Website 04 design (Montserrat + DM Sans, gold accent) |
| **Data / Auth / Media** | Supabase Postgres + Auth + Storage, protected by Row Level Security |
| **Hosting** | Vercel |

## 1. Pages and menu

Design: the same as Website 04 (fixed sidebar, black/white with gold accent, animated photo shape, typing roles, mouse circle, light/dark switch).

| Menu | URL | Content |
|---|---|---|
| Home | `/` | Name, typing roles, short intro, 3 numbers, Invite Me + Download CV buttons |
| About | `/about` | Bio, research areas, experience, education, visiting posts, leadership, awards, refereeing & memberships, affiliations |
| Publications ▾ | `/publications/papers` | 15 journal papers; **View Paper** button opens the DOI in a new tab (only where a real DOI exists) |
| | `/publications/books` | Books and Book Chapters (12) |
| | `/publications/other` | Proceedings, working papers, reports, thesis (17); the 3 real links from the old Google Site are included |
| Teaching | `/teaching` | Current courses by institution + previous teaching |
| News | `/news`, `/news/[slug]` | News |
| Curriculum Vitae | `/cv` | European-style CV (Europass layout), **Download CV (PDF)** and Print |
| Contact | `/contact` | Form (subject, affiliation, GDPR consent) and addresses |
| – | `/privacy` | Privacy notice (linked from the contact form) |

Links are real only: a “View Paper” button appears when a DOI is stored, plus any real extra link added in the admin. No search links are generated.

## 2. Admin dashboard (`/admin`)

Overview · Profile (bio, typing words, photo, CV PDF, details, social links) · **Publications** (type decides the menu: journal → Papers; book/chapter → Books & Book Chapters; others → Other Publications) · Talks & events (shown in the CV) · Courses · Positions & education · Research areas · Service lists · Awards · Highlights · Affiliations · News · Messages · Settings (name, accent colour, theme, mouse circle, pages on/off, SEO).

Messages: the *Subject* is stored in the existing `service` column and the *Affiliation* in the `budget` column (the dashboard labels them correctly).

> **Demo mode:** if the Supabase variables are empty, the public site runs on the content in `src/data/demo.ts`.

## 3. Local development

Node.js 20.9+ (22 recommended).

```bash
npm install
cp .env.example .env.local      # fill in values (or leave Supabase empty for demo mode)
npm run dev                     # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run build` / `npm start` | Production build / serve |
| `npm run typecheck` | TypeScript check |
| `npm run seed:generate` | Regenerate `supabase/seed.sql` from `src/data/demo.ts` |
| `npm run schema:sql -- site04` | One SQL file for the multi-website setup (all migrations + content) |

**Content source:** `src/data/demo.ts` holds all of Prof. De Masi's content (typos of the original CV corrected). Edit it, run `npm run seed:generate`, then re-run `supabase/seed.sql`.

---

## 3. Environment variables

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | ✅ | Production URL, e.g. `https://adrianvale.com`. Used for canonical URLs, the sitemap and Open Graph. |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ (for the dashboard) | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ (for the dashboard) | The **anon / publishable** key. It is safe in the browser because RLS protects all data. |
| `NEXT_PUBLIC_SUPABASE_SCHEMA` | optional | Only for the multi-website demo setup (see “One Supabase project, many websites”). Leave empty for client installs. |
| `CRON_SECRET` | recommended | Protects the daily keep-alive cron (`/api/keep-alive`) |
| `SUPPORT_*` | optional | Overrides for the protected support page (see §7) |

**Never** add the Supabase `service_role` key to this project. It is not needed, and it must never reach the browser.

---

## 4. Supabase setup

1. Create a new project at [supabase.com](https://supabase.com), one per client.
2. **SQL Editor** → run `supabase/migrations/0001_init.sql`.
   This creates all tables, the RLS policies, the `portfolio-media` storage bucket (5 MB limit; JPG/PNG/WebP/AVIF/PDF only) and its storage policies.
3. **SQL Editor** → run `supabase/migrations/0002_hardening.sql`.
   This adds database-level contact-form anti-spam, stops public listing of storage files, and locks the admin columns users may edit.
4. **SQL Editor** → run `supabase/migrations/0003_awards_sections.sql`.
   This adds the Awards table and the page-section settings.
5. **SQL Editor** → run `supabase/migrations/0004_business.sql`.
   This adds the Counters and Process tables and extra profile fields.
6. **SQL Editor** → run `supabase/migrations/0005_cv.sql`.
   This adds the personal info list, skill styles and the contact map link.
7. **SQL Editor** → run `supabase/migrations/0006_academic.sql`.
   This adds Publications, Talks, Courses and Gallery, the academic profile fields, and removes the unused portfolio tables.
8. **SQL Editor** → run `supabase/seed.sql` to load Prof. De Masi's content (44 publications, 50 talks, teaching, awards, positions, news). It is safe to re-run; it replaces content but keeps messages and admins.
9. **Authentication → Users → Add user**: create the owner (email + password, auto-confirm).
10. Make that user the dashboard owner:

   ```sql
   insert into public.admins (user_id, display_name)
   select id, 'Sara De Masi' from auth.users where email = 'owner@example.com'
   on conflict (user_id) do update set active = true;
   ```

11. **Authentication → Sign In / Providers**: turn **off** "Allow new users to sign up". Only users you create can log in, and only users listed in `admins` can reach the dashboard.
12. **Authentication → URL Configuration**:
   - Site URL: your production URL
   - Redirect URLs: add `https://YOUR-DOMAIN/admin/auth/callback` (plus `http://localhost:3000/admin/auth/callback` for local work). The password-reset email uses this route.

With the Supabase CLI, you can instead run `supabase db push` and then execute `seed.sql`.

Recommended extra settings (Authentication → Policies / Passwords): set a minimum password length of 10+ and turn on **leaked password protection**.

---

## One Supabase project, many websites (demo / event setup)

Supabase's free plan allows only 2 active projects. For demos and events you can run **many websites from ONE free project**.
Each website gets its own Postgres *schema* (`site01`, `site02`, …) with its own data, admins and storage bucket.
Normal client installs don't need this: leave `NEXT_PUBLIC_SUPABASE_SCHEMA` empty and follow §4.

1. Pick a unique name for this website, for example `site04`.
2. Generate the ready-made SQL file:
   ```bash
   npm run schema:sql -- site04
   ```
   This creates `supabase/schemas/site04.sql` (all migrations + demo content, installed into schema `site04`, with bucket `site04-media`).
3. Supabase → **SQL Editor** → paste the whole file → **Run**. Run it **only once**. Running it again later replaces all content of this website with the demo content (messages and admins stay).
4. Supabase → **Project Settings → Data API → Exposed schemas** → add `site04` → **Save**. Without this step the website cannot read its data.
5. Make your user the owner of this website (create the user once in Authentication → Users; one user can own several websites):
   ```sql
   insert into site04.admins (user_id, display_name)
   select id, 'Sara De Masi' from auth.users where email = 'owner@example.com'
   on conflict (user_id) do update set active = true;
   ```
6. Website env (`.env.local` and Vercel): the same `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` for every website, plus
   `NEXT_PUBLIC_SUPABASE_SCHEMA=site04`.
7. Supabase → **Authentication → URL Configuration → Redirect URLs**: add `https://THIS-WEBSITE/admin/auth/callback` for every website.

Repeat with other names (`site05`, `site06`, …) for the other websites. Website 01, 03 and 04 can all live in the same project.
Notes: all websites share the project's free limits (500 MB database, 1 GB storage), and a free project pauses after 7 days without activity — open the dashboard before an event to make sure it is **Active**.

---

## 5. Deployment (Vercel)

1. Push this repository to GitHub and import it in Vercel. The framework is detected automatically.
2. Add the environment variables from §3 for Production (and Preview).
3. Deploy, then add the custom domain. Vercel provisions HTTPS automatically.
4. Update `NEXT_PUBLIC_SITE_URL` and the Supabase redirect URLs to the final domain, then redeploy.

Uploaded media lives in Supabase Storage, not on Vercel, so it survives every redeploy.
Content edits appear on the public site immediately, because the dashboard revalidates the cached pages when you save.


### Keep a free Supabase project awake (automatic)
Free Supabase projects pause after 7 days without activity. This project includes a daily **Vercel Cron** (`vercel.json` → `/api/keep-alive`) that runs one tiny read query every day, so the database stays active without anyone logging in.
- It starts automatically after you deploy to Vercel (Vercel → Project → **Settings → Cron Jobs** shows it).
- Recommended: add `CRON_SECRET` (any long random text) in Vercel → Settings → Environment Variables, then redeploy. Only Vercel's cron can then call the route.
- Before an important event, still open the Supabase dashboard once and check the project says **Active**. A paused project must be restored from the dashboard.

---

## 6. Admin login & roles

- Dashboard: `https://YOUR-DOMAIN/admin` (it is excluded from search engines and `robots.txt`).
- This build uses a **single Owner role**. Every user in the `admins` table with `active = true` has full content access.
  - To add a second person, create them in Supabase Auth and insert them into `admins`.
  - To remove access, set `active = false` or delete the row. A deactivated user is rejected by the server on their next request.
- Security is enforced in three layers:
  1. `src/proxy.ts` redirects signed-out visitors away from `/admin`.
  2. Every page and server action verifies the session and the admin row on the server (`requireAdmin` / `assertAdmin`).
  3. Postgres **RLS** allows writes only when `public.is_admin()` is true. Hiding a button is never the protection.

---

## 7. Protected support page

`/admin/support` shows your company's contact details: WhatsApp, Messenger, phone, email, and website.
The client **cannot edit or delete** it. There is no table, form, or server action for it.

Set the values before handover, either:
- in `src/config/support.ts`, or
- through the `SUPPORT_COMPANY_NAME`, `SUPPORT_PHONE`, `SUPPORT_WHATSAPP_URL`, `SUPPORT_MESSENGER_URL`, `SUPPORT_EMAIL`, and `SUPPORT_WEBSITE_URL` environment variables in Vercel.

---

## 6. Media

Uploads go to the Supabase bucket `portfolio-media` (JPG, PNG, WebP, AVIF, PDF; 5 MB). Placeholders in `public/demo` (portrait, news covers) are replaced from the dashboard. The seeded CV `public/files/Sara-De-Masi-CV.pdf` is generated from the data and should be replaced with her official CV PDF in Admin → Profile.

## 7. Project structure

```
src/app/(site)/        public pages (see §1)
src/app/admin/         login + dashboard
src/components/site/   header, footer, hero, publication card + browser, talks timeline, timeline …
src/lib/publications.ts  DOI / Scholar links, APA and BibTeX
src/lib/admin/resources.ts  every editable content type (form, table, validation)
src/data/demo.ts       content (source of seed.sql)
supabase/migrations/   0001 … 0006_academic.sql
```

To add a new editable list: add a table in a new migration and an entry in `src/lib/admin/resources.ts`.

---

## 10. Security checklist

- [x] RLS enabled on every table. Anonymous users can read published content and insert contact messages only.
- [x] The service-role key is never used.
- [x] Server-side role check on every mutation, plus Zod validation.
- [x] Login, password reset, and contact form are rate limited. Login errors are generic and never reveal whether an account exists.
- [x] No `dangerouslySetInnerHTML` with user content. Blog content is rendered as plain React text; JSON-LD is escaped.
- [x] Security headers: `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, HSTS.
- [x] Contact form spam is also capped inside the database (30 messages per 10 minutes overall, 3 per email per hour), so calling the API directly cannot flood the inbox.
- [x] Storage files can be viewed by URL but not listed publicly. Only safe image types and PDF are accepted (no SVG/HTML uploads).
- [x] Deactivated admins are signed out of the dashboard on their next request.
- [x] Uploaded images are deleted only when no other record still uses them.
- [x] The admin area sends `noindex` and `no-store`.

---

## 11. Handover checklist

- [ ] Add the portrait photo(s) (Admin → Profile) and her official CV PDF.
- [ ] Add her real social/profile links if wanted (Admin → Profile → Social / profile links).
- [ ] Add DOIs for the papers without one (Annals of Corporate Governance 2025, J. Technology Transfer 2020, IJSM 2018, CGIR 2015).
- [ ] Confirm the items listed in `HANDOVER_NOTES.md`.
- [ ] Set the support details (`src/config/support.ts`) and `NEXT_PUBLIC_SITE_URL`.
- [ ] Create the owner account, send the client the login URL, turn off public sign-ups in Supabase.
- [ ] Add the data-controller details to `/privacy`.
# sara-de-masi-client
