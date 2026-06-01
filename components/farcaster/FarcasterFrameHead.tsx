import React from 'react'
import Head from 'next/head'
import { DEFAULT_OG_IMAGE, SITE_URL, absoluteUrl } from '@/lib/seo'

type Props = {
  imgUrl: string
  description: string
  children?: React.ReactNode
  frameImageAspectRatio?:  '1.91:1' | '1:1'
}

export const FarcasterFrameHead: React.FC<Props> = ({
  imgUrl,
  description,
  children,
  frameImageAspectRatio
}) => {
    const imageUrl = absoluteUrl(imgUrl || DEFAULT_OG_IMAGE)
    return (
      <Head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>intori - Made for you. Within minutes.</title>
        <meta name="description" content={description} />

        <meta property="og:title" content="intori - Made for you. Within minutes." key="og-title" />
        <meta property="og:description" content={description} key="og-description" />
        <meta property="og:url" content={SITE_URL} key="og-url" />
        <meta property="og:image" content={imageUrl} key="og-image" />
        <meta property="og:image:secure_url" content={imageUrl} key="og-image-secure-url" />
        <meta name="twitter:card" content="summary_large_image" key="twitter-card" />
        <meta name="twitter:title" content="intori - Made for you. Within minutes." key="twitter-title" />
        <meta name="twitter:description" content={description} key="twitter-description" />
        <meta name="twitter:image" content={imageUrl} key="twitter-image" />

        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content={imageUrl} />
        <meta property="fc:frame:image:aspect_ratio" content={frameImageAspectRatio ?? "1.91:1"} />
        { children }
      </Head>
    )
}
