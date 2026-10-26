import type { AttentionItem } from '@/api/generated/model'
import { m } from '@/lib/i18n'

/** Right-hand badge of an attention row: "6 gg", "scaduto" or nothing. */
export function formatAttentionDue(
  item: Pick<AttentionItem, 'dueInDays' | 'expired'>,
): string | null {
  if (item.expired) return m.anagrafica_expired()
  if (item.dueInDays != null)
    return m.anagrafica_due_days({ days: item.dueInDays })
  return null
}
