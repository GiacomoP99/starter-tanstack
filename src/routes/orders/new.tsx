import { createFileRoute } from '@tanstack/react-router'
import { NewOrderPage } from '@/features/orders'
import { m } from '@/lib/i18n'

export const Route = createFileRoute('/orders/new')({
  staticData: { title: m.nav_new_order },
  component: NewOrderPage,
})
