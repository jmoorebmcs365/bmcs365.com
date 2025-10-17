# BM_CRM_Master_v1 (Static CRM Shell)

This is a static single-bundle CRM shell rebranded to **B&M Commercial Services** and prepared for Netlify.

## What’s included
- GoldBrand palette (black/gold/white) and updated logos in `/assets`
- SEO + manifest + favicon
- Netlify Functions stubs:
  - `/.netlify/functions/sendEmail` (SendGrid stub)
  - `/.netlify/functions/melioWebhook` (Melio webhook stub)
- Front-end helpers: `/assets/bmcs.js`
- Company config: `/config/bmcs.json`

## Going live on Netlify
1. **Create a new site** from this folder (or zip) and deploy.
2. Set environment variables:
   - `SENDGRID_API_KEY` = your key
   - `SENDGRID_FROM` = no-reply@bmcs365.com (recommended)
   - `MELIO_WEBHOOK_SECRET` = long random string
3. Point domain **BMCS365.com** to the Netlify site.

## Using the helpers
```js
await BMCS.sendEmail({to:"you@bmcs365.com", subject:"Test", text:"Hello"});
await BMCS.simulatePaymentWebhook({type:"payment.updated", status:"paid", amount:250});
```

## Notes
- This bundle is **static**. If you want Supabase auth, dashboards, and multi-tenant data, we can layer a lightweight app without changing visuals.
