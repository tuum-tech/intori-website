import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'

import { PicksCta, PicksFootNote, PicksShell, picksStyles as styles } from '@/components/Picks'
import {
  PICKS_REVALIDATE_SECONDS,
  currentPicks,
  fetchPicksWeek,
  isMetroSlug,
  listingPath,
  metroPath,
  parseListingParam,
} from '@/lib/publicPicks'
import { type ListingPageProps, buildListingPageProps } from '@/lib/publicPicksView'
import { JsonLd, SeoHead } from '@/lib/seo'

type Params = { metro: string; listing: string }

// A listing page exists while its item is in the metro's week. Nothing is
// prerendered: each page is built on its first visit and rebuilt like the metro page.
export const getStaticPaths: GetStaticPaths<Params> = async () => ({ paths: [], fallback: 'blocking' })

export const getStaticProps: GetStaticProps<ListingPageProps, Params> = async ({ params }) => {
  const metroSlug = params?.metro
  const listing = parseListingParam(params?.listing)
  if (!isMetroSlug(metroSlug) || !listing) return { notFound: true }
  // A failed read throws, so a page already built keeps serving.
  const week = await fetchPicksWeek(metroSlug)
  if (!week) return { notFound: true, revalidate: PICKS_REVALIDATE_SECONDS }
  const current = currentPicks(week.items, new Date())
  const item = current.find(entry => entry.id === listing.id)
  // Over, expired or taken off: old links land on the metro's week.
  if (!item) return { redirect: { destination: metroPath(metroSlug), permanent: false }, revalidate: PICKS_REVALIDATE_SECONDS }
  if (item.slug !== listing.slug) {
    return { redirect: { destination: listingPath(metroSlug, item), permanent: false }, revalidate: PICKS_REVALIDATE_SECONDS }
  }
  return { props: buildListingPageProps(week, item, current), revalidate: PICKS_REVALIDATE_SECONDS }
}

export default function PickListingPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { metro, canonicalPath, title, seoTitle, description, dayCrumb, facts, checkedLabel, sameDay, eventJsonLd, otherMetros } = props
  return (
    <>
      <SeoHead title={seoTitle} description={description} canonicalPath={canonicalPath} ogImageAlt="intori preview" />
      <JsonLd id="pick-event" data={eventJsonLd} />
      <PicksShell>
        <div className={styles.layout}>
          <div className={styles.main}>
            <p className={styles.crumbs}>
              <Link href={metroPath(metro.slug)}>{metro.name}</Link> › {dayCrumb}
            </p>
            <h1 className={styles.h1}>{title}</h1>
            <dl className={styles.facts}>
              <div className={styles.fact}><dt>When</dt><dd>{facts.when}</dd></div>
              <div className={styles.fact}><dt>Where</dt><dd>{facts.where}</dd></div>
              <div className={styles.fact}><dt>Who it suits</dt><dd>{facts.suits}</dd></div>
              <div className={styles.fact}><dt>Cost</dt><dd>{facts.cost}</dd></div>
              {facts.signUp ? (
                <div className={styles.fact}>
                  <dt>Sign up</dt>
                  <dd><a href={facts.signUp.url} target="_blank" rel="noopener noreferrer">{facts.signUp.label}</a></dd>
                </div>
              ) : null}
              <div className={styles.fact}>
                <dt>Runs it</dt>
                <dd><a href={facts.organizer.url} target="_blank" rel="noopener noreferrer">{facts.organizer.name}</a></dd>
              </div>
            </dl>
            <p className={styles.checked}>{checkedLabel}</p>
            <PicksCta
              title="Want this on your calendar?"
              body="intori adds it in one tap, with a reminder, and finds the next one for you."
              className={styles.phoneOnly}
            />
            {sameDay.items.length > 0 ? (
              <section className={styles.mini} aria-labelledby="more-on-day">
                <h2 className={styles.dayHead} id="more-on-day">
                  <span className={styles.dayName}>More on {sameDay.weekday}</span>
                </h2>
                <ul className={styles.miniList}>
                  {sameDay.items.map(other => (
                    <li key={other.href} className={styles.miniItem}>
                      <span className={styles.miniTime}>{other.time}</span>
                      <span>
                        <Link href={other.href}>{other.title}</Link>
                        {other.town ? <span className={styles.miniTown}>, {other.town}</span> : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : (
              <p className={styles.crumbs}>
                <Link href={metroPath(metro.slug)}>See the rest of this week in {metro.name}</Link>
              </p>
            )}
          </div>
          <aside className={styles.aside}>
            <PicksCta
              title="Want this on your calendar?"
              body="intori adds it in one tap, with a reminder, and finds the next one for you."
              className={styles.wideOnly}
            />
            <PicksFootNote otherMetros={otherMetros} />
          </aside>
        </div>
      </PicksShell>
    </>
  )
}
