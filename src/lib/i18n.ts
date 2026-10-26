import { z } from 'zod'
import { m } from '@/paraglide/messages.js'
import {
  getLocale,
  type Locale,
  locales,
  setLocale,
} from '@/paraglide/runtime.js'

export { getLocale, type Locale, locales, m, setLocale }

/** BCP 47 tags used for Intl formatting (numbers, currency, dates). */
const intlTags: Record<Locale, string> = {
  it: 'it-IT',
  fr: 'fr-FR',
}

export const intlLocale = () => intlTags[getLocale()]

/** Native language names, shown in the switcher. */
export const localeNames: Record<Locale, () => string> = {
  it: m.language_it,
  fr: m.language_fr,
}

/**
 * Apply the active locale to everything outside Paraglide's messages.
 * Called once at startup; `setLocale()` reloads the page, so it re-runs.
 */
export function initI18n() {
  const locale = getLocale()
  document.documentElement.lang = locale
  // Localised Zod messages, used by the generated schemas in forms.
  z.config(locale === 'fr' ? z.locales.fr() : z.locales.it())
}
