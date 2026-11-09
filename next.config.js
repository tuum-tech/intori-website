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
      }
    ]
  }
}

module.exports = nextConfig
