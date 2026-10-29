import styles from "./FamilyScreenWeek.module.css"

// A family's week on a generic wall screen: the school week muted, the
// intori picks highlighted on Friday evening and the weekend. Drawn to the
// Family Calendar build plan's mock week (Oct 29 2026). It is an illustration,
// so it stays generic on purpose: no maker's shape, marks or UI, no faces,
// no team names. On phones only Friday to Sunday show, which keeps the
// weekend readable without a sideways scroll.

type Item = { time: string; title: string; tone?: "b" | "c"; pick?: boolean }
type Day = { name: string; items: Item[]; phone: boolean }

const WEEK: Day[] = [
  { name: "Mon", phone: false, items: [
    { time: "3 to 4 PM", title: "Carpool" },
    { time: "6 to 7 PM", title: "Gymnastics", tone: "b" },
  ] },
  { name: "Tue", phone: false, items: [
    { time: "10 to 11 AM", title: "Math test", tone: "c" },
    { time: "3 to 4 PM", title: "Carpool" },
  ] },
  { name: "Wed", phone: false, items: [
    { time: "8 to 9 AM", title: "Doctor", tone: "c" },
    { time: "3 to 4 PM", title: "Carpool" },
    { time: "4:30 PM", title: "Football game", tone: "b" },
  ] },
  { name: "Thu", phone: false, items: [
    { time: "10 to 11 AM", title: "Yearbook meeting", tone: "c" },
    { time: "3 to 4 PM", title: "Carpool" },
  ] },
  { name: "Fri", phone: true, items: [
    { time: "3 to 4 PM", title: "Carpool" },
    { time: "5 to 7 PM", title: "Cheer", tone: "b" },
    { time: "7:30 PM", title: "Movie in the park", pick: true },
  ] },
  { name: "Sat", phone: true, items: [
    { time: "10 AM", title: "Fall festival", pick: true },
    { time: "1 PM", title: "Game day", pick: true },
  ] },
  { name: "Sun", phone: true, items: [
    { time: "9 AM", title: "Garden free morning", pick: true },
    { time: "2 PM", title: "Star show", pick: true },
  ] },
]

const LABEL =
  "Illustration of a family's week on a wall screen. Carpool, practices, a test and appointments fill the school days. intori's picks fill Friday evening and the weekend: a movie in the park, a fall festival, game day, a free morning at a garden and a star show."

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
              <div key={day.name} className={`${styles.day} ${day.phone ? "" : styles.wideOnly}`}>
                <span className={styles.dayName}>{day.name}</span>
                {day.items.map((item) => (
                  <span
                    key={item.title + item.time}
                    className={`${item.pick ? styles.pick : styles.own} ${item.tone ? styles[item.tone] : ""}`}
                  >
                    <time>{item.time}</time>
                    {item.title}
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
