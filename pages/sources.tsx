import type { NextPage } from "next"
import Link from "next/link"

import { MarketingFooter, MarketingHeader } from "@/components/MarketingChrome"
import { SeoHead } from "@/lib/seo"
import { metroPath, picksMetroInfo } from "@/lib/publicPicks"
import sourcesData from "@/content/sources.json"
import styles from "./index.module.css"
import sourceStyles from "./sources.module.css"

// Who intori reads for Outings, Outdoors, shows and movie night, and how an
// organizer is taken off. The list lives in content/sources.json, built from
// the app's source registry (MomentSource rows that are switched on), so an
// update is a data change: add an organizer when its source is read, take it
// off when it is switched off, and move "updated" to that day.
const SOURCES_EMAIL = "sources@intori.com"

type Source = { id: string; name: string; adds: string; url: string; credit?: string }
type Area = { metro: string; name: string; picks: boolean; sources: Source[] }

const AREAS: Area[] = sourcesData.areas
const SERVICES: Source[] = sourcesData.services
const LOCAL_COUNT = AREAS.reduce((sum, area) => sum + area.sources.length, 0)
const UPDATED = new Date(`${sourcesData.updated}T12:00:00Z`).toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
})

const RULES: Array<{ title: string; body: string }> = [
  { title: "Facts only", body: "From a local calendar we keep what it is, when, where, who it is for, what it costs, and the link. Never its description, its photos or a staff contact." },
  { title: "Credit and a link, every time", body: "Every item names who runs it and links to their own page, where people sign up, buy tickets or read more." },
  { title: "Public listings only", body: "We read what an organizer already publishes for the public. We do not read anything behind a login, and we respect a site's robots file." },
  { title: "Off within a day", body: "If you run one of these calendars and would rather not be listed, write to us. We take your listings off within a day." },
]

function SourceList({ sources }: { sources: Source[] }) {
  return (
    <ul className={sourceStyles.list}>
      {sources.map((source) => (
        <li key={source.id} className={sourceStyles.item}>
          <a href={source.url} target="_blank" rel="noopener noreferrer" className={sourceStyles.name}>{source.name}</a>
          <span className={sourceStyles.adds}>{source.adds}</span>
          {source.credit ? <span className={sourceStyles.credit}>{source.credit}</span> : null}
        </li>
      ))}
    </ul>
  )
}

const SourcesPage: NextPage = () => {
  return (
    <>
      <SeoHead
        title="Sources - intori"
        description="Where the events, places and films in intori come from, how we credit them, and how an organizer can ask to be taken off."
        canonicalPath="/sources"
        ogImageAlt="intori sources preview"
      />

      <div className={styles.page}>
        <MarketingHeader />

        <main>
          <section className={styles.faqSection}>
            <div className={styles.container}>
              <div className={styles.faqHero}>
                <p className={styles.heroEyebrow}>Sources</p>
                <h1 className={styles.faqHeading}>Where intori&apos;s picks come from</h1>
                <p className={styles.faqIntro}>
                  intori finds things to do near you: a story time at the library, a show
                  downtown, a good morning for the beach, a pumpkin patch in October. Here is who we
                  read, and how we treat what they publish.
                </p>
              </div>

              <div className={sourceStyles.rules}>
                {RULES.map((rule) => (
                  <div key={rule.title} className={sourceStyles.rule}>
                    <h2 className={sourceStyles.ruleTitle}>{rule.title}</h2>
                    <p className={sourceStyles.ruleBody}>{rule.body}</p>
                  </div>
                ))}
              </div>

              <div className={sourceStyles.removal}>
                <h2 className={sourceStyles.sectionHeading}>Run one of these calendars?</h2>
                <p className={styles.faqIntro}>
                  Write to <a href={`mailto:${SOURCES_EMAIL}?subject=Remove%20our%20listings`}>{SOURCES_EMAIL}</a> with
                  the name of your organization and we will take your listings off within a day. The same
                  address is the place to tell us about a wrong date or a change we missed.
                </p>
              </div>

              <h2 className={sourceStyles.sectionHeading}>Local organizers</h2>
              <p className={sourceStyles.sectionIntro}>
                {LOCAL_COUNT} libraries, towns, museums, gardens and parks departments in{" "}
                {AREAS.length} areas. Open yours to see who intori reads there.
              </p>
              <div className={sourceStyles.areas}>
                {AREAS.map((area) => {
                  const picks = area.picks ? picksMetroInfo(area.metro) : null
                  return (
                    <details key={area.metro} className={sourceStyles.area}>
                      <summary className={sourceStyles.areaSummary}>
                        <span className={sourceStyles.areaName}>{area.name}</span>
                        <span className={sourceStyles.areaCount}>{area.sources.length}</span>
                      </summary>
                      <div className={sourceStyles.areaBody}>
                        <SourceList sources={area.sources} />
                        {picks ? (
                          <p className={sourceStyles.areaPicks}>
                            <Link href={metroPath(picks.slug)}>This week&apos;s things to do with kids in {picks.name}</Link>
                          </p>
                        ) : null}
                      </div>
                    </details>
                  )
                })}
              </div>

              <h2 className={sourceStyles.sectionHeading}>Services everywhere</h2>
              <SourceList sources={SERVICES} />

              <p className={sourceStyles.updated}>
                Updated {UPDATED}. How we handle your own information is in the{" "}
                <Link href="/privacy-policy">Privacy Policy</Link>.
              </p>
            </div>
          </section>

          <MarketingFooter />
        </main>
      </div>
    </>
  )
}

export default SourcesPage
