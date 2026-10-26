import { expect, test } from '@playwright/test'

test('switches to French and remembers the choice', async ({ page }) => {
  await page.goto('/demo')
  await expect(page.getByRole('link', { name: 'Nuovo ordine' })).toBeVisible()
  await expect(page.locator('html')).toHaveAttribute('lang', 'it')

  await page.getByRole('combobox', { name: 'Lingua' }).selectOption('fr')

  await expect(
    page.getByRole('link', { name: 'Nouvelle commande' }),
  ).toBeVisible()
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
  await expect(
    page.getByRole('button', { name: "Chiffre d'affaires" }),
  ).toBeVisible()

  await page.reload()
  await expect(
    page.getByRole('link', { name: 'Nouvelle commande' }),
  ).toBeVisible()
})

test('shows French validation messages', async ({ page }) => {
  await page.goto('/orders/new')
  await page.getByRole('combobox', { name: 'Lingua' }).selectOption('fr')
  await page.getByRole('button', { name: 'Créer la commande' }).click()

  // Zod's French locale, applied to the Orval-generated schema
  await expect(page.getByRole('alert').first()).toContainText(/trop petit/i)
})
