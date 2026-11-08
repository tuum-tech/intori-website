// Minimal types for the two qrcode calls the site makes (lib/appStoreQr.ts).
declare module 'qrcode' {
  type QRCodeToStringOptions = {
    type?: 'svg' | 'utf8' | 'terminal'
    margin?: number
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
    color?: { dark?: string; light?: string }
  }

  const QRCode: {
    // Only what lib/appStoreQr.ts uses. `create` exposes the symbol so the page can
    // size the ink independently of the quiet zone (modules.size is per side).
    create(text: string, options?: { errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H' }): { modules: { size: number; data: Uint8Array } }
    toString(text: string, options?: QRCodeToStringOptions): Promise<string>
  }

  export default QRCode
}
