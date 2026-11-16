import assert from 'node:assert/strict'
import { test } from 'node:test'

import { isHolidaySeason } from './season'

test('holiday touches are on through New Year’s Eve in New York', () => {
  assert.equal(isHolidaySeason(new Date('2026-11-16T12:00:00Z')), true)
  // 11:59 PM Dec 31 in New York is 4:59 AM Jan 1 UTC.
  assert.equal(isHolidaySeason(new Date('2027-01-01T04:59:00Z')), true)
})

test('holiday touches are off from midnight Jan 1 in New York', () => {
  assert.equal(isHolidaySeason(new Date('2027-01-01T05:00:00Z')), false)
  assert.equal(isHolidaySeason(new Date('2027-03-01T12:00:00Z')), false)
})
