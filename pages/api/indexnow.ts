import { timingSafeEqual } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'

import { INDEXNOW_ENDPOINT, INDEXNOW_HOST, INDEXNOW_KEY, INDEXNOW_KEY_LOCATION, INDEXNOW_MAX_URLS } from '@/lib/indexNow'
import { collectIndexablePicksUrls } from '@/lib/publicPicks'
import { absoluteUrl } from '@/lib/seo'

// Daily Vercel cron (vercel.json): sends every indexable picks URL to
// IndexNow. Vercel calls it with "Authorization: Bearer <CRON_SECRET>"; with no
// CRON_SECRET set, nothing is sent, so the route can never be used to spam
// search engines from outside.
export const config = { maxDuration: 60 }

const POST_TIMEOUT_MS = 15_000

function authorized(header: string | undefined, secret: string): boolean {
  const expected = new Uint8Array(Buffer.from(`Bearer ${secret}`))
  const given = new Uint8Array(Buffer.from(header ?? ''))
  return given.length === expected.length && timingSafeEqual(given, expected)
}

export default async function indexNow(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'GET' && req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' })
  const secret = process.env.CRON_SECRET
  if (!secret) return res.status(200).json({ skipped: 'cron_secret_unset' })
  if (!authorized(req.headers.authorization, secret)) return res.status(401).json({ error: 'unauthorized' })

  let urlList: string[]
  try {
    const entries = await collectIndexablePicksUrls({ max: INDEXNOW_MAX_URLS })
    urlList = entries.map(entry => absoluteUrl(entry.path))
  } catch {
    return res.status(503).json({ error: 'picks_unavailable' })
  }
  if (urlList.length === 0) return res.status(200).json({ submitted: 0 })

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), POST_TIMEOUT_MS)
  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: INDEXNOW_HOST, key: INDEXNOW_KEY, keyLocation: INDEXNOW_KEY_LOCATION, urlList }),
      signal: controller.signal,
    })
    // 200 and 202 both mean the list was taken.
    const ok = response.status === 200 || response.status === 202
    return res.status(ok ? 200 : 502).json({ submitted: ok ? urlList.length : 0, indexNowStatus: response.status })
  } catch {
    return res.status(502).json({ error: 'indexnow_unreachable' })
  } finally {
    clearTimeout(timer)
  }
}
