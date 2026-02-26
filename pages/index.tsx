import type { GetServerSideProps } from "next";
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
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

const WORLD_APP_URL = "https://world.org/mini-app?app_id=app_263f86463869627f1183badc977e21a3"
const BASE_APP_URL = "https://base.app/app/frame.intori.co"
const FARCASTER_URL = "https://warpcast.com/~/frames/launch?domain=frame.intori.co"

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
        <meta property="fc:frame:image" content="https://www.intori.co/og/og-2026-01.jpg" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        <meta name={`fc:frame:button:1`} content="Learn More" />
        <meta name={`fc:frame:button:1:action`} content="link" />
        <meta name={`fc:frame:button:1:target`} content="https://www.intori.co" />
        <meta property="og:image" content="https://www.intori.co/og/og-2026-01.jpg" />
      </Head>

      <main className={styles.main}>
        {/* ============================================================
            HERO SECTION
            ============================================================ */}
        <div className={`${styles.sectionBand} ${styles.sectionBandWhite}`}>
          <div className={`${styles.sectionInner} ${styles.padHero}`}>

            {/* Minimal nav: logo left — News right, spans full content width */}
            <div className={styles.heroNavBar}>
              <div className={styles.logoContainer}>
                <div className={styles.logo}>
                  <Image src="/logo.png" alt="intori" width={36} height={36} />
                </div>
                <h3>intori</h3>
              </div>
              <Link href="/news" className={styles.newsLink}>News</Link>
            </div>

            <div className={styles.hero}>
              <div className={styles.heroContent}>
                <h1>Discover people.<br />Collect stamps.</h1>

                <h2>
                  Find your circles through shared identity, not algorithms.
                  No feed. No swiping. Just the real you.
                </h2>

                <div className={styles.ctaGroup}>
                  <a href={WORLD_APP_URL} className={styles.ctaPrimary}>
                    Open on World
                  </a>
                  <p className={styles.ctaProviders}>
                    Also on{' '}
                    <a href={BASE_APP_URL} className={styles.ctaProviderLink} target="_blank" rel="noopener noreferrer">Base</a>
                    {' · '}
                    <a href={FARCASTER_URL} className={styles.ctaProviderLink} target="_blank" rel="noopener noreferrer">Farcaster</a>
                  </p>
                </div>
              </div>

              <div className={styles.heroVisual}>
                <div className={styles.heroDeviceWrap}>
                  <picture>
                    <source srcSet="/brand/screenshots/hero-phone-template.webp" type="image/webp" />
                    <Image
                      className={styles.phoneFrame}
                      src="/brand/screenshots/hero-phone-template.png"
                      alt="Phone showing intori app"
                      width={440}
                      height={880}
                      priority
                      sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 420px"
                    />
                  </picture>
                  <div className={styles.phoneScreen}>
                    <picture>
                      <source srcSet="/brand/screenshots/stamp.webp" type="image/webp" />
                      <Image
                        className={styles.phoneScreenImage}
                        src="/brand/screenshots/stamp.jpg"
                        alt=""
                        width={390}
                        height={844}
                        priority
                        sizes="(max-width: 640px) 260px, (max-width: 1024px) 300px, 370px"
                      />
                    </picture>
                  </div>

                  <div className={styles.heroAccents} aria-hidden="true">
                    {/* Stamps */}
                    <Image
                      className={`${styles.heroStamp} ${styles.heroStamp1}`}
                      src="/brand/hero-stamps/music-lovers.png"
                      alt=""
                      width={72}
                      height={72}
                    />
                    <Image
                      className={`${styles.heroStamp} ${styles.heroStamp2}`}
                      src="/brand/hero-stamps/foodies.png"
                      alt=""
                      width={56}
                      height={56}
                    />
                    <Image
                      className={`${styles.heroStamp} ${styles.heroStamp3}`}
                      src="/brand/hero-stamps/travel.png"
                      alt=""
                      width={64}
                      height={64}
                    />

                    {/* Question bubbles */}
                    <div className={`${styles.heroBubble} ${styles.heroBubble1}`}>
                      What do you never get tired of?
                    </div>
                    <div className={`${styles.heroBubble} ${styles.heroBubble2}`}>
                      Where do you feel most like yourself?
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            VALUE BLOCK 1: IDENTITY
            ============================================================ */}
        <div className={`${styles.sectionBand} ${styles.sectionBandAlt}`}>
          <div className={`${styles.sectionInner} ${styles.padLg}`}>
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
                  <Image
                    src={VALUE_STAMPS.identity[0]}
                    alt=""
                    width={200}
                    height={200}
                    className={styles.showcaseStampLarge}
                  />
                  <div className={styles.showcaseStampSmall}>
                    <Image
                      src={VALUE_STAMPS.identity[1]}
                      alt=""
                      width={88}
                      height={88}
                    />
                    <Image
                      src={VALUE_STAMPS.identity[2]}
                      alt=""
                      width={88}
                      height={88}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            VALUE BLOCK 2: PARTICIPATION
            ============================================================ */}
        <div className={`${styles.sectionBand} ${styles.sectionBandWhite}`}>
          <div className={`${styles.sectionInner} ${styles.padLg}`}>
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
          </div>
        </div>

        {/* ============================================================
            VALUE BLOCK 3: STAMPS
            ============================================================ */}
        <div className={`${styles.sectionBand} ${styles.sectionBandAlt}`}>
          <div className={`${styles.sectionInner} ${styles.padLg}`}>
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
          </div>
        </div>

        {/* ============================================================
            VALUE BLOCK 4: CIRCLES
            ============================================================ */}
        <div className={`${styles.sectionBand} ${styles.sectionBandWhite}`}>
          <div className={`${styles.sectionInner} ${styles.padLg}`}>
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
          </div>
        </div>

        {/* ============================================================
            VALUE BLOCK 5: PEOPLE
            ============================================================ */}
        <div className={`${styles.sectionBand} ${styles.sectionBandAlt}`}>
          <div className={`${styles.sectionInner} ${styles.padLg}`}>
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
          </div>
        </div>

        {/* ============================================================
            FOOTER CTA (Dark Section) + FAQ in Blue Panel
            ============================================================ */}
        <div className={`${styles.sectionBand} ${styles.sectionBandDark}`}>
          <div className={`${styles.sectionInner} ${styles.padLg}`}>
            <div className={styles.footerCta}>
              <p className={styles.footerTagline}>
                Answer questions. Unlock insights. Make connections.
              </p>
              <div className={styles.ctaGroup}>
                <a href={WORLD_APP_URL} className={styles.ctaPrimary}>
                  Open on World
                </a>
                <p className={styles.ctaProviders}>
                  Also on{' '}
                  <a href={BASE_APP_URL} className={styles.ctaProviderLink} target="_blank" rel="noopener noreferrer">Base</a>
                  {' · '}
                  <a href={FARCASTER_URL} className={styles.ctaProviderLink} target="_blank" rel="noopener noreferrer">Farcaster</a>
                </p>
              </div>
            </div>
          </div>

          {/* Questions Panel - Blue rounded panel sitting in the dark section */}
          <div className={styles.sectionInner}>
            <div className={styles.questionsPanel}>
              <div className={styles.faq}>
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
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default SigninDefaultScreen
