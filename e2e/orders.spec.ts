import { expect, test } from '@playwright/test'

// Regression: API mocks must not swallow app URLs like /orders/new.
test('creates an order from a directly opened /orders/new', async ({
  page,
}) => {
  await page.goto('/orders/new')

  await page.getByRole('button', { name: 'Crea ordine' }).click()
  await expect(page.getByRole('textbox', { name: 'Cliente' })).toHaveAttribute(
    'aria-invalid',
    'true',
  )

  await page.getByRole('textbox', { name: 'Cliente' }).fill('ACME S.p.A.')
  await page.getByRole('spinbutton', { name: 'Totale (€)' }).fill('120')
  await page.getByRole('button', { name: 'Crea ordine' }).click()

  await expect(page.getByRole('status')).toContainText('creato')
})
