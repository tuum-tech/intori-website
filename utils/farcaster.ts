import axios from 'axios'

type AuthKitConfig = {
  relay?: string
  domain?: string
  siweUri?: string
  rpcUrl?: string
  version?: string
}

const normalizeUrl = (value: string) => (value.endsWith('/') ? value : `${value}/`)

export const getSiteUrl = (): string => {
  // Prefer explicit public site URL if you have it
  const explicit =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXTAUTH_URL ||
    process.env.NEXT_PUBLIC_SITE_URL

  if (explicit) return normalizeUrl(explicit)

  // Vercel provides host without protocol
  const vercel = process.env.NEXT_PUBLIC_VERCEL_URL
  if (vercel) return normalizeUrl(`https://${vercel}`)

  // Browser fallback
  if (typeof window !== 'undefined') return normalizeUrl(window.location.origin)

  // Last-resort dev fallback
  return 'http://localhost:3000/'
}

export const getDomain = (): string => {
  const siteUrl = getSiteUrl()
  try {
    return new URL(siteUrl).host
  } catch {
    return 'localhost:3000'
  }
}

// Export a function, not a computed const, so nothing runs at import time
export const getAuthKitConfig = (): AuthKitConfig => {
  const siteUrl = getSiteUrl()

  return {
    rpcUrl: 'https://mainnet.optimism.io',
    domain: getDomain(),
    siweUri: siteUrl
  }
}
