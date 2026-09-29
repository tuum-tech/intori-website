import type { NextPage } from "next"
import Link from "next/link"

import { MarketingFooter, MarketingHeader } from "@/components/MarketingChrome"
import { SeoHead } from "@/lib/seo"
import styles from "./index.module.css"

// The App Store Support URL. Every answer here describes what the app does
// today; paths name the app's own labels (You tab, Settings and data).
const SUPPORT_EMAIL = "contact@tuum.tech"

const TOPICS: Array<{ question: string; answer: string[] }> = [
  {
    question: "How do I cancel my subscription?",
    answer: [
      "If you subscribed in the iPhone app, Apple handles billing. Open the Settings app on your iPhone, tap your name, then Subscriptions, then intori. You can also open Manage billing from the You tab in intori.",
      "If you subscribed on the web, open the You tab at app.intori.co and choose Manage billing.",
      "Either way, you keep full access until the end of the period you have already paid for.",
    ],
  },
  {
    question: "I bought a plan on my iPhone but intori still says my access has ended.",
    answer: [
      "Open the plans screen in intori and tap Restore purchases. If that does not fix it, email us and we will sort it out.",
    ],
  },
  {
    question: "How do I delete my account?",
    answer: [
      "In the app, open the You tab, then Settings and data, and choose Delete your account. Deletion is permanent.",
      "Deleting your account does not stop a subscription you bought through Apple. Cancel it in the Settings app on your iPhone: tap your name, then Subscriptions, then intori. A plan bought on the web is canceled for you.",
    ],
  },
  {
    question: "How do I remove something intori added to my calendar?",
    answer: [
      "Delete it in your Calendar app like any other event. intori can add events, and it cannot read, change, or delete anything on your calendar.",
      "To take it off intori's list too, open it in the Week tab and choose Remove.",
    ],
  },
  {
    question: "How do I turn notifications off?",
    answer: [
      "In intori, open the You tab, then Notifications, and choose which kinds you get: new dates for things you follow, changes to dates you saved, and ticket sales.",
      "To turn them all off, open the Settings app on your iPhone, then Notifications, then intori, and turn off Allow Notifications.",
    ],
  },
  {
    question: "My sign-in code did not arrive or stopped working.",
    answer: [
      "Codes last 15 minutes. Check your spam folder, then request a new code from the sign-in screen. On iPhone, Sign in with Apple skips the code entirely.",
    ],
  },
  {
    question: "Something in intori looks wrong.",
    answer: [
      "A wrong date, a game that moved, a place that closed: tell us. In the app, open the You tab, then Settings and data, then Support, and your email opens with the details we need already filled in.",
    ],
  },
]

const SupportPage: NextPage = () => {
  return (
    <>
      <SeoHead
        title="Support - intori"
        description="Get help with intori: subscriptions and billing, deleting your account, your calendar, notifications, and signing in."
        canonicalPath="/support"
        ogImageAlt="intori support preview"
      />

      <div className={styles.page}>
        <MarketingHeader />

        <main>
          <section className={styles.faqSection}>
            <div className={styles.container}>
              <div className={styles.faqHero}>
                <p className={styles.heroEyebrow}>Support</p>
                <h1 className={styles.faqHeading}>How can we help?</h1>
                <p className={styles.faqIntro}>
                  Email us at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> and we will
                  write back. The answers below cover the most common questions.
                </p>
              </div>

              <div className={styles.faqList}>
                {TOPICS.map((item, index) => (
                  <details key={item.question} className={styles.faqItem} open={index === 0}>
                    <summary className={styles.faqQuestion}>{item.question}</summary>
                    <div className={styles.faqAnswer}>
                      {item.answer.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </details>
                ))}
              </div>

              <p className={styles.faqIntro}>
                More about how intori works is in the <Link href="/faq">FAQ</Link>. How we handle
                your information is in the <Link href="/privacy-policy">Privacy Policy</Link>, and the
                subscription terms are in the <Link href="/terms-of-use">Terms of Use</Link>.
              </p>
            </div>
          </section>

          <MarketingFooter />
        </main>
      </div>
    </>
  )
}

export default SupportPage
