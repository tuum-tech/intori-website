import type { NextPage } from "next"
import Link from "next/link"

import { MarketingFooter, MarketingHeader } from "@/components/MarketingChrome"
import { SeoHead } from "@/lib/seo"
import styles from "./index.module.css"
import sourceStyles from "./sources.module.css"

// Who intori reads for Outings, Outdoors and movie night, and how an organizer
// is taken off. Keep this list in step with the app's source registry
// (MomentSource): add an organizer when its source is read, and take it off
// when it is switched off.
const SOURCES_EMAIL = "sources@intori.com"
const UPDATED = "October 2, 2026"

type Source = { name: string; adds: string; url: string; credit?: string }

const ORGANIZERS: Array<{ region: string; sources: Source[] }> = [
  {
    region: "Atlanta, Georgia",
    sources: [
      { name: "Fulton County Library System", adds: "Story times, classes and events at its branches", url: "https://fulcolibrary.bibliocommons.com/v2/events" },
      { name: "Gwinnett County Public Library", adds: "Story times, classes and events at its branches", url: "https://gwinnettpl.libnet.info/events" },
      { name: "DeKalb County Public Library", adds: "Story times, classes and events at its branches", url: "https://events.dekalblibrary.org/events" },
      { name: "City of Marietta", adds: "City events and programs", url: "https://www.mariettaga.gov/calendar.aspx" },
    ],
  },
  {
    region: "Orlando, Florida",
    sources: [
      { name: "Orange County Library System", adds: "Story times, classes and events at its branches", url: "https://attend.ocls.org/" },
      { name: "City of Oviedo", adds: "City events and programs", url: "https://www.cityofoviedo.net/calendar.aspx" },
      { name: "City of Ocoee", adds: "City events and programs", url: "https://www.ocoee.org/calendar.aspx" },
      { name: "City of Maitland", adds: "City events and programs", url: "https://maitlandfl.gov/calendar.aspx" },
    ],
  },
  {
    region: "Wilmington and Southeastern North Carolina",
    sources: [
      { name: "New Hanover County Public Library", adds: "Story times, classes and events at its branches", url: "https://libcal.nhcgov.com/" },
      { name: "New Hanover County", adds: "County events, museum and parks programs", url: "https://www.nhcgov.com/" },
      { name: "Pender County", adds: "County events and programs", url: "https://www.pendercountync.gov/" },
      { name: "Brunswick County", adds: "County events and programs", url: "https://www.brunswickcountync.gov/calendar.aspx" },
    ],
  },
]

const SERVICES: Source[] = [
  { name: "Ticketmaster", adds: "Theater, comedy and family shows near you, with a link to buy on Ticketmaster", url: "https://www.ticketmaster.com/" },
  { name: "RunSignup", adds: "Races and fun runs, with a link to sign up", url: "https://runsignup.com/" },
  { name: "National Weather Service", adds: "The forecast behind the outdoor hours intori suggests", url: "https://www.weather.gov/" },
  { name: "OpenStreetMap", adds: "Parks, playgrounds, beaches, gardens and courts", url: "https://www.openstreetmap.org/copyright", credit: "© OpenStreetMap contributors, available under the Open Database License" },
  { name: "NASA", adds: "Meteor showers and other nights worth looking up", url: "https://www.nasa.gov/" },
  { name: "National Park Service", adds: "Ranger programs and events at national park sites", url: "https://www.nps.gov/" },
  { name: "TMDB", adds: "Films and series, and where to watch them", url: "https://www.themoviedb.org/", credit: "Where to watch: JustWatch. This product uses the TMDB API but is not endorsed or certified by TMDB." },
  { name: "Google Maps", adds: "Season places such as pumpkin patches, orchards and tree farms, shown with Google's own place card", url: "https://maps.google.com/" },
  { name: "U.S. Census Bureau Geocoder", adds: "Places the street addresses that public calendars and race listings print, so a venue sits at its building", url: "https://geocoding.geo.census.gov/", credit: "Public US government data." },
]

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
        <li key={source.name} className={sourceStyles.item}>
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
                  intori finds things to do near a household: a story time at the library, a show
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
              {ORGANIZERS.map((group) => (
                <div key={group.region} className={sourceStyles.group}>
                  <h3 className={sourceStyles.region}>{group.region}</h3>
                  <SourceList sources={group.sources} />
                </div>
              ))}

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
