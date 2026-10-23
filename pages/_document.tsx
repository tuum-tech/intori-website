import { Html, Head, Main, NextScript } from 'next/document'

import { APP_STORE_ID, IOS_CHANNEL } from '@/lib/appLinks'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png?v=cream-navy" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=cream-navy" />
        <meta name="theme-color" content="#FCF8F1" />
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
