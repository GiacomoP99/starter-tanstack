import { describe, expect, it } from 'vitest'
import { formatAttentionDue } from './attention'

describe('formatAttentionDue', () => {
  it('shows "scaduto" for expired items, even with days left', () => {
    expect(formatAttentionDue({ expired: true, dueInDays: 3 })).toBe('scaduto')
  })

  it('shows the remaining days', () => {
    expect(formatAttentionDue({ dueInDays: 6 })).toBe('6 gg')
  })

  it('shows nothing when there is no deadline', () => {
    expect(formatAttentionDue({ dueInDays: null })).toBeNull()
    expect(formatAttentionDue({})).toBeNull()
  })
})
