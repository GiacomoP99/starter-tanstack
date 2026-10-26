import { expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import type { MonthlyMetric } from '@/api/generated/model'
import { MetricsTable } from './metrics-table'

const rows: MonthlyMetric[] = [
  { month: '2026-01', orders: 120, revenue: 18_400 },
  { month: '2026-02', orders: 98, revenue: 15_100 },
  { month: '2026-03', orders: 143, revenue: 21_900 },
]

it('renders one row per metric with formatted revenue', async () => {
  const screen = await render(<MetricsTable data={rows} />)

  // header row + 3 data rows
  await expect.element(screen.getByRole('row').nth(3)).toBeVisible()
  expect(screen.getByRole('row').elements()).toHaveLength(4)
  await expect.element(screen.getByText(/18\.400\s€/)).toBeVisible()
})

it('sorts by revenue when the header is clicked', async () => {
  const screen = await render(<MetricsTable data={rows} />)
  const firstCell = () =>
    screen.getByRole('row').nth(1).getByRole('cell').first()

  await expect.element(firstCell()).toHaveTextContent('2026-01')

  // numeric columns sort descending first
  await screen.getByRole('button', { name: 'Fatturato' }).click()
  await expect.element(firstCell()).toHaveTextContent('2026-03')

  await screen.getByRole('button', { name: 'Fatturato' }).click()
  await expect.element(firstCell()).toHaveTextContent('2026-02')
})
