// What the picks pages show, worked out in getStaticProps. Every date and time
// is formatted on the server, in the event's own time zone, so the HTML a
// crawler reads and the page a parent hydrates say the same thing.

import { absoluteUrl } from './seo'
import {
  DEFAULT_PICKS_TIME_ZONE,
  PICKS_METROS,
  type PickAgeBand,
  type PublicPickItem,
  type PublicPicksWeek,
  currentPicks,
  isTimeZone,
  listingPath,
  localDateIn,
  metroPath,
  picksMetroInfo,
  weekIsIndexable,
} from './publicPicks'

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// ─── Dates and clocks ──────────────────────────────────

type CalendarDay = { weekday: string; shortWeekday: string; date: string }

/** "2026-10-31" as { weekday: "Saturday", shortWeekday: "Sat", date: "Oct 31" }. */
export function calendarDay(local: string): CalendarDay {
  const [year, month, day] = local.split('-').map(Number)
  const weekday = WEEKDAYS[new Date(Date.UTC(year, month - 1, day, 12)).getUTCDay()]
  return { weekday, shortWeekday: weekday.slice(0, 3), date: `${MONTHS[month - 1]} ${day}` }
}

function addDays(local: string, days: number): string {
  const [year, month, day] = local.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day + days, 12)).toISOString().slice(0, 10)
}

type ZonedTime = { year: number; month: number; day: number; hour: number; minute: number; second: number }

function zonedTime(iso: string, timeZone: string): ZonedTime {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date(iso))
  const part = (type: string) => Number(parts.find(piece => piece.type === type)?.value ?? 0)
  return { year: part('year'), month: part('month'), day: part('day'), hour: part('hour') % 24, minute: part('minute'), second: part('second') }
}

const pad = (value: number) => String(value).padStart(2, '0')

function zonedDate(time: ZonedTime): string {
  return `${time.year}-${pad(time.month)}-${pad(time.day)}`
}

/** { clock: "10:00", period: "AM" } in the event's zone. */
function clock(time: ZonedTime): { clock: string; period: 'AM' | 'PM' } {
  return { clock: `${time.hour % 12 || 12}:${pad(time.minute)}`, period: time.hour < 12 ? 'AM' : 'PM' }
}

function clockLabel(time: ZonedTime): string {
  const { clock: value, period } = clock(time)
  return `${value} ${period}`
}

/** An instant as local wall time with its offset, the way Event schema wants a start. */
export function isoInZone(iso: string, timeZone: string): string {
  const time = zonedTime(iso, timeZone)
  const wall = Date.UTC(time.year, time.month - 1, time.day, time.hour, time.minute, time.second)
  const offset = Math.round((wall - Math.floor(Date.parse(iso) / 1000) * 1000) / 60_000)
  const sign = offset < 0 ? '-' : '+'
  const abs = Math.abs(offset)
  return `${zonedDate(time)}T${pad(time.hour)}:${pad(time.minute)}:${pad(time.second)}${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`
}

/** "Oct 26 at 6:00 AM" in a zone. */
function checkedLabel(iso: string, timeZone: string): string {
  const time = zonedTime(iso, timeZone)
  return `${calendarDay(zonedDate(time)).date} at ${clockLabel(time)}`
}

// ─── Words for one item ────────────────────────────────

const BAND_LABELS: Record<PickAgeBand, string> = {
  under_5: 'Under 5',
  '5_to_8': 'Ages 5 to 8',
  '9_to_12': 'Ages 9 to 12',
  teens: 'Teens',
}
const BAND_YEARS: Record<PickAgeBand, [number, number]> = {
  under_5: [0, 4],
  '5_to_8': [5, 8],
  '9_to_12': [9, 12],
  teens: [13, 17],
}

export type PickChip = { label: string; tone: 'age' | 'plain' }

export function pickChips(item: PublicPickItem): PickChip[] {
  const chips: PickChip[] = item.audience === 'all_ages'
    ? [{ label: 'All ages', tone: 'age' }]
    : item.ageBands.map(band => ({ label: BAND_LABELS[band], tone: 'age' as const }))
  if (item.cost === 'free') chips.push({ label: 'Free', tone: 'plain' })
  if (item.cost === 'paid') chips.push({ label: 'Paid', tone: 'plain' })
  if (item.booking.kind === 'register' || item.booking.kind === 'ticket') chips.push({ label: 'Sign up', tone: 'plain' })
  return chips
}

/** Who it suits, in words: neighbouring bands read as one range ("Ages 5 to 12"). */
export function suitsLabel(item: PublicPickItem): string {
  if (item.audience === 'all_ages') return 'All ages'
  if (item.ageBands.length === 0) return 'Kids'
  if (item.ageBands.length === 4) return 'Kids of every age'
  const runs: Array<[number, number]> = []
  for (const band of item.ageBands) {
    const [from, to] = BAND_YEARS[band]
    const last = runs[runs.length - 1]
    if (last && last[1] + 1 === from) last[1] = to
    else runs.push([from, to])
  }
  const words = runs.map(([from, to]) => {
    if (from === 0) return `under ${to + 1}`
    if (from === 13) return 'teens'
    if (to === 17) return `ages ${from} and up`
    return `ages ${from} to ${to}`
  })
  const joined = words.join(' and ')
  return joined.charAt(0).toUpperCase() + joined.slice(1)
}

/** "Regional Library, near Raleigh". The town is the nearest prepared town, not a postal city. */
export function wherePhrase(item: PublicPickItem): string {
  const town = item.nearestTown
  if (!town || town.toLowerCase() === item.placeName.toLowerCase()) return item.placeName
  return `${item.placeName}, near ${town}`
}

/** The day a listing sits under: its own date, or the week's first day for one already running. */
function displayDate(item: PublicPickItem, weekStart: string): string {
  return item.localDate < weekStart ? weekStart : item.localDate
}

/** The time column of a card: "10:00" over "AM", or "All day" over "to Nov 2". */
function cardTime(item: PublicPickItem): { main: string; sub: string | null } {
  if (item.timePrecision === 'instant' && item.startIso) {
    const { clock: value, period } = clock(zonedTime(item.startIso, item.timeZone))
    return { main: value, sub: period }
  }
  return { main: 'All day', sub: item.untilLocalDate ? `to ${calendarDay(item.untilLocalDate).date}` : null }
}

function shortTime(item: PublicPickItem): string {
  if (item.timePrecision === 'instant' && item.startIso) return clockLabel(zonedTime(item.startIso, item.timeZone))
  return 'All day'
}

/** "Saturday, Oct 31, 10:00 to 10:45 AM" and its day-precision and multi-day forms. */
export function whenLabel(item: PublicPickItem): string {
  const day = calendarDay(item.localDate)
  const dayText = `${day.weekday}, ${day.date}`
  if (item.timePrecision !== 'instant' || !item.startIso) {
    if (item.untilLocalDate) {
      const until = calendarDay(item.untilLocalDate)
      return `${dayText} to ${until.weekday}, ${until.date}`
    }
    return `${dayText}, all day`
  }
  const start = zonedTime(item.startIso, item.timeZone)
  const startDay = calendarDay(zonedDate(start))
  const startText = `${startDay.weekday}, ${startDay.date}`
  if (!item.endIso) return `${startText}, ${clockLabel(start)}`
  const end = zonedTime(item.endIso, item.timeZone)
  if (zonedDate(end) !== zonedDate(start)) {
    const endDay = calendarDay(zonedDate(end))
    return `${startText}, ${clockLabel(start)} to ${endDay.weekday}, ${endDay.date}, ${clockLabel(end)}`
  }
  const from = clock(start)
  const to = clock(end)
  return from.period === to.period
    ? `${startText}, ${from.clock} to ${to.clock} ${to.period}`
    : `${startText}, ${clockLabel(start)} to ${clockLabel(end)}`
}

// ─── Metro words ───────────────────────────────────────

/** "Raleigh-Durham", or "the Greensboro area" when the name reads as a region. */
export function metroInPhrase(name: string): string {
  return /\b(area|suburbs)$/i.test(name) ? `the ${name}` : name
}

export function metroHeading(name: string): string {
  return `Things to do with kids in ${metroInPhrase(name)} this week`
}

type OtherMetro = { slug: string; name: string }

function otherMetros(currentSlug: string): OtherMetro[] {
  return PICKS_METROS.filter(metro => metro.slug !== currentSlug).map(metro => ({ slug: metro.slug, name: metro.name }))
}

function metroTimeZone(slug: string, items: readonly PublicPickItem[]): string {
  const fromItem = items.find(item => isTimeZone(item.timeZone))?.timeZone
  return fromItem ?? picksMetroInfo(slug)?.timeZone ?? DEFAULT_PICKS_TIME_ZONE
}

const LEDE = 'Story times, festivals and family events from local libraries, towns and parks.'

// ─── Metro page ────────────────────────────────────────

export type PickCardView = {
  id: string
  href: string
  title: string
  dateTime: string
  time: string
  timeSub: string | null
  where: string
  chips: PickChip[]
  organizer: { name: string; url: string }
}

export type PickDayView = { localDate: string; weekday: string; date: string; cards: PickCardView[] }

export type MetroPageProps = {
  metro: { slug: string; name: string }
  heading: string
  description: string
  lede: string
  checkedLabel: string
  indexable: boolean
  itemCount: number
  days: PickDayView[]
  listingUrls: string[]
  otherMetros: OtherMetro[]
}

function cardView(metroSlug: string, item: PublicPickItem): PickCardView {
  const time = cardTime(item)
  return {
    id: item.id,
    href: listingPath(metroSlug, item),
    title: item.title,
    dateTime: item.timePrecision === 'instant' && item.startIso ? item.startIso : item.localDate,
    time: time.main,
    timeSub: time.sub,
    where: wherePhrase(item),
    chips: pickChips(item),
    organizer: item.organizer,
  }
}

/** Items grouped by the local day they sit under, days in order, items in the endpoint's order. */
function groupByDay(items: readonly PublicPickItem[], weekStart: string): Array<{ localDate: string; items: PublicPickItem[] }> {
  const groups: Array<{ localDate: string; items: PublicPickItem[] }> = []
  for (const item of items) {
    const key = displayDate(item, weekStart)
    const group = groups.find(entry => entry.localDate === key)
    if (group) group.items.push(item)
    else groups.push({ localDate: key, items: [item] })
  }
  return groups.sort((a, b) => (a.localDate < b.localDate ? -1 : a.localDate > b.localDate ? 1 : 0))
}

function weekRange(week: PublicPicksWeek, items: readonly PublicPickItem[], timeZone: string): { start: string; label: string } {
  const start = localDateIn(new Date(week.window.fromIso), timeZone)
  // The window is seven days from the read; name its last whole day, or a later listed day.
  let end = addDays(localDateIn(new Date(week.window.toIso), timeZone), -1)
  for (const item of items) if (item.localDate > end) end = item.localDate
  if (end < start) end = start
  const from = calendarDay(start)
  const to = calendarDay(end)
  return { start, label: `${from.shortWeekday}, ${from.date} to ${to.shortWeekday}, ${to.date}` }
}

/** The same words with each date kept on one line, for text a phone wraps. */
function unbroken(label: string): string {
  return label.replace(/(\w{3}), (\w{3}) (\d{1,2})/g, '$1,\u00a0$2\u00a0$3').replace(/(\d) (AM|PM)/g, '$1\u00a0$2')
}

export function buildMetroPageProps(week: PublicPicksWeek, now: Date): MetroPageProps {
  const slug = week.metro.slug
  const items = currentPicks(week.items, now)
  const timeZone = metroTimeZone(slug, items)
  const range = weekRange(week, items, timeZone)
  const days = groupByDay(items, range.start).map(group => {
    const day = calendarDay(group.localDate)
    return { localDate: group.localDate, weekday: day.weekday, date: day.date, cards: group.items.map(item => cardView(slug, item)) }
  })
  const place = metroInPhrase(week.metro.name)
  const count = items.length
  const description = count > 0
    ? `${count} ${count === 1 ? 'thing' : 'things'} to do with kids in ${place}, ${range.label}. ${LEDE} With times, ages, cost and who runs each.`
    : `Things to do with kids in ${place} this week. ${LEDE} Checked every morning.`
  return {
    metro: { slug, name: week.metro.name },
    heading: metroHeading(week.metro.name),
    description,
    lede: `${LEDE} ${unbroken(range.label)}.`,
    checkedLabel: unbroken(`Checked ${checkedLabel(week.generatedAt, timeZone)}`),
    indexable: weekIsIndexable(week, items),
    itemCount: count,
    days,
    listingUrls: days.flatMap(day => day.cards.map(card => absoluteUrl(card.href))),
    otherMetros: otherMetros(slug),
  }
}

/** The page for a known metro when the endpoint could not be read during a build. */
export function emptyMetroPageProps(metro: { slug: string; name: string }, now: Date): MetroPageProps {
  const nowIso = now.toISOString()
  const week: PublicPicksWeek = {
    metro: { slug: metro.slug, name: metro.name, towns: [] },
    window: { fromIso: nowIso, toIso: new Date(now.getTime() + 7 * 86_400_000).toISOString() },
    generatedAt: nowIso,
    indexable: false,
    items: [],
  }
  return { ...buildMetroPageProps(week, now), checkedLabel: '' }
}

// ─── Listing page ──────────────────────────────────────

export type ListingPageProps = {
  metro: { slug: string; name: string }
  canonicalPath: string
  title: string
  seoTitle: string
  description: string
  dayCrumb: string
  facts: {
    when: string
    where: string
    suits: string
    cost: string
    signUp: { label: string; url: string } | null
    organizer: { name: string; url: string }
  }
  checkedLabel: string
  sameDay: { weekday: string; items: Array<{ href: string; time: string; title: string; town: string }> }
  eventJsonLd: Record<string, unknown>
  otherMetros: OtherMetro[]
}

const MORE_ON_DAY = 8

/** Rough state outlines, so an address never names a state the venue is plainly outside. */
const STATE_BOUNDS: Record<string, [number, number, number, number]> = {
  NC: [33.84, 36.59, -84.33, -75.45],
  SC: [32.03, 35.22, -83.36, -78.54],
  GA: [30.35, 35.01, -85.61, -80.84],
  FL: [24.39, 31.01, -87.64, -80.03],
  VA: [36.54, 39.47, -83.68, -75.24],
  TN: [34.98, 36.68, -90.31, -81.65],
  TX: [25.83, 36.51, -106.65, -93.50],
  MN: [43.49, 49.39, -97.24, -89.48],
}

function addressRegion(metroSlug: string, item: PublicPickItem): string | null {
  const state = picksMetroInfo(metroSlug)?.state
  const bounds = state ? STATE_BOUNDS[state] : undefined
  if (!state || !bounds) return null
  const [south, north, west, east] = bounds
  const inside = item.latitude >= south && item.latitude <= north && item.longitude >= west && item.longitude <= east
  return inside ? state : null
}

function signUpLink(item: PublicPickItem): { label: string; url: string } | null {
  if (item.booking.kind !== 'register' && item.booking.kind !== 'ticket') return null
  return { label: 'On their page', url: item.booking.url ?? item.organizer.url }
}

function costLabel(item: PublicPickItem): string {
  if (item.cost === 'free') return 'Free'
  if (item.cost === 'paid') return 'Paid. Prices are on their page.'
  return 'Not listed. Check their page.'
}

export function eventJsonLd(metroSlug: string, item: PublicPickItem, canonicalUrl: string): Record<string, unknown> {
  const timed = item.timePrecision === 'instant' && item.startIso
  const region = addressRegion(metroSlug, item)
  const offerUrl = signUpLink(item)?.url ?? item.organizer.url
  const event: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: item.title,
    startDate: timed ? isoInZone(item.startIso as string, item.timeZone) : item.localDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: item.placeName,
      geo: { '@type': 'GeoCoordinates', latitude: item.latitude, longitude: item.longitude },
      address: { '@type': 'PostalAddress', ...(region ? { addressRegion: region } : {}), addressCountry: 'US' },
    },
    organizer: { '@type': 'Organization', name: item.organizer.name, url: item.organizer.url },
    url: canonicalUrl,
  }
  if (timed && item.endIso) event.endDate = isoInZone(item.endIso, item.timeZone)
  if (!timed) event.endDate = item.untilLocalDate ?? item.localDate
  if (item.cost === 'free') {
    event.isAccessibleForFree = true
    event.offers = { '@type': 'Offer', price: 0, priceCurrency: 'USD', url: offerUrl }
  } else if (item.cost === 'paid') {
    event.offers = { '@type': 'Offer', url: offerUrl }
  }
  return event
}

export function buildListingPageProps(week: PublicPicksWeek, item: PublicPickItem, current: readonly PublicPickItem[]): ListingPageProps {
  const slug = week.metro.slug
  const canonicalPath = listingPath(slug, item)
  const timeZone = metroTimeZone(slug, current)
  const weekStart = localDateIn(new Date(week.window.fromIso), timeZone)
  const dayKey = displayDate(item, weekStart)
  const day = calendarDay(dayKey)
  const when = whenLabel(item)
  const where = wherePhrase(item)
  const suits = suitsLabel(item)
  const cost = item.cost === 'free' ? ' Free.' : item.cost === 'paid' ? ' Paid.' : ''
  const sameDay = current
    .filter(other => other.id !== item.id && displayDate(other, weekStart) === dayKey)
    .slice(0, MORE_ON_DAY)
    .map(other => ({ href: listingPath(slug, other), time: unbroken(shortTime(other)), title: other.title, town: other.nearestTown }))
  return {
    metro: { slug, name: week.metro.name },
    canonicalPath,
    title: item.title,
    seoTitle: `${item.title}, ${day.shortWeekday}, ${day.date} in ${metroInPhrase(week.metro.name)}`,
    description: `${when}. ${where}.${cost} ${suits}. Run by ${item.organizer.name}.`,
    dayCrumb: `${day.weekday}, ${day.date}`,
    facts: { when: unbroken(when), where, suits, cost: costLabel(item), signUp: signUpLink(item), organizer: item.organizer },
    checkedLabel: `${unbroken(`Checked ${checkedLabel(item.checkedAtIso, item.timeZone)}`)}. Details can change, so check their page before you go.`,
    sameDay: { weekday: day.weekday, items: sameDay },
    eventJsonLd: eventJsonLd(slug, item, absoluteUrl(canonicalPath)),
    otherMetros: otherMetros(slug),
  }
}

// ─── Hub page ──────────────────────────────────────────

export type HubMetro = { slug: string; name: string; href: string; count: number | null }

export function hubMetros(metros: ReadonlyArray<{ slug: string; name: string; itemCount?: number }>): HubMetro[] {
  return metros.map(metro => ({
    slug: metro.slug,
    name: metro.name,
    href: metroPath(metro.slug),
    count: typeof metro.itemCount === 'number' ? metro.itemCount : null,
  }))
}

