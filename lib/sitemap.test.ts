import assert from 'node:assert/strict'
import test, { type TestContext } from 'node:test'
import { GET } from '../app/sitemap.xml/route'
import {
  collectIndexablePicksUrls, currentPickLines, currentPicks, listingPath,
  parsePublicPicksWeek, weekIsIndexable, type PublicPickItem, type PublicPicksWeek,
} from './publicPicks'
import { buildListingPageProps, buildMetroPageProps, buildSaturdayShortlist, eventJsonLd } from './publicPicksView'
import { appStoreUrl, guideWebUrl, RALEIGH_SATURDAY_CAMPAIGN, RALEIGH_WINTER_CAMPAIGN } from './appLinks'

const now = new Date('2026-11-05T14:00:00Z')
function week(slug = 'nashville'): PublicPicksWeek {
  const items: PublicPickItem[] = Array.from({ length: 8 }, (_, i) => ({
    id: (i + 1).toString(16).padStart(16, '0'), slug: `event-${i}`, title: `Event ${i}`,
    timePrecision: 'instant', startIso: '2026-11-07T15:00:00Z', endIso: '2026-11-07T16:00:00Z',
    localDate: '2026-11-07', untilLocalDate: null, timeZone: 'America/Chicago',
    placeName: 'Library', latitude: 36.16, longitude: -86.78, nearestTown: 'Nashville',
    audience: 'kids', ageBands: ['under_5'], cost: 'free', booking: { kind: 'none', url: null },
    organizer: { name: 'Library', url: 'https://library.example/events' },
    checkedAtIso: '2026-11-05T13:00:00Z', expiresAtIso: '2026-11-06T13:00:00Z',
  }))
  return {
    metro: { slug, name: slug, towns: [] }, indexable: true, items,
    generatedAt: now.toISOString(), window: { fromIso: now.toISOString(), toIso: '2026-11-12T14:00:00Z' },
  }
}
function feed(t: TestContext, weeks: PublicPicksWeek[], failure?: { slug?: string; status?: number; body?: unknown; timeout?: boolean }) {
  return t.mock.method(globalThis, 'fetch', async (url: string, options?: RequestInit) => {
    const slug = url === 'https://app.intori.co/api/public/picks' ? undefined : url.split('/').pop()
    if (failure && failure.slug === slug) {
      if (failure.timeout) return new Promise<Response>((_, reject) => {
        options?.signal?.addEventListener('abort', () => reject(new Error('aborted')), { once: true })
      })
      return Response.json(failure.body ?? { error: 'unavailable' }, { status: failure.status ?? 503 })
    }
    if (slug) return Response.json(weeks.find(w => w.metro.slug === slug))
    return Response.json({ generatedAt: now.toISOString(), window: weeks[0].window,
      metros: weeks.map(w => ({ ...w.metro, itemCount: w.items.length, indexable: w.indexable })) })
  })
}

for (const grouped of [false, true]) {
  test(`sitemap and metro page agree at the threshold (grouped=${grouped})`, async t => {
    const raw = week()
    if (grouped) { raw.lines = [...raw.items]; raw.linesIndexable = true }
    const parsed = parsePublicPicksWeek(raw)!
    feed(t, [raw])
    const urls = await collectIndexablePicksUrls({ now })
    assert.equal(buildMetroPageProps(parsed, now).indexable, true)
    assert.equal(urls.length, 10)
    assert.ok(urls.some(u => u.path === '/things-to-do-with-kids/nashville'))
    assert.ok(urls.some(u => u.path === listingPath('nashville', raw.items[0])))
  })
}

test('eight occurrences grouped into one visible line do not enter the sitemap', async t => {
  const raw = week()
  raw.lines = [{ kind: 'library_programs', id: 'abcdef0123456789', title: 'Library programs',
    localDate: raw.items[0].localDate, timeZone: raw.items[0].timeZone, organizer: raw.items[0].organizer, programs: raw.items }]
  raw.linesIndexable = false
  const parsed = parsePublicPicksWeek(raw)!
  assert.equal(parsed.indexable, true, 'the raw occurrence threshold alone would admit this city')
  assert.equal(buildMetroPageProps(parsed, now).indexable, false)
  feed(t, [raw])
  assert.deepEqual(await collectIndexablePicksUrls({ now }), [{ path: '/things-to-do-with-kids', lastmod: '2026-11-05' }])
})

test('expired lines remove a previously eligible city from both page indexing and sitemap', async t => {
  const raw = week()
  raw.items[0].expiresAtIso = '2026-11-05T13:00:00Z'
  raw.lines = [...raw.items]
  raw.linesIndexable = true
  const parsed = parsePublicPicksWeek(raw)!
  assert.equal(currentPickLines(parsed, now).length, 7)
  assert.equal(weekIsIndexable(parsed, currentPicks(parsed.items, now), 7), false)
  assert.equal(buildMetroPageProps(parsed, now).indexable, false)
  feed(t, [raw])
  assert.equal((await collectIndexablePicksUrls({ now })).length, 1)
})

for (const failure of [
  { status: 503 },
  { status: 200, body: {} },
  { slug: 'atlanta', status: 503 },
  { slug: 'atlanta', status: 404, body: { error: 'unknown_metro' } },
  { slug: 'atlanta', status: 200, body: {} },
  { slug: 'atlanta', timeout: true },
]) {
  test(`incomplete feed rejects the whole snapshot: ${JSON.stringify(failure)}`, async t => {
    feed(t, [week(), week('atlanta')], failure)
    await assert.rejects(collectIndexablePicksUrls({ now, timeoutMs: 10 }))
  })
}

test('XML route returns a complete sitemap with canonical URLs', async t => {
  t.mock.timers.enable({ apis: ['Date'], now })
  feed(t, [week()])
  const response = await GET()
  assert.equal(response.status, 200)
  assert.match(response.headers.get('content-type')!, /application\/xml/)
  const xml = await response.text()
  assert.match(xml, /<loc>https:\/\/intori.com\/<\/loc>/)
  assert.match(xml, /<loc>https:\/\/intori.com\/things-to-do-with-kids\/nashville<\/loc>/)
  assert.equal((xml.match(/<loc>/g) ?? []).length, 18)
  assert.match(xml, /<loc>https:\/\/intori.com\/things-to-do-with-kids\/raleigh-durham\/winter-break<\/loc>/)
  assert.doesNotMatch(xml, /<lastmod>/)
})

test('XML route propagates failure instead of returning the eight-URL fallback', async t => {
  feed(t, [week()], { status: 503 })
  await assert.rejects(GET(), /public_picks_list_503/)
})

test('Saturday picks favor upcoming free, kid-friendly events from distinct organizers', () => {
  const raw = week('raleigh-durham')
  const saturday = new Date('2026-11-07T14:30:00Z')
  const picks = raw.items.map((item, i): PublicPickItem => ({
    ...item,
    timeZone: 'America/New_York',
    startIso: i === 0 ? '2026-11-07T14:00:00Z' : i === 1 ? '2026-11-07T17:00:00Z' : '2026-11-07T15:00:00Z',
    endIso: '2026-11-07T18:00:00Z',
    expiresAtIso: '2026-11-08T00:00:00Z',
    ageBands: i === 2 ? ['teens'] : ['under_5'],
    cost: i === 3 ? 'paid' : 'free',
    organizer: { name: i <= 4 ? 'Library' : `Organizer ${i}`, url: 'https://library.example/events' },
  }))
  const result = buildSaturdayShortlist(picks, saturday)
  assert.equal(result.date, '2026-11-07')
  assert.deepEqual(result.picks.map(pick => pick.title), ['Event 4', 'Event 5', 'Event 6'])
  assert.equal(buildSaturdayShortlist(picks, new Date('2026-11-07T17:01:00Z')).date, '2026-11-14')
})

test('Cape Fear Museum planetarium listings use admission and reservation facts', () => {
  const raw = week('wilmington')
  Object.assign(raw.items[0], {
    title: 'Planetarium Show-One World, One Sky', placeName: 'Cape Fear Museum',
    organizer: { name: 'New Hanover County', url: 'https://www.nhcgov.com/calendar.aspx?EID=7205' },
  })
  const parsed = parsePublicPicksWeek(raw)!
  assert.equal(parsed.items[0].cost, 'admission')
  const detail = buildListingPageProps(parsed, parsed.items[0], parsed.items)
  assert.equal(detail.facts.cost, 'Included with museum admission')
  assert.equal(detail.facts.signUp?.label, 'Reserve at the museum’s admissions desk')
  assert.equal(detail.eventJsonLd.offers, undefined)
  assert.equal(eventJsonLd('wilmington', parsed.items[1], 'https://intori.com/example').isAccessibleForFree, true)
})

test('guide campaign links preserve their separate web and App Store identifiers', () => {
  for (const campaign of [RALEIGH_SATURDAY_CAMPAIGN, RALEIGH_WINTER_CAMPAIGN]) {
    const web = new URL(guideWebUrl(campaign))
    assert.equal(web.searchParams.get('utm_source'), 'intori_com')
    assert.equal(web.searchParams.get('utm_campaign'), campaign.web)
    const store = new URL(appStoreUrl(campaign.appStore))
    assert.equal(store.searchParams.get('ct'), campaign.appStore)
    assert.equal(store.searchParams.get('mt'), '8')
  }
})


test('the source-checked first-edition Durham pick clears after its start', () => {
  assert.equal(buildSaturdayShortlist([], new Date('2026-11-21T14:00:00Z')).picks[0]?.title, 'Durham Art Walk Holiday Market')
  assert.deepEqual(buildSaturdayShortlist([], new Date('2026-11-21T15:01:00Z')).picks, [])
})
