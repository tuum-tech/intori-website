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
        // News is not in use until further notice (Nov 2026). Its pages and the
        // unpublished posts stay in the repo; every /news address goes Home.
        // Temporary (307) on purpose, so News can come back at the same address.
        source: '/news/:path*',
        destination: '/',
        permanent: false
      },
      {
        // Founder gift links (Nov 2026): the link people get reads intori.com,
        // and the gift page lives on the app, where sign-in is. Temporary, so
        // the page can move here one day without breaking links already sent.
        source: '/gift/:code',
        destination: 'https://app.intori.co/gift/:code',
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig
