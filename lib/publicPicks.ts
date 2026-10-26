// Things to do with kids this week, one page per launch metro, read from the
// intori app's public picks endpoint. The types mirror the app's contract
// (intori-app src/services/publicPicks/publicPicksWeek.ts). The parser keeps
// only well formed facts: a malformed item is dropped, never shown half right,
// and nothing here throws on bad data. Fetch failures do throw, so a page in
// ISR keeps serving its last good version.

export const PICKS_BASE_PATH = '/things-to-do-with-kids'
const DEFAULT_PICKS_API = 'https://app.intori.co/api/public/picks'
export const PICKS_FETCH_TIMEOUT_MS = 8_000
/** Seconds a picks page is served before it is rebuilt from the endpoint. */
export const PICKS_REVALIDATE_SECONDS = 1800
/** The app's rule: a metro week with fewer picks than this is served but kept out of search. */
export const PICKS_INDEXABLE_MIN = 8

export type PickAgeBand = 'under_5' | '5_to_8' | '9_to_12' | 'teens'
export const PICK_AGE_BANDS: readonly PickAgeBand[] = ['under_5', '5_to_8', '9_to_12', 'teens']
export type PickBookingKind = 'none' | 'register' | 'ticket' | 'unknown'
const BOOKING_KINDS: readonly PickBookingKind[] = ['none', 'register', 'ticket', 'unknown']

export type PublicPickItem = {
  /** 16 hex characters, stable for the occurrence. */
  id: string
  /** The title as a URL segment. Not unique: a page pairs it with id. */
  slug: string
  title: string
  timePrecision: 'instant' | 'day'
  /** Instant rows only; a day row has no clock. */
  startIso: string | null
  endIso: string | null
  localDate: string
  /** The last local date of an event that runs more than one day. */
  untilLocalDate: string | null
  timeZone: string
  placeName: string
  latitude: number
  longitude: number
  /** The anchor town nearest the venue: a label, not a postal city. */
  nearestTown: string
  audience: 'kids' | 'all_ages'
  ageBands: PickAgeBand[]
  cost: 'free' | 'paid' | 'unknown'
  booking: { kind: PickBookingKind; url: string | null }
  organizer: { name: string; url: string }
  checkedAtIso: string
  /** After this the item may not be shown without a fresh read. */
  expiresAtIso: string
}

export type PublicPicksWindow = { fromIso: string; toIso: string }

export type PublicPicksWeek = {
  metro: { slug: string; name: string; towns: string[] }
  window: PublicPicksWindow
  generatedAt: string
  indexable: boolean
  items: PublicPickItem[]
}

export type PublicPicksMetroSummary = { slug: string; name: string; itemCount: number; indexable: boolean }
export type PublicPicksMetroList = { window: PublicPicksWindow; generatedAt: string; metros: PublicPicksMetroSummary[] }

/** What the site knows about each metro without the endpoint: its time zone
 * (for an empty week) and its state (for an Event's address). Keep in step with
 * the app's PUBLIC_PICKS_METRO_SPECS; a metro the endpoint adds still gets a
 * page, with its zone read from its items. */
export type PicksMetroInfo = { slug: string; name: string; timeZone: string; state: string }

export const PICKS_METROS: readonly PicksMetroInfo[] = [
  { slug: 'raleigh-durham', name: 'Raleigh-Durham', timeZone: 'America/New_York', state: 'NC' },
  { slug: 'charlotte', name: 'Charlotte', timeZone: 'America/New_York', state: 'NC' },
  { slug: 'wilmington', name: 'Wilmington', timeZone: 'America/New_York', state: 'NC' },
  { slug: 'greensboro', name: 'Greensboro area', timeZone: 'America/New_York', state: 'NC' },
  { slug: 'atlanta', name: 'Atlanta', timeZone: 'America/New_York', state: 'GA' },
  { slug: 'orlando', name: 'Orlando', timeZone: 'America/New_York', state: 'FL' },
  { slug: 'dallas-fort-worth', name: 'Dallas-Fort Worth', timeZone: 'America/Chicago', state: 'TX' },
  { slug: 'richmond', name: 'Richmond', timeZone: 'America/New_York', state: 'VA' },
  { slug: 'nashville', name: 'Nashville', timeZone: 'America/Chicago', state: 'TN' },
  { slug: 'tampa-bay', name: 'Tampa Bay', timeZone: 'America/New_York', state: 'FL' },
  { slug: 'jacksonville', name: 'Jacksonville', timeZone: 'America/New_York', state: 'FL' },
  { slug: 'charleston', name: 'Charleston', timeZone: 'America/New_York', state: 'SC' },
  { slug: 'minneapolis-st-paul', name: 'Minneapolis-St. Paul', timeZone: 'America/Chicago', state: 'MN' },
]

export const DEFAULT_PICKS_TIME_ZONE = 'America/New_York'

export function picksMetroInfo(slug: string): PicksMetroInfo | null {
  return PICKS_METROS.find(metro => metro.slug === slug) ?? null
}

// ─── Paths ─────────────────────────────────────────────

const SEGMENT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const PICK_ID = /^[0-9a-f]{16}$/

export function isMetroSlug(value: unknown): value is string {
  return typeof value === 'string' && value.length <= 64 && SEGMENT.test(value)
}

export function metroPath(metroSlug: string): string {
  return `${PICKS_BASE_PATH}/${metroSlug}`
}

export function listingPath(metroSlug: string, item: Pick<PublicPickItem, 'slug' | 'id'>): string {
  return `${PICKS_BASE_PATH}/${metroSlug}/${item.slug}-${item.id}`
}

/** "<slug>-<id>" back to its parts, or null for anything else. */
export function parseListingParam(value: unknown): { slug: string; id: string } | null {
  if (typeof value !== 'string' || value.length > 140) return null
  const match = /^(.+)-([0-9a-f]{16})$/.exec(value)
  if (!match || !SEGMENT.test(match[1])) return null
  return { slug: match[1], id: match[2] }
}

// ─── Parsing ───────────────────────────────────────────

type Json = Record<string, unknown>

function isObject(value: unknown): value is Json {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function text(value: unknown, max = 300): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.replace(/\s+/g, ' ').trim()
  return trimmed ? trimmed.slice(0, max) : null
}

function instant(value: unknown): string | null {
  return typeof value === 'string' && Number.isFinite(Date.parse(value)) ? value : null
}

const LOCAL_DATE = /^\d{4}-\d{2}-\d{2}$/
function localDate(value: unknown): string | null {
  return typeof value === 'string' && LOCAL_DATE.test(value) ? value : null
}

/** Only http and https: a feed's link is never allowed to run script on our page. */
export function webUrl(value: unknown): string | null {
  if (typeof value !== 'string' || value.length > 2048) return null
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : null
  } catch {
    return null
  }
}

const zoneCheck: Record<string, boolean> = {}
export function isTimeZone(value: unknown): value is string {
  if (typeof value !== 'string' || !value) return false
  if (!(value in zoneCheck)) {
    try {
      new Intl.DateTimeFormat('en-US', { timeZone: value })
      zoneCheck[value] = true
    } catch {
      zoneCheck[value] = false
    }
  }
  return zoneCheck[value]
}

function coordinate(value: unknown, limit: number): number | null {
  return typeof value === 'number' && Number.isFinite(value) && Math.abs(value) <= limit ? value : null
}

/** One item, or null when any fact a page relies on is missing or malformed. */
export function parsePublicPickItem(raw: unknown): PublicPickItem | null {
  if (!isObject(raw)) return null
  const id = typeof raw.id === 'string' && PICK_ID.test(raw.id) ? raw.id : null
  const slug = typeof raw.slug === 'string' && raw.slug.length <= 120 && SEGMENT.test(raw.slug) ? raw.slug : null
  const title = text(raw.title)
  const timePrecision = raw.timePrecision === 'instant' || raw.timePrecision === 'day' ? raw.timePrecision : null
  const date = localDate(raw.localDate)
  const timeZone = isTimeZone(raw.timeZone) ? raw.timeZone : null
  const placeName = text(raw.placeName)
  const latitude = coordinate(raw.latitude, 90)
  const longitude = coordinate(raw.longitude, 180)
  const audience = raw.audience === 'kids' || raw.audience === 'all_ages' ? raw.audience : null
  const organizer = isObject(raw.organizer) ? { name: text(raw.organizer.name, 160), url: webUrl(raw.organizer.url) } : null
  const checkedAtIso = instant(raw.checkedAtIso)
  const expiresAtIso = instant(raw.expiresAtIso)
  if (!id || !slug || !title || !timePrecision || !date || !timeZone || !placeName || latitude === null || longitude === null ||
    !audience || !organizer?.name || !organizer.url || !checkedAtIso || !expiresAtIso) return null

  let startIso: string | null = null
  let endIso: string | null = null
  if (timePrecision === 'instant') {
    startIso = instant(raw.startIso)
    if (!startIso) return null
    endIso = instant(raw.endIso)
    if (endIso && Date.parse(endIso) <= Date.parse(startIso)) endIso = null
  }
  const until = localDate(raw.untilLocalDate)
  const ageBands = Array.isArray(raw.ageBands)
    ? PICK_AGE_BANDS.filter(band => (raw.ageBands as unknown[]).indexOf(band) !== -1)
    : []
  const cost = raw.cost === 'free' || raw.cost === 'paid' ? raw.cost : 'unknown'
  const booking = isObject(raw.booking) ? raw.booking : {}
  const bookingKind = BOOKING_KINDS.indexOf(booking.kind as PickBookingKind) !== -1 ? booking.kind as PickBookingKind : 'unknown'

  return {
    id, slug, title, timePrecision, startIso, endIso,
    localDate: date,
    untilLocalDate: until && until > date ? until : null,
    timeZone, placeName, latitude, longitude,
    nearestTown: text(raw.nearestTown, 80) ?? '',
    audience, ageBands, cost,
    booking: { kind: bookingKind, url: webUrl(booking.url) },
    organizer: { name: organizer.name, url: organizer.url },
    checkedAtIso, expiresAtIso,
  }
}

function parseWindow(raw: unknown): PublicPicksWindow | null {
  if (!isObject(raw)) return null
  const fromIso = instant(raw.fromIso)
  const toIso = instant(raw.toIso)
  return fromIso && toIso && Date.parse(toIso) > Date.parse(fromIso) ? { fromIso, toIso } : null
}

/** One metro's week, or null when the envelope itself is unusable. */
export function parsePublicPicksWeek(raw: unknown): PublicPicksWeek | null {
  if (!isObject(raw) || !isObject(raw.metro)) return null
  const slug = isMetroSlug(raw.metro.slug) ? raw.metro.slug : null
  const name = text(raw.metro.name, 80)
  const window = parseWindow(raw.window)
  const generatedAt = instant(raw.generatedAt)
  if (!slug || !name || !window || !generatedAt) return null
  const towns = Array.isArray(raw.metro.towns)
    ? raw.metro.towns.map(town => text(town, 80)).filter((town): town is string => town !== null)
    : []
  const seen: Record<string, true> = {}
  const items: PublicPickItem[] = []
  for (const entry of Array.isArray(raw.items) ? raw.items : []) {
    const item = parsePublicPickItem(entry)
    if (!item || seen[item.id]) continue
    seen[item.id] = true
    items.push(item)
  }
  return {
    metro: { slug, name, towns },
    window,
    generatedAt,
    // The app's flag, held to its own rule after malformed rows are dropped.
    indexable: raw.indexable === true && items.length >= PICKS_INDEXABLE_MIN,
    items,
  }
}

/** The metro list, or null when the envelope itself is unusable. */
export function parsePublicPicksMetroList(raw: unknown): PublicPicksMetroList | null {
  if (!isObject(raw)) return null
  const window = parseWindow(raw.window)
  const generatedAt = instant(raw.generatedAt)
  if (!window || !generatedAt || !Array.isArray(raw.metros)) return null
  const seen: Record<string, true> = {}
  const metros: PublicPicksMetroSummary[] = []
  for (const entry of raw.metros) {
    if (!isObject(entry) || !isMetroSlug(entry.slug) || seen[entry.slug]) continue
    const name = text(entry.name, 80)
    if (!name) continue
    seen[entry.slug] = true
    const itemCount = typeof entry.itemCount === 'number' && Number.isInteger(entry.itemCount) && entry.itemCount > 0 ? entry.itemCount : 0
    metros.push({ slug: entry.slug, name, itemCount, indexable: entry.indexable === true && itemCount >= PICKS_INDEXABLE_MIN })
  }
  return { window, generatedAt, metros }
}

// ─── What may be shown now ─────────────────────────────

/** A clock-less event still counts until this long after it starts. */
const NO_END_GRACE_MS = 2 * 60 * 60 * 1000

/** The local date of an instant in a zone, as YYYY-MM-DD. */
export function localDateIn(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(date)
  const part = (type: string) => parts.find(piece => piece.type === type)?.value ?? '00'
  return `${part('year')}-${part('month')}-${part('day')}`
}

/** Items that may be shown at `now`: not expired, and not already over. A
 * page rebuilt between the endpoint's reads never lists last night's event. */
export function currentPicks(items: readonly PublicPickItem[], now: Date): PublicPickItem[] {
  const nowMs = now.getTime()
  return items.filter(item => {
    if (Date.parse(item.expiresAtIso) <= nowMs) return false
    if (item.timePrecision === 'instant' && item.startIso) {
      const endMs = item.endIso ? Date.parse(item.endIso) : Date.parse(item.startIso) + NO_END_GRACE_MS
      return endMs > nowMs
    }
    return (item.untilLocalDate ?? item.localDate) >= localDateIn(now, item.timeZone)
  })
}

/** Whether a week, as shown at `now`, is one search engines may index. */
export function weekIsIndexable(week: PublicPicksWeek, current: readonly PublicPickItem[]): boolean {
  return week.indexable && current.length >= PICKS_INDEXABLE_MIN
}

// ─── Fetching ──────────────────────────────────────────

export function picksApiBase(): string {
  const configured = process.env.INTORI_PUBLIC_PICKS_API?.trim()
  return (configured || DEFAULT_PICKS_API).replace(/\/+$/, '')
}

async function getJson(url: string, timeoutMs: number): Promise<{ status: number; body: unknown }> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, { headers: { accept: 'application/json' }, signal: controller.signal })
    let body: unknown = null
    try {
      body = await response.json()
    } catch {
      body = null
    }
    return { status: response.status, body }
  } finally {
    clearTimeout(timer)
  }
}

/** Every metro and its count this week. Throws when the endpoint cannot answer. */
export async function fetchPicksMetroList(timeoutMs = PICKS_FETCH_TIMEOUT_MS): Promise<PublicPicksMetroList> {
  const { status, body } = await getJson(picksApiBase(), timeoutMs)
  if (status !== 200) throw new Error(`public_picks_list_${status}`)
  const list = parsePublicPicksMetroList(body)
  if (!list) throw new Error('public_picks_list_malformed')
  return list
}

/** One metro's week, null for a metro the endpoint does not know. Throws when
 * the endpoint cannot answer, including a 404 that is not its own JSON. */
export async function fetchPicksWeek(metroSlug: string, timeoutMs = PICKS_FETCH_TIMEOUT_MS): Promise<PublicPicksWeek | null> {
  if (!isMetroSlug(metroSlug)) return null
  const { status, body } = await getJson(`${picksApiBase()}/${metroSlug}`, timeoutMs)
  if (status === 404 && isObject(body) && body.error === 'unknown_metro') return null
  if (status !== 200) throw new Error(`public_picks_week_${status}`)
  const week = parsePublicPicksWeek(body)
  if (!week || week.metro.slug !== metroSlug) throw new Error('public_picks_week_malformed')
  return week
}

/** True while `next build` prerenders pages: a failed read then renders the
 * empty week instead of failing the deploy. At runtime a failed read throws,
 * so ISR keeps the last good page. */
export function isBuildPhase(): boolean {
  return process.env.NEXT_PHASE === 'phase-production-build'
}

// ─── URLs for search engines ───────────────────────────

export type PicksUrlEntry = { path: string; lastmod: string }

/** The hub, every indexable metro page, and every listing page of those
 * metros, for the sitemap and IndexNow. Throws only when the metro list
 * cannot be read; a metro whose week fails is left out. */
export async function collectIndexablePicksUrls(args: { timeoutMs?: number; max?: number; now?: Date } = {}): Promise<PicksUrlEntry[]> {
  const timeoutMs = args.timeoutMs ?? PICKS_FETCH_TIMEOUT_MS
  const max = args.max ?? Number.POSITIVE_INFINITY
  const now = args.now ?? new Date()
  const list = await fetchPicksMetroList(timeoutMs)
  const entries: PicksUrlEntry[] = [{ path: PICKS_BASE_PATH, lastmod: list.generatedAt.slice(0, 10) }]
  const candidates = list.metros.filter(metro => metro.indexable)
  const weeks = await Promise.all(candidates.map(metro => fetchPicksWeek(metro.slug, timeoutMs).catch(() => null)))
  for (const week of weeks) {
    if (!week) continue
    const current = currentPicks(week.items, now)
    if (!weekIsIndexable(week, current)) continue
    const lastmod = week.generatedAt.slice(0, 10)
    entries.push({ path: metroPath(week.metro.slug), lastmod })
    for (const item of current) entries.push({ path: listingPath(week.metro.slug, item), lastmod })
  }
  return entries.slice(0, max)
}
