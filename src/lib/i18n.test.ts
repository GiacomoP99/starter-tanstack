import { describe, expect, it } from 'vitest'
import fr from '../../messages/fr.json'
import it_ from '../../messages/it.json'

const catalogs = { it: it_, fr } as Record<string, Record<string, string>>
const keysOf = (c: Record<string, string>) =>
  Object.keys(c)
    .filter((k) => k !== '$schema')
    .sort()
const params = (msg: string) =>
  [...msg.matchAll(/\{(\w+)\}/g)].map((x) => x[1]).sort()

describe('translations', () => {
  it('every locale has exactly the same keys as Italian (base)', () => {
    for (const [locale, catalog] of Object.entries(catalogs)) {
      expect(keysOf(catalog), `keys in ${locale}.json`).toEqual(keysOf(it_))
    }
  })

  it('no message is empty', () => {
    for (const [locale, catalog] of Object.entries(catalogs)) {
      for (const key of keysOf(catalog)) {
        expect(catalog[key]?.trim(), `${locale}.${key}`).not.toBe('')
      }
    }
  })

  it('placeholders match across locales', () => {
    for (const key of keysOf(it_)) {
      expect(params(fr[key as keyof typeof fr]), `fr.${key}`).toEqual(
        params(it_[key as keyof typeof it_]),
      )
    }
  })
})
