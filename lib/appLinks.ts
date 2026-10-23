// Shared destinations for "open the app" calls-to-action.
//
// V2 (gate-open, 2026-06): the web app is the PRIMARY entry point. The World App
// mini-app is a secondary path; the Farcaster frame is legacy/test only.
export const APP_URL = 'https://app.intori.co'

// App Store
//
// FILL FROM APP STORE CONNECT BEFORE MERGING. These two constants are the only
// place either value lives. Every App Store link on the site, the desktop QR
// code and the Smart App Banner are built from them.
//
//   APP_STORE_ID                  App Store Connect > App Information > Apple ID
//                                 (the number after "id" in the listing's URL).
//                                 Filled: 6801558369 is intori's. The listing
//                                 is not live until Apple releases the build.
//   APP_ANALYTICS_PROVIDER_TOKEN  App Store Connect > App Analytics > Campaigns
//                                 > Generate Campaign Link, the "pt" value. It
//                                 lets App Analytics attribute installs to this
//                                 website. "000000" is a PLACEHOLDER: replace it.
export const APP_STORE_ID = '6801558369'
export const APP_ANALYTICS_PROVIDER_TOKEN = '000000'

// One "ct" campaign token per surface, so App Analytics can tell a hero tap
// from a footer tap from a FAQ tap.
export type AppStoreSurface =
  | 'website' // homepage buttons (hero and the closing section)
  | 'website-header' // "Get the app" in the site header
  | 'website-qr' // the desktop QR code beside the hero button
  | 'website-footer' // the footer link
  | 'faq' // the FAQ answer

export function appStoreUrl(ct: AppStoreSurface = 'website'): string {
  return `https://apps.apple.com/us/app/intori/id${APP_STORE_ID}?pt=${APP_ANALYTICS_PROVIDER_TOKEN}&ct=${ct}&mt=8`
}

// The single iPhone switch that the homepage buttons, the header, the footer,
// the FAQ, the QR code and the Smart App Banner all read, so no two surfaces
// can disagree about whether iPhone is available.
//
//   'appstore' -> "Download on the App Store" leads, every iPhone link opens
//                 the listing, and Safari on iPhone shows the Smart App Banner
//   'none'     -> the web app leads, iPhone is a quiet non-clickable
//                 "coming soon" chip, and no App Store link renders anywhere
//
// Release day, 2026-10: flipped to 'appstore'. 'none' stays as the kill switch.
export type IosChannel = 'appstore' | 'none'

export const IOS_CHANNEL: IosChannel = 'appstore'

// Homepage headline variant, staged by configuration.
//
// 'forward' (the default) ships the locked tagline, "Something to look forward
// to." On its own that line makes no cadence promise, so it carries no supply
// dependency and is safe to serve to everyone.
//
// 'weekly' adds the second sentence, "Every week." THAT is the cadence claim.
// Do NOT enable 'weekly' until the app actually guarantees a populated item for
// every household every week; without that guarantee the headline is a claim
// the product cannot keep.
//
// 'decided' keeps the previous "Tonight, decided." headline available.
export type HeroVariant = 'forward' | 'weekly' | 'decided'

function resolveHeroVariant(): HeroVariant {
  const configured = process.env.NEXT_PUBLIC_HERO_VARIANT
  if (configured === 'weekly') return 'weekly'
  if (configured === 'decided') return 'decided'
  return 'forward'
}

export const HERO_VARIANT: HeroVariant = resolveHeroVariant()

export const WORLD_APP_URL =
  'https://world.org/mini-app?app_id=app_263f86463869627f1183badc977e21a3'

// Legacy Farcaster frame launcher — retained for reference, not surfaced as a
// primary or secondary CTA on consumer marketing surfaces.
export const FARCASTER_FRAME_URL =
  'https://warpcast.com/~/frames/launch?domain=frame.intori.co'
