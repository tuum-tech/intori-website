import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { getAllSlugs, getPostBySlug, type Post } from '@/lib/news'
import styles from './news.module.css'

const WORLD_APP_URL =
  'https://world.org/mini-app?app_id=app_263f86463869627f1183badc977e21a3'
const BASE_APP_URL = 'https://base.app/app/frame.intori.co'
const FARCASTER_URL =
  'https://warpcast.com/~/frames/launch?domain=frame.intori.co'
const DEFAULT_OG_IMAGE = 'https://www.intori.co/og/og-2026-01.png'

type Props = {
  post: Post
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllSlugs()
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string
  const post = await getPostBySlug(slug)

  if (!post) {
    return { notFound: true }
  }

  return { props: { post } }
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function NewsPost({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const canonicalUrl = `https://www.intori.co/news/${post.slug}`
  const ogImage = post.heroImage || DEFAULT_OG_IMAGE

  return (
    <div className={styles.newsArticleWrapper}>
      <Head>
        <title>{post.title} — intori</title>
        <meta name="description" content={post.dek} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`${post.title} — intori`} />
        <meta property="og:description" content={post.dek} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={ogImage} />
        <meta property="article:published_time" content={post.date} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} — intori`} />
        <meta name="twitter:description" content={post.dek} />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      <div className={styles.page}>
        <div className={styles.inner}>
          {/* Back to home */}
          <div className={styles.topBar}>
            <Link href="/" className={styles.backLink}>
              <span className={styles.backArrow}>←</span>
              Back to home
            </Link>
          </div>

          {/* Post header */}
          <div className={styles.postHeader}>
            <div className={styles.postHeaderMeta}>
              <span className={styles.postDate}>{formatDate(post.date)}</span>
              {post.tags?.map((tag) => (
                <span key={tag} className={styles.tagPill}>
                  {tag}
                </span>
              ))}
            </div>

            <h1 className={styles.postTitle}>{post.title}</h1>
            <p className={styles.postDek}>{post.dek}</p>
            <p className={styles.postAuthorLine}>
              By <strong>{post.author}</strong>
            </p>
          </div>

          {/* Hero image — or branded fallback */}
          {post.heroImage ? (
            <div className={styles.heroImageWrap}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.heroImage}
                alt={post.title}
                className={styles.heroImage}
              />
            </div>
          ) : (
            <div className={styles.heroImageFallback}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/intori-logo-full.svg"
                alt="intori"
                className={styles.heroFallbackLogo}
              />
            </div>
          )}

          {/* Post body */}
          <div
            className={styles.postBody}
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </div>
      </div>

      {/* Full-width CTA band — flows into footer */}
      <div className={styles.ctaBand}>
        <div className={styles.ctaInner}>
          <p className={styles.ctaTagline}>
            Discover your people on intori.
          </p>
          <a href={WORLD_APP_URL} className={styles.ctaPrimary}>
            Open on World
          </a>
          <p className={styles.ctaProviders}>
            Also on{' '}
            <a
              href={BASE_APP_URL}
              className={styles.ctaProviderLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Base
            </a>
            {' · '}
            <a
              href={FARCASTER_URL}
              className={styles.ctaProviderLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Farcaster
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
