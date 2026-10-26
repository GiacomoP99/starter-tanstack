import { createRouter } from '@tanstack/react-router'
import { queryClient } from '@/lib/query-client'
import { routeTree } from './routeTree.gen'

export const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  // Let TanStack Query own caching; the router just triggers loaders.
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
  /** Per-route metadata, set with `staticData` on a route. */
  interface StaticDataRouteOption {
    /**
     * Shown in the header breadcrumb. A function so it follows the locale;
     * receives the route params for dynamic titles.
     */
    title?: (params: Record<string, string>) => string
  }
}
