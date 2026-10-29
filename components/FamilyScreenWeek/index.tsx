import type { CSSProperties } from "react"

import styles from "./FamilyScreenWeek.module.css"

// A family's week on a generic wall screen. The family's own items are muted;
// intori's are striped by interest. Every interest shows (founder, Oct 29
// 2026): a followed team, show or artist lands all season after one follow,
// and Food, Outings and Outdoors are picked week by week. It is an
// illustration, so it stays generic on purpose: no maker's shape, marks or UI,
// no faces, and no team, league, show or artist names. On phones the week
// becomes a day-by-day list that keeps every intori item and one family item
// per day.

type Lane = "outings" | "outdoors" | "sports" | "shows" | "music" | "food"
type Item = { time: string; title: string; lane?: Lane; tone?: "b" | "c"; wideOnly?: boolean }
type Day = { name: string; items: Item[] }

// Lane colours: artwork only (a stripe and a faint wash), never text colour.
const LANE_COLOR: Record<Lane, string> = {
  outings: "#6C63D9",
  outdoors: "#00A884",
  sports: "#F76B15",
  shows: "#60B3D7",
  music: "#D467FF",
  food: "#E5484D",
}

const WEEK: Day[] = [
  { name: "Mon", items: [
    { time: "3 to 4 PM", title: "Carpool" },
    { time: "6 to 7 PM", title: "Gymnastics", tone: "b", wideOnly: true },
    { time: "9 PM", title: "Season premiere", lane: "shows" },
  ] },
  { name: "Tue", items: [
    { time: "10 to 11 AM", title: "Math test", tone: "c" },
    { time: "3 to 4 PM", title: "Carpool", wideOnly: true },
    { time: "6 PM", title: "New taco spot", lane: "food" },
  ] },
  { name: "Wed", items: [
    { time: "8 to 9 AM", title: "Doctor", tone: "c" },
    { time: "3 to 4 PM", title: "Carpool", wideOnly: true },
    { time: "4:30 PM", title: "Piano", tone: "b", wideOnly: true },
  ] },
  { name: "Thu", items: [
    { time: "10 to 11 AM", title: "Yearbook meeting", tone: "c" },
    { time: "3 to 4 PM", title: "Carpool", wideOnly: true },
  ] },
  { name: "Fri", items: [
    { time: "3 to 4 PM", title: "Carpool", wideOnly: true },
    { time: "5 to 7 PM", title: "Cheer", tone: "b" },
    { time: "7:30 PM", title: "Movie in the park", lane: "outings" },
  ] },
  { name: "Sat", items: [
    { time: "10 AM", title: "Fall festival", lane: "outings" },
    { time: "3:30 PM", title: "College football", lane: "sports" },
    { time: "8 PM", title: "Concert", lane: "music" },
  ] },
  { name: "Sun", items: [
    { time: "9 AM", title: "Trail walk", lane: "outdoors" },
    { time: "1 PM", title: "Pro football", lane: "sports" },
    { time: "8 PM", title: "New episode", lane: "shows" },
  ] },
]

const LABEL =
  "Illustration of a family's week on a wall screen. Carpool, practices, a test and appointments fill the school days. intori's picks are mixed in: a season premiere Monday night, a new taco spot Tuesday, a movie in the park Friday, then a fall festival, a college football game and a concert on Saturday, and a trail walk, a pro football game and a new episode on Sunday."

export default function FamilyScreenWeek({ className = "" }: { className?: string }) {
  return (
    <figure className={`${styles.figure} ${className}`}>
      <div className={styles.screen} role="img" aria-label={LABEL}>
        <div className={styles.inner}>
          <div className={styles.top}>
            <b>This week</b>
            <span className={styles.legend}>
              <i className={styles.keyFamily} aria-hidden="true" />Your week
              <i className={styles.keyPick} aria-hidden="true" />From intori
            </span>
          </div>
          <div className={styles.days}>
            {WEEK.map((day) => (
              <div key={day.name} className={styles.day}>
                <span className={styles.dayName}>{day.name}</span>
                {day.items.map((item) => (
                  <span
                    key={item.title + item.time}
                    className={[
                      item.lane ? styles.pick : styles.own,
                      item.tone ? styles[item.tone] : "",
                      item.wideOnly ? styles.wideOnly : "",
                    ].join(" ")}
                    style={item.lane ? ({ "--lane": LANE_COLOR[item.lane] } as CSSProperties) : undefined}
                  >
                    <time>{item.time}</time>
                    <span className={styles.title}>{item.title}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.stand} aria-hidden="true" />
    </figure>
  )
}
