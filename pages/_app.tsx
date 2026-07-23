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
import { SeoHead } from '@/lib/seo'

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
        <meta name="keywords" content="intori, personalization, food ideas, what to watch, game day, live music events, style finds"/>
        <meta name="author" content="Tuum Tech"/>
      </Head>
      <SeoHead canonicalPath="/" />
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
