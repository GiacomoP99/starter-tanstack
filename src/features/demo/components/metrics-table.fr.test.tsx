import { expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import { initI18n } from '@/lib/i18n'
import { overwriteGetLocale } from '@/paraglide/runtime.js'
import { MetricsTable } from './metrics-table'

it('renders headers and currency in French', async () => {
  overwriteGetLocale(() => 'fr')
  initI18n()

  const screen = await render(
    <MetricsTable
      data={[{ month: '2026-01', orders: 120, revenue: 18_400 }]}
    />,
  )

  await expect
    .element(screen.getByRole('button', { name: "Chiffre d'affaires" }))
    .toBeVisible()
  const revenueCell = screen.getByRole('row').nth(1).getByRole('cell').nth(2)
  await expect.element(revenueCell).toBeVisible()
  // fr-FR: "18 400 €" with (narrow) no-break spaces
  expect(revenueCell.element().textContent).toMatch(/^18\s400\s€$/u)
})
