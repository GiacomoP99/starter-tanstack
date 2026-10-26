import { barX, defineChart } from '@tanstack/charts'
import { Chart } from '@tanstack/charts/react'
import { scaleBand } from '@tanstack/charts/scales/band'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { tooltip } from '@tanstack/charts/tooltip'
import { useMemo } from 'react'
import type { StatusCount } from '@/api/generated/model'
import { m } from '@/lib/i18n'
import { contraenteStatusLabels } from '../utils/labels'

export function ContraentiStatusChart({ data }: { data: StatusCount[] }) {
  const definition = useMemo(() => {
    const rows = data.map((d) => ({
      label: contraenteStatusLabels[d.status](),
      count: d.count,
    }))
    return defineChart({
      marks: [barX(rows, { x: 'count', y: 'label', inset: 4 })],
      scales: {
        y: {
          // keep the API order (it is meaningful: active first)
          scale: () =>
            scaleBand<string>()
              .domain(rows.map((r) => r.label))
              .padding(0.35),
        },
        x: { scale: scaleLinear, nice: true, grid: true },
      },
      tooltip,
    })
  }, [data])

  return (
    <Chart
      definition={definition}
      height={220}
      ariaLabel={m.anagrafica_status_chart_label()}
      className="text-hero-foreground"
    />
  )
}
