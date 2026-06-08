# Star Consulting Engineering

A demonstration consultancy website for a piping / stress / vibration engineering
firm. Built as a **project** (not a live production service): polished marketing
site + interactive engineering calculators, backed by Supabase for form storage.

Scope deliberately trimmed from the full blueprint — **no CMS, no AI integration**.
Page content lives in static TypeScript data files; Supabase stores only form
submissions.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** (design tokens in `src/app/globals.css`)
- **Supabase** — inquiry + newsletter storage
- **Resend** — optional email notifications
- **Zod** — form validation
- **lucide-react** — icons

## Pages

- Home, About
- Services listing + 10 static service detail pages (`/services/[slug]`)
- Industries listing + 10 static industry detail pages (`/industries/[slug]`)
- Contact (inquiry form → Supabase + email)
- Tools hub + 5 client-side calculators: pipe thickness, thermal expansion,
  pressure drop, unit converter, stress allowable

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in Supabase (and optionally Resend) values
npm run dev
```

Create the database tables by running `supabase/schema.sql` in the Supabase
SQL editor.

## Environment variables

See `.env.example`. Supabase is required for the forms to save; Resend is
optional (emails are skipped if `RESEND_API_KEY` is unset, submissions still save).

## Notes

- The 5 engineering calculators are fully client-side and use **indicative**
  reference values only. Always verify against the current edition of the
  governing code (ASME B31.3 etc.) for formal design.
- `.env.local` is git-ignored; secrets are never committed.
