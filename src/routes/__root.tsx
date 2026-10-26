import type { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AppShell } from '@/components/layout/app-shell'
import { m } from '@/lib/i18n'

export interface RouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  notFoundComponent: () => (
    <p className="text-muted-foreground">{m.not_found()}</p>
  ),
})

function RootLayout() {
  return (
    <AppShell>
      <Outlet />
      {import.meta.env.DEV && (
        <>
          {/* Both bottom-right, side by side, clear of the sidebar */}
          <TanStackRouterDevtools
            position="bottom-right"
            toggleButtonProps={{ style: { right: '4.5rem' } }}
          />
          <ReactQueryDevtools buttonPosition="bottom-right" />
        </>
      )}
    </AppShell>
  )
}
