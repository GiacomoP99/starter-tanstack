import type { QueryClient } from '@tanstack/react-query'
import {
  getGetAnagraficaCountersSuspenseQueryOptions,
  getGetAttentionItemsQueryOptions,
  getGetAttentionItemsSuspenseQueryOptions,
  getGetAutomaticDiscardsSuspenseQueryOptions,
  getGetContraentiStatusSummarySuspenseQueryOptions,
  getGetRecentActivitySuspenseQueryOptions,
} from '@/api/generated/endpoints/anagrafica/anagrafica'

/**
 * The feature's single source of truth for queries: containers, the route
 * loader and the modal all use these, so params and cache keys never drift.
 * The functions themselves are Orval-generated – never write fetch code here.
 */

export const ATTENTION_PREVIEW_LIMIT = 5
const ATTENTION_ALL_LIMIT = 100

export const anagraficaQueries = {
  recentActivity: () => getGetRecentActivitySuspenseQueryOptions(),
  attentionPreview: () =>
    getGetAttentionItemsSuspenseQueryOptions({
      limit: ATTENTION_PREVIEW_LIMIT,
    }),
  /** Non-suspense: loaded on demand when the "see all" modal opens. */
  attentionAll: () =>
    getGetAttentionItemsQueryOptions({ limit: ATTENTION_ALL_LIMIT }),
  statusSummary: () => getGetContraentiStatusSummarySuspenseQueryOptions(),
  counters: () => getGetAnagraficaCountersSuspenseQueryOptions(),
  automaticDiscards: () => getGetAutomaticDiscardsSuspenseQueryOptions(),
}

/**
 * Start every dashboard request in parallel from the route loader.
 * `prefetchQuery` never throws: a failing endpoint shows its own error state
 * inside its section instead of failing the whole page.
 */
export async function prefetchAnagraficaDashboard(queryClient: QueryClient) {
  await Promise.all([
    queryClient.prefetchQuery(anagraficaQueries.recentActivity()),
    queryClient.prefetchQuery(anagraficaQueries.attentionPreview()),
    queryClient.prefetchQuery(anagraficaQueries.statusSummary()),
    queryClient.prefetchQuery(anagraficaQueries.counters()),
    queryClient.prefetchQuery(anagraficaQueries.automaticDiscards()),
  ])
}
