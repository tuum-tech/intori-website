import QRCode from 'qrcode'

import { IOS_CHANNEL, appStoreUrl } from './appLinks'

// A scannable code for the iPhone destination, shown beside the App Store
// badge on desktop, where the badge alone cannot install anything. Built on
// the server so the qrcode library never reaches the client bundle.
//
// The SVG has no background (the cream page shows through) and carries its own
// four-module quiet zone, so the ink can sit straight on the page with the
// clear space the QR spec requires. `scale` is the ratio of the full SVG
// (modules plus quiet zone) to the ink alone; the page uses it to size the
// SVG so the ink, not the box, matches the badge height.
//
// Returns null when there is no iPhone destination yet, so the page renders
// no code rather than one that points nowhere.
export type AppStoreQr = { svg: string; scale: number }

const QUIET_ZONE_MODULES = 4
const ERROR_CORRECTION = 'M'

let cached: Promise<AppStoreQr | null> | null = null

export function appStoreQr(): Promise<AppStoreQr | null> {
  if (IOS_CHANNEL !== 'appstore') return Promise.resolve(null)
  cached ??= (async () => {
    const url = appStoreUrl('website-qr')
    const modules = QRCode.create(url, { errorCorrectionLevel: ERROR_CORRECTION }).modules.size
    const svg = await QRCode.toString(url, {
      type: 'svg',
      margin: QUIET_ZONE_MODULES,
      errorCorrectionLevel: ERROR_CORRECTION,
      // Transparent light color: the renderer then draws no background rect.
      color: { dark: '#26213E', light: '#0000' },
    })
    return { svg, scale: (modules + QUIET_ZONE_MODULES * 2) / modules }
  })().catch(() => null)
  return cached
}
