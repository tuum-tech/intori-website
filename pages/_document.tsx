import { Html, Head, Main, NextScript } from 'next/document'

import { APP_STORE_ID, IOS_CHANNEL } from '@/lib/appLinks'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png?v=cream-navy" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=cream-navy" />
        <meta name="theme-color" content="#FCF8F1" />
        {/* Bing Webmaster Tools ownership for https://intori.com/ (Google verified by DNS). */}
        <meta name="msvalidate.01" content="F625B380E29E7E9AA00B0AEC01417BE1" />
        {/* Pinterest website claim for intori.com. */}
        <meta name="p:domain_verify" content="bec3ded8c6b7fb7f8eea011737708019" />
        {/* Smart App Banner: Safari on iPhone offers the app at the top of every
            page. Safari shows it only once the listing is live, and the tag is
            only rendered on the 'appstore' channel, so nothing shows early. */}
        {IOS_CHANNEL === 'appstore' && (
          <meta name="apple-itunes-app" content={`app-id=${APP_STORE_ID}`} />
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
