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

**Cluster accents (never text color, fill, or glow):**
sports `#F76B15` · food `#E5484D` · music `#D467FF` · watch `#DD8C22`.
Sanctioned non-text uses on the homepage (added 2026-08-27): artwork/thumbnails,
the 2px hero-subhead underlines at ~50% alpha, and the 8px rounded lane marks
(card kickers, closing section). Glyphs above them stay ink.
`#60B3D7` (blue), `#F2FD00` (neon yellow), and `#FF5C8A` (style) are **retired**
on marketing surfaces.

## Type (marketing surfaces, Aug 2026)

Schibsted Grotesk for display and body (weights 400–800, headline tracking
-0.03em to -0.035em). Newsreader italic is an editorial accent used **once per
page**, on the homepage wedge line. Both load via `next/font` in
`pages/_app.tsx` and are exposed as `--font-sans` / `--font-serif`; Newsreader
needs `adjustFontFallback: false` (no Next fallback-metrics entry for the
italic-only face).

## Voice / register (updated Aug 2026)

- Homepage hero: "Tonight, decided." Campaign line "Dinner, decided." now lives
  only on the Today's Food card.
- Four live helpers, in this order everywhere (hero subhead, Today grid,
  supporting visuals): Game Day, Music Events, Watch Radar, Today's Food.
  Music is live events ("who's playing"), never playlists or "music picks".
  Food is never the lead, and never claims meal planning, recipes, or
  shopping lists.
- Style Finds is parked and must not appear on any marketing surface.
- Calendar language stays user-initiated: intori keeps what you choose on the
  calendar or household display you pick. Never claim intori reads a calendar,
  finds free time, or sends anything unprompted.
- No em dashes in visible copy or meta. Outcome-first; "AI" stays invisible in
  consumer copy. "Personalization, built from you" is developer/partner-only.
- Retired vocabulary (never reintroduce): packs, stamps, matches, vault,
  "identity", "meet people", drafts, ChatGPT/"your AI tools" framing,
  World ID "verified humans / no bots", token/onchain/crypto, gifting.

## Asset inventory (live, post-purge 2026-07-23; refreshed 2026-08-27)

- `public/og/og-tonight-v4.jpg` — the current OG card, warm (1800x945).
  OG filenames are **versioned on purpose**: scrapers cache image bytes by URL,
  so new card art always ships at a new path and older files stay in place so
  previously-scraped embeds do not 404.
- `public/brand/warm/home-today-gameday.jpg` — homepage hero phone capture.
- `public/brand/warm/tile-{game-day,music-events,watch-radar,todays-food}.jpg`
  — the four Today-grid helper captures.
- `public/brand/warm/` now holds **only** the five live captures above. The
  four earlier ones (`hero-home-checkin`, `hero-todays-checkins`,
  `checkin-question-music`, `todays-food-result`) were **DELETED 2026-08-27**:
  unreferenced since the homepage rebuild, and the two `hero-*` files showed
  parked Style Finds UI, so keeping them around invited a reuse that would
  breach the marketing-surface rule. Recoverable from git history.
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
