import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { getAllPosts, type PostMeta } from '@/lib/news'
import styles from './news.module.css'

type Props = {
  posts: PostMeta[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = getAllPosts()
  return { props: { posts } }
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function NewsIndex({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>News — intori</title>
        <meta
          name="description"
          content="Official announcements and updates from intori."
        />
        <link rel="canonical" href="https://www.intori.co/news" />
        <meta property="og:title" content="News — intori" />
        <meta
          property="og:description"
          content="Official announcements and updates from intori."
        />
        <meta property="og:url" content="https://www.intori.co/news" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.intori.co/og/og-2026-01.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="News — intori" />
        <meta
          name="twitter:description"
          content="Official announcements and updates from intori."
        />
        <meta
          name="twitter:image"
          content="https://www.intori.co/og/og-2026-01.png"
        />
      </Head>

      <div className={styles.page}>
        <div className={styles.inner}>
          {/* Back to home */}
          <div className={styles.topBar}>
            <Link href="/" className={styles.backLink}>
              <span className={styles.backArrow}>←</span>
              intori
            </Link>
          </div>

          {/* Header */}
          <div className={styles.indexHeader}>
            <h1 className={styles.indexTitle}>News</h1>
            <p className={styles.indexSubtitle}>
              Official announcements from intori.
            </p>
          </div>

          {/* Post list */}
          <div className={styles.postList}>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/news/${post.slug}`}
                className={styles.postCard}
              >
                <div className={styles.postCardInner}>
                  <div className={styles.postCardContent}>
                    <div className={styles.postCardMeta}>
                      <span className={styles.postCardDate}>
                        {formatDate(post.date)}
                      </span>
                      {post.tags?.map((tag) => (
                        <span key={tag} className={styles.tagPill}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className={styles.postCardTitle}>{post.title}</h2>
                    <p className={styles.postCardDek}>{post.dek}</p>
                  </div>

                  {post.heroImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.heroImage}
                      alt=""
                      className={styles.postCardThumb}
                    />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
