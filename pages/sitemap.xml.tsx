import type { GetServerSideProps } from 'next'
import { getAllPosts } from '@/lib/news'
import { PICKS_BASE_PATH, type PicksUrlEntry, collectIndexablePicksUrls } from '@/lib/publicPicks'
import { SITE_URL } from '@/lib/seo'

// The picks pages come from the app's endpoint. A short read keeps the
// sitemap fast; if the endpoint is down, the static routes and the picks hub
// still render.
const PICKS_SITEMAP_TIMEOUT_MS = 4_000

async function picksEntries(today: string): Promise<PicksUrlEntry[]> {
  try {
    return await collectIndexablePicksUrls({ timeoutMs: PICKS_SITEMAP_TIMEOUT_MS, max: 45_000 })
  } catch {
    return [{ path: PICKS_BASE_PATH, lastmod: today }]
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
  const picks = await picksEntries(today)
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
  res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=3600')
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default function Sitemap() {
  return null
}
