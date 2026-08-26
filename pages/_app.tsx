import type { AppProps } from 'next/app'
import { Newsreader, Schibsted_Grotesk } from 'next/font/google'
import Chart from "chart.js/auto"
import { CategoryScale } from "chart.js"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SessionProvider } from "next-auth/react"
import Head from 'next/head'
import { Fragment } from 'react'
import './global.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SeoHead } from '@/lib/seo'

Chart.register(CategoryScale)

// Marketing type system (warm Direction A refresh, 2026-08): Schibsted Grotesk
// for display and body, Newsreader italic for the single wedge accent line.
// Exposed as CSS variables; page styles opt in.
const sansFont = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})

const serifFont = Newsreader({
  subsets: ['latin'],
  style: ['italic'],
  weight: ['400', '500'],
  variable: '--font-serif',
  display: 'swap',
  // Next has no fallback-metrics table entry for italic-only Newsreader; the
  // Georgia fallback in the CSS stack covers the single accent line fine.
  adjustFontFallback: false,
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
        <meta name="keywords" content="intori, busy households, game day, live music events, what to watch, food ideas, family calendar"/>
        <meta name="author" content="Tuum Tech"/>
      </Head>
      <SeoHead canonicalPath="/" />
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <ToastContainer position="top-right" />
          <div className={`${sansFont.variable} ${serifFont.variable}`}>
            <Component {...pageProps} />
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionProvider>
    </Fragment>
  )
}

export default MyApp
