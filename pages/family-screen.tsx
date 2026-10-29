import type { NextPage } from "next"
import Link from "next/link"

import FamilyScreenWeek from "@/components/FamilyScreenWeek"
import { MarketingFooter, MarketingHeader } from "@/components/MarketingChrome"
import { SeoHead } from "@/lib/seo"
import styles from "./index.module.css"
import guideStyles from "./family-screen.module.css"

// How a family puts intori on a wall calendar. Every path names the app's own
// labels (Week, Calendars and displays, Copy link) and, for Skylight, the
// options in Skylight's app as the founder tapped them on Oct 29 2026
// ("Subscribed calendar"). Skylight is named in text only: no logo, no device
// picture, no screenshots of its app.

type Guide = { id: string; title: string; note?: string; steps: string[] }

const GUIDES: Guide[] = [
  {
    id: "skylight",
    title: "Skylight",
    steps: [
      "Open the Skylight app and tap My Skylight.",
      "Tap Synced Calendars, then Sync New Calendar.",
      "Choose Subscribed calendar, paste your intori link, and tap Done.",
      "Pick a profile and a color there if you like.",
    ],
  },
  {
    id: "other",
    title: "Other wall calendars and family organizers",
    steps: [
      "Most of them can add a calendar by link. Look for Add calendar, then Subscribe, From URL or Calendar URL.",
      "Paste your intori link and save.",
    ],
  },
  {
    id: "google",
    title: "Google Calendar",
    note: "Needs a computer, once. After that it shows on your phone and on any screen that reads your Google Calendar.",
    steps: [
      "On a computer, open calendar.google.com.",
      "Next to Other calendars, click the plus sign, then From URL.",
      "Paste your intori link and click Add calendar.",
    ],
  },
  {
    id: "apple",
    title: "Apple Calendar",
    steps: [
      "On your iPhone, in Calendars and displays, tap Subscribe in Apple Calendar.",
      "Apple Calendar opens its subscription sheet. Tap Subscribe.",
    ],
  },
]

const SHOWS_UP = [
  "Only the plans you choose in intori. Nothing lands there by itself.",
  "Each one with its time, its place and a link to the organizer.",
  "Changes made for you: if a time moves or an organizer cancels, the plan updates on the screen too.",
  "intori never reads the rest of your calendar.",
]

const FamilyScreenPage: NextPage = () => {
  return (
    <>
      <SeoHead
        title="Put intori on your family screen - intori"
        description="Add your intori link to Skylight or any wall calendar that subscribes by URL, and the plans you choose show up beside carpool, practice and the rest of your week."
        canonicalPath="/family-screen"
        ogImageAlt="intori picks on a family's week"
      />

      <div className={styles.page}>
        <MarketingHeader />

        <main>
          <section className={styles.faqSection}>
            <div className={styles.container}>
              <div className={guideStyles.hero}>
                <div>
                  <p className={styles.heroEyebrow}>Family screen</p>
                  <h1 className={styles.faqHeading}>Put intori on your family screen</h1>
                  <p className={styles.faqIntro}>
                    Your calendar tells you what you have to do. intori gives you something to look
                    forward to. If your family&apos;s week already lives on a wall calendar, add intori
                    once and the plans you choose show up right beside carpool and practice, where
                    everyone sees them.
                  </p>
                </div>
                <FamilyScreenWeek />
              </div>

              <ol className={guideStyles.steps}>
                <li className={guideStyles.step}>
                  <span className={guideStyles.stepNum} aria-hidden="true">1</span>
                  <div>
                    <h2 className={guideStyles.stepTitle}>Copy your intori link</h2>
                    <p className={guideStyles.stepBody}>
                      In intori, open Week, then Calendars and displays. Choose Skylight, or Calendar
                      link for any other screen, then tap Connect and Copy link. The link is private to
                      your family. If it is ever shared by mistake, Reset link makes a new one.
                    </p>
                  </div>
                </li>
                <li className={guideStyles.step}>
                  <span className={guideStyles.stepNum} aria-hidden="true">2</span>
                  <div>
                    <h2 className={guideStyles.stepTitle}>Add it to your screen</h2>
                    <p className={guideStyles.stepBody}>
                      Paste the link where your screen adds a calendar. Find yours below.
                    </p>
                  </div>
                </li>
              </ol>

              <div className={guideStyles.guides}>
                {GUIDES.map((guide) => (
                  <section key={guide.id} id={guide.id} className={guideStyles.guide} aria-labelledby={`${guide.id}-title`}>
                    <h3 id={`${guide.id}-title`} className={guideStyles.guideTitle}>{guide.title}</h3>
                    {guide.note ? <p className={guideStyles.guideNote}>{guide.note}</p> : null}
                    <ol className={guideStyles.guideSteps}>
                      {guide.steps.map((step) => <li key={step}>{step}</li>)}
                    </ol>
                  </section>
                ))}
              </div>

              <div className={guideStyles.after}>
                <h2 className={guideStyles.afterTitle}>What shows up</h2>
                <ul className={guideStyles.afterList}>
                  {SHOWS_UP.map((line) => <li key={line}>{line}</li>)}
                </ul>
                <p className={guideStyles.afterNote}>
                  Your screen checks the link on its own schedule, so a new plan appears at its next
                  refresh. Google Calendar checks less often, so there it can take a few hours.
                </p>
              </div>

              <p className={guideStyles.more}>
                More answers are in the <Link href="/faq">FAQ</Link>. Stuck? Write to{" "}
                <a href="mailto:hello@intori.com">hello@intori.com</a> and a real person will help.
              </p>
            </div>
          </section>

          <MarketingFooter />
        </main>
      </div>
    </>
  )
}

export default FamilyScreenPage
