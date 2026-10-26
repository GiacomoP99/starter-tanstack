import { expect, test } from '@playwright/test'

test('reaches Anagrafica from the sidebar and drills into a counter', async ({
  page,
}) => {
  await page.goto('/')
  await page
    .getByRole('navigation', { name: 'Navigazione principale' })
    .getByRole('link', { name: 'Anagrafica' })
    .click()

  await expect(
    page.getByRole('heading', { level: 1, name: 'Anagrafica' }),
  ).toBeVisible()
  await expect(
    page.getByRole('navigation', { name: 'Percorso' }),
  ).toContainText('Anagrafica')

  await page.getByRole('link', { name: 'Revisioni in corso' }).click()

  await expect(page).toHaveURL(
    /\/anagrafica\/contraenti\?filter=revisioni-in-corso$/,
  )
  await expect(page.getByText('Filtro: revisioni-in-corso')).toBeVisible()
  await expect(
    page.getByRole('navigation', { name: 'Percorso' }),
  ).toContainText('Contraenti')
})

test('Ctrl+K focuses the global search', async ({ page }) => {
  await page.goto('/anagrafica')
  // wait until the app has rendered (the shortcut listener is attached on mount)
  await expect(
    page.getByRole('heading', { level: 1, name: 'Anagrafica' }),
  ).toBeVisible()
  await page.keyboard.press('Control+k')
  await expect(page.getByRole('searchbox', { name: 'Cerca' })).toBeFocused()
  await page.keyboard.type('Vesuvio')
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/\/anagrafica\/contraenti\?q=Vesuvio$/)
})

test('unknown sections show the not-found page', async ({ page }) => {
  await page.goto('/anagrafica/not-a-section')
  await expect(page.getByText('Pagina non trovata.')).toBeVisible()
})
