import type { GetServerSideProps } from "next";
import Head from 'next/head'
import Image from 'next/image'
import { getSession } from "next-auth/react"
import { Footer } from '../components/Footer'
import { FAQ } from '../lib/faq'

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

  return {
    props: {}
  }
}) satisfies GetServerSideProps

const APP_URL = "https://warpcast.com/~/frames/launch?domain=frame.intori.co"

// Hero stamp images for floating animation
const HERO_STAMPS = {
  floating: [
    '/brand/hero-stamps/music-lovers.png',
    '/brand/hero-stamps/gamers.png',
    '/brand/hero-stamps/foodies.png',
    '/brand/hero-stamps/travel.png',
  ],
}

// Screenshots to cycle in phone
const PHONE_SCREENSHOTS = [
  '/brand/screenshots/passport.png',
  '/brand/screenshots/circles.png',
  '/brand/screenshots/connections.png',
  '/brand/screenshots/questions.png',
]

// Stamps for value sections
const VALUE_STAMPS = {
  identity: [
    '/brand/hero-stamps/music-lovers.png',
    '/brand/hero-stamps/creator.png',
    '/brand/hero-stamps/bookworms.png',
    '/brand/hero-stamps/tech.png',
  ],
  participation: '/brand/hero-stamps/gamers.png',
  stamps: '/brand/hero-stamps/foodies.png',
  people: [
    '/brand/hero-stamps/travel.png',
    '/brand/hero-stamps/pet-owners.png',
    '/brand/hero-stamps/sports-fans.png',
  ]
}

const SigninDefaultScreen = () => {
  return (
    <>
      <Head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://www.intori.co/landing-page/metacard.png" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        <meta name={`fc:frame:button:1`} content="Learn More" />
        <meta name={`fc:frame:button:1:action`} content="link" />
        <meta name={`fc:frame:button:1:target`} content="https://www.intori.co" />
        <meta property="og:image" content="https://www.intori.co/landing-page/metacard.png" />
      </Head>

      <main className={styles.main}>
        {/* ============================================================
            HERO SECTION
            ============================================================ */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.logoContainer}>
              <div className={styles.logo}>
                <Image src="/intorilogomark.svg" alt="" width={24} height={24} />
              </div>
              <h3>intori</h3>
            </div>

            <h1>Discover people.<br />Collect stamps.</h1>

            <h2>
              intori is a social discovery app where people find their circles
              through shared identity, not algorithms.
            </h2>

            <a href={APP_URL} className={styles.ctaPrimary}>
              Open intori
            </a>

            <p className={styles.heroMicro}>
              No feed. No swiping. Just identity and community.
            </p>
          </div>

          <div className={styles.heroVisual}>
            {/* Floating stamps that drift toward phone */}
            <div className={styles.floatingStamps}>
              {HERO_STAMPS.floating.map((stamp, index) => (
                <div
                  key={index}
                  className={`${styles.floatingStamp} ${styles[`floatingStamp${index + 1}`]}`}
                >
                  <Image
                    src={stamp}
                    alt=""
                    width={100}
                    height={100}
                  />
                </div>
              ))}
            </div>

            {/* Modern phone frame with real screenshots */}
            <div className={styles.phoneFrame}>
              <div className={styles.phoneNotch} />
              <div className={styles.phoneScreen}>
                <div className={styles.screenshotCarousel}>
                  {PHONE_SCREENSHOTS.map((screenshot, index) => (
                    <Image
                      key={index}
                      src={screenshot}
                      alt="intori app screenshot"
                      fill
                      className={`${styles.screenshot} ${styles[`screenshot${index + 1}`]}`}
                      priority={index === 0}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            VALUE BLOCK 1: IDENTITY
            ============================================================ */}
        <section className={`${styles.valueSection} ${styles.valueSectionAlt}`}>
          <div className={styles.valueGrid}>
            <div className={styles.valueContent}>
              <span className={styles.valueLabel}>Identity</span>
              <h2 className={styles.valueTitle}>You are more than a profile.</h2>
              <div className={styles.valueCopy}>
                <p>
                  intori turns how you think, feel, and show up into something visible.
                </p>
                <p>
                  Every answer you give becomes part of your living identity.
                </p>
              </div>
            </div>
            <div className={styles.valueVisual}>
              <div className={styles.stampShowcase}>
                {VALUE_STAMPS.identity.map((stamp, index) => (
                  <Image
                    key={index}
                    src={stamp}
                    alt=""
                    width={160}
                    height={160}
                    className={styles.showcaseStamp}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            VALUE BLOCK 2: PARTICIPATION
            ============================================================ */}
        <section className={styles.valueSection}>
          <div className={`${styles.valueGrid} ${styles.valueGridReverse}`}>
            <div className={styles.valueContent}>
              <span className={styles.valueLabel}>Participation</span>
              <h2 className={styles.valueTitle}>Show up. Earn stamps.</h2>
              <div className={styles.valueCopy}>
                <p>Each day has a theme.</p>
                <p>Answer meaningful questions.</p>
                <p>Build streaks.</p>
                <p>Unlock stamps that represent who you are and where you belong.</p>
              </div>
            </div>
            <div className={styles.valueVisual}>
              <Image
                src={VALUE_STAMPS.participation}
                alt="Gamers stamp"
                width={280}
                height={280}
                className={styles.stampLarge}
              />
            </div>
          </div>
        </section>

        {/* ============================================================
            VALUE BLOCK 3: STAMPS
            ============================================================ */}
        <section className={`${styles.valueSection} ${styles.valueSectionAlt}`}>
          <div className={styles.valueGrid}>
            <div className={styles.valueContent}>
              <span className={styles.valueLabel}>Stamps</span>
              <h2 className={styles.valueTitle}>Your identity, made tangible.</h2>
              <div className={styles.valueCopy}>
                <p>Stamps are not achievements.</p>
                <p>They are proof of participation inside real communities.</p>
              </div>

              {/* Stamp chips */}
              <div className={styles.stampChips}>
                <div className={styles.stampChip}>
                  <Image
                    src="/brand/hero-stamps/music-lovers.png"
                    alt=""
                    width={32}
                    height={32}
                    className={styles.stampChipImage}
                  />
                  <span className={styles.stampChipLabel}>Music Lovers</span>
                </div>
                <div className={styles.stampChip}>
                  <Image
                    src="/brand/hero-stamps/creator.png"
                    alt=""
                    width={32}
                    height={32}
                    className={styles.stampChipImage}
                  />
                  <span className={styles.stampChipLabel}>Creators</span>
                </div>
                <div className={styles.stampChip}>
                  <Image
                    src="/brand/hero-stamps/foodies.png"
                    alt=""
                    width={32}
                    height={32}
                    className={styles.stampChipImage}
                  />
                  <span className={styles.stampChipLabel}>Foodies</span>
                </div>
              </div>
            </div>
            <div className={styles.valueVisual}>
              <Image
                src={VALUE_STAMPS.stamps}
                alt="Foodies stamp"
                width={280}
                height={280}
                className={styles.stampLarge}
              />
            </div>
          </div>
        </section>

        {/* ============================================================
            VALUE BLOCK 4: CIRCLES
            ============================================================ */}
        <section className={styles.valueSection}>
          <div className={`${styles.valueGrid} ${styles.valueGridReverse}`}>
            <div className={styles.valueContent}>
              <span className={styles.valueLabel}>Circles</span>
              <h2 className={styles.valueTitle}>Circles bring people together.</h2>
              <div className={styles.valueCopy}>
                <p>
                  Circles are living identity spaces such as creativity, ambition, wellness,
                  nightlife, pets, tech, and more.
                </p>
                <p>
                  Your stamps decide which circles you belong to.
                </p>
              </div>
            </div>
            <div className={styles.valueVisual}>
              <div className={styles.circlesVisual}>
                <div className={styles.circleRow}>
                  <div className={`${styles.circlePill} ${styles.circlePillYellow}`}>
                    <Image src="/brand/icons/creators.svg" alt="" width={24} height={24} />
                    Creativity
                  </div>
                  <div className={`${styles.circlePill} ${styles.circlePillGreen}`}>
                    <Image src="/brand/icons/dreamers_ambition_seekers.svg" alt="" width={24} height={24} />
                    Ambition
                  </div>
                </div>
                <div className={styles.circleRow}>
                  <div className={`${styles.circlePill} ${styles.circlePillBlue}`}>
                    <Image src="/brand/icons/fitness_wellness.svg" alt="" width={24} height={24} />
                    Wellness
                  </div>
                  <div className={`${styles.circlePill} ${styles.circlePillBlue}`}>
                    <Image src="/brand/icons/night_owls_early_birds.svg" alt="" width={24} height={24} />
                    Nightlife
                  </div>
                </div>
                <div className={styles.circleRow}>
                  <div className={`${styles.circlePill} ${styles.circlePillOrange}`}>
                    <Image src="/brand/icons/pet_owners.svg" alt="" width={24} height={24} />
                    Pets
                  </div>
                  <div className={`${styles.circlePill} ${styles.circlePillPurple}`}>
                    <Image src="/brand/icons/tech_ai_curious.svg" alt="" width={24} height={24} />
                    Tech
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            VALUE BLOCK 5: PEOPLE
            ============================================================ */}
        <section className={`${styles.valueSection} ${styles.valueSectionAlt}`}>
          <div className={styles.valueGrid}>
            <div className={styles.valueContent}>
              <span className={styles.valueLabel}>People</span>
              <h2 className={styles.valueTitle}>Find your people.</h2>
              <div className={styles.valueCopy}>
                <p>
                  intori matches people based on shared circles, stamps, chemistry,
                  and vibes so connections feel natural, not forced.
                </p>
              </div>
            </div>
            <div className={styles.valueVisual}>
              <div className={styles.peopleVisual}>
                <div className={styles.stampConnection}>
                  <Image
                    src={VALUE_STAMPS.people[0]}
                    alt=""
                    width={64}
                    height={64}
                    className={styles.connectionStamp}
                  />
                  <span className={styles.connectionPlus}>+</span>
                  <Image
                    src={VALUE_STAMPS.people[1]}
                    alt=""
                    width={64}
                    height={64}
                    className={styles.connectionStamp}
                  />
                  <span className={styles.connectionPlus}>+</span>
                  <Image
                    src={VALUE_STAMPS.people[2]}
                    alt=""
                    width={64}
                    height={64}
                    className={styles.connectionStamp}
                  />
                </div>
                <div className={styles.connectionLine} />
                <div className={`${styles.circlePill} ${styles.circlePillGreen}`}>
                  Connection
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            FOOTER CTA
            ============================================================ */}
        <section className={styles.footerCta}>
          <p className={styles.footerTagline}>
            Answer daily themes. Collect stamps. Find your people.
          </p>
          <a href={APP_URL} className={styles.ctaDark}>
            Open intori
          </a>
        </section>

        {/* ============================================================
            FAQ SECTION
            ============================================================ */}
        <section className={styles.faq}>
          <h2>Questions</h2>

          {FAQ.map((item, index) => (
            <details key={index}>
              <summary>{item.question}</summary>
              <div>
                {item.answer.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
                {item.bullets && item.bullets.length > 0 && (
                  <ul>
                    {item.bullets.map((bullet, bIndex) => (
                      <li key={bIndex}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </details>
          ))}
        </section>
      </main>
      <Footer />
    </>
  )
}

export default SigninDefaultScreen
