import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from 'next/image'
import Link from 'next/link'
import { getSession } from "next-auth/react"
import { MarketingFooter, MarketingHeader } from '@/components/MarketingChrome'
import { SeoHead } from '@/lib/seo'
import { APP_URL, HERO_VARIANT, IOS_CHANNEL, IOS_URL } from '@/lib/appLinks'
import { appStoreQrSvg } from '@/lib/appStoreQr'

import styles from './index.module.css'

// The trial sample in Pricing is a real date: today plus 21 days, in the
// household's likely zone, so the page never shows a date that has passed.
// Calendar-day arithmetic on the New York date, so a daylight saving change
// inside the 21 days cannot shift the label by a day.
function trialSampleLabel(now = new Date()): string {
  const [month, day, year] = now
    .toLocaleDateString('en-US', { timeZone: 'America/New_York', year: 'numeric', month: 'numeric', day: 'numeric' })
    .split('/')
    .map(Number)
  const end = new Date(Date.UTC(year, month - 1, day + 21))
  return end.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

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

  return { props: { qrSvg: await appStoreQrSvg(), trialEnds: trialSampleLabel() } }
}) satisfies GetServerSideProps<{ qrSvg: string | null; trialEnds: string }>

// App screens are unedited Build 25 captures from the App Store storefront
// package (Oct 16 2026): the same Raleigh, NC test household on every
// screen, so the story holds together from section to section.
const SCREEN = { width: 1206, height: 2622 }

// Six live lanes in two groups. "Near you" lanes are found from the saved area
// and checked against the date and the forecast; "Follow" lanes come from the
// teams, shows and artists a household follows. Food is last in its group and
// never leads the page.
//
// Lane words only. Helper product names never appear on a marketing surface,
// and neither does the word "helper".
type Lane = {
  id: string
  kicker: string
  title: string
  body: string
  image: string
  alt: string
  tint: string
  isNew?: boolean
}

const NEAR_YOU: Lane[] = [
  {
    id: 'outings',
    kicker: 'Outings',
    title: 'Story time, festivals, family shows.',
    body: 'Library programs, museum days, fun runs and family shows near you, each with the date, the place, and who it suits.',
    image: '/brand/lanes/outings-out-there.jpg',
    alt: 'A mother and child on the roof of a lilac station wagon, looking out through binoculars against a purple backdrop',
    tint: styles.artOutings,
    isNew: true,
  },
  {
    id: 'outdoors',
    kicker: 'Outdoors',
    title: 'Good hours for the park.',
    body: 'Parks, playgrounds, trails and beaches close to home, with the hours the forecast looks good.',
    image: '/brand/lanes/outdoors-green-light.jpg',
    alt: 'A mother in a yellow raincoat holding up a glowing lantern against a blue sky',
    tint: styles.artOutdoors,
    isNew: true,
  },
  {
    id: 'food',
    kicker: 'Food',
    title: 'Dinner that fits the plan.',
    body: 'Headed to a game or a show? A few places nearby that suit your household, and a few good spots close to home.',
    image: '/brand/lanes/food-table-for-four.jpg',
    alt: 'A mother and two children passing a big bowl of pasta around a pink table',
    tint: styles.artFood,
  },
]

const FOLLOWED: Lane[] = [
  {
    id: 'sports',
    kicker: 'Sports',
    title: 'Every game worth watching.',
    body: 'Follow your team and add the season in one tap. Where to watch, and scores hidden until you are ready.',
    image: '/brand/lanes/sports-game-day-family.jpg',
    alt: 'A mother and her son leaping with a foam finger and a ball against an orange backdrop',
    tint: styles.artSports,
  },
  {
    id: 'shows',
    kicker: 'Shows',
    title: 'Know the night it comes back.',
    body: 'New seasons and premieres for the shows you watch together, and where they are streaming.',
    image: '/brand/lanes/shows-movie-night.jpg',
    alt: 'A mother and daughter sharing a blanket and a giant bowl of popcorn on a mint sofa',
    tint: styles.artWatch,
  },
  {
    id: 'music',
    kicker: 'Music',
    title: 'The show in town, in time to go.',
    body: 'Artists you love playing near you, and when tickets go on sale, while there is still time to plan.',
    image: '/brand/lanes/music-singer.jpg',
    alt: 'A woman in sunglasses and a sequined top singing into a microphone against a lilac backdrop',
    tint: styles.artMusic,
  },
]

// Strip and dot order: the two new lanes first, Food last.
const ALL_LANES = [NEAR_YOU[0], NEAR_YOU[1], ...FOLLOWED, NEAR_YOU[2]]

const STEPS = [
  {
    title: 'Turn on what your household enjoys.',
    body: 'Sign in with Apple or your email, then pick from six interests. Follow a team or a show, choose the outings you like, and add the rest anytime.',
    image: '/brand/app-b25/04-interests.jpg',
    alt: 'intori Interests for a family with kids under 5 and 5 to 8, with all six turned on: Outings, Outdoors, Sports, Shows, Music and Food',
  },
  {
    title: 'A few good picks, with the reason.',
    body: 'Up to five picks a day on Home. Each one says when, where, and why it fits, like good playground hours on Sunday, with the forecast checked.',
    image: '/brand/app-b25/02-detail.jpg',
    alt: 'intori details for Lenoir Street Park playground: Sunday, October 18, good hours 11:00 AM to 6:00 PM, 51 to 58°F, 15% chance of rain, for kids, with Hold the day',
  },
  {
    title: 'Keep the dates you choose.',
    body: 'Games, shows and dated outings go on your iPhone’s calendar in one tap. For a flexible day, Hold the day keeps it in intori until you choose a time. Want a reminder? intori sends one the day before.',
    image: '/brand/app-b25/06-calendar.jpg',
    alt: 'intori confirming Lenoir Street Park playground is on your calendar for Sunday, October 18 at 2:00 PM in Apple Calendar, with a reminder the day before turned on',
  },
]

const WHY_CARDS = [
  {
    title: 'A few picks, then done.',
    body: 'Up to five a day, each with a reason. When you have seen them, intori says so.',
  },
  {
    title: 'Alerts you will want.',
    body: 'Before something you added, or a new date from something you follow. Never overnight.',
  },
  {
    title: 'Better every week.',
    body: 'Now and then, one quick question after you add something. Tap an answer and picks fit better.',
  },
  {
    title: 'No ads. Nothing sold.',
    body: 'You pay for intori, so your family is the customer, not the product.',
  },
]

const INCLUDES = [
  'Up to five fresh picks a day, across all six interests',
  'One-tap adds to your calendar, with a reminder when you want one',
  'Alerts when a team, show, or artist you follow gets a new date',
  'No ads, ever',
]

// Staged iOS CTA, driven entirely by IOS_CHANNEL in lib/appLinks.ts.
//
//   'appstore' -> "Download on the App Store" is primary, the web is a quiet link
//   'beta'     -> "Join the iPhone beta" is primary, the web is a quiet link
//   'none'     -> web is primary, iPhone is a quiet non-clickable status chip
//
// iPhone leads because the launch promise lives there: Sign in with Apple, one
// tap to Apple Calendar, and reminders on the lock screen. The web stays one
// link away for anyone on Android or a laptop, and on desktop a QR code sits
// beside the button, since the button alone cannot install anything there.
function AppCtas({ qrSvg }: { qrSvg?: string | null }) {
  if (IOS_CHANNEL !== 'none') {
    return (
      <div className={styles.ctaStack}>
        <div className={styles.ctaRow}>
          <a
            href={IOS_URL}
            className={styles.btnPrimary}
            target="_blank"
            rel="noopener noreferrer"
          >
            {IOS_CHANNEL === 'appstore' ? 'Download on the App Store' : 'Join the iPhone beta'}
          </a>
          {qrSvg && (
            <div className={styles.qr}>
              <span
                className={styles.qrCode}
                role="img"
                aria-label="QR code that opens intori on your iPhone"
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
              <span className={styles.qrLabel}>Scan with your iPhone camera</span>
            </div>
          )}
        </div>
        <a
          href={APP_URL}
          className={styles.btnText}
          target="_blank"
          rel="noopener noreferrer"
        >
          Or use intori in your browser
        </a>
      </div>
    )
  }

  return (
    <div className={styles.ctaRow}>
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
        iPhone app coming soon
      </span>
    </div>
  )
}

function HeroHeadline() {
  if (HERO_VARIANT === 'decided') {
    return <h1 className={styles.heroHeadline}>Tonight,<br />decided.</h1>
  }

  if (HERO_VARIANT === 'weekly') {
    return (
      <h1 className={`${styles.heroHeadline} ${styles.heroHeadlineWeekly}`}>
        Something to look forward to. Every week.
      </h1>
    )
  }

  return (
    <h1 className={styles.heroHeadline}>
      Something to look forward to.
    </h1>
  )
}

function Phone({ src, alt, priority = false, className = '' }: { src: string; alt: string; priority?: boolean; className?: string }) {
  return (
    <div className={`${styles.phone} ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={SCREEN.width}
        height={SCREEN.height}
        sizes="(max-width: 640px) 250px, 320px"
        className={styles.phoneShot}
        priority={priority}
      />
    </div>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12.5 9.5 18 20 6.5" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.calIcon}>
      <rect x="3.5" y="5" width="17" height="15" rx="3" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  )
}

function LaneCard({ lane }: { lane: Lane }) {
  return (
    <article id={`lane-${lane.id}`} tabIndex={-1} className={`${styles.laneCard} ${lane.tint}`}>
      <div className={styles.laneArt}>
        <Image
          src={lane.image}
          alt={lane.alt}
          fill
          sizes="(max-width: 900px) 100vw, 360px"
          className={styles.todayArtImage}
        />
      </div>
      <p className={styles.todayKicker}>
        <span className={styles.laneMark} aria-hidden="true" />
        {lane.kicker}
        {lane.isNew && <span className={styles.newTag}>New</span>}
      </p>
      <h3 className={styles.laneTitle}>{lane.title}</h3>
      <p className={styles.laneBody}>{lane.body}</p>
    </article>
  )
}

export default function HomePage({ qrSvg, trialEnds }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <SeoHead
        title="intori. Something to look forward to."
        description="Your calendar tells you what you have to do. intori finds what your household would love to do, from story time and good park hours to the big game, a show coming back, or an artist playing nearby, and adds it to your calendar in one tap."
        canonicalPath="/"
        ogDescription="Your calendar tells you what you have to do. intori gives you something to look forward to."
        ogImageAlt="intori card reading Something to look forward to, with tiles for Outings, Outdoors, Sports, Shows, Music and Food"
      />

      <div className={styles.page}>

        <MarketingHeader />

        <main>
          <header className={styles.heroSection}>
            <div className={`${styles.container} ${styles.heroGrid}`}>
              <div className={styles.heroText}>
                <p className={styles.heroEyebrow}>For busy households</p>
                <HeroHeadline />
                <p className={styles.heroDeck}>
                  Your calendar tells you what you have to do. intori finds what your
                  household would love to do, and adds it in one tap.
                </p>
                <div className={styles.heroCtas}>
                  <AppCtas qrSvg={qrSvg} />
                </div>
                <p className={styles.heroTrust}>
                  <strong>21 days free, no card needed.</strong> No ads, and nothing sold about your family.
                </p>
                <p className={styles.worksWith}>
                  <CalendarIcon />
                  Works with Apple Calendar, Google Calendar, and family displays like Skylight
                </p>
              </div>
              <div className={styles.heroStage}>
                <div className={styles.heroPhoto} aria-hidden="true">
                  <Image src="/brand/lanes/outings-out-there.jpg" alt="" fill sizes="420px" className={styles.heroPhotoImg} priority />
                </div>
                <Phone
                  src="/brand/app-b25/01-home.jpg"
                  alt="intori Today: apple picking at a nearby farm tomorrow, 8 AM to 5 PM, ready to hold, with Marbles Courtyard already on the calendar for Sunday at 11:00 AM"
                  priority
                  className={styles.heroPhone}
                />
                <div className={styles.momentCard} aria-hidden="true">
                  <span className={styles.momentIcon}><CalendarIcon /></span>
                  <span>
                    <b>On your calendar</b>
                    <span>Marbles Courtyard · Sun 11:00 AM</span>
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.container}>
              <nav className={styles.laneStrip} aria-label="What intori watches for">
                {ALL_LANES.map((lane) => (
                  <a key={lane.id} href={`#lane-${lane.id}`} className={`${styles.laneChip} ${lane.tint}`}>
                    <span className={styles.laneChipImg}>
                      <Image src={lane.image} alt="" fill sizes="40px" className={styles.todayArtImage} />
                    </span>
                    {lane.kicker}
                    {lane.isNew && <span className={styles.newDot}>New</span>}
                  </a>
                ))}
              </nav>
            </div>
          </header>

          <section id="lanes" className={styles.todaySection}>
            <div className={styles.container}>
              <div className={styles.secHead}>
                <h2 className={styles.secTitle}>Six things intori watches for</h2>
                <p className={styles.secSub}>
                  Turn on the ones your household enjoys. intori does the looking.
                </p>
              </div>

              <div className={styles.laneGroup}>
                <div className={styles.laneGroupHead}>
                  <h3 className={styles.laneGroupTitle}>Near you, this week</h3>
                  <p className={styles.laneGroupSub}>Found from your area, and checked against the date and the forecast.</p>
                </div>
                <div className={styles.laneGrid}>
                  {NEAR_YOU.map((lane) => <LaneCard key={lane.id} lane={lane} />)}
                </div>
              </div>

              <div className={styles.laneGroup}>
                <div className={styles.laneGroupHead}>
                  <h3 className={styles.laneGroupTitle}>From what you follow</h3>
                  <p className={styles.laneGroupSub}>Follow a team, a show, or an artist. The dates come to you.</p>
                </div>
                <div className={styles.laneGrid}>
                  {FOLLOWED.map((lane) => <LaneCard key={lane.id} lane={lane} />)}
                </div>
              </div>

              <p className={styles.laneFine}>
                What intori finds near you depends on your area. See who intori reads on
                the <Link href="/sources">Sources</Link> page.
              </p>
            </div>
          </section>

          <section id="how" className={styles.howSection}>
            <div className={styles.container}>
              <div className={styles.secHead}>
                <h2 className={styles.secTitle}>Set it up once. It keeps looking for you.</h2>
                <p className={styles.secSub}>
                  No feed to scroll, no searching, nothing to type.
                </p>
              </div>
              <ol className={styles.steps}>
                {STEPS.map((step, i) => (
                  <li key={step.title} className={styles.step}>
                    <Phone src={step.image} alt={step.alt} className={styles.phoneSmall} />
                    <p className={styles.stepNum} aria-hidden="true">{i + 1}</p>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepBody}>{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className={styles.wedgeSection}>
            <div className={styles.container}>
              <div className={styles.wedgeState}>
                <p className={styles.wedgeLineA}>
                  Your calendar tells you what you have to do.
                </p>
                <p className={styles.wedgeLineB}>
                  intori gives you something to look forward to.
                </p>
              </div>
              <p className={styles.wedgeBody}>
                Family calendars keep the household running. They can&rsquo;t notice that
                the library has story time Saturday, the park looks perfect Sunday, or your
                team plays Thursday. intori does the noticing, and fills the open days.
              </p>
              <div className={styles.wedgeDemo}>
                <div className={styles.demoCol}>
                  <h3 className={styles.demoColTitle}>Already on the calendar</h3>
                  <div className={styles.demoRow}><time>Mon</time>Soccer practice, 4:00</div>
                  <div className={styles.demoRow}><time>Tue</time>Dentist, both kids</div>
                  <div className={styles.demoRow}><time>Wed</time>Parent-teacher night</div>
                  <div className={styles.demoRow}><time>Thu</time>&hellip;still open</div>
                  <div className={styles.demoRow}><time>Sat</time>&hellip;wide open</div>
                  <div className={styles.demoRow}><time>Sun</time>&hellip;also open</div>
                </div>
                <div className={styles.demoCol}>
                  <h3 className={styles.demoColTitle}>Found by intori</h3>
                  <div className={styles.demoPick}>
                    <div className={`${styles.demoSwatch} ${styles.swatchSports}`} aria-hidden="true" />
                    <div>
                      <b>Thursday</b>
                      <span>Your team plays at 8:15, on the road</span>
                    </div>
                  </div>
                  <div className={styles.demoPick}>
                    <div className={`${styles.demoSwatch} ${styles.swatchOutings}`} aria-hidden="true" />
                    <div>
                      <b>Saturday, 10:15 AM</b>
                      <span>Free story time at the library, for little ones</span>
                    </div>
                  </div>
                  <div className={styles.demoPick}>
                    <div className={`${styles.demoSwatch} ${styles.swatchOutdoors}`} aria-hidden="true" />
                    <div>
                      <b>Sunday</b>
                      <span>Good hours at the playground, 10 to 4</span>
                    </div>
                  </div>
                  <div className={styles.demoPick}>
                    <div className={`${styles.demoSwatch} ${styles.swatchWatch}`} aria-hidden="true" />
                    <div>
                      <b>Next Wednesday</b>
                      <span>The show you watch together is back</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="calendar" className={styles.calSection}>
            <div className={`${styles.container} ${styles.calGrid}`}>
              <div>
                <h2 className={styles.calTitle}>A week to look forward to.</h2>
                <p className={styles.calSub}>
                  Everything you add lands in your iPhone&rsquo;s calendar and in
                  intori&rsquo;s Week, so the open days are easy to see and easy to fill.
                </p>
                <p className={styles.calFine}>
                  intori adds only the dates you choose, and never reads your other events.
                  Use Google Calendar or a family display like Skylight? Connect it from Week,
                  and what you add shows up there too.
                </p>
              </div>
              <div className={styles.calVisual}>
                <Phone
                  src="/brand/app-b25/03-week.jpg"
                  alt="intori Week for October 18 to 24: Marbles Courtyard and Lenoir Street Park playground on Sunday, the Hurricanes at the Flames Sunday night, and Abbott Elementary on Wednesday"
                  className={styles.phoneSmall}
                />
              </div>
            </div>
          </section>

          <section id="why" className={styles.trustSection}>
            <div className={styles.container}>
              <div className={styles.secHead}>
                <h2 className={styles.secTitle}>Built to give you time back</h2>
              </div>
              <div className={styles.whyGrid}>
                {WHY_CARDS.map((card) => (
                  <div key={card.title} className={styles.trustCard}>
                    <div className={styles.trustTick} aria-hidden="true"><CheckIcon /></div>
                    <h3 className={styles.trustTitle}>{card.title}</h3>
                    <p className={styles.trustBody}>{card.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing. Amounts mirror src/config/stripeSubscriptionPlans.ts in the
              app repo: 899 monthly, 5_999 annual. The trial starts when
              onboarding completes; see the app's resolveAccountAccessVerdict. */}
          <section id="pricing" className={styles.priceSection}>
            <div className={styles.container}>
              <div className={styles.secHead}>
                <h2 className={styles.secTitle}>Twenty-one days, then you decide</h2>
                <p className={styles.secSub}>
                  Your 21 days start when you finish setup, not when you sign up. The app
                  shows you the real date.
                </p>
                <p className={styles.priceSample}>
                  <span className={styles.priceSampleLabel}>Finish setup today</span>
                  Full access until {trialEnds}.
                </p>
              </div>

              <div className={styles.includes}>
                <h3 className={styles.includesTitle}>Every plan includes</h3>
                <ul className={styles.includesList}>
                  {INCLUDES.map((item) => (
                    <li key={item}>
                      <span className={styles.includesTick} aria-hidden="true"><CheckIcon /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.priceGrid}>
                <div className={styles.priceCard}>
                  <p className={styles.pricePlan}>Monthly</p>
                  <p className={styles.priceAmount}>
                    $8.99<span className={styles.pricePer}>/month</span>
                  </p>
                  <p className={styles.priceNote}>
                    Cancel any time. You keep access through the period you have already
                    paid for.
                  </p>
                </div>
                <div className={`${styles.priceCard} ${styles.priceCardFeature}`}>
                  <p className={styles.pricePlan}>
                    Annual
                    <span className={styles.priceTag}>Save 44%</span>
                  </p>
                  <p className={styles.priceAmount}>
                    $59.99<span className={styles.pricePer}>/year</span>
                  </p>
                  <p className={styles.priceNote}>$5 a month. Save 44% compared with paying monthly for a year.</p>
                </div>
              </div>

              <p className={styles.priceFine}>
                No card up front, and nothing charges itself when the 21 days are up.
                On the web, choose a plan with at least 48 hours left and your first
                charge waits until your free days end. Cancel before then and you
                won&rsquo;t be charged. With less time left, web billing starts today.
                On iPhone, Apple bills when you confirm your purchase.
              </p>

              <div className={styles.priceLapse}>
                <h3 className={styles.priceLapseTitle}>If you stop paying</h3>
                <p className={styles.priceLapseBody}>
                  Everything you added stays visible in intori and on your calendar.
                  Followed-season dates keep their last saved details. New picks, adds,
                  updates and reminders pause until you choose a plan again.
                </p>
              </div>
            </div>
          </section>

          <section id="start" className={styles.convertSection}>
            <div className={styles.container}>
              <div className={styles.convertLanes} aria-hidden="true">
                {ALL_LANES.map((lane) => (
                  <span key={lane.id} className={`${styles.laneMark} ${lane.tint}`} />
                ))}
              </div>
              <h2 className={styles.convertTitle}>Your first pick is a few minutes away.</h2>
              <p className={styles.convertSub}>
                {IOS_CHANNEL === 'appstore'
                  ? <>Download intori, sign in with Apple, and choose what your household enjoys. intori takes it from there.</>
                  : IOS_CHANNEL === 'beta'
                    ? <>Join the iPhone beta, sign in with Apple, and choose what your household enjoys. intori takes it from there.</>
                    : <>intori works on the web today. The iPhone app is next, and the button below will say so the moment it&rsquo;s real.</>}
              </p>
              <div className={styles.convertCtas}>
                <AppCtas qrSvg={qrSvg} />
              </div>
              <p className={styles.convertNote}>
                21 days free, starting when you finish setup. Then $8.99 a month or $59.99
                a year. <a href="#pricing" className={styles.convertNoteLink}>See what a lapse does</a>.
              </p>
            </div>
          </section>

          <MarketingFooter />
        </main>
      </div>
    </>
  )
}
