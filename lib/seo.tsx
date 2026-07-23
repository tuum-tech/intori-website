import Head from 'next/head'

export const SITE_URL = 'https://www.intori.co'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og/og-default.jpg`
export const DEFAULT_TITLE = 'intori - Made for you. Within minutes.'
export const DEFAULT_DESCRIPTION =
  'Choose where to start, answer a few quick questions, and intori shapes food picks, what to watch, game-day plans, live shows, and style finds around you.'
export const DEFAULT_SOCIAL_DESCRIPTION =
  'Choose where to start, answer quick questions, and intori gives you a more personal starting point.'

type SeoHeadProps = {
  title?: string
  description?: string
  canonicalPath?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogImageWidth?: string
  ogImageHeight?: string
  ogImageAlt?: string
  ogType?: 'website' | 'article'
  robots?: string
}

export function absoluteUrl(pathOrUrl: string) {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl
  }

  return `${SITE_URL}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`
}

export function SeoHead({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonicalPath,
  ogTitle = title,
  ogDescription = description,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageWidth = '1800',
  ogImageHeight = '945',
  ogImageAlt = 'intori app preview',
  ogType = 'website',
  robots = 'index,follow',
}: SeoHeadProps) {
  const canonicalUrl = canonicalPath ? absoluteUrl(canonicalPath) : undefined
  const imageUrl = absoluteUrl(ogImage)

  return (
    <Head>
      <title key="title">{title}</title>
      <meta name="description" content={description} key="description" />
      <meta name="robots" content={robots} key="robots" />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} key="canonical" />}
      <meta property="og:title" content={ogTitle} key="og-title" />
      <meta property="og:description" content={ogDescription} key="og-description" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} key="og-url" />}
      <meta property="og:type" content={ogType} key="og-type" />
      <meta property="og:site_name" content="intori" key="og-site-name" />
      <meta property="og:locale" content="en_US" key="og-locale" />
      <meta property="og:image" content={imageUrl} key="og-image" />
      <meta property="og:image:secure_url" content={imageUrl} key="og-image-secure-url" />
      <meta property="og:image:width" content={ogImageWidth} key="og-image-width" />
      <meta property="og:image:height" content={ogImageHeight} key="og-image-height" />
      <meta property="og:image:alt" content={ogImageAlt} key="og-image-alt" />
      <meta name="twitter:card" content="summary_large_image" key="twitter-card" />
      <meta name="twitter:title" content={ogTitle} key="twitter-title" />
      <meta name="twitter:description" content={ogDescription} key="twitter-description" />
      <meta name="twitter:image" content={imageUrl} key="twitter-image" />
      <meta name="twitter:image:alt" content={ogImageAlt} key="twitter-image-alt" />
    </Head>
  )
}
