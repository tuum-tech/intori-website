// Minimal types for the one qrcode call the site makes (lib/appStoreQr.ts).
declare module 'qrcode' {
  type QRCodeToStringOptions = {
    type?: 'svg' | 'utf8' | 'terminal'
    margin?: number
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
    color?: { dark?: string; light?: string }
  }

  const QRCode: {
    toString(text: string, options?: QRCodeToStringOptions): Promise<string>
  }

  export default QRCode
}
