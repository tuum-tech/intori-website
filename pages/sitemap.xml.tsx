import type { GetServerSideProps } from 'next'
import { getAllPosts } from '@/lib/news'
import { SITE_URL } from '@/lib/seo'

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/news', priority: '0.8', changefreq: 'weekly' },
  { path: '/faq', priority: '0.7', changefreq: 'monthly' },
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
  ]

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    '</urlset>',
  ].join('\n')

  res.setHeader('Content-Type', 'application/xml')
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default function Sitemap() {
  return null
}
