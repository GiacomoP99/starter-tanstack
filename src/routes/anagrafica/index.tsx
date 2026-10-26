import { createFileRoute } from '@tanstack/react-router'
import {
  AnagraficaDashboardPage,
  prefetchAnagraficaDashboard,
} from '@/features/anagrafica'

export const Route = createFileRoute('/anagrafica/')({
  loader: ({ context }) => prefetchAnagraficaDashboard(context.queryClient),
  component: AnagraficaDashboardPage,
})
