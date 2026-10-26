import { HttpResponse, http } from 'msw'
import { describe, expect, it, vi } from 'vitest'
import { worker } from '@/mocks/browser'
import { renderRoute } from '@/test/render'

describe('Anagrafica dashboard', () => {
  it('renders every section from the API', async () => {
    const screen = await renderRoute('/anagrafica')

    await expect
      .element(screen.getByRole('heading', { level: 1, name: 'Anagrafica' }))
      .toBeVisible()
    // Riprendi
    await expect
      .element(
        screen.getByRole('link', {
          name: /Costruzioni Meridionali S\.p\.A\. · ver\. 3/,
        }),
      )
      .toBeVisible()
    // Attenzione richiesta: preview + "see all"
    await expect
      .element(screen.getByRole('button', { name: 'Vedi tutte · 23' }))
      .toBeVisible()
    // Contraenti per stato
    await expect
      .element(
        screen.getByRole('img', { name: 'Numero di contraenti per stato' }),
      )
      .toBeVisible()
    // Counters
    const contraenti = screen.getByRole('region', { name: 'Contraenti' })
    await expect.element(contraenti.getByText('106')).toBeVisible()
    // Discards footer
    await expect
      .element(screen.getByText(/ultima esecuzione: oggi 04:00/))
      .toBeVisible()
  })

  it('isolates a failing endpoint to its own sections', async () => {
    // the error boundary logs the (expected) failures; keep the output clean
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    worker.use(
      http.get('/api/anagrafica/counters', () =>
        HttpResponse.json({ message: 'boom' }, { status: 500 }),
      ),
    )
    const screen = await renderRoute('/anagrafica')

    // the 3 counter panels show an error with retry...
    await expect
      .element(screen.getByRole('button', { name: 'Riprova' }).nth(2))
      .toBeVisible()
    expect(
      screen.getByRole('button', { name: 'Riprova' }).elements(),
    ).toHaveLength(3)
    // ...the rest of the page still works
    await expect
      .element(screen.getByRole('button', { name: 'Vedi tutte · 23' }))
      .toBeVisible()
    consoleError.mockRestore()
  })

  it('opens all attention items in a modal', async () => {
    const screen = await renderRoute('/anagrafica')

    await screen.getByRole('button', { name: 'Vedi tutte · 23' }).click()

    const dialog = screen.getByRole('dialog', { name: 'Tutte le segnalazioni' })
    await expect
      .element(dialog.getByText('23 elementi richiedono attenzione.'))
      .toBeVisible()
    expect(dialog.getByRole('listitem').elements()).toHaveLength(23)
  })

  it('quick-opens a contraente by id', async () => {
    const screen = await renderRoute('/anagrafica')

    await screen
      .getByRole('textbox', { name: 'Apri per Id o codice fiscale…' })
      .fill('C-10231')
    await screen
      .getByRole('region', { name: 'Contraenti' })
      .getByRole('button', { name: 'Vai' })
      .click()

    await expect
      .poll(() => screen.router.state.location.href)
      .toBe('/anagrafica/contraenti?q=C-10231')
    await expect.element(screen.getByText('Ricerca: C-10231')).toBeVisible()
  })
})
