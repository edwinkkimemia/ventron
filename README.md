# Ventron Mechanical Systems Ltd

Premium industrial engineering website — Next.js 14 App Router + TypeScript + Tailwind + Prisma + PostgreSQL + NextAuth.

**Tagline:** Your Vision, Our Engineering.

## Quick start

```bash
cp .env.example .env        # fill DATABASE_URL (Neon/Supabase/Prisma Postgres), NEXTAUTH_SECRET, SMTP
npm install
npx prisma migrate dev --name init
npm run db:seed             # creates admin, services, industries, sample (placeholder) projects
npm run dev
```

Admin: `/admin` → login with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env`.

## Deploy (Vercel + pooled Postgres)

1. Create DB (Neon/Supabase) — set the connection string as `DATABASE_URL` (for pooled hosts, append `?pgbouncer=true`).
2. Vercel → import repo → set env vars from `.env.example`.
3. Build command: `prisma generate && next build` (already in `package.json`).
4. Run migrations: `prisma migrate deploy`, then seed once.

## Structure

- `app/` — public pages + `/admin` dashboard + `/api` routes
- `components/` — Navbar, Footer, Cards, Forms, CTA, Timeline, Stats
- `lib/` — prisma, auth, validations (Zod), email, rate-limit, seo
- `prisma/` — schema + seed
- `config/site.ts` — nav, contacts
