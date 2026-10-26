import React from 'react'
import Link from 'next/link'
import { Newsreader } from 'next/font/google'

import { MarketingFooter, MarketingHeader } from '@/components/MarketingChrome'
import { APP_URL, IOS_APP_STORE_URL, IOS_CHANNEL } from '@/lib/appLinks'
import { metroPath } from '@/lib/publicPicks'
import type { PickCardView } from '@/lib/publicPicksView'
import homeStyles from '@/pages/index.module.css'
import styles from './styles.module.css'

// Upright Newsreader for the picks headings, as in the approved mockup. The
// site-wide serif in _app is the italic accent cut only.
const picksSerif = Newsreader({
  subsets: ['latin'],
  style: ['normal'],
  weight: ['500', '600'],
  variable: '--font-picks-serif',
  display: 'swap',
})

const SOURCES_EMAIL = 'sources@intori.com'

/** The homepage's primary destination: the App Store once it is live, the web app until then. */
const START_URL = IOS_CHANNEL === 'appstore' && IOS_APP_STORE_URL ? IOS_APP_STORE_URL : APP_URL
const START_LABEL = IOS_CHANNEL === 'appstore' ? 'Get the app' : 'Try intori'

export function PicksShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${homeStyles.page} ${picksSerif.variable}`}>
      <MarketingHeader />
      <main className={styles.picks}>
        <div className={homeStyles.container}>{children}</div>
      </main>
      <MarketingFooter />
    </div>
  )
}

export function PicksCta({ title, body, className }: { title: string; body: string; className?: string }) {
  return (
    <section className={className ? `${styles.cta} ${className}` : styles.cta}>
      <h2 className={styles.ctaTitle}>{title}</h2>
      <p className={styles.ctaBody}>{body}</p>
      <a href={START_URL} className={styles.ctaButton} target="_blank" rel="noopener noreferrer">
        {START_LABEL}
      </a>
    </section>
  )
}

export function PickCard({ card }: { card: PickCardView }) {
  return (
    <li className={styles.item}>
      <time className={styles.time} dateTime={card.dateTime}>
        {card.time}
        {card.timeSub ? <span className={styles.timeSub}>{card.timeSub}</span> : null}
      </time>
      <div className={styles.what}>
        <h3 className={styles.title}>
          <Link href={card.href}>{card.title}</Link>
        </h3>
        <p className={styles.where}>{card.where}</p>
        {card.chips.length > 0 && (
          <ul className={styles.chips} aria-label="Details">
            {card.chips.map(chip => (
              <li key={chip.label} className={chip.tone === 'age' ? `${styles.chip} ${styles.chipAge}` : styles.chip}>
                {chip.label}
              </li>
            ))}
          </ul>
        )}
        <p className={styles.from}>
          From{' '}
          <a href={card.organizer.url} target="_blank" rel="noopener noreferrer">{card.organizer.name}</a>
        </p>
      </div>
    </li>
  )
}

export function PicksFootNote({ otherMetros }: { otherMetros: Array<{ slug: string; name: string }> }) {
  return (
    <div className={styles.footNote}>
      <p>
        Facts only, from public calendars. Each listing names who runs it and links to their page.
        Organizers can have their listings taken off within a day:{' '}
        <a href={`mailto:${SOURCES_EMAIL}?subject=Remove%20our%20listings`}>{SOURCES_EMAIL}</a>.{' '}
        <Link href="/sources">How we choose sources</Link>.
      </p>
      {otherMetros.length > 0 && (
        <nav aria-label="Other areas" className={styles.otherAreas}>
          <p className={styles.footLabel}>Other areas</p>
          <ul className={styles.metros}>
            {otherMetros.map(metro => (
              <li key={metro.slug}>
                <Link href={metroPath(metro.slug)} className={styles.metroChip}>{metro.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}

export { styles as picksStyles }
