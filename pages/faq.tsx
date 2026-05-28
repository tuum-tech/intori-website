import type { NextPage } from "next"
import Head from "next/head"

import { MarketingFooter, MarketingHeader } from "@/components/MarketingChrome"
import { FAQ } from "../lib/faq"
import styles from "./index.module.css"

const FaqPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>FAQ - intori</title>
        <meta
          name="description"
          content="Questions about intori, personalization, World, Credits, and continuing in your favorite AI tool."
        />
        <meta property="og:title" content="FAQ - intori" />
        <meta
          property="og:description"
          content="Questions about intori, personalization, World, Credits, and continuing in your favorite AI tool."
        />
      </Head>

      <div className={styles.page}>
        <MarketingHeader />

        <main>
          <section className={styles.faqSection}>
            <div className={styles.container}>
              <div className={styles.faqHero}>
                <p className={styles.heroEyebrow}>Questions</p>
                <h1 className={styles.faqHeading}>FAQ</h1>
                <p className={styles.faqIntro}>
                  A simple guide to intori, personalization, Credits, World, and what happens after the first request.
                </p>
              </div>

              <div className={styles.faqList}>
                {FAQ.map((item, index) => (
                  <details key={item.question} className={styles.faqItem} open={index === 0}>
                    <summary className={styles.faqQuestion}>{item.question}</summary>
                    <div className={styles.faqAnswer}>
                      {item.answer.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {item.bullets && (
                        <ul>
                          {item.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <MarketingFooter />
        </main>
      </div>
    </>
  )
}

export default FaqPage
