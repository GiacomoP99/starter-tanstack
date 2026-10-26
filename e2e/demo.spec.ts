import { expect, test } from '@playwright/test'

test('navigates from home to the demo and sorts the table', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Apri la demo' }).click()

  await expect(page).toHaveURL(/\/demo$/)
  const rows = page.getByRole('row')
  await expect(rows).toHaveCount(7) // header + 6 months

  await page.getByRole('button', { name: 'Fatturato' }).click()
  await expect(rows.nth(1).getByRole('cell').first()).toHaveText('2026-06')
})

test('shows the not-found page for unknown URLs', async ({ page }) => {
  await page.goto('/does-not-exist')
  await expect(page.getByText('Pagina non trovata.')).toBeVisible()
})
