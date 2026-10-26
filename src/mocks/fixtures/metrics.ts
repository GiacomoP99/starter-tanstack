import type { MonthlyMetric } from '@/api/generated/model'

export const monthlyMetricsFixture: MonthlyMetric[] = [
  { month: '2026-01', orders: 120, revenue: 18_400 },
  { month: '2026-02', orders: 98, revenue: 15_100 },
  { month: '2026-03', orders: 143, revenue: 21_900 },
  { month: '2026-04', orders: 161, revenue: 24_300 },
  { month: '2026-05', orders: 152, revenue: 23_050 },
  { month: '2026-06', orders: 188, revenue: 28_700 },
]
