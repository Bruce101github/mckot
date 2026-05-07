# Mckot marketing site

Premium marketing site for **Mckot**, built with **Next.js 15** (App Router), **Tailwind CSS**, **Framer Motion**, and **Lucide** icons.

## Prerequisites

- Node.js 20+
- npm (or pnpm / yarn)

## Setup

```bash
cd website
cp .env.example .env.local
# Edit .env.local: set NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_WHATSAPP_URL at minimum.
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## Vendor signup API

`POST /api/vendor-signup` accepts JSON fields: `contactName`, `businessName`, `phone`, `socialHandle`, `monthlyDeliveries`, `serviceZone`.

- If **`VENDOR_SIGNUP_API_URL`** is set, the route forwards the payload (optional **`VENDOR_SIGNUP_API_KEY`** as `Authorization: Bearer`).
- Otherwise the payload is **logged** on the server (`mode: logged` in JSON response for debugging only in non-production contexts).

## Coverage checker

`POST /api/coverage-check` with `{ "address": "...", "postalCode": "optional GA-..." }` returns heuristic coverage hints for Greater Accra. Replace with real geocoding when backend is ready.

## Deployment (Vercel)

1. Import the repo and set **Root Directory** to `website` if the repo is a monorepo.
2. Add environment variables from `.env.example`.
3. Deploy. `NEXT_PUBLIC_SITE_URL` should match the production domain for SEO metadata.

## Brand notes

- Colors live in `tailwind.config.ts` under `theme.extend.colors.brand`.
- User-facing copy avoids em dashes per brand guidelines.
