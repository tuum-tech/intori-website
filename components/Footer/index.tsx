import React, { useMemo } from 'react'
import Img from 'next/image'
import Link from 'next/link'

import styles from './styles.module.css'

export const Footer: React.FC = () => {
  const year = useMemo(() => new Date().getFullYear(), [])

  return (
    <footer className={styles.footer}>
      <div>
        <Img src="/intori-logo-full.svg" width={70} height={31.5} alt="intori" />
      </div>

      <div className={styles.contact}>
        <p>Answer a little. Get picks made for you.</p>
        <div className={styles.sm}>
          <a href="mailto:contact@tuum.tech" target="_blank" rel="noopener noreferrer">
            contact@tuum.tech
          </a>

          <a href="https://x.com/intoriHQ" target="_blank" rel="noopener noreferrer">
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M3.04389 4L9.99349 13.3765L3 21H4.57395L10.6967 14.3255L15.6438 21H21L13.6594 11.0961L20.1689 4H18.5949L12.9561 10.1471L8.40011 4H3.04389Z" fill="#646E87"/> </svg>
          </a>

          <a href="https://warpcast.com/intori" target="_blank" rel="noopener noreferrer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6.18677 3.7334H17.8134V20.2667H16.1068V12.6934H16.09C15.9014 10.6003 14.1423 8.96005 12.0001 8.96005C9.8579 8.96005 8.0988 10.6003 7.91016 12.6934H7.89343V20.2667H6.18677V3.7334Z" fill="#646E87"/> <path d="M3.09326 6.07996L3.7866 8.42663H4.37325V17.92C4.0787 17.92 3.83993 18.1587 3.83993 18.4533V19.0933H3.73327C3.43872 19.0933 3.19992 19.3321 3.19992 19.6266V20.2666H9.17325V19.6266C9.17325 19.3321 8.93448 19.0933 8.63993 19.0933H8.53327V18.4533C8.53327 18.1587 8.29447 17.92 7.99992 17.92H7.35993V6.07996H3.09326Z" fill="#646E87"/> <path d="M16.2134 17.92C15.9188 17.92 15.68 18.1587 15.68 18.4533V19.0933H15.5734C15.2788 19.0933 15.04 19.3321 15.04 19.6266V20.2666H21.0134V19.6266C21.0134 19.3321 20.7746 19.0933 20.48 19.0933H20.3734V18.4533C20.3734 18.1587 20.1346 17.92 19.84 17.92V8.42663H20.4267L21.12 6.07996H16.8534V17.92H16.2134Z" fill="#646E87"/> </svg>
          </a>

          <a href="https://github.com/tuum-tech" target="_blank" rel="noopener noreferrer">
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12 1.5C5.9225 1.5 1 6.5503 1 12.7793C1 17.7638 4.1515 21.9907 8.52125 23.4805C9.07125 23.5867 9.27292 23.238 9.27292 22.9382C9.27292 22.6703 9.26375 21.9606 9.25917 21.0207C6.19933 21.7012 5.554 19.5074 5.554 19.5074C5.0535 18.2056 4.33025 17.8578 4.33025 17.8578C3.33383 17.1585 4.40725 17.1726 4.40725 17.1726C5.51183 17.2515 6.09208 18.3343 6.09208 18.3343C7.07292 20.0591 8.667 19.561 9.29583 19.2724C9.39483 18.543 9.67808 18.0458 9.9925 17.7638C7.54958 17.4818 4.982 16.5118 4.982 12.1899C4.982 10.9586 5.40825 9.95289 6.11408 9.16334C5.99033 8.87853 5.61908 7.73181 6.21033 6.17808C6.21033 6.17808 7.13158 5.87542 9.23533 7.33421C10.1153 7.08325 11.0503 6.95918 11.9853 6.95354C12.9203 6.95918 13.8553 7.08325 14.7353 7.33421C16.8253 5.87542 17.7466 6.17808 17.7466 6.17808C18.3378 7.73181 17.9666 8.87853 17.8566 9.16334C18.5578 9.95289 18.9841 10.9586 18.9841 12.1899C18.9841 16.5231 16.4128 17.4771 13.9653 17.7544C14.3503 18.0928 14.7078 18.7846 14.7078 19.8411C14.7078 21.3506 14.6941 22.5631 14.6941 22.9297C14.6941 23.2258 14.8866 23.5783 15.4503 23.4655C19.8512 21.986 23 17.7563 23 12.7793C23 6.5503 18.0748 1.5 12 1.5Z" fill="#646E87"/> </svg>
          </a>
        </div>
      </div>

      <div className={styles.legal}>
        <div>
          <Link href="/terms-of-use">
            Terms
          </Link>
          <Link href="/privacy-policy">
            Privacy
          </Link>
          <a href="mailto:contact@tuum.tech" target="_blank" rel="noopener noreferrer">
            Contact
          </a>
        </div>
        <p>
          © {year} intori
        </p>
      </div>
    </footer>
  )
}
