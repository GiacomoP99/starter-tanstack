import { createFileRoute } from '@tanstack/react-router'
import { DemoPage, demoMetricsQuery } from '@/features/demo'
import { m } from '@/lib/i18n'

export const Route = createFileRoute('/demo')({
  staticData: { title: m.nav_demo },
  // Prefetch in the loader so the page renders with data (and preloads on hover).
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(demoMetricsQuery()),
  pendingComponent: () => (
    <p className="text-muted-foreground">{m.common_loading()}</p>
  ),
  component: DemoPage,
})
