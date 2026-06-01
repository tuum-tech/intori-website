import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { MarketingFooter, MarketingHeader } from '@/components/MarketingChrome'
import { getAllPosts, type PostMeta } from '@/lib/news'
import { SeoHead } from '@/lib/seo'
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
      <SeoHead
        title="News - intori"
        description="Official announcements and updates from intori."
        canonicalPath="/news"
        ogImageAlt="intori news preview"
      />

      <div className={styles.page}>
        <MarketingHeader />

        <div className={styles.inner}>
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

      <MarketingFooter />
    </>
  )
}
