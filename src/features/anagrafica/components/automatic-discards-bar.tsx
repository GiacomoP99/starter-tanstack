import type { AutomaticDiscards } from '@/api/generated/model'
import { formatDayTime } from '@/lib/format'
import { m } from '@/lib/i18n'
import { discardJobLabels } from '../utils/labels'

export function AutomaticDiscardsBar({ data }: { data: AutomaticDiscards }) {
  return (
    <footer className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t pt-3 text-xs text-muted-foreground">
      <span className="font-semibold text-foreground">
        {m.discards_title()}
      </span>
      <span>{data.jobs.map((job) => discardJobLabels[job]()).join(' · ')}</span>
      <span className="ml-auto">
        {m.discards_last_run({ when: formatDayTime(data.lastRunAt) })}
      </span>
    </footer>
  )
}
