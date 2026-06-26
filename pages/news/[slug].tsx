import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { MarketingFooter, MarketingHeader, WorldIcon } from '@/components/MarketingChrome'
import { getAllSlugs, getPostBySlug, type Post } from '@/lib/news'
import { SeoHead, SITE_URL, absoluteUrl } from '@/lib/seo'
import { APP_URL, WORLD_APP_URL } from '@/lib/appLinks'
import styles from './news.module.css'

const LAUNCH_ARTICLE_SLUG = 'intori-now-live-on-world'
const LAUNCH_OG_IMAGE = `${SITE_URL}/news/intori-world-01.png`

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
  const isLaunchArticle = post.slug === LAUNCH_ARTICLE_SLUG
  const pageTitle = `${post.title} — intori`
  const ogImage = isLaunchArticle
    ? LAUNCH_OG_IMAGE
    : absoluteUrl(post.heroImage || '/og/og-default.jpg')

  return (
    <div className={styles.newsArticleWrapper}>
      <SeoHead
        title={pageTitle}
        description={post.dek}
        canonicalPath={`/news/${post.slug}`}
        ogType="article"
        ogImage={ogImage}
        ogImageWidth="3200"
        ogImageHeight="1800"
        ogImageAlt={post.title}
      />
      <Head>
        <meta property="article:published_time" content={post.date} />
      </Head>

      <div className={styles.page}>
        <MarketingHeader />

        <div className={styles.inner}>
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
            Made for you. Within minutes.
          </p>
          <a
            href={APP_URL}
            className={styles.ctaPrimary}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get started
          </a>
          <div className={styles.ctaProviders}>
            <a
              href={WORLD_APP_URL}
              className={styles.ctaProviderLink}
              style={{ gap: 6 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WorldIcon size={15} />
              Also on World App
            </a>
          </div>
        </div>
      </div>

      <MarketingFooter />
    </div>
  )
}
