import React from 'react'
import { MarketingFooter, MarketingHeader } from '../../components/MarketingChrome'

import styles from './styles.module.css'

type Props = {
  children: React.ReactNode
}

export const LegalLayout: React.FC<Props> = ({
  children
}) => {
    return (
      <>
        <div className={styles.page}>
          <MarketingHeader />
          <div className={styles.legalWrap}>
            <article className={styles.legalLayout}>
              { children }
            </article>
          </div>
        </div>
        <MarketingFooter />
      </>
    )
}
