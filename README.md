# GasCap.ai (Scaffold)

A Next.js (App Router) + TypeScript + Tailwind + Prisma + NextAuth scaffold for GasCap.ai.

## Features (MVP)
- Quick Calc with **Target Level** and **Budget** modes
- Vehicle profiles (CRUD UI; Prisma schema included)
- Station + Price capture (manual)
- History logging
- Auth (email magic link placeholder)
- PWA manifest scaffold

## Getting Started
1. **Install deps**
   ```bash
   npm install
   ```

2. **Configure .env**
   Create `.env` from `.env.example` and fill:
   - `DATABASE_URL` (Neon/Supabase Postgres)
   - `AUTH_SECRET` (run `openssl rand -base64 32`)
   - `AUTH_URL` (e.g. http://localhost:3000)
   - `EMAIL_SERVER_*` if using SMTP magic links (or skip temporarily)

3. **Prisma**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. **Dev**
   ```bash
   npm run dev
   ```

## Deploy
- Vercel for hosting
- Neon or Supabase for Postgres
- Set environment variables in Vercel dashboard
- Run `prisma migrate deploy` in a Vercel build or CI step

## Notes
- Email magic links require SMTP provider (e.g., Resend, Postmark, Mailgun). For local dev, you can temporarily use credentials provider (username = email, any password) to test UI only.
- Update the `/app/(auth)/signin` page to show whichever auth options you enable.
