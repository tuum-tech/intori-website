# Intori App
> Your data, connected

[intori.com](https://intori.com/)

## Getting Started

First, setup your `.env.local`

```bash
cp .env.example .env.local

# Edit .env.local and add your own values
```

Run the dev server:

```bash
yarn install

npm run dev

# To check for linting, typescript, and nextjs errors
npm run build
```

## Populate fake user answers

Your `NEXTAUTH_URL` must start with `http://localhost` and you must be logged in with Farcaster.

Go to `/api/test` to populate 3 fake user answers with your authenticated FID.

## Sitemap checks

```bash
npm run test:sitemap
npm run test:sitemap:isr
```

`/sitemap.xml` is an ISR route that refreshes every 30 minutes. The complete XML
is cached by Next.js: a failed metro-list or candidate-week read throws, retaining
the last successful response instead of publishing a partial sitemap. The first
production build requires a successful feed read; an outage fails that build
rather than seeding the cache with an incomplete document.

The sitemap and metro pages apply the same minimum to current visible lines,
including grouped library programs. A successful refresh can legitimately remove
cities whose current content falls below that minimum.

The ISR check builds an isolated fixture with the actual route and feed parser,
using a one-second refresh interval. It verifies list outages, individual metro
outages, recovery, and exclusion of a grouped city marked `noindex`. It uses only
a local mock feed and never submits a sitemap or IndexNow request.
