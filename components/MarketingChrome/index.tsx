import React, { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from './styles.module.css'

const WORLD_APP_URL = "https://world.org/mini-app?app_id=app_263f86463869627f1183badc977e21a3"

export function WorldIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M12 1C12 1 8 6 8 12s4 11 4 11M12 1c0 0 4 5 4 11s-4 11-4 11M1 12h22" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  )
}

export function MarketingHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/intori-logo-full.svg"
              alt="intori"
              width={80}
              height={36}
              className={styles.darkLogo}
              priority
            />
          </Link>
          <nav className={styles.nav} aria-label="Primary navigation">
            <Link href="/#how-it-works" className={styles.navLink}>How it works</Link>
            <Link href="/#packs" className={styles.navLink}>Why it works</Link>
            <Link href="/news" className={styles.navLink}>News</Link>
            <span className={styles.navLinkDisabled} aria-disabled="true">Developers</span>
            <a
              href={WORLD_APP_URL}
              className={styles.ctaPrimary}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WorldIcon />
              Open on World
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export function MarketingFooter() {
  const year = useMemo(() => new Date().getFullYear(), [])

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerInner}>
          <Image
            src="/intori-logo-full.svg"
            alt="intori"
            width={72}
            height={32}
            className={styles.darkLogo}
          />
          <nav className={styles.footerNav} aria-label="Footer">
            <Link href="/faq" className={styles.footerLink}>FAQ</Link>
            <Link href="/news" className={styles.footerLink}>News</Link>
            <Link href="/privacy-policy" className={styles.footerLink}>Privacy</Link>
            <Link href="/terms-of-use" className={styles.footerLink}>Terms</Link>
            <a href="mailto:contact@tuum.tech" className={styles.footerLink}>Contact</a>
          </nav>
          <p className={styles.footerCopy}>© {year} intori</p>
        </div>
      </div>
    </footer>
  )
}
