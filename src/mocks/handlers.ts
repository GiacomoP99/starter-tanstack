import type { RequestHandler } from 'msw'
import {
  getGetAnagraficaCountersMockHandler,
  getGetAttentionItemsMockHandler,
  getGetAutomaticDiscardsMockHandler,
  getGetContraentiStatusSummaryMockHandler,
  getGetRecentActivityMockHandler,
} from '@/api/generated/endpoints/anagrafica/anagrafica.msw'
import * as generated from '@/api/generated/endpoints/index.msw'
import { getGetMonthlyMetricsMockHandler } from '@/api/generated/endpoints/metrics/metrics.msw'
import {
  attentionFixture,
  automaticDiscardsFixture,
  countersFixture,
  recentActivityFixture,
  statusSummaryFixture,
} from './fixtures/anagrafica'
import { monthlyMetricsFixture } from './fixtures/metrics'

/**
 * Hand-written overrides go first: MSW uses the first matching handler.
 * Use them when Faker data isn't realistic enough for a screen.
 * Keep the data itself in `./fixtures/<feature>.ts` so tests can reuse it.
 */
const overrides: RequestHandler[] = [
  getGetMonthlyMetricsMockHandler(monthlyMetricsFixture),
  getGetRecentActivityMockHandler(recentActivityFixture),
  getGetAttentionItemsMockHandler(({ request }) => {
    const limit = Number(new URL(request.url).searchParams.get('limit') ?? 5)
    return attentionFixture(limit)
  }),
  getGetContraentiStatusSummaryMockHandler(statusSummaryFixture),
  getGetAnagraficaCountersMockHandler(countersFixture),
  getGetAutomaticDiscardsMockHandler(automaticDiscardsFixture),
]

// Every generated `get<Tag>Mock()` returns that tag's Faker handlers.
const generatedHandlers = Object.values(generated).flatMap((getMock) =>
  getMock(),
)

export const handlers: RequestHandler[] = [...overrides, ...generatedHandlers]
