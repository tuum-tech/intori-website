# intori Brand Reference (marketing site)

> Rewritten 2026-07-23. The Jan 2026 neon spec (`#D5F74E` lime, `#121212`/`#171738`
> dark grounds, `#60B3D7` blue, `#F2FD00` yellow) is retired and has been removed
> from this document. The live token source of truth is `pages/index.module.css`;
> this file is the human-readable summary. `HANDOFF.md` and `ASSET_LIST.md`
> (one-time neon-era documents) were deleted in the same pass.

## Warm "Direction A" system (2026-07-09) — AUTHORITATIVE

| Role | Value |
|---|---|
| ground (page) | `#FCF8F1` |
| warm plane (alt sections / chips) | `#FAF3E6` |
| paper-soft (placeholders / quotes) | `#F7F2E9` |
| card | `#FFFFFF` |
| ink (text, headings, **CTAs**) | `#26213E` |
| ink-hover (CTA hover) | `#322B4E` |
| ink-soft (secondary text) | `rgba(38, 33, 62, 0.72)` (5.96:1 on cream, passes AA; was 0.62 at 4.36:1) |
| ink-faint (decorative ONLY: arrows, rules, marks; 2.49:1, never running text) | `rgba(38, 33, 62, 0.42)` |
| hairline (borders / dividers) | `#E9E2D3` |
| spark (accent, **non-text only**) | `#93B32A` |
| spark-hover | `#85A226` |
| card shadow | `0 1px 2px rgba(38,33,62,.04), 0 15px 34px -14px rgba(38,33,62,.17)` |
| radii | card `22px` · imagery `16px` · pill `999px` |

**Contrast guardrail:** `#93B32A` fails WCAG AA as text/glyph on cream — use it
ONLY as a non-text accent (dot, 3px rule, artwork). Every glyph, numeral, check,
and code character on a light ground is ink `#26213E`.

**Cluster accents (never text color, fill, or glow).** The four lanes are
**orange, purple, blue, red** (founder ruling 2026-08-27), matching the app's
own cluster colors so a lane reads the same in the product and on the site:
sports `#F76B15` · music `#D467FF` · watch `#60B3D7` · food `#E5484D`.
The amber `#DD8C22` proposed for Watch in the redesign mockup is **replaced**,
and `#60B3D7` is no longer retired: it IS the Watch lane color. `#F2FD00`
(neon yellow) and `#FF5C8A` (style) remain retired.
Sanctioned non-text uses on the homepage (added 2026-08-27): artwork/thumbnails,
the 2px hero-subhead underlines, and the 8px rounded lane marks (card kickers,
closing section). Glyphs above them stay ink. Watch blue is lighter than the
other three, so its underline runs at 0.7 alpha where the others sit at 0.5 to
0.55, to carry equal visual weight.

## Type (marketing surfaces, Aug 2026)

Schibsted Grotesk for display and body (weights 400–800, headline tracking
-0.03em to -0.035em). Newsreader italic is an editorial accent used **once per
page**, on the homepage wedge line. Both load via `next/font` in
`pages/_app.tsx` and are exposed as `--font-sans` / `--font-serif`; Newsreader
needs `adjustFontFallback: false` (no Next fallback-metrics entry for the
italic-only face).

## Voice / register (updated Aug 2026)

- Homepage hero (App Store launch, Sept 2026): "Something to look forward to."
  is the tagline and the H1. The positioning line is "Your calendar tells you
  what you have to do. intori gives you something to look forward to."
- Four live lanes, in this order everywhere (hero subhead, lane grid,
  supporting visuals): Sports, Music, Shows, Food. Lane words only; the old
  helper product names are retired. Music is live events ("who's playing"),
  never playlists or "music picks". Food is never the lead, and is framed as
  support for a plan (dinner near the venue) or a few good places near home,
  never meal planning, recipes, or shopping lists.
- Style Finds is parked and must not appear on any marketing surface.
- iPhone leads. The button verb is "Add to calendar" and the result is "On
  your calendar": one tap to the iPhone's calendar, with Sign in with Apple.
  Google Calendar and Skylight are mentioned quietly (the calendar link in
  Settings), never as a choice the reader has to make up front.
- Calendar language stays user-initiated: intori adds only what you tap to
  add. It can add events and nothing else, so never claim it reads a
  calendar, knows what is on it, or finds free time. What intori knows is
  what you added through intori.
- Sell the paid relationship, not the install: the product is built to be
  useful and put down (a few picks, a named end, a few alerts a week at
  most), and households pay for it so it never needs ads or scrolling.
- No em dashes in visible copy or meta. Outcome-first; "AI" stays invisible in
  consumer copy. "Personalization, built from you" is developer/partner-only.
- Retired vocabulary (never reintroduce): packs, stamps, matches, vault,
  "identity", "meet people", drafts, ChatGPT/"your AI tools" framing,
  World ID "verified humans / no bots", token/onchain/crypto, gifting.

## Asset inventory (live, post-purge 2026-07-23; refreshed 2026-08-27)

- `public/og/og-forward-v7.jpg` — the current OG card, warm (1800x945).
  v7 is the first card carrying the **lane words** (Sports, Music, Shows, Food);
  v6 and earlier still show the retired helper product names and stay on disk.
  Unlike every card before it, v7 has a **source in the repo**:
  `public/og/templates/og-forward-v7.html`, rendered at 1800x945. Regenerate
  from that template rather than editing the JPEG, and see its header comment
  for the capture command.
  OG filenames are **versioned on purpose**: scrapers cache image bytes by URL,
  so new card art always ships at a new path and older files stay in place so
  previously-scraped embeds do not 404.
- `public/brand/app/{today,setup,added,lock,week}.jpg` — the iPhone screens on
  the homepage, 1206x2622. These are **rendered mocks, not captures**: the
  source is `design/app-mocks/*.html`, built from the app's own tokens, and
  `scripts/render-app-mocks.sh` renders them with headless Chrome. Edit the
  HTML and re-render rather than editing a JPEG. Every screen uses one demo
  household so the story holds together: a Steelers family near Pittsburgh,
  Foster The People on the calendar, Chicago Fire followed. Rules:
  - **Real data only.** Games, venues, times and air dates are ones the app
    actually showed for a test household. Never invent an event for a real
    team, artist or show.
  - **No third-party art.** Sports uses the app's own matchup badges; lane and
    cuisine photos are intori's. No posters, artist photos or team logos.
  - **App wording, verbatim.** Copy comes from the app's source (receipt,
    setup, notification templates), not paraphrase.
  - Last matched against the launch build on 2026-09-29 (iPhone 17 Pro
    captures). Re-check after any Home, Week, receipt or setup change.
- `public/brand/lanes/*.jpg` — the commissioned lane photography (1024px),
  copied from the app repo's `public/images/STAMPS/`. Casting leans toward
  mothers, families, and a range of ages and skin tones, per the app's
  image commission; never weapons or anything that reads as a deterrent.
- `public/brand/warm/` — **DELETED 2026-09-21**. The Build 15 captures it held
  showed the pre-launch Home ("View details" and "Pass"), and nothing
  references them after the launch rebuild. Recoverable from git history.
- `public/brand/hero-stamps/`, `public/brand/stamps/`, `public/brand/icons/` —
  **DELETED 2026-08-27**. The 2026-08-26 homepage rebuild removed the float
  cards, trust avatars, step backdrop, and helper-card line icons that used
  them, leaving 12 files (~10 MB) referenced by nothing. Recoverable from git
  history if a future surface needs cluster line icons.
- `public/assets/templates/avatar_fallback.png` — dashboard avatar fallback.
- `public/news/` — article hero images (articles currently unpublished).

Everything else from the Farcaster/crypto era (frames, screenshots, references,
landing-page, stamp/NICHE art, World ID badge, bitmap frame fonts, stray logos,
unused cluster icons) was deleted 2026-07-23.
