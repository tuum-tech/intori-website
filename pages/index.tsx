import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from 'next/image'
import { getSession } from "next-auth/react"
import { MarketingFooter, MarketingHeader } from '@/components/MarketingChrome'
import { SeoHead } from '@/lib/seo'
import { APP_URL, HERO_VARIANT, IOS_CHANNEL, IOS_URL } from '@/lib/appLinks'
import { appStoreQrSvg } from '@/lib/appStoreQr'

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

  return { props: { qrSvg: await appStoreQrSvg() } }
}) satisfies GetServerSideProps<{ qrSvg: string | null }>

// App screens. These are rendered from design/app-mocks/ by
// scripts/render-app-mocks.sh, drawn from the app's own tokens and the launch
// Home layout. Every one uses the same demo household, so the story holds
// together from section to section: a Steelers family in Pittsburgh who follow
// Slow Horses and are going to see Noah Kahan on Friday.
const SCREEN = { width: 1206, height: 2622 }

// The four live lanes, in the locked order: Sports, Music, Shows, then Food.
// Food never leads.
//
// Lane words only. Helper product names never appear on a marketing surface,
// and neither does the word "helper".
//
// Food is framed as support for a plan (dinner before the show) and as a few
// good places near home. It never claims meal planning, recipes, or shopping
// lists, and there is no cook-at-home path to describe.
//
// Music must never imply early, presale, or priority ticket access. It shows
// public on-sale times from the same listings anyone could find, and its value
// is noticing in time, not getting in first.
const LANES = [
  {
    kicker: 'Sports',
    title: 'Every game worth watching.',
    body: 'Follow your team and add the whole season in one tap. intori flags the games that matter, tells you where to watch, and keeps scores hidden until you are ready.',
    image: '/brand/lanes/sports-game-day-family.jpg',
    alt: 'A mother and her son leaping with a foam finger and a ball against an orange backdrop',
    tint: styles.artSports,
  },
  {
    kicker: 'Music',
    title: 'The show in town, in time to go.',
    body: 'intori watches for the artists you love playing near you, and tells you when tickets go on sale, while there is still time to make a night of it.',
    image: '/brand/lanes/music-singer.jpg',
    alt: 'A woman in sunglasses and a sequined top singing into a microphone against a lilac backdrop',
    tint: styles.artMusic,
  },
  {
    kicker: 'Shows',
    title: 'Know the night it comes back.',
    body: 'Follow the shows you watch together. intori tells you when a new season lands and where it is streaming, so premiere night makes it onto the calendar.',
    image: '/brand/lanes/shows-movie-night.jpg',
    alt: 'A mother and daughter sharing a blanket and a giant bowl of popcorn on a mint sofa',
    tint: styles.artWatch,
  },
  {
    kicker: 'Food',
    title: 'Dinner that fits the plan.',
    body: 'Headed to a show or a game? intori finds places nearby that suit your household. On a night off, it has a few good spots close to home.',
    image: '/brand/lanes/food-table-for-four.jpg',
    alt: 'A mother and two children passing a big bowl of pasta around a pink table',
    tint: styles.artFood,
  },
]

const STEPS = [
  {
    title: 'Tell it what your household loves.',
    body: 'Sign in with Apple, then pick your teams, your shows, the artists you would go see, and the food you like. A few taps each, and you can skip anything.',
    image: '/brand/app/setup.jpg',
    alt: 'intori setup asking "What do I want to look forward to?" with Sports, Shows, and Music chosen',
  },
  {
    title: 'It watches, so you don’t have to.',
    body: 'intori keeps an eye on schedules, premieres, and tour dates. You get a few good picks each morning and afternoon, and a heads-up when something you follow gets a date.',
    image: '/brand/app/lock.jpg',
    alt: 'An iPhone lock screen with two intori notifications: a game tomorrow at 1:00 PM on CBS, and a show returning Wednesday',
  },
  {
    title: 'One tap puts it on your calendar.',
    body: 'Tap Add to calendar and it is on your iPhone’s calendar. Want a reminder the day before? That is one more tap.',
    image: '/brand/app/added.jpg',
    alt: 'intori confirming a game is on your calendar and offering a reminder the day before',
  },
]

// Why a household keeps paying: the product is built to be useful and then
// get out of the way. Claims here track the app's own rules: a short edition
// of picks with a named end, a weekly ceiling on push, one question at a time.
const WHY_CARDS = [
  {
    title: 'A few good picks, then done.',
    body: 'Each morning and afternoon, a short list of things worth your time. When you have seen them, intori says so, and you get on with your day.',
  },
  {
    title: 'Alerts you will actually want.',
    body: 'A heads-up before something you added, a changed game time, a new date from a team, show, or artist you follow. A few a week at most, and never a nudge to come back.',
  },
  {
    title: 'Better every week.',
    body: 'Now and then, after you add something, intori asks one quick question. Tap an answer, and the next picks fit your household a little better.',
  },
  {
    title: 'No ads. Nothing sold.',
    body: 'You pay for intori, so your family is the customer, not the product. What you share stays yours, and you choose how much.',
  },
]

const INCLUDES = [
  'Fresh picks every morning and afternoon, across Sports, Music, Shows, and Food',
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

// Staged headline. The tagline alone ('forward') makes no cadence promise and
// is the default. 'weekly' adds "Every week.", which is a claim the app must be
// able to keep before it ships. See lib/appLinks.ts.
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

export default function HomePage({ qrSvg }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <SeoHead
        title="intori. Something to look forward to."
        description="Your calendar tells you what you have to do. intori finds what your household would hate to miss, like the big game, a favorite show coming back, or an artist playing nearby, and adds it to your calendar in one tap."
        canonicalPath="/"
        ogDescription="Your calendar tells you what you have to do. intori gives you something to look forward to."
        ogImageAlt="intori card reading Something to look forward to, with tiles for Sports, Music, Shows, and Food"
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
                  Your calendar tells you what you have to do. intori finds what you would
                  hate to miss before you think to look, and adds it in one tap.
                </p>
                {/* Lane underlines are decoration under ink glyphs (F3): cluster
                    color never becomes text color, per BRAND.md. */}
                <p className={styles.heroSub}>
                  <span className={styles.ulSports}>The big game on Sunday.</span>{' '}
                  <span className={styles.ulMusic}>An artist you love, playing nearby.</span>{' '}
                  <span className={styles.ulWatch}>Your show, back next week.</span>{' '}
                  <span className={styles.ulFood}>Dinner before you go.</span>
                </p>
                <div className={styles.heroCtas}>
                  <AppCtas qrSvg={qrSvg} />
                </div>
                <p className={styles.heroTrust}>
                  <strong>14 days free, no card needed.</strong> No ads, and nothing sold about your family.
                </p>
              </div>
              <div className={styles.heroStage}>
                <div className={styles.heroGlow} aria-hidden="true" />
                <Phone
                  src="/brand/app/today.jpg"
                  alt="intori Today: Friday's concert already on the calendar, a Steelers game ready to add in one tap, and an offer to find dinner near the arena before the show"
                  priority
                />
              </div>
            </div>
          </header>

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

          <section id="lanes" className={styles.todaySection}>
            <div className={styles.container}>
              <div className={styles.secHead}>
                <h2 className={styles.secTitle}>What intori watches for</h2>
                <p className={styles.secSub}>
                  Follow the teams, shows, and artists your household loves. intori does
                  the rest.
                </p>
              </div>
              <div className={styles.todayGrid}>
                {LANES.map((lane) => (
                  <article key={lane.kicker} className={`${styles.todayCard} ${lane.tint}`}>
                    <div className={styles.todayArt}>
                      <Image
                        src={lane.image}
                        alt={lane.alt}
                        fill
                        sizes="(max-width: 900px) 100vw, 540px"
                        className={styles.todayArtImage}
                      />
                    </div>
                    <p className={styles.todayKicker}>
                      <span className={styles.laneMark} aria-hidden="true" />
                      {lane.kicker}
                    </p>
                    <h3 className={styles.todayTitle}>{lane.title}</h3>
                    <p className={styles.todayBody}>{lane.body}</p>
                  </article>
                ))}
              </div>
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
                Family calendars are great at keeping the household running. What they
                can&rsquo;t do is notice that your team plays Sunday, your show is back next
                week, or an artist you love is in town. Keeping track of all that is one
                more job, and it usually falls to one person, or to nobody. intori does
                the noticing. And
                because it remembers what you have added, it can make those plans easier
                too, like finding dinner near the venue before the show.
              </p>
              <div className={styles.wedgeDemo}>
                <div className={styles.demoCol}>
                  <h3 className={styles.demoColTitle}>Already on the calendar</h3>
                  <div className={styles.demoRow}><time>Mon</time>Soccer practice, 4:00</div>
                  <div className={styles.demoRow}><time>Tue</time>Dentist, both kids</div>
                  <div className={styles.demoRow}><time>Thu</time>Parent-teacher night</div>
                  <div className={styles.demoRow}><time>Fri</time>&hellip;still open</div>
                  <div className={styles.demoRow}><time>Sun</time>&hellip;also open</div>
                </div>
                <div className={styles.demoCol}>
                  <h3 className={styles.demoColTitle}>Found by intori</h3>
                  <div className={styles.demoPick}>
                    <div className={`${styles.demoSwatch} ${styles.swatchMusic}`} aria-hidden="true" />
                    <div>
                      <b>Friday</b>
                      <span>An artist you love plays 20 minutes away</span>
                    </div>
                  </div>
                  <div className={styles.demoPick}>
                    <div className={`${styles.demoSwatch} ${styles.swatchFood}`} aria-hidden="true" />
                    <div>
                      <b>Before the show</b>
                      <span>A few places to eat near the venue</span>
                    </div>
                  </div>
                  <div className={styles.demoPick}>
                    <div className={`${styles.demoSwatch} ${styles.swatchSports}`} aria-hidden="true" />
                    <div>
                      <b>Sunday</b>
                      <span>Your team plays at 1:00, and it&rsquo;s on CBS</span>
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
                <h2 className={styles.calTitle}>One tap, and it&rsquo;s on your calendar.</h2>
                <p className={styles.calSub}>
                  Tap Add to calendar and the date lands in your iPhone&rsquo;s calendar, right
                  next to everything else. Your iPhone asks for permission once. After that,
                  every add is instant.
                </p>
                <p className={styles.calSub}>
                  Everything you add also shows up in intori&rsquo;s Week, and if you want a
                  reminder, intori sends one the day before, or two days before a concert.
                </p>
                <p className={styles.calFine}>
                  intori can only add events. It can&rsquo;t read, change, or delete anything
                  else on your calendar.
                </p>
                <p className={styles.calFine}>
                  Use Google Calendar or a family display like Skylight? Copy your intori
                  calendar link from Settings, and what you add shows up there too.
                </p>
              </div>
              <div className={styles.calVisual}>
                <Phone
                  src="/brand/app/week.jpg"
                  alt="intori Week listing a concert, a game, and a season premiere, each marked On your calendar"
                  className={styles.phoneSmall}
                />
              </div>
            </div>
          </section>

          <section id="why" className={styles.trustSection}>
            <div className={styles.container}>
              <div className={styles.secHead}>
                <h2 className={styles.secTitle}>Built to give you time back</h2>
                <p className={styles.secSub}>
                  intori is paid for by households, not advertisers. So it is built to be
                  useful, not to keep you scrolling.
                </p>
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

          {/* Coming Next is deliberately self-contained: when Family Activities
              ships, this section is deleted and the lane joins the lane grid
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

          {/* Pricing.

              The trial starts when onboarding completes. In the app,
              resolveAccountAccessVerdict calls materializeOnboardingTrial off
              onboardingCompletedAt; an account with no onboardingCompletedAt
              gets unstartedTrialVerdict and no trial at all.

              The previous first-keep trigger was REMOVED on 2026-09-11
              (intori-app #2864). Do not reintroduce first-keep language here.

              Nothing here may imply that subscribing starts a free period.
              There is deliberately no Apple introductory offer and no Stripe
              trial period; the app-side 14 days IS the trial, and choosing a
              plan begins billing immediately.

              Amounts mirror src/config/stripeSubscriptionPlans.ts in the app
              repo: 899 monthly, 7_900 annual. If those move, this moves. */}
          <section id="pricing" className={styles.priceSection}>
            <div className={styles.container}>
              <div className={styles.secHead}>
                <h2 className={styles.secTitle}>Fourteen days, then you decide</h2>
                <p className={styles.secSub}>
                  Your 14 days start when you finish setup, not when you sign up. It is a
                  real date, and the app shows it to you, so you are never guessing how
                  long you have left.
                </p>
                <p className={styles.priceSample}>
                  <span className={styles.priceSampleLabel}>In the app</span>
                  Full access until October 8, 2026.
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
                    <span className={styles.priceTag}>Save $28</span>
                  </p>
                  <p className={styles.priceAmount}>
                    $79<span className={styles.pricePer}>/year</span>
                  </p>
                  <p className={styles.priceNote}>About $6.58 a month, and $28 less than paying monthly for a year.</p>
                </div>
              </div>

              <p className={styles.priceFine}>
                No card up front, and nothing charges itself when the 14 days are up.
                Choosing a plan starts billing straight away, so there is no second free
                period on top of your fourteen days. Setup is what starts the clock, so
                an account that never finishes it never starts one.
              </p>

              <div className={styles.priceLapse}>
                <h3 className={styles.priceLapseTitle}>If you stop paying</h3>
                <p className={styles.priceLapseBody}>
                  Everything you added stays exactly where it is. Those events live on your
                  own calendar, on your own device, and they do not depend on us. What stops
                  is the watching.
                </p>
              </div>
            </div>
          </section>

          <section id="start" className={styles.convertSection}>
            <div className={styles.container}>
              <div className={styles.convertLanes} aria-hidden="true">
                <span className={`${styles.laneMark} ${styles.artSports}`} />
                <span className={`${styles.laneMark} ${styles.artMusic}`} />
                <span className={`${styles.laneMark} ${styles.artWatch}`} />
                <span className={`${styles.laneMark} ${styles.artFood}`} />
              </div>
              <h2 className={styles.convertTitle}>Your first pick is a few minutes away.</h2>
              <p className={styles.convertSub}>
                {IOS_CHANNEL === 'appstore'
                  ? <>Download intori, sign in with Apple, and choose what your household loves. intori takes it from there.</>
                  : IOS_CHANNEL === 'beta'
                    ? <>Join the iPhone beta, sign in with Apple, and choose what your household loves. intori takes it from there.</>
                    : <>intori works on the web today. The iPhone app is next, and the button below will say so the moment it&rsquo;s real.</>}
              </p>
              <div className={styles.convertCtas}>
                <AppCtas qrSvg={qrSvg} />
              </div>
              <p className={styles.convertNote}>
                14 days free, starting when you finish setup. Then $8.99 a month or $79
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
