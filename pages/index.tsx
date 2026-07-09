import type { GetServerSideProps } from "next";
import Image from 'next/image'
import { getSession } from "next-auth/react"
import { Fragment, type CSSProperties } from 'react'
import { MarketingFooter, MarketingHeader } from '@/components/MarketingChrome'
import { SeoHead } from '@/lib/seo'
import { APP_URL, WORLD_APP_URL } from '@/lib/appLinks'

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

const PACKS = [
  {
    icon: '/brand/icons/music_lovers.svg',
    label: 'Your answers, not guesses',
    desc: 'intori learns from quick questions about taste, timing, constraints, and preferences you choose to share.',
    badge: 'Your signal',
    color: '#D467FF',
  },
  {
    icon: '/brand/icons/casual_socializers.svg',
    label: 'Knows when to ask more',
    desc: 'When it needs more context, intori asks one focused question instead of guessing.',
    badge: 'No guessing',
    color: '#D467FF',
  },
  {
    icon: '/brand/icons/sports_fans.svg',
    label: 'No prompt writing',
    desc: 'intori turns what it knows into the first useful request for you.',
    badge: 'First pass',
    color: '#F76B15',
  },
  {
    icon: '/brand/icons/foodies.svg',
    label: 'You can see why',
    desc: 'Each answer shows what shaped it and what might still be missing.',
    badge: 'Why it fits',
    color: '#E5484D',
  },
  {
    icon: '/brand/icons/fitness_wellness.svg',
    label: 'Fresh where it matters',
    desc: 'Music, sports, food, and plans can include source and freshness notes.',
    badge: 'Fresh context',
    color: '#F76B15',
  },
  {
    icon: '/brand/icons/casual_socializers.svg',
    label: 'See more, in-app',
    desc: 'Each helper opens with a warm intro, shows picks made for you, and lets you look further.',
    badge: 'See more',
    color: '#FF5C8A',
  },
]

const HOW_STEPS = [
  {
    number: "1",
    title: "Choose where to start.",
    body: "Start with food, game day, live music, or style, the daily helpers intori personalizes for you.",
    visual: "packs",
  },
  {
    number: "2",
    title: "Answer quick questions.",
    body: "intori learns your taste, pace, boundaries, and preferences from what you choose to share.",
    visual: "pack-card",
  },
  {
    number: "3",
    title: "Get picks made for you.",
    body: "Run intori for food picks, game-day plans, live-music ideas, and style finds, then see more in a quick chat inside intori.",
    visual: "tools",
  },
]

const TRUST_AVATARS = [
  '/brand/stamps/CREATOR/MAIN.png',
  '/brand/stamps/COMMUNITY BUILDER/MAIN.png',
  '/brand/stamps/TRAVEL/MAIN.png',
]

// World App mini-globe icon (official orb shape)
function WorldIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M12 1C12 1 8 6 8 12s4 11 4 11M12 1c0 0 4 5 4 11s-4 11-4 11M1 12h22" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  )
}

function HeroPhone() {
  return (
    <div className={styles.heroPhoneShell}>
      <div className={styles.heroPhoneScreenSlot}>
        <Image
          src="/brand/warm/hero-todays-checkins.jpg"
          alt="intori home screen with today's check-ins and helpers"
          width={820}
          height={1782}
          className={styles.heroPhoneScreenshot}
          priority
        />
      </div>
    </div>
  )
}

function HowPackPhone() {
  return (
    <div className={styles.howPackPhone} aria-hidden="true">
      <div className={styles.howPackPhoneScreen}>
        <Image
          src="/brand/warm/checkin-question-music.jpg"
          alt=""
          width={820}
          height={1782}
          className={styles.howPackPhoneScreenshot}
        />
      </div>
    </div>
  )
}

function HowVisual({ type }: { type: string }) {
  if (type === "pack-card") {
    return null
  }

  if (type === "packs") {
    return <HowPackPhone />
  }

  if (type === "tools") {
    return (
      <div className={styles.seeMoreMini} aria-hidden="true">
        <span className={styles.seeMoreBubble}>Here&rsquo;s your first pass</span>
        <span className={styles.seeMoreChip}>See more &rarr;</span>
      </div>
    )
  }

  return (
    <div className={styles.questionMini} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <SeoHead
        title="intori - Made for you. Within minutes."
        description="Answer a few quick questions and intori gives you a useful first pass for food, game day, live music, and style, then a warm chat to see more. On the web and in World App."
        canonicalPath="/"
        ogDescription="Answer a little. Get a useful first pass that already knows what matters to you."
        ogImageAlt="intori preview with personalized app signals"
      />

      <div className={styles.page}>

        <MarketingHeader />

        <main>
          <section className={styles.heroSection}>
            <div className={styles.container}>
              <div className={styles.heroGrid}>

                <div className={styles.heroLeft}>
                  <p className={styles.heroEyebrow}>Personalization, built from you</p>
                  <h1 className={styles.heroHeadline}>
                    Made for you.<br />Within minutes.
                  </h1>
                  <p className={styles.heroBody}>
                    Answer a few quick questions and intori gives you a useful first pass for food, game day, live music, and style, then a warm chat to see more. On the web and in World App.
                  </p>
                  <div className={styles.heroCtas}>
                    <a
                      href={APP_URL}
                      className={styles.ctaPrimary}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get started
                    </a>
                    <a href="#how-it-works" className={styles.ctaSecondary}>
                      See how it works →
                    </a>
                    <a
                      href={WORLD_APP_URL}
                      className={styles.ctaSecondary}
                      style={{ gap: 6 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WorldIcon size={16} />
                      Also on World App
                    </a>
                  </div>
                  <div className={styles.trustRow}>
                    <div className={styles.avatarStack} aria-hidden="true">
                      {TRUST_AVATARS.map((src, i) => (
                        <div key={i} className={styles.avatarWrap}>
                          <Image src={src} alt="" width={32} height={32} className={styles.avatar} />
                        </div>
                      ))}
                    </div>
                    <div className={styles.trustRight}>
                      <Image
                        src="/brand/world/world-id-verification-badge.svg"
                        alt="World ID verified"
                        width={20}
                        height={20}
                        className={styles.worldBadge}
                      />
                      <p className={styles.trustCopy}>
                        Already used by <strong>6,500+</strong> verified humans on World
                      </p>
                    </div>
                  </div>
                </div>

                <div className={styles.heroRight}>
                  <div className={styles.heroVisualArea}>
                    <div className={styles.heroWarmShape} aria-hidden="true" />

                    <HeroPhone />

                    <div className={`${styles.floatCard} ${styles.floatCardMusic} ${styles.floatEntrance}`}>
                      <Image src="/brand/hero-stamps/music-lovers.png" alt="" fill sizes="280px" className={styles.floatImage} />
                      <span className={styles.floatCheck} aria-hidden="true">
                        <svg viewBox="0 0 20 20" className={styles.floatCheckIcon}>
                          <path d="M7.8 14.2 3.7 10l1.8-1.8 2.3 2.3 6.7-6.8 1.8 1.8-8.5 8.7z" />
                        </svg>
                      </span>
                      <div className={styles.floatText}>
                        <p className={styles.floatCardLabel}>Music</p>
                        <p className={styles.floatCardTitle}>Better music picks for you</p>
                      </div>
                    </div>

                    <div className={`${styles.floatCard} ${styles.floatCardWeekend} ${styles.floatEntranceDelay}`}>
                      <Image src="/brand/hero-stamps/sports-fans.png" alt="" fill sizes="280px" className={styles.floatImage} />
                      <span className={styles.floatCheck} aria-hidden="true">
                        <svg viewBox="0 0 20 20" className={styles.floatCheckIcon}>
                          <path d="M7.8 14.2 3.7 10l1.8-1.8 2.3 2.3 6.7-6.8 1.8 1.8-8.5 8.7z" />
                        </svg>
                      </span>
                      <div className={styles.floatText}>
                        <p className={styles.floatCardLabel}>Game Day</p>
                        <p className={styles.floatCardTitle}>Sharper sports picks today</p>
                      </div>
                    </div>

                    <div className={`${styles.floatCard} ${styles.floatCardThree} ${styles.floatEntranceDelay2}`}>
                      <Image src="/brand/hero-stamps/foodies.png" alt="" fill sizes="280px" className={styles.floatImage} />
                      <span className={styles.floatCheck} aria-hidden="true">
                        <svg viewBox="0 0 20 20" className={styles.floatCheckIcon}>
                          <path d="M7.8 14.2 3.7 10l1.8-1.8 2.3 2.3 6.7-6.8 1.8 1.8-8.5 8.7z" />
                        </svg>
                      </span>
                      <div className={styles.floatText}>
                        <p className={styles.floatCardLabel}>Today&apos;s Food</p>
                        <p className={styles.floatCardTitle}>Tonight&apos;s pick, sorted</p>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </section>

          <section id="how-it-works" className={styles.howSection}>
            <div className={styles.container}>
              <h2 className={styles.sectionHeading}>How it works</h2>
              <div className={styles.howGrid}>
                {HOW_STEPS.map((step, index) => (
                  <Fragment key={step.number}>
                    <article className={`${styles.howCard}${step.visual === 'pack-card' ? ` ${styles.howCardPack}` : ''}`}>
                      {step.visual === 'pack-card' && (
                        <div className={styles.howPackCardBackdrop} aria-hidden="true">
                          {/* TODO(PR7 asset): swap this stamp backdrop for a warm
                              product screenshot or neutral cluster artwork. It is
                              washed to a faint watermark for now. */}
                          <Image
                            src="/brand/stamps/MUSIC LOVERS/MAIN.png"
                            alt=""
                            fill
                            sizes="(max-width: 760px) 100vw, 360px"
                            className={styles.howPackCardImage}
                          />
                          <div className={styles.howPackCardVignette} />
                          <Image
                            src="/brand/icons/music_lovers.svg"
                            alt=""
                            width={112}
                            height={112}
                            className={styles.howPackCardIcon}
                          />
                        </div>
                      )}
                      <div className={styles.howCardStep}>{step.number}</div>
                      <h3 className={styles.howCardTitle}>{step.title}</h3>
                      <p className={styles.howCardBody}>{step.body}</p>
                      {step.visual !== 'pack-card' && (
                        <div className={`${styles.howCardImageWrap}${step.visual === 'packs' ? ` ${styles.howPackWrap}` : ''}`}>
                          <HowVisual type={step.visual} />
                        </div>
                      )}
                    </article>
                    {index < HOW_STEPS.length - 1 && <div className={styles.howArrow} aria-hidden="true">→</div>}
                  </Fragment>
                ))}
              </div>
            </div>
          </section>

          <section id="why" className={styles.packsSection}>
            <div className={styles.container}>
              <h2 className={styles.sectionHeading}>Why intori gets more useful</h2>
              <p className={styles.packsSub}>Your answers teach intori what matters, when to ask for more, and how to explain the first pass it gives you.</p>
              <div className={styles.packsGrid}>
                {PACKS.map((pack) => (
                  <div
                    key={pack.label}
                    className={styles.packTile}
                    style={{ '--pack-color': pack.color } as CSSProperties}
                  >
                    <div className={styles.packIconBand}>
                      <div className={styles.packIconWrap}>
                        <Image src={pack.icon} alt="" width={34} height={34} className={styles.packIcon} />
                      </div>
                    </div>
                    <p className={styles.packLabel}>{pack.label}</p>
                    <p className={styles.packDesc}>{pack.desc}</p>
                    <span className={styles.packCluster}>{pack.badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.aiSection}>
            <div className={styles.container}>
              <div className={styles.aiInner}>
                <div className={styles.aiText}>
                  <h2 className={styles.aiHeading}>A warm welcome, then picks made for you</h2>
                  <p className={styles.aiBody}>
                    Each helper opens with a friendly hello, gives you a first pass shaped by your answers,
                    and lets you see more when you want it.
                  </p>
                  <a href={APP_URL} className={styles.ctaPrimary} target="_blank" rel="noopener noreferrer">
                    Meet a helper
                  </a>
                </div>
                <div className={styles.helperPeek} aria-hidden="true">
                  <Image
                    src="/brand/warm/todays-food-result.jpg"
                    alt=""
                    width={820}
                    height={1782}
                    className={styles.peekShot}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className={styles.devBridge}>
            <div className={styles.container}>
              <div className={styles.devBridgeGrid}>
                <div className={styles.devBridgeLeft}>
                  <h2 className={styles.devBridgeHeading}>Building an app?</h2>
                  <p className={styles.devBridgeBody}>
                    intori can share user-approved personalization with apps people choose to connect. Developer access is coming soon.
                  </p>
                  <span className={styles.devBridgeCtaDisabled} aria-disabled="true">
                    Developers - coming soon
                  </span>
                </div>
                <div className={styles.devBridgeRight}>
                  <div className={styles.devFlow} aria-label="Developer personalization flow">
                    <div className={styles.devFlowCard}>
                      <strong>User connects intori</strong>
                      <span className={styles.checkLine}>Music taste</span>
                      <span className={styles.checkLine}>Planning style</span>
                      <span className={styles.checkLine}>Preferences</span>
                    </div>
                    <div className={styles.devArrow}>→</div>
                    <div className={styles.devFlowCard}>
                      <strong>intori prepares the context</strong>
                      <span>Approved by the user<br />Fresh where it matters</span>
                    </div>
                    <div className={styles.devArrow}>→</div>
                    <div className={styles.devFlowCode}>
                      <strong>Your app gets a better start</strong>
                      <code>{"Music ideas\nTiming notes\nFreshness notes"}</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <MarketingFooter />
        </main>

      </div>
    </>
  )
}
