import { barY, defineChart } from '@tanstack/charts'
import { Chart } from '@tanstack/charts/react'
import { scaleBand } from '@tanstack/charts/scales/band'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { tooltip } from '@tanstack/charts/tooltip'
import { useMemo } from 'react'
import type { MonthlyMetric } from '@/api/generated/model'
import { formatCurrency } from '@/lib/format'
import { m } from '@/lib/i18n'

export function RevenueChart({ data }: { data: readonly MonthlyMetric[] }) {
  // Memoize the whole definition; a new identity rebuilds the chart.
  const definition = useMemo(
    () =>
      defineChart({
        marks: [barY(data, { x: 'month', y: 'revenue', inset: 2 })],
        scales: {
          x: { scale: () => scaleBand().padding(0.2) },
          y: {
            scale: scaleLinear,
            nice: true,
            grid: true,
            axis: { ticks: { format: (value) => formatCurrency(value) } },
          },
        },
        tooltip,
      }),
    [data],
  )

  return (
    <Chart
      definition={definition}
      height={288}
      ariaLabel={m.demo_revenue_chart_label()}
      className="text-muted-foreground"
    />
  )
}
