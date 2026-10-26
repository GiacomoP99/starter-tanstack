import { createFileRoute, Outlet } from '@tanstack/react-router'
import { m } from '@/lib/i18n'

/** Layout route for /anagrafica/*: contributes the breadcrumb segment. */
export const Route = createFileRoute('/anagrafica')({
  staticData: { title: m.nav_anagrafica },
  component: Outlet,
})
