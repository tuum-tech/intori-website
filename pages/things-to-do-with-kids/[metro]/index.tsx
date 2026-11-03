import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { Fragment } from 'react'

import { PickCard, PicksCta, PicksFootNote, PicksShell, picksStyles as styles } from '@/components/Picks'
import {
  PICKS_BASE_PATH,
  PICKS_REVALIDATE_SECONDS,
  fetchPicksMetroList,
  fetchPicksWeek,
  isBuildPhase,
  isMetroSlug,
  metroPath,
  picksMetroInfo,
} from '@/lib/publicPicks'
import { type MetroPageProps, buildMetroPageProps, emptyMetroPageProps } from '@/lib/publicPicksView'
import { JsonLd, SeoHead } from '@/lib/seo'

type Params = { metro: string }

// Metro pages are prerendered from the endpoint's list; a metro it adds later
// renders on its first visit. Listing pages are always rendered on demand.
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  try {
    const list = await fetchPicksMetroList()
    return { paths: list.metros.map(metro => ({ params: { metro: metro.slug } })), fallback: 'blocking' }
  } catch {
    return { paths: [], fallback: 'blocking' }
  }
}

export const getStaticProps: GetStaticProps<MetroPageProps, Params> = async ({ params }) => {
  const slug = params?.metro
  if (!isMetroSlug(slug)) return { notFound: true }
  const now = new Date()
  try {
    const week = await fetchPicksWeek(slug)
    if (!week) return { notFound: true, revalidate: PICKS_REVALIDATE_SECONDS }
    return { props: buildMetroPageProps(week, now), revalidate: PICKS_REVALIDATE_SECONDS }
  } catch (error) {
    // At build, a known metro renders its empty week (kept out of search) and
    // fills in on the next read. At runtime the throw keeps the last good page.
    const known = picksMetroInfo(slug)
    if (isBuildPhase() && known) return { props: emptyMetroPageProps(known, now), revalidate: 300 }
    throw error
  }
}

const CTA_TITLE = 'Get picks like these on your calendar every week'
const CTA_BODY = 'intori learns what your family enjoys and adds the good ones in one tap. 21 days free, no card needed.'

export default function MetroPicksPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { metro, heading, description, lede, checkedLabel, indexable, itemCount, days, listingUrls, otherMetros } = props
  return (
    <>
      <SeoHead
        title={heading}
        description={description}
        canonicalPath={metroPath(metro.slug)}
        robots={indexable ? 'index,follow' : 'noindex,follow'}
        ogImageAlt="intori preview"
      />
      {listingUrls.length > 0 && (
        <JsonLd
          id="picks-week"
          data={{
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: heading,
            numberOfItems: listingUrls.length,
            itemListElement: listingUrls.map((url, index) => ({ '@type': 'ListItem', position: index + 1, url })),
          }}
        />
      )}
      <PicksShell>
        <div className={styles.layout}>
          <div className={styles.main}>
            <p className={styles.crumbs}>
              <Link href={PICKS_BASE_PATH}>All areas</Link> · {metro.name} · This week
            </p>
            <h1 className={styles.h1}>{heading}</h1>
            <p className={styles.lede}>{lede}</p>
            {checkedLabel ? <p className={styles.checked}>{checkedLabel}</p> : null}

            {itemCount === 0 ? (
              <section className={styles.empty}>
                <h2 className={styles.emptyTitle}>Nothing listed yet this week</h2>
                <p className={styles.emptyBody}>
                  We read local library, town and park calendars every morning. New listings for {metro.name} show
                  up here as soon as they are checked, so look again tomorrow.
                </p>
              </section>
            ) : (
              days.map((day, index) => (
                <Fragment key={day.localDate}>
                  <section className={styles.day} aria-labelledby={`day-${day.localDate}`}>
                    <h2 className={styles.dayHead} id={`day-${day.localDate}`}>
                      <span className={styles.dayName}>{day.weekday}</span>
                      <span className={styles.dayDate}>{day.date}</span>
                    </h2>
                    <ul className={styles.items}>
                      {day.cards.map(card => <PickCard key={card.id} card={card} />)}
                    </ul>
                  </section>
                  {index === 0 && days.length > 1 ? (
                    <PicksCta title={CTA_TITLE} body={CTA_BODY} className={styles.phoneOnly} />
                  ) : null}
                </Fragment>
              ))
            )}
          </div>
          <aside className={styles.aside}>
            <PicksCta title={CTA_TITLE} body={CTA_BODY} />
            <PicksFootNote otherMetros={otherMetros} />
          </aside>
        </div>
      </PicksShell>
    </>
  )
}
