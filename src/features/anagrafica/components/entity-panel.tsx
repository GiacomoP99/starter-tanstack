import type { AnagraficaSection } from '@/api/generated/model'
import { ArrowLink } from '@/components/common/links'
import { QuickOpenField } from '@/components/common/quick-open-field'
import { cn } from '@/lib/utils'
import type { CounterLink } from '../types'
import { sectionTitles } from '../utils/sections'
import { CounterList } from './counter-list'

interface EntityPanelProps {
  section: AnagraficaSection
  quickOpenLabel: string
  onQuickOpen: (value: string) => void
  counters: CounterLink[]
  className?: string
}

/** Card for one entity type: title link, quick open, work-queue counters. */
export function EntityPanel({
  section,
  quickOpenLabel,
  onQuickOpen,
  counters,
  className,
}: EntityPanelProps) {
  return (
    <section
      aria-label={sectionTitles[section]()}
      className={cn(
        'flex flex-col gap-5 rounded-lg border bg-card p-4',
        className,
      )}
    >
      <ArrowLink
        to="/anagrafica/$section"
        params={{ section }}
        className="self-start"
      >
        {sectionTitles[section]()}
      </ArrowLink>
      <QuickOpenField label={quickOpenLabel} onOpen={onQuickOpen} />
      <CounterList items={counters} />
    </section>
  )
}
