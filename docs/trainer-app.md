# Trainer Intake → AI Plan App

A v1 internal tool for a single personal trainer: turn client intake goals into
an AI-drafted nutrition + workout plan, review/edit it, and email it to the
client as HTML + PDF.

It lives alongside the marketing site in this same Next.js app. The marketing
site is unchanged; the trainer app is served under `/login`, `/dashboard`, and
the public `/intake/[token]` route. A client-side `components/SiteChrome.tsx`
switches between the marketing chrome (dark theme, nav, footer) and the app
chrome (clean light surface) based on the path.

## Stack

- **Next.js 14** (App Router, TypeScript) + **Tailwind CSS**
- **Supabase** (Postgres + Auth) — `@supabase/ssr` for cookie-based auth
- **Anthropic (Claude)** — `claude-opus-5` for plan generation
- **Resend** — transactional email (intake invite + finished plan)
- **pdf-lib** — PDF generation for the emailed plan

## Routes

| Route | Auth | Purpose |
|---|---|---|
| `/login` | public | Supabase email/password sign-in (single trainer account) |
| `/dashboard` | trainer | Client list with per-client status; "New Client" flow |
| `/dashboard/plans/[planId]` | trainer | Review/edit plan, clearance gate, Approve & Send |
| `/intake/[token]` | public | Client intake form; on submit generates the AI draft |
| `/api/trainer/*` | mixed | Route handlers backing the flows above |

## Setup

### 1. Environment variables

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `ANTHROPIC_API_KEY`
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (a verified Resend sender)
- `NEXT_PUBLIC_APP_URL` (no trailing slash; used to build intake + email links)

### 2. Database

Run `supabase/migrations/0001_init.sql` in the Supabase SQL editor (or via the
Supabase CLI). It creates the `clients`, `intake_links`, `intake_submissions`,
and `plans` tables, a trigger that computes `parq_flagged` on submit, and Row
Level Security policies (authenticated trainer = full access; the public intake
flow runs server-side with the service-role key, which bypasses RLS).

### 3. Create the trainer account

There is no public signup. In the Supabase dashboard → Authentication → Users →
**Add user**, create the single trainer account with an email + password. That
account is the only one that can reach `/dashboard`.

### 4. Run locally

```bash
npm install
npm run dev
```

Sign in at `/login`, add a client, and the intake link is emailed to them. To
test the full loop end-to-end, use a real email address you control.

## Security notes

- The service-role key is only ever used server-side (`lib/supabase/admin.ts`,
  which imports `server-only`). It is never bundled into client code.
- `needs_clearance` (copied from `parq_flagged`) can only be satisfied by an
  explicit trainer acknowledgment; editing plan text cannot clear it. The gate
  is enforced server-side in the send route, not just in the UI.
- All `/dashboard` routes are guarded by `middleware.ts` and re-checked in the
  dashboard layout.

## Deploy to Vercel

1. Import the repo into Vercel (framework auto-detected as Next.js).
2. Add all the env vars from `.env.example` in Project Settings → Environment
   Variables. Set `NEXT_PUBLIC_APP_URL` to the production domain.
3. Deploy, then create the trainer account in Supabase (step 3 above) and test
   the New Client → intake → review → send loop with a real email address.
