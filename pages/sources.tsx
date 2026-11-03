import type { GetStaticProps, InferGetStaticPropsType } from "next"
import Link from "next/link"

import { MarketingFooter, MarketingHeader } from "@/components/MarketingChrome"
import { SeoHead } from "@/lib/seo"
import { metroPath, picksMetroInfo } from "@/lib/publicPicks"
import { SOURCES_REVALIDATE_SECONDS, loadSourcesPage, type Source, type SourcesPageData } from "@/lib/publicSources"
import styles from "./index.module.css"
import sourceStyles from "./sources.module.css"

// Who intori reads for Outings, Outdoors, shows and movie night, and how an
// organizer is taken off. The organizers come live from the app's source
// registry (lib/publicSources.ts) and refresh every 30 minutes, so a source
// switched on or off in the app shows here without a site change.
// content/sources.json is the fallback and holds the area names, each
// organizer's "what it adds" line and the national services with credits.
const SOURCES_EMAIL = "sources@intori.com"

export const getStaticProps: GetStaticProps<SourcesPageData> = async () => {
  const data = await loadSourcesPage()
  return { props: data, revalidate: data.live ? SOURCES_REVALIDATE_SECONDS : 300 }
}

function updatedLabel(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  })
}

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

const SourcesPage = ({ areas, services, updated }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const localCount = areas.reduce((sum, area) => sum + area.sources.length, 0)
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
                {localCount} libraries, towns, museums, gardens and parks departments in{" "}
                {areas.length} areas. Open yours to see who intori reads there.
              </p>
              <div className={sourceStyles.areas}>
                {areas.map((area) => {
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
              <SourceList sources={services} />

              <p className={sourceStyles.updated}>
                Updated {updatedLabel(updated)}. How we handle your own information is in the{" "}
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
