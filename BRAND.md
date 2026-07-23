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
| ink-soft (secondary text) | `rgba(38, 33, 62, 0.62)` |
| ink-faint (disabled / meta) | `rgba(38, 33, 62, 0.42)` |
| hairline (borders / dividers) | `#E9E2D3` |
| spark (accent, **non-text only**) | `#93B32A` |
| spark-hover | `#85A226` |
| card shadow | `0 1px 2px rgba(38,33,62,.04), 0 15px 34px -14px rgba(38,33,62,.17)` |
| radii | card `22px` · imagery `16px` · pill `999px` |

**Contrast guardrail:** `#93B32A` fails WCAG AA as text/glyph on cream — use it
ONLY as a non-text accent (dot, 3px rule, artwork). Every glyph, numeral, check,
and code character on a light ground is ink `#26213E`.

**Cluster accents (artwork / thumbnails ONLY — never text, fill, border, or glow):**
sports `#F76B15` · food `#E5484D` · music `#D467FF` · style `#FF5C8A`.
`#60B3D7` (blue) and `#F2FD00` (neon yellow) are **retired**.

## Voice / register (locked, Jul 2026)

- Umbrella tagline: "Made for you. Within minutes." Campaign hero: "Dinner, decided."
- Five helpers, food first among five: Today's Food, Watch Radar, Game Day,
  Music Events, Style Finds. Music is live events ("who's playing"), never
  playlists or "music picks".
- No em dashes in visible copy or meta. Outcome-first; "AI" stays invisible in
  consumer copy. "Personalization, built from you" is developer/partner-only.
- Retired vocabulary (never reintroduce): packs, stamps, matches, vault,
  "identity", "meet people", drafts, ChatGPT/"your AI tools" framing,
  World ID "verified humans / no bots", token/onchain/crypto, gifting.

## Asset inventory (live, post-purge 2026-07-23)

- `public/og/og-default.jpg` — the one OG image, warm (1800x945).
- `public/brand/warm/` — hero phone + peek imagery (all referenced).
- `public/brand/hero-stamps/{music-lovers,sports-fans,foodies}.png` — hero float cards.
- `public/brand/stamps/{CREATOR,COMMUNITY BUILDER,TRAVEL}/MAIN.png` — hero trust avatars.
- `public/brand/stamps/MUSIC LOVERS/MAIN.png` — step-2 backdrop placeholder
  (`pages/index.tsx` TODO(PR7 asset): replace with a warm asset, then delete).
- `public/brand/icons/` — the five cluster line icons the homepage helper cards
  use (music_lovers, casual_socializers, sports_fans, foodies, fitness_wellness).
- `public/assets/templates/avatar_fallback.png` — dashboard avatar fallback.
- `public/news/` — article hero images (articles currently unpublished).

Everything else from the Farcaster/crypto era (frames, screenshots, references,
landing-page, stamp/NICHE art, World ID badge, bitmap frame fonts, stray logos,
unused cluster icons) was deleted 2026-07-23.
