// Shared destinations for "open the app" calls-to-action.
//
// V2 (gate-open, 2026-06): the web app is the PRIMARY entry point. The World App
// mini-app is a secondary path; the Farcaster frame is legacy/test only.
export const APP_URL = 'https://app.intori.co'

// iPhone beta destination (TestFlight or invite link). Staged by configuration:
// while this is empty the site renders a quiet "iPhone beta coming soon" status
// chip; once set, the same spots promote to a primary "Join the iPhone beta"
// button and the web CTA drops to the ghost style. No code change required.
export const IOS_BETA_URL = process.env.NEXT_PUBLIC_IOS_BETA_URL ?? ''

export const WORLD_APP_URL =
  'https://world.org/mini-app?app_id=app_263f86463869627f1183badc977e21a3'

// Legacy Farcaster frame launcher — retained for reference, not surfaced as a
// primary or secondary CTA on consumer marketing surfaces.
export const FARCASTER_FRAME_URL =
  'https://warpcast.com/~/frames/launch?domain=frame.intori.co'
