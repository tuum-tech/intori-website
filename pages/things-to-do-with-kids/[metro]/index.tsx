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
import { type MetroPageProps, buildMetroPageProps, calendarDay, emptyMetroPageProps } from '@/lib/publicPicksView'
import { JsonLd, SeoHead } from '@/lib/seo'
import { RALEIGH_SATURDAY_CAMPAIGN } from '@/lib/appLinks'
import { RALEIGH_MUSEUM, RALEIGH_WINTER_PATH } from '@/lib/raleighGuides'

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
const CTA_BODY = 'intori learns what your family enjoys and puts the good ones on your calendar. 21 days free, no card needed.'

export default function MetroPicksPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { metro, heading, description, lede, checkedLabel, indexable, itemCount, days, listingUrls, otherMetros, saturday } = props
  const campaign = saturday ? RALEIGH_SATURDAY_CAMPAIGN : undefined
  return (
    <>
      <SeoHead
        title={saturday ? `${heading} | intori` : heading}
        description={saturday ? "Find Saturday morning outings for kids in Raleigh–Durham with times, prices, age fit, and links to organizers. More picks for the week below." : description}
        canonicalPath={metroPath(metro.slug)}
        robots={indexable ? 'index,follow' : 'noindex,follow'}
        {...(saturday ? { ogImage: "/og/raleigh-weekend.jpg", ogImageWidth: "1200", ogImageHeight: "630", ogImageAlt: "Saturday morning in Raleigh–Durham, a guide from intori" } : { ogImageAlt: "intori preview" })}
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
      <PicksShell campaign={campaign}>
        <div className={styles.layout}>
          <div className={styles.main}>
            <p className={styles.crumbs}>
              <Link href={PICKS_BASE_PATH}>All areas</Link> · {metro.name} · This week
            </p>
            <h1 className={styles.h1}>{heading}</h1>
            <p className={styles.lede}>{lede}</p>
            {checkedLabel ? <p className={styles.checked}>{checkedLabel}</p> : null}

            {saturday && (
              <>
                <section className={styles.guidePanel} aria-labelledby="saturday-morning">
                  <h2 id="saturday-morning" className={styles.guideHeading}>Saturday morning · {calendarDay(saturday.date).date}</h2>
                  <p className={styles.lede}>Need a plan for Saturday? Start with these local picks and check the organizer before heading out.</p>
                  <ul className={styles.guideList}>
                    {saturday.picks.map(pick => (
                      <li key={pick.id} className={styles.guideItem}>
                        <h3>{pick.listing ? <Link href={pick.listing}>{pick.title}</Link> : pick.title}</h3>
                        <p>{pick.when} · {pick.where}</p>
                        <p>{pick.details}</p>
                        <a href={pick.source} className={styles.guideLink}>Details from {pick.organizer}</a>
                      </li>
                    ))}
                    <li className={styles.guideItem}>
                      <h3>Indoor fallback · {RALEIGH_MUSEUM.title}</h3>
                      <p>{RALEIGH_MUSEUM.details}</p><p>{RALEIGH_MUSEUM.note}</p>
                      <a href={RALEIGH_MUSEUM.source} className={styles.guideLink}>Museum hours and admission</a>
                    </li>
                  </ul>
                </section>
                <p className={styles.crumbs}><Link href={RALEIGH_WINTER_PATH}>Winter break activities for kids in Raleigh–Durham</Link></p>
                <PicksCta title={CTA_TITLE} body={CTA_BODY} campaign={campaign} />
                <h2 className={styles.guideHeading}>More things to do this week</h2>
              </>
            )}

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
                  {!saturday && index === 0 && days.length > 1 ? (
                    <PicksCta title={CTA_TITLE} body={CTA_BODY} className={styles.phoneOnly} />
                  ) : null}
                </Fragment>
              ))
            )}
          </div>
          <aside className={styles.aside}>
            {!saturday && <PicksCta title={CTA_TITLE} body={CTA_BODY} />}
            <PicksFootNote otherMetros={otherMetros} />
          </aside>
        </div>
      </PicksShell>
    </>
  )
}
