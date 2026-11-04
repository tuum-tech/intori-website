import assert from 'node:assert/strict'
import test from 'node:test'
import { parsePublicPicksWeek, currentPickLines, currentPicks, listingPath, type PublicPickItem } from './publicPicks'
import { buildMetroPageProps, buildListingPageProps } from './publicPicksView'

const now = new Date('2026-11-05T14:00:00Z')
const program = (index: number): PublicPickItem => ({
  id: index.toString(16).padStart(16, '0'), slug: `program-${index}`, title: `Program ${index}`,
  timePrecision: 'instant', startIso: '2026-11-07T15:00:00Z', endIso: '2026-11-07T16:00:00Z',
  localDate: '2026-11-07', untilLocalDate: null, timeZone: 'America/New_York',
  placeName: `Branch ${index}`, latitude: 35.78, longitude: -78.64, nearestTown: 'Raleigh',
  audience: 'kids', ageBands: ['under_5'], cost: index === 1 ? 'paid' : 'free',
  booking: { kind: 'register', url: `https://library.example/program-${index}/register` },
  organizer: { name: 'Qualified library system', url: `https://library.example/program-${index}` },
  checkedAtIso: '2026-11-05T13:00:00Z', expiresAtIso: '2026-11-06T13:00:00Z',
})
const items = Array.from({ length: 8 }, (_, i) => program(i + 1))
const group = { kind: 'library_programs', id: 'abcdef0123456789', title: 'Library programs', localDate: items[0].localDate,
  timeZone: items[0].timeZone, organizer: items[0].organizer, programs: items }
const raw = { metro: { slug: 'raleigh-durham', name: 'Raleigh-Durham', towns: ['Raleigh'] },
  window: { fromIso: now.toISOString(), toIso: '2026-11-12T14:00:00Z' }, generatedAt: now.toISOString(),
  indexable: true, items }

test('SP10 actual public parser and metro view adopt library day lines while preserving original detail facts and URLs', () => {
  const oldWeek = parsePublicPicksWeek(raw)!
  assert.equal(buildMetroPageProps(oldWeek, now).itemCount, 8)
  assert.equal(buildMetroPageProps(oldWeek, now).indexable, true)
  const week = parsePublicPicksWeek({ ...raw, lines: [group], lineCount: 1, linesIndexable: false })!
  assert.deepEqual(week.items, oldWeek.items)
  assert.equal(week.indexable, true)
  const page = buildMetroPageProps(week, now)
  assert.equal(page.itemCount, 1)
  assert.equal(page.indexable, false)
  const card = page.days[0].cards[0]
  assert.ok('programs' in card)
  assert.equal(card.title, 'Library programs')
  assert.equal(card.programs.length, 8)
  assert.equal('time' in card, false)
  assert.equal('where' in card, false)
  assert.equal('href' in card, false)
  assert.equal(card.programs[0].href, listingPath(raw.metro.slug, items[0]))
  assert.equal(page.listingUrls.length, 8)
  assert.ok(page.listingUrls.every(url => !url.includes(group.id)))
  const listing = buildListingPageProps(week, week.items[0], currentPicks(week.items, now))
  assert.equal(listing.title, items[0].title)
  assert.equal(listing.eventJsonLd['@type'], 'Event')
  assert.equal(JSON.stringify(listing.eventJsonLd).includes('Library programs'), false)
})

test('SP10 group metadata cannot invent program facts, hide valid listings, or keep expired members visible', () => {
  const forged = { ...group, programs: [{ ...items[0], title: 'Invented title', cost: 'free' }] }
  const parsed = parsePublicPicksWeek({ ...raw, lines: [forged], linesIndexable: false })!
  const line = parsed.lines![0]
  assert.ok('programs' in line)
  assert.equal(line.programs[0].title, items[0].title)
  assert.equal(line.programs[0].cost, 'paid')
  assert.equal(parsed.lines!.length, 8, 'ungrouped original occurrences remain visible')
  const malformed = parsePublicPicksWeek({ ...raw, lines: [{ ...group, programs: [items[0], items[0]] }] })!
  assert.equal(malformed.lines!.length, 8)
  const expired = { ...items[0], expiresAtIso: '2026-11-05T13:00:00Z' }
  const week = parsePublicPicksWeek({ ...raw, items: [expired, ...items.slice(1)], lines: [group] })!
  const current = currentPickLines(week, now)[0]
  assert.ok('programs' in current)
  assert.equal(current.programs.length, 7)
  assert.ok(current.programs.every(item => item.id !== expired.id))
})
