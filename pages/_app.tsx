import type { AppProps } from 'next/app'
import localFont from 'next/font/local'
import Chart from "chart.js/auto"
import { CategoryScale } from "chart.js"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SessionProvider } from "next-auth/react"
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/next'
import { Fragment } from 'react'
import './global.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SeoHead } from '@/lib/seo'

Chart.register(CategoryScale)

// Marketing type system (warm Direction A refresh, 2026-08): Schibsted Grotesk
// for display and body. Exposed as a CSS variable; page styles opt in. The file
// lives in lib/fonts so a build never depends on Google Fonts. Each weight is
// declared on its own, not as a range, so in-between CSS weights like 550 keep
// snapping to these five.
const sansFont = localFont({
  src: [
    { path: '../lib/fonts/SchibstedGrotesk-wght.woff2', weight: '400', style: 'normal' },
    { path: '../lib/fonts/SchibstedGrotesk-wght.woff2', weight: '500', style: 'normal' },
    { path: '../lib/fonts/SchibstedGrotesk-wght.woff2', weight: '600', style: 'normal' },
    { path: '../lib/fonts/SchibstedGrotesk-wght.woff2', weight: '700', style: 'normal' },
    { path: '../lib/fonts/SchibstedGrotesk-wght.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
})

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Fragment>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, viewport-fit=cover"
        />
        <meta name="keywords" content="intori, busy families, family outings, things to do with kids, parks and playgrounds, game day, live music events, what to watch, family calendar"/>
        <meta name="author" content="Tuum Tech"/>
      </Head>
      <SeoHead canonicalPath="/" />
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <ToastContainer position="top-right" />
          <div className={sansFont.variable}>
            <Component {...pageProps} />
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionProvider>
      {/* Cookieless page views and referrers (including AI assistants' utm_source),
          so each metro's picks page can be grown or dropped on real traffic. Not the admin dashboard. */}
      <Analytics beforeSend={(event) => (new URL(event.url).pathname.startsWith('/dashboard') ? null : event)} />
    </Fragment>
  )
}

export default MyApp
