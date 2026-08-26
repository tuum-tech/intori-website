import type { GetServerSideProps } from "next";
import Image from 'next/image'
import { getSession } from "next-auth/react"
import { MarketingFooter, MarketingHeader } from '@/components/MarketingChrome'
import { SeoHead } from '@/lib/seo'
import { APP_URL, HERO_VARIANT, IOS_BETA_URL } from '@/lib/appLinks'

import styles from './index.module.css'

export const getServerSideProps = (async (context) => {
  const session = await getSession(context)

  if (session?.user?.fid) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard"
      }
    }
  }

  return { props: {} }
}) satisfies GetServerSideProps

// The four live helpers, in the locked order: Game Day, Music Events,
// Watch Radar, then Today's Food. Food never leads. Promise lines come from
// the app's helperPublicCopy.ts deks; the food card adds its meal-planner
// deference on purpose.
const HELPERS = [
  {
    kicker: 'Game Day',
    title: 'The games that matter to your crew.',
    body: 'A short daily brief on your teams: what to watch and why it matters, with scores hidden until you want them.',
    image: '/brand/warm/tile-game-day.jpg',
    alt: "Game Day brief in intori listing three games worth circling on the calendar this week",
    tint: styles.artSports,
  },
  {
    kicker: 'Music Events',
    title: 'See who’s playing near you.',
    body: 'Shows, venues, and artists worth your night, shaped by your taste and the city you choose to share.',
    image: '/brand/warm/tile-music-events.jpg',
    alt: 'Music Events in intori showing a first look at shows people are buying tickets for right now',
    tint: styles.artMusic,
  },
  {
    kicker: 'Watch Radar',
    title: 'Something worth watching tonight.',
    body: 'Returns, premieres, and what people are talking about, with spoilers kept out of sight.',
    image: '/brand/warm/tile-watch-radar.jpg',
    alt: 'Watch Radar in intori asking which shows you already follow',
    tint: styles.artWatch,
  },
  {
    kicker: 'Today’s Food',
    title: 'Dinner, decided.',
    body: 'Three picks shaped by your household’s tastes, budget, and effort, for the nights the plan is blank. Your meal planner keeps its job.',
    image: '/brand/warm/tile-todays-food.jpg',
    alt: 'Today’s Food in intori showing a first look at easy dinners worth cooking this week',
    tint: styles.artFood,
  },
]

const TRUST_CARDS = [
  {
    title: 'Your answers do the work',
    body: 'Quick questions about taste, timing, and constraints teach intori what a good pick looks like for your household.',
  },
  {
    title: 'You can see why',
    body: 'Every pick shows what shaped it and what might still be missing. No mystery, no black box.',
  },
  {
    title: 'You choose what to share',
    body: 'Context stays yours. Share more only when it would make the picks better, and skip anything you’d rather not answer.',
  },
]

// Staged iOS CTA. While IOS_BETA_URL is empty the beta reads as a quiet,
// non-clickable status chip and the web stays primary. Once the env var is
// set, the beta becomes the primary button and the web CTA drops to ghost.
function AppCtas() {
  if (IOS_BETA_URL) {
    return (
      <>
        <a
          href={IOS_BETA_URL}
          className={styles.btnPrimary}
          target="_blank"
          rel="noopener noreferrer"
        >
          Join the iPhone beta
        </a>
        <a
          href={APP_URL}
          className={styles.btnGhost}
          target="_blank"
          rel="noopener noreferrer"
        >
          Start on the web
        </a>
      </>
    )
  }

  return (
    <>
      <a
        href={APP_URL}
        className={styles.btnPrimary}
        target="_blank"
        rel="noopener noreferrer"
      >
        Start on the web
      </a>
      <span className={styles.chipQuiet}>
        <span className={styles.chipDot} aria-hidden="true" />
        iPhone beta coming soon
      </span>
    </>
  )
}

// Staged headline. 'forward' is built and verified but must stay off until the
// app can guarantee a populated item for every household every week.
function HeroHeadline() {
  if (HERO_VARIANT === 'forward') {
    return (
      <h1 className={`${styles.heroHeadline} ${styles.heroHeadlineForward}`}>
        Something to look<br />forward to.<br />Every week.
      </h1>
    )
  }

  return <h1 className={styles.heroHeadline}>Tonight,<br />decided.</h1>
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12.5 9.5 18 20 6.5" />
    </svg>
  )
}

export default function HomePage() {
  return (
    <>
      <SeoHead
        title="intori. Tonight, decided."
        description="The game tonight, a show nearby, something worth watching, and yes, dinner. intori answers a busy household's small daily questions in about 30 seconds, shaped by your answers."
        canonicalPath="/"
        ogDescription="The game tonight, a show nearby, something worth watching, and yes, dinner. Answered in about 30 seconds, shaped by your answers."
        ogImageAlt="intori card reading Tonight, decided, with tiles for Game Day, Music Events, Watch Radar, and Today's Food"
      />

      <div className={styles.page}>

        <MarketingHeader />

        <main>
          <header className={styles.heroSection}>
            <div className={styles.container}>
              <p className={styles.heroEyebrow}>Made for busy households</p>
              <HeroHeadline />
              <p className={styles.heroDeck}>
                Your calendar is full of things you have to do. This is for the other half.
              </p>
              <p className={styles.heroSub}>
                The game worth staying up for. Who&rsquo;s playing 15&nbsp;minutes away on
                Saturday. The show you&rsquo;re both mid season on. And yes, what&rsquo;s for
                dinner. intori brings them to you, shaped by what your household actually
                likes, early enough to say yes.
              </p>
              <div className={styles.heroCtas}>
                <AppCtas />
              </div>
              <p className={styles.heroTrust}>
                <strong>No ads.</strong> Nothing sold about your family. You choose what to share.
              </p>
            </div>
            <div className={styles.heroStage}>
              <div className={styles.heroGlow} aria-hidden="true" />
              <div className={styles.phone}>
                <div className={styles.phoneScreen}>
                  <Image
                    src="/brand/warm/home-today-gameday.jpg"
                    alt="intori Today screen with a Game Day pick ready to keep or pass on, and a quick question below it"
                    width={1206}
                    height={2282}
                    className={styles.phoneShot}
                    priority
                  />
                </div>
              </div>
            </div>
          </header>

          <section id="today" className={styles.todaySection}>
            <div className={styles.container}>
              <div className={styles.secHead}>
                <h2 className={styles.secTitle}>What intori answers today</h2>
                <p className={styles.secSub}>
                  Four questions, answered every day. Each one learns from what you tell it,
                  and shows where the pick came from.
                </p>
              </div>
              <div className={styles.todayGrid}>
                {HELPERS.map((helper) => (
                  <article key={helper.kicker} className={styles.todayCard}>
                    <div className={`${styles.todayArt} ${helper.tint}`}>
                      <Image
                        src={helper.image}
                        alt={helper.alt}
                        fill
                        sizes="(max-width: 900px) 100vw, 540px"
                        className={styles.todayArtImage}
                      />
                    </div>
                    <p className={styles.todayKicker}>{helper.kicker}</p>
                    <h3 className={styles.todayTitle}>{helper.title}</h3>
                    <p className={styles.todayBody}>{helper.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.wedgeSection}>
            <div className={styles.container}>
              <div className={styles.wedgeState}>
                <p className={styles.wedgeLineA}>
                  Your family calendar keeps track of what&rsquo;s planned.
                </p>
                <p className={styles.wedgeLineB}>
                  intori helps with everything that isn&rsquo;t, yet.
                </p>
              </div>
              <p className={styles.wedgeBody}>
                Shared calendars and family displays are great at keeping the household
                moving. What they can&rsquo;t do is step outside the loop: the game tonight,
                the show this weekend, whether Saturday deserves a small adventure.
                intori starts there. It&rsquo;s the half nobody fills in, because filling it
                in means knowing what to look for, finding the date, and remembering
                before it passes.
              </p>
              <div className={styles.wedgeDemo}>
                <div className={styles.demoCol}>
                  <h4 className={styles.demoColTitle}>Already on the calendar</h4>
                  <div className={styles.demoRow}><time>4:00 pm</time>Soccer practice</div>
                  <div className={styles.demoRow}><time>Thu</time>Dentist, both kids</div>
                  <div className={styles.demoRow}><time>Fri</time>School recital</div>
                  <div className={styles.demoRow}><time>Sat</time>&hellip;still open</div>
                </div>
                <div className={styles.demoCol}>
                  <h4 className={styles.demoColTitle}>Still open &middot; intori&rsquo;s job</h4>
                  <div className={styles.demoPick}>
                    <div className={`${styles.demoSwatch} ${styles.swatchSports}`} aria-hidden="true" />
                    <div>
                      <b>Tonight</b>
                      <span>Your team tips off at 8, and this one is worth it</span>
                    </div>
                  </div>
                  <div className={styles.demoPick}>
                    <div className={`${styles.demoSwatch} ${styles.swatchMusic}`} aria-hidden="true" />
                    <div>
                      <b>Saturday</b>
                      <span>An outdoor show 15 minutes away, kids welcome</span>
                    </div>
                  </div>
                  <div className={styles.demoPick}>
                    <div className={`${styles.demoSwatch} ${styles.swatchWatch}`} aria-hidden="true" />
                    <div>
                      <b>After bedtime</b>
                      <span>The show you&rsquo;re both mid-season on is back</span>
                    </div>
                  </div>
                  <div className={styles.demoPick}>
                    <div className={`${styles.demoSwatch} ${styles.swatchFood}`} aria-hidden="true" />
                    <div>
                      <b>Dinner</b>
                      <span>3 picks ready, one is a 20-minute sheet pan</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="why" className={styles.trustSection}>
            <div className={styles.container}>
              <div className={styles.secHead}>
                <h2 className={styles.secTitle}>Built from your answers, not guesses</h2>
                <p className={styles.secSub}>
                  intori gets useful because you tell it what matters, a few quick questions at a time.
                </p>
              </div>
              <div className={styles.trustGrid}>
                {TRUST_CARDS.map((card) => (
                  <div key={card.title} className={styles.trustCard}>
                    <div className={styles.trustTick} aria-hidden="true"><CheckIcon /></div>
                    <h3 className={styles.trustTitle}>{card.title}</h3>
                    <p className={styles.trustBody}>{card.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="calendar" className={styles.calSection}>
            <div className={`${styles.container} ${styles.calGrid}`}>
              <div>
                <h2 className={styles.calTitle}>Keep the good ones where your family already looks</h2>
                <p className={styles.calSub}>
                  When something is worth holding onto, put it where the household already
                  looks, including your Skylight. On the calendar it&rsquo;s an option, not an
                  obligation. Nothing here has to happen. One tap, your choice, every time.
                </p>
                <p className={styles.calFine}>
                  intori adds only what you decide to keep. Nothing lands on the family calendar by itself.
                </p>
              </div>
              <div className={styles.calVisual}>
                <div className={styles.calFlow}>
                  <div className={styles.calPick}>
                    <div className={`${styles.demoSwatch} ${styles.swatchMusic}`} aria-hidden="true" />
                    <div>
                      <b>Riverfront Live: Saturday 6 pm</b>
                      <span>Keep this &rarr;</span>
                    </div>
                  </div>
                  <div className={styles.calArrow} aria-hidden="true">&darr;</div>
                  <div className={styles.calDest}>
                    <small>Your household display</small>
                    <b>Sat &middot; Riverfront Live, 6:00 pm</b>
                    <span>On the calendar everyone sees</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Coming Next is deliberately self-contained: when Family Activities
              ships, this section is deleted and the helper joins the Today grid
              above as a fifth card. */}
          <section className={styles.nextSection}>
            <div className={`${styles.container} ${styles.nextInner}`}>
              <span className={styles.nextTag}>
                <span className={styles.chipDot} aria-hidden="true" />
                Coming next
              </span>
              <h2 className={styles.secTitle}>The moments worth making room for</h2>
              <p className={styles.nextBody}>
                We&rsquo;re building one that surfaces timely, nearby opportunities a
                family would be glad to know about before they pass: the exhibit that
                only runs one weekend, the season that ends soon, the small Saturday
                adventure that turns an ordinary weekend into a memory. Worth putting
                on the calendar while there&rsquo;s still time.
              </p>
              <p className={styles.nextHonest}>Not live yet. The four above are.</p>
            </div>
          </section>

          <section id="start" className={styles.convertSection}>
            <div className={styles.container}>
              <h2 className={styles.convertTitle}>Start tonight.</h2>
              <p className={styles.convertSub}>
                {IOS_BETA_URL
                  ? <>The iPhone beta is open. intori still works on the web too, no install needed.</>
                  : <>intori works on the web today. The iPhone beta is next, and the button below will say so the moment it&rsquo;s real.</>}
              </p>
              <div className={styles.convertCtas}>
                <AppCtas />
              </div>
              <p className={styles.convertNote}>Free to try. No app install needed on the web.</p>
            </div>
          </section>

          <MarketingFooter />
        </main>

      </div>
    </>
  )
}
