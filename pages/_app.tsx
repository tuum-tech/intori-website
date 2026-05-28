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
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, viewport-fit=cover"
        />
        <title>intori — Made for you. Within minutes.</title>
        <meta name="description" content="Choose where to start, answer a few quick questions, and intori shapes personalized recommendations, plans, drafts, and more around you."/>
        <link rel="canonical" href="https://www.intori.co/" />
        <meta name="keywords" content="intori, World, personalization, music ideas, game day ideas, time planning, drafts"/>
        <meta name="author" content="Tuum Tech"/>
        <meta property="og:title" content="intori — Made for you. Within minutes." />
        <meta property="og:description" content="Choose where to start, answer quick questions, and intori gives you a more personal starting point." />
        <meta property="og:url" content="https://www.intori.co/" />
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content="intori" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://www.intori.co/og/og-default.jpg" key="og-image" />
        <meta property="og:image:width" content="1200" key="og-image-width" />
        <meta property="og:image:height" content="630" key="og-image-height" />
        <meta property="og:image:alt" content="intori" key="og-image-alt" />
        <meta name="twitter:card" content="summary_large_image" key="twitter-card" />
        <meta name="twitter:title" content="intori — Made for you. Within minutes." key="twitter-title" />
        <meta name="twitter:description" content="Choose where to start, answer quick questions, and intori gives you a more personal starting point." key="twitter-description" />
        <meta name="twitter:image" content="https://www.intori.co/og/og-default.jpg" key="twitter-image" />
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
