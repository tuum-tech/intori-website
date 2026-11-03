import type { GetServerSideProps } from 'next'
import { getAllPosts } from '@/lib/news'
import {
  PICKS_BASE_PATH,
  PICKS_FETCH_TIMEOUT_MS,
  type PicksUrlEntry,
  collectIndexablePicksUrls,
} from '@/lib/publicPicks'
import { SITE_URL } from '@/lib/seo'

// The city pages are the sitemap's most important entries, so the picks read
// gets the endpoint's full timeout (a cold Atlanta week alone takes ~3s) and
// the function the time to wait for it.
export const config = { maxDuration: 30 }

// If the endpoint is down, the static routes and the picks hub still render,
// but that copy is cached briefly so the next crawl gets the cities back.
const DEGRADED_CACHE = 'public, s-maxage=60'
const FULL_CACHE = 'public, s-maxage=1800, stale-while-revalidate=3600'

async function picksEntries(today: string): Promise<{ entries: PicksUrlEntry[]; complete: boolean }> {
  try {
    const entries = await collectIndexablePicksUrls({ timeoutMs: PICKS_FETCH_TIMEOUT_MS, max: 45_000 })
    return { entries, complete: true }
  } catch (error) {
    console.error('sitemap_picks_unavailable', error)
    return { entries: [{ path: PICKS_BASE_PATH, lastmod: today }], complete: false }
  }
}

function picksPriority(path: string): string {
  if (path === PICKS_BASE_PATH) return '0.7'
  return path.split('/').length === 3 ? '0.8' : '0.5'
}

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/faq', priority: '0.7', changefreq: 'monthly' },
  { path: '/support', priority: '0.6', changefreq: 'monthly' },
  { path: '/family-screen', priority: '0.7', changefreq: 'monthly' },
  { path: '/sources', priority: '0.5', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-of-use', priority: '0.3', changefreq: 'yearly' },
]

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function sitemapEntry({
  path,
  lastmod,
  changefreq,
  priority,
}: {
  path: string
  lastmod: string
  changefreq: string
  priority: string
}) {
  return [
    '  <url>',
    `    <loc>${escapeXml(`${SITE_URL}${path}`)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n')
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const today = new Date().toISOString().slice(0, 10)
  const posts = getAllPosts()
  const { entries: picks, complete } = await picksEntries(today)
  const entries = [
    ...staticRoutes.map((route) =>
      sitemapEntry({
        ...route,
        lastmod: today,
      })
    ),
    ...posts.map((post) =>
      sitemapEntry({
        path: `/news/${post.slug}`,
        lastmod: post.date,
        changefreq: 'monthly',
        priority: '0.7',
      })
    ),
    ...picks.map((entry) =>
      sitemapEntry({
        path: entry.path,
        lastmod: entry.lastmod,
        changefreq: 'daily',
        priority: picksPriority(entry.path),
      })
    ),
  ]

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    '</urlset>',
  ].join('\n')

  res.setHeader('Content-Type', 'application/xml')
  // Picks change through the day; a half-hour edge copy spares the endpoint.
  res.setHeader('Cache-Control', complete ? FULL_CACHE : DEGRADED_CACHE)
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default function Sitemap() {
  return null
}
