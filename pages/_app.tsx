import type { AppProps } from 'next/app'
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

Chart.register(CategoryScale)

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
        <title>intori — Answer daily themes. Collect stamps. Find your people.</title>
        <meta name="description" content="No feed. No swiping. Just identity and community."/>
        <link rel="canonical" href="https://www.intori.co/" />
        <meta name="keywords" content="intori, farcaster, decentralized, warpcast, find users, meet users, suggestions, social farcaster, onchain, onchain summmer, base, base onchain"/>
        <meta name="author" content="Tuum Tech"/>
        <meta property="og:title" content="intori — Answer daily themes. Collect stamps. Find your people." />
        <meta property="og:description" content="No feed. No swiping. Just identity and community." />
        <meta property="og:url" content="https://www.intori.co/" />
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content="intori" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://www.intori.co/og/og-2026-01.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="intori" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="intori — Answer daily themes. Collect stamps. Find your people." />
        <meta name="twitter:description" content="No feed. No swiping. Just identity and community." />
        <meta name="twitter:image" content="https://www.intori.co/og/og-2026-01.jpg" />
      </Head>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <ToastContainer position="top-right" />
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionProvider>
    </Fragment>
  )
}

export default MyApp
