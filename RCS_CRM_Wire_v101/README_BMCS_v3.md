# BM_CRM v3 — Supabase + Invoicing (B&M)
Adds Supabase auth + RLS and an invoice flow (create → email → paid).

## New files
- /supabase/schema.sql — schema + RLS + seed (company + Corey admin)
- /lib/supabase.js — expects supabase-js v2 CDN
- /invoice.html + /assets/invoice.js
- /emails/invoice_template.html
- /login.html, /register.html
- .env.example updated

## Setup
1) Supabase → new project → SQL editor → run supabase/schema.sql
2) Auth → invite/sign-in corey@bmcs365.com
3) Netlify → deploy zip; set env vars:
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SENDGRID_API_KEY=
SENDGRID_FROM=no-reply@bmcs365.com
MELIO_WEBHOOK_SECRET=change-me
SUPABASE_SERVICE_ROLE=
SUPABASE_URL=

Then visit /invoice.html to create invoices, send, and simulate payment.
With SUPABASE_SERVICE_ROLE and SUPABASE_URL, the melioWebhook updates invoice status on the server.
