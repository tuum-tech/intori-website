import QRCode from 'qrcode'

import { IOS_URL } from './appLinks'

// A scannable code for the iPhone destination, shown beside the App Store
// button on desktop, where the button alone cannot install anything. Built on
// the server so the qrcode library never reaches the client bundle.
//
// Returns null when there is no iPhone destination yet, so the page renders
// no code rather than one that points nowhere.
let cached: Promise<string | null> | null = null

export function appStoreQrSvg(): Promise<string | null> {
  if (!IOS_URL) return Promise.resolve(null)
  cached ??= QRCode.toString(IOS_URL, {
    type: 'svg',
    margin: 0,
    errorCorrectionLevel: 'M',
    color: { dark: '#26213E', light: '#0000' },
  }).catch(() => null)
  return cached
}
