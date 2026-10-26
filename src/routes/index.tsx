import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '@/features/home'
import { m } from '@/lib/i18n'

export const Route = createFileRoute('/')({
  staticData: { title: m.nav_scrivania },
  component: HomePage,
})
