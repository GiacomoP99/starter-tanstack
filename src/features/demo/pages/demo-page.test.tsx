import { expect, it } from 'vitest'
import { getGetMonthlyMetricsMockHandler } from '@/api/generated/endpoints/metrics/metrics.msw'
import { worker } from '@/mocks/browser'
import { renderRoute } from '@/test/render'

it('loads metrics through the route loader and renders table + chart', async () => {
  const screen = await renderRoute('/demo')

  // 6 months from the default mock override, plus the header row
  await expect.element(screen.getByRole('row').nth(6)).toBeVisible()
  await expect
    .element(screen.getByRole('img', { name: 'Fatturato per mese' }))
    .toBeVisible()
})

it('renders whatever the API returns (per-test MSW override)', async () => {
  worker.use(
    getGetMonthlyMetricsMockHandler([
      { month: '2030-12', orders: 1, revenue: 42 },
    ]),
  )

  const screen = await renderRoute('/demo')

  await expect
    .element(screen.getByRole('cell', { name: '2030-12' }))
    .toBeVisible()
  expect(screen.getByRole('row').elements()).toHaveLength(2)
})
