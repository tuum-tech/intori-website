import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'

import { PicksCta, PicksShell, picksStyles as styles } from '@/components/Picks'
import { RALEIGH_WINTER_CAMPAIGN } from '@/lib/appLinks'
import { DEFAULT_PICKS_TIME_ZONE, localDateIn, PICKS_BASE_PATH, PICKS_REVALIDATE_SECONDS } from '@/lib/publicPicks'
import { RALEIGH_GUIDE_PATH, RALEIGH_WINTER_PATH, RALEIGH_WINTER_TITLE, WINTER_END, WINTER_GROUPS } from '@/lib/raleighGuides'
import { SeoHead } from '@/lib/seo'

const DESCRIPTION = 'Find Raleigh–Durham winter break plans by date, from free story time and holiday lights to indoor outings, with costs and organizer links.'

export const getStaticProps: GetStaticProps<{ today: string }> = async () => ({
  props: { today: localDateIn(new Date(), DEFAULT_PICKS_TIME_ZONE) },
  revalidate: PICKS_REVALIDATE_SECONDS,
})

export default function WinterBreakPage({ today }: InferGetStaticPropsType<typeof getStaticProps>) {
  const current = today <= WINTER_END
  const groups = WINTER_GROUPS.filter(group => group.until >= today).map(group => ({
    ...group,
    picks: group.picks.filter(pick => pick.lastDate >= today),
  })).filter(group => group.picks.length > 0)

  return (
    <>
      <SeoHead
        title={`${RALEIGH_WINTER_TITLE} | intori`}
        description={DESCRIPTION}
        canonicalPath={RALEIGH_WINTER_PATH}
        ogImage="/og/raleigh-winter.jpg"
        ogImageWidth="1200"
        ogImageHeight="630"
        ogImageAlt="Winter break in Raleigh–Durham, a guide from intori"
      />
      <PicksShell campaign={RALEIGH_WINTER_CAMPAIGN}>
        <div className={styles.layout}>
          <div className={styles.main}>
            <p className={styles.crumbs}>
              <Link href={PICKS_BASE_PATH}>All areas</Link> · <Link href={RALEIGH_GUIDE_PATH}>Raleigh–Durham</Link>
            </p>
            <h1 className={styles.h1}>{RALEIGH_WINTER_TITLE}</h1>
            <p className={styles.lede}>December 19, 2026–January 3, 2027</p>
            {current && groups.length > 0 ? (
              <>
                <p className={styles.lede}>Find a few good options by day, from free story time to holiday lights. Check the organizer’s hours and booking details before going.</p>
                <p className={styles.crumbs}>
                  Check your school’s dates.{' '}
                  <a href="https://resources.finalsite.net/images/v1757425554/wcpssnet/hyvvrii6l53etk5uzl4i/26-27TRAD.pdf">Wake County traditional calendar</a>
                  {' · '}<a href="https://www.dpsnc.net/o/dps/page/district-calendars">Durham Public Schools calendars</a>
                </p>
                {groups.map(group => (
                  <section key={group.heading} className={styles.guidePanel}>
                    <h2 className={styles.guideHeading}>{group.heading}</h2>
                    <ul className={styles.guideList}>
                      {group.picks.map(pick => (
                        <li key={pick.title} className={styles.guideItem}>
                          <h3>{pick.title}</h3>
                          <p>{pick.details}</p>
                          <p>{pick.note}</p>
                          <a href={pick.source} className={styles.guideLink}>Organizer details for {pick.title}</a>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </>
            ) : (
              <p className={styles.lede}>
                {current ? 'Find current outings and indoor options in our weekly guide.' : 'The 2026–27 edition has ended.'}
                {' '}<Link href={RALEIGH_GUIDE_PATH}>See current Raleigh–Durham weekend picks</Link>.
              </p>
            )}
            {current && groups.length > 0 && <p className={styles.crumbs}><Link href={RALEIGH_GUIDE_PATH}>See this week’s Raleigh–Durham picks</Link></p>}
            <PicksCta title="Get a short list for your family" body="Try intori free for 21 days. Choose which plans to add to your calendar." campaign={RALEIGH_WINTER_CAMPAIGN} />
          </div>
        </div>
      </PicksShell>
    </>
  )
}
