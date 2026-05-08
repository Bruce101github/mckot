# website (mckot marketing site) — Claude context

Public **marketing / landing** site for Mckot. Built with **Next.js App Router** on **Next 15.x** (see `package.json`) — **not** the same Next major as `admin/` (16).

## Tech stack

- **Next.js** `^15.1.3`, **React** `^19`, **TypeScript** `^5.7`
- **Tailwind CSS** `^3.4` (note: admin uses Tailwind **4** — patterns differ)
- **Framer Motion** `^11`, **Lucide** icons
- **Lint:** `eslint-config-next`

## Folder structure

```
src/
  app/                  # App Router pages (home, about, services, legal, etc.)
  app/api/              # Route handlers (vendor-signup, coverage-check)
  components/           # Marketing sections (home/*, Footer, etc.)
  lib/site.ts           # Site metadata helpers (verify contents)
public/                 # Static assets
```

Canonical setup notes: `website/README.md`.

## Conventions

- **Content-forward:** Prefer small server components + motion in client islands where used.
- **Env:** Copy `.env.example` → `.env.local`; typical vars documented in README (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_URL`, vendor signup forwarding vars).
- **API routes:** Lightweight bridges — may **log** payloads instead of proxying if env not configured (`README.md` “Vendor signup API”).

## Key files

| Path | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout & metadata |
| `src/app/page.tsx` | Homepage composition |
| `src/app/api/vendor-signup/route.ts` | Vendor intake POST |
| `src/app/api/coverage-check/route.ts` | Heuristic coverage response |
| `README.md` | Authoritative runbook for this package |

## Common patterns

### New marketing page

1. Add `src/app/<slug>/page.tsx`.
2. Compose sections from `src/components/...`.
3. Update navigation/footer links (`src/components/Footer.tsx`, header components if present).

### New API bridge route

1. Add `src/app/api/<name>/route.ts`.
2. Validate JSON input minimally; forward with `fetch` to backend URL from env; avoid leaking secrets to client bundles (use server-only env vars without `NEXT_PUBLIC_` prefix when possible).

## Testing

- No dedicated test runner configured beyond **`npm run lint`**.
- Add Vitest/Playwright later if marketing QA requires automation.

## Dependencies on other components

- **Soft dependency** on backend for vendor signup forwarding (`VENDOR_SIGNUP_API_URL`).
- **No shared code** with `admin/` — duplicate patterns are accidental if they appear similar.

## Frequent tasks

```bash
cd website
npm install
cp .env.example .env.local   # then edit
npm run dev
npm run build && npm run start
```

## Quirks / TODOs

- **Coverage checker** is heuristic — README states replace with real geocoding/backend integration when ready.
- **Legal pages** (`eula`, `privacy`, `terms`) exist under `src/app/` — keep copy in sync with product/legal counsel.
