import { afterAll, afterEach, beforeAll } from 'vitest'
import { initI18n } from '@/lib/i18n'
import { worker } from '@/mocks/browser'
import { overwriteGetLocale } from '@/paraglide/runtime.js'

// Tests run in Italian (base locale) whatever the machine's language is.
// A test can switch with `overwriteGetLocale(() => 'fr')`; reset after each.
const resetToItalian = () => {
  overwriteGetLocale(() => 'it')
  initI18n()
}
resetToItalian()

// Same MSW handlers as dev (Orval-generated + overrides in src/mocks/handlers.ts).
// Override per test with `worker.use(...)`; it's reset after each test.
beforeAll(async () => {
  await worker.start({ quiet: true, onUnhandledFrame: 'error' })
})

afterEach(() => {
  worker.resetHandlers()
  resetToItalian()
})

afterAll(() => {
  worker.stop()
})
