import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png?v=cream-navy" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=cream-navy" />
        <meta name="theme-color" content="#FCF8F1" />
        {/* Bing Webmaster Tools ownership for https://intori.com/ (Google verified by DNS). */}
        <meta name="msvalidate.01" content="F625B380E29E7E9AA00B0AEC01417BE1" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
