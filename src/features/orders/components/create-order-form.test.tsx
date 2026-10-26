import { expect, it, vi } from 'vitest'
import { getCreateOrderMockHandler } from '@/api/generated/endpoints/orders/orders.msw'
import { worker } from '@/mocks/browser'
import { renderWithQuery } from '@/test/render'
import { CreateOrderForm } from './create-order-form'

it('shows validation errors and does not submit an empty form', async () => {
  const onCreated = vi.fn()
  const screen = await renderWithQuery(
    <CreateOrderForm onCreated={onCreated} />,
  )

  await screen.getByRole('button', { name: 'Crea ordine' }).click()

  await expect
    .element(screen.getByRole('textbox', { name: 'Cliente' }))
    .toHaveAttribute('aria-invalid', 'true')
  await expect.element(screen.getByRole('alert').first()).toBeVisible()
  expect(onCreated).not.toHaveBeenCalled()
})

it('submits valid data through the generated mutation', async () => {
  const onCreated = vi.fn()
  let body: unknown
  worker.use(
    getCreateOrderMockHandler(async ({ request }) => {
      body = await request.json()
      return {
        id: '00000000-0000-4000-8000-000000000001',
        customer: 'ACME S.p.A.',
        total: 99.5,
        status: 'draft',
        createdAt: '2026-10-19T10:00:00Z',
      }
    }),
  )
  const screen = await renderWithQuery(
    <CreateOrderForm onCreated={onCreated} />,
  )

  await screen.getByRole('textbox', { name: 'Cliente' }).fill('ACME S.p.A.')
  await screen.getByRole('spinbutton', { name: 'Totale (€)' }).fill('99.5')
  await screen.getByRole('button', { name: 'Crea ordine' }).click()

  await expect.poll(() => onCreated.mock.calls.length).toBe(1)
  expect(body).toEqual({ customer: 'ACME S.p.A.', total: 99.5 })
  // form resets after success
  await expect
    .element(screen.getByRole('textbox', { name: 'Cliente' }))
    .toHaveValue('')
})

it('shows a message when the API fails', async () => {
  const { http, HttpResponse } = await import('msw')
  worker.use(
    http.post('/api/orders', () => new HttpResponse(null, { status: 500 })),
  )
  const screen = await renderWithQuery(<CreateOrderForm />)

  await screen.getByRole('textbox', { name: 'Cliente' }).fill('ACME')
  await screen.getByRole('spinbutton', { name: 'Totale (€)' }).fill('10')
  await screen.getByRole('button', { name: 'Crea ordine' }).click()

  await expect
    .element(screen.getByText("Impossibile creare l'ordine. Riprova."))
    .toBeVisible()
})
