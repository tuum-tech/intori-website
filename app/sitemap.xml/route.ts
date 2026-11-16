import { getAllPosts } from '@/lib/news'
import {
  PICKS_BASE_PATH,
  PICKS_FETCH_TIMEOUT_MS,
  collectIndexablePicksUrls,
} from '@/lib/publicPicks'
import { SITE_URL } from '@/lib/seo'

// Cache the complete XML with ISR. A failed refresh throws and Next keeps the
// last successful response; a cold failure never publishes a reduced sitemap.
export const dynamic = 'force-static'
export const revalidate = 1800
export const maxDuration = 30

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

export async function GET() {
  const today = new Date().toISOString().slice(0, 10)
  const posts = getAllPosts()
  const picks = await collectIndexablePicksUrls({ timeoutMs: PICKS_FETCH_TIMEOUT_MS, max: 45_000 })
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

  return new Response(sitemap, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
