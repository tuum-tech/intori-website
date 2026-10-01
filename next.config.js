/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.intori.com' }],
        destination: 'https://intori.com/:path*',
        permanent: true
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'intori.co' }],
        destination: 'https://intori.com/:path*',
        permanent: true
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.intori.co' }],
        destination: 'https://intori.com/:path*',
        permanent: true
      },
      {
        // The Feb 2026 World launch announcement was unpublished on 2026-07-19.
        // It had external press distribution, so send those inbound links to the
        // news index rather than a dead end. Temporary (307) on purpose: the post
        // is hidden, not retired, and may be restored.
        source: '/news/intori-now-live-on-world',
        destination: '/news',
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig
