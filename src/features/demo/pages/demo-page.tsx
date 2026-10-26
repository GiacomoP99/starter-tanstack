import { useSuspenseQuery } from '@tanstack/react-query'
import { getGetMonthlyMetricsSuspenseQueryOptions } from '@/api/generated/endpoints/metrics/metrics'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { m } from '@/lib/i18n'
import { MetricsTable } from '../components/metrics-table'
import { RevenueChart } from '../components/revenue-chart'

export const demoMetricsQuery = getGetMonthlyMetricsSuspenseQueryOptions

export function DemoPage() {
  const { data } = useSuspenseQuery(demoMetricsQuery())

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{m.demo_revenue_title()}</CardTitle>
          <CardDescription>{m.demo_revenue_description()}</CardDescription>
        </CardHeader>
        <CardContent>
          <RevenueChart data={data} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{m.demo_metrics_title()}</CardTitle>
          <CardDescription>{m.demo_metrics_description()}</CardDescription>
        </CardHeader>
        <CardContent>
          <MetricsTable data={data} />
        </CardContent>
      </Card>
    </div>
  )
}
