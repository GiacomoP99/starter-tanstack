import { describe, expect, it } from 'vitest'
import { formatDayTime, formatRelativeTime } from './format'

// Unit tests run in Node, where Paraglide falls back to Italian (base locale).
const now = new Date('2026-10-23T10:00:00')

describe('formatRelativeTime', () => {
  it('uses minutes, hours, then days', () => {
    expect(formatRelativeTime(new Date('2026-10-23T09:58:00'), now)).toBe(
      '2 min fa',
    )
    expect(formatRelativeTime(new Date('2026-10-23T07:00:00'), now)).toBe(
      '3 h fa',
    )
    expect(formatRelativeTime(new Date('2026-10-22T09:00:00'), now)).toBe(
      'ieri',
    )
  })
})

describe('formatDayTime', () => {
  it('says "oggi" for today', () => {
    expect(formatDayTime(new Date('2026-10-23T04:00:00'), now)).toBe(
      'oggi 04:00',
    )
  })
})
