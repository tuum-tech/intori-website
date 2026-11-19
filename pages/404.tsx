import Link from 'next/link'

import { PicksShell, picksStyles as styles } from '@/components/Picks'
import { PICKS_BASE_PATH } from '@/lib/publicPicks'
import { RALEIGH_GUIDE_PATH } from '@/lib/raleighGuides'
import { SeoHead } from '@/lib/seo'

export default function NotFoundPage() {
  return (
    <>
      <SeoHead title="Page unavailable | intori" robots="noindex,follow" />
      <PicksShell>
        <div className={styles.main}>
          <h1 className={styles.h1}>This page is unavailable</h1>
          <p className={styles.lede}>Looking for an outing? Find current picks and check their dates and details.</p>
          <nav aria-label="Current guides">
            <p><Link className={styles.guideLink} href={PICKS_BASE_PATH}>Browse all areas</Link></p>
            <p><Link className={styles.guideLink} href={RALEIGH_GUIDE_PATH}>See this weekend in Raleigh–Durham</Link></p>
          </nav>
        </div>
      </PicksShell>
    </>
  )
}
