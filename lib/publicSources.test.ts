import assert from 'node:assert/strict'
import test from 'node:test'
import { areasFromLive, servicesFromLive } from './publicSources'

const row = (id: string, metro: string, kind = 'library') => ({
  id, displayName: `Name ${id}`, metro, publicUrl: `https://example.org/${id}`, kind,
})

test('an organizer in an area the hand-written list does not name still shows', () => {
  const areas = areasFromLive([row('durham-libcal', 'raleigh-durham'), row('new-lib', 'new-city'), row('nws', 'national')])
  assert.deepEqual(areas.map((a) => a.metro), ['raleigh-durham', 'new-city'])
  const added = areas[1]
  assert.equal(added.name, 'New City')
  assert.equal(added.picks, false)
  assert.equal(added.sources[0].adds, 'Story times, classes and library events')
})

test('a hand-written line wins over the kind line', () => {
  const [area] = areasFromLive([row('durham-libcal', 'raleigh-durham', 'other')])
  assert.notEqual(area.sources[0].adds, 'Events and programs')
})

test('national services follow the feed, and services outside it always stay', () => {
  const services = servicesFromLive([row('nws', 'national', 'other'), row('new-service', 'national', 'other')])
  const ids = services.map((s) => s.id)
  assert.ok(ids.includes('nws'))
  assert.ok(!ids.includes('ticketmaster'), 'switched off in the app, so not listed')
  assert.ok(ids.includes('google-maps') && ids.includes('balldontlie') && ids.includes('census-geocoder'))
  assert.equal(ids[ids.length - 1], 'new-service')
  assert.ok(services.every((s) => !('outsideRegistry' in s)))
})

test('a feed with no national rows keeps the whole service list', () => {
  const services = servicesFromLive([row('durham-libcal', 'raleigh-durham')])
  assert.ok(services.length >= 13)
})
