import { intlLocale } from './i18n'

export const formatCurrency = (value: number, currency = 'EUR') =>
  new Intl.NumberFormat(intlLocale(), {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)

export const formatNumber = (value: number) =>
  new Intl.NumberFormat(intlLocale()).format(value)

const MINUTE = 60_000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

/** "2 min fa", "3 h fa", "ieri", "5 giorni fa" (locale-aware). */
export function formatRelativeTime(date: Date | string, now = new Date()) {
  const diff = new Date(date).getTime() - now.getTime()
  const rtf = new Intl.RelativeTimeFormat(intlLocale(), {
    numeric: 'auto',
    style: 'short',
  })
  if (Math.abs(diff) < HOUR)
    return rtf.format(Math.round(diff / MINUTE), 'minute')
  if (Math.abs(diff) < DAY) return rtf.format(Math.round(diff / HOUR), 'hour')
  return rtf.format(Math.round(diff / DAY), 'day')
}

/** "oggi 04:00" for today, otherwise a short date + time. */
export function formatDayTime(date: Date | string, now = new Date()) {
  const d = new Date(date)
  const time = new Intl.DateTimeFormat(intlLocale(), {
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
  if (d.toDateString() === now.toDateString()) {
    const today = new Intl.RelativeTimeFormat(intlLocale(), {
      numeric: 'auto',
    }).format(0, 'day')
    return `${today} ${time}`
  }
  return new Intl.DateTimeFormat(intlLocale(), {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(d)
}
