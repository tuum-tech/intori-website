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
    color: '#60B3D7',
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
    color: '#60B3D7',
  },
  {
    icon: '/brand/icons/travel_enthusiasts.svg',
    label: 'Easy to continue',
    desc: 'Take the first pass into ChatGPT, Claude, Gemini, or a trusted app.',
    badge: 'Continue',
    color: '#60B3D7',
  },
]

const HOW_STEPS = [
  {
    number: "1",
    title: "Choose where to start.",
    body: "Start with food, game day, live music, or style — the daily helpers intori personalizes for you.",
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
    body: "Run intori for food picks, game-day options, live-music ideas, and style finds — then go deeper in a quick chat.",
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

// ChatGPT logo
function ChatGPTLogo() {
  return (
    <svg className={styles.toolLogo} viewBox="0 0 24 24" fill="currentColor" aria-label="ChatGPT">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zm-9.022 12.608a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.815-3.354 2.02-1.168a.075.075 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.43-.696zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
    </svg>
  )
}

// Claude / Anthropic logo
function ClaudeLogo() {
  return (
    <svg className={styles.toolLogo} viewBox="0 0 46 32" fill="currentColor" aria-label="Claude">
      <path d="M32.73 0h-6.945L38.45 32h6.945L32.73 0zM13.055 0 0 32h7.133l2.66-7.222h13.397l2.66 7.222h7.133L19.888 0h-6.833zm-1.205 19.487 4.62-12.56 4.619 12.56H11.85z"/>
    </svg>
  )
}

// Gemini logo
function GeminiLogo() {
  return (
    <svg className={styles.toolLogo} viewBox="0 0 28 28" fill="currentColor" aria-label="Gemini">
      <path d="M14 28A14 14 0 0 1 14 0a14.01 14.01 0 0 1 0 28zm0-3.5c5.8 0 10.5-4.7 10.5-10.5S19.8 3.5 14 3.5 3.5 8.2 3.5 14 8.2 24.5 14 24.5z" opacity=".2"/>
      <path d="M14 0c0 7.73-6.27 14-14 14 7.73 0 14 6.27 14 14 0-7.73 6.27-14 14-14-7.73 0-14-6.27-14-14z"/>
    </svg>
  )
}

function HeroPhone() {
  return (
    <div className={styles.heroPhoneShell}>
      <div className={styles.heroPhoneScreenSlot}>
        <Image
          src="/brand/era2/hero-intori-music-pack-ready.jpg"
          alt="intori music pack ready screen"
          width={1206}
          height={2622}
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
          src="/brand/era2/pack-question-music.png"
          alt=""
          width={1206}
          height={2622}
          className={styles.howPackPhoneScreenshot}
        />
      </div>
      <div className={styles.howPackPhoneIsland} />
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
      <div className={styles.toolMiniRow} aria-hidden="true">
        <span className={styles.toolMini}><ChatGPTLogo /></span>
        <span className={styles.toolMini}><ClaudeLogo /></span>
        <span className={styles.toolMini}><GeminiLogo /></span>
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
        description="Answer a few quick questions and intori gives you a useful first pass for food, game day, live music, and style — then go deeper in a quick chat. On the web and in World App."
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
                    Answer a few quick questions and intori gives you a useful first pass — for food, game day, live music, and style — then go deeper in a quick chat. On the web and in World App.
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
                        Already used by <strong>5,500+</strong> verified humans on World
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
                        <p className={styles.floatCardLabel}>Today's Food</p>
                        <p className={styles.floatCardTitle}>Tonight's pick, sorted</p>
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

          <section id="packs" className={styles.packsSection}>
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
                      <div
                        className={styles.packIconWrap}
                        style={{
                          background: pack.color,
                          borderColor: `${pack.color}f0`,
                          boxShadow: `0 0 22px ${pack.color}66`,
                        }}
                      >
                        <Image src={pack.icon} alt="" width={34} height={34} className={styles.packIcon} />
                      </div>
                    </div>
                    <p className={styles.packLabel}>{pack.label}</p>
                    <p className={styles.packDesc}>{pack.desc}</p>
                    <span className={styles.packCluster} style={{ color: pack.color }}>{pack.badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.aiSection}>
            <div className={styles.container}>
              <div className={styles.aiInner}>
                <div className={styles.aiText}>
                  <h2 className={styles.aiHeading}>Continue in ChatGPT, Claude, Gemini, or your trusted AI tool</h2>
                  <p className={styles.aiBody}>
                    intori gives you a focused starting point. Take it further wherever you already work with AI.
                  </p>
                </div>
                <div className={styles.toolPills}>
                  <span className={styles.toolPill}>
                    <ChatGPTLogo />
                    ChatGPT
                  </span>
                  <span className={styles.toolPill}>
                    <ClaudeLogo />
                    Claude
                  </span>
                  <span className={styles.toolPill}>
                    <GeminiLogo />
                    Gemini
                  </span>
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
