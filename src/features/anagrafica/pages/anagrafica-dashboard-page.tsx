import { LinkCard } from '@/components/common/links'
import { ListSkeleton } from '@/components/common/list-skeleton'
import { QueryBoundary } from '@/components/common/query-boundary'
import { SectionHeader } from '@/components/common/section-header'
import { Skeleton } from '@/components/ui/skeleton'
import { m } from '@/lib/i18n'
import { OverviewColumn, OverviewPanel } from '../components/overview-panel'
import { Attention } from '../containers/attention'
import { AutomaticDiscardsInfo } from '../containers/automatic-discards'
import { ContraentiStatus } from '../containers/contraenti-status'
import {
  ContraentiPanel,
  MandatiPanel,
  SchedeFidoPanel,
} from '../containers/entity-panels'
import { RecentActivity } from '../containers/recent-activity'
import type { AnagraficaSection } from '../utils/sections'
import { sectionTitles } from '../utils/sections'

/*
 * Page = layout only. Every data-driven block is a container wrapped in its
 * own QueryBoundary, so one slow or failing endpoint never blocks the rest.
 *
 * Desktop grid (DOM order is the mobile order):
 *   hs hs hr      hs = "Soggetti e affidamento" header, hr = "Rete distributiva"
 *   c  s  m       contraenti, schede fido, mandati
 *   hc hc .       hc = "Controparti e operatori"
 *   o  co sub     link cards
 *   n  p  rep
 */
const gridAreas =
  "lg:grid-cols-3 lg:[grid-template-areas:'hs_hs_hr'_'c_s_m'_'hc_hc_.'_'o_co_sub'_'n_p_rep']"

const panelFallback = <Skeleton className="h-56 rounded-lg" />

export function AnagraficaDashboardPage() {
  return (
    <div className="space-y-8">
      <OverviewPanel title={m.anagrafica_title()}>
        <OverviewColumn title={m.anagrafica_resume_title()}>
          <QueryBoundary fallback={<ListSkeleton />}>
            <RecentActivity />
          </QueryBoundary>
        </OverviewColumn>
        <OverviewColumn title={m.anagrafica_attention_title()}>
          <QueryBoundary fallback={<ListSkeleton rows={5} />}>
            <Attention />
          </QueryBoundary>
        </OverviewColumn>
        <OverviewColumn title={m.anagrafica_status_title()}>
          <QueryBoundary fallback={<Skeleton className="h-52 bg-white/10" />}>
            <ContraentiStatus />
          </QueryBoundary>
        </OverviewColumn>
      </OverviewPanel>

      <div className={`grid gap-x-3 gap-y-3 ${gridAreas}`}>
        <SectionHeader
          title={m.anagrafica_group_soggetti()}
          className="mt-2 mb-1 lg:[grid-area:hs]"
        />
        <QueryBoundary fallback={panelFallback}>
          <ContraentiPanel className="lg:[grid-area:c]" />
        </QueryBoundary>
        <QueryBoundary fallback={panelFallback}>
          <SchedeFidoPanel className="lg:[grid-area:s]" />
        </QueryBoundary>

        <SectionHeader
          title={m.anagrafica_group_rete()}
          className="mt-2 mb-1 lg:[grid-area:hr]"
        />
        <QueryBoundary fallback={panelFallback}>
          <MandatiPanel className="lg:[grid-area:m]" />
        </QueryBoundary>

        <SectionHeader
          title={m.anagrafica_group_controparti()}
          className="mt-6 mb-1 lg:[grid-area:hc]"
        />
        <SectionLinkCard
          section="operatori-direzione"
          area="lg:[grid-area:o]"
        />
        <SectionLinkCard
          section="compagnie-assicurative"
          area="lg:[grid-area:co]"
        />
        <SectionLinkCard section="notai" area="lg:[grid-area:n]" />
        <SectionLinkCard section="prestatori-servizi" area="lg:[grid-area:p]" />
        <SectionLinkCard section="sub-intermediari" area="lg:[grid-area:sub]" />
        <SectionLinkCard
          section="report-dati-intermediari"
          area="lg:[grid-area:rep]"
        />
      </div>

      <QueryBoundary fallback={null} errorFallback={() => null}>
        <AutomaticDiscardsInfo />
      </QueryBoundary>
    </div>
  )
}

function SectionLinkCard({
  section,
  area,
}: {
  section: AnagraficaSection
  area: string
}) {
  return (
    <LinkCard to="/anagrafica/$section" params={{ section }} className={area}>
      {sectionTitles[section]()}
    </LinkCard>
  )
}
