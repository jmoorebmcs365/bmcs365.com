# B&M Commercial Services — Website Rebuild (v2001)

**Stack:** Next.js 14, TailwindCSS, Netlify Functions, Supabase, SendGrid 7.7.0, Melio placeholders

## Quick Start
1. `cp .env.example .env.local` and fill values.
2. `npm install`
3. `npm run dev` (local) or push to Netlify.
4. Replace `/public/assets/logo.png` with your official logo.

## Environment
- `SENDGRID_API_KEY` required to send emails from `/.netlify/functions/sendQuote`.
- `SENDGRID_TO` defaults to `info@bmcs365.com` if not provided.
- `MELIO_PUBLIC_API_KEY` and `MELIO_WEBHOOK_SECRET` are placeholders; wire them to real keys.
- Supabase `quotes` table is expected (name, email, phone, service, message).

## Melio
- `netlify/functions/melioCheckout.js` returns a dummy checkout URL. Replace with real Melio checkout creation.
- `netlify/functions/melioWebhook.js` receives webhook payloads; verify signature and update Supabase.

## CRM Connection
- Update the CRM login link in `/pages/portal.js` to your live CRM URL.
- Map invoices from CRM to the `MelioPayButton` by passing `amount` and `invoiceId`.
