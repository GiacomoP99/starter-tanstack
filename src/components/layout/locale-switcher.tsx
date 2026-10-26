import {
  getLocale,
  type Locale,
  localeNames,
  locales,
  m,
  setLocale,
} from '@/lib/i18n'

export function LocaleSwitcher() {
  return (
    <select
      aria-label={m.language_label()}
      className="h-8 rounded-md bg-transparent px-1 text-xs text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      value={getLocale()}
      // Persists the choice and reloads, so every string updates at once.
      onChange={(e) => setLocale(e.target.value as Locale)}
    >
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {localeNames[locale]()} · {locale.toUpperCase()}
        </option>
      ))}
    </select>
  )
}
