import { useSuspenseQuery } from '@tanstack/react-query'
import { m } from '@/lib/i18n'
import { anagraficaQueries } from '../api/queries'
import { EntityPanel } from '../components/entity-panel'
import { useOpenSection } from '../hooks/use-open-section'

/*
 * The three panels share one counters request (TanStack Query dedupes it),
 * but each is its own container so it can sit anywhere in the page grid and
 * load/fail independently.
 */

export function ContraentiPanel({ className }: { className?: string }) {
  const { data } = useSuspenseQuery(anagraficaQueries.counters())
  const open = useOpenSection()
  const c = data.contraenti

  return (
    <EntityPanel
      className={className}
      section="contraenti"
      quickOpenLabel={m.quickopen_contraenti()}
      onQuickOpen={(q) => open('contraenti', q)}
      counters={[
        {
          id: 'new',
          label: m.counter_nuovo_contraente(),
          section: 'contraenti',
          filter: 'nuovo',
        },
        {
          id: 'revisions',
          label: m.counter_revisioni_in_corso(),
          count: c.revisioniInCorso,
          section: 'contraenti',
          filter: 'revisioni-in-corso',
        },
        {
          id: 'temporary',
          label: m.counter_attivazioni_temporanee(),
          count: c.attivazioniTemporanee,
          section: 'contraenti',
          filter: 'attivazioni-temporanee',
        },
        {
          id: 'expiring',
          label: m.counter_documenti_in_scadenza(),
          count: c.documentiInScadenza,
          section: 'contraenti',
          filter: 'documenti-in-scadenza',
        },
      ]}
    />
  )
}

export function SchedeFidoPanel({ className }: { className?: string }) {
  const { data } = useSuspenseQuery(anagraficaQueries.counters())
  const open = useOpenSection()
  const s = data.schedeFido

  return (
    <EntityPanel
      className={className}
      section="schede-fido"
      quickOpenLabel={m.quickopen_schede_fido()}
      onQuickOpen={(q) => open('schede-fido', q)}
      counters={[
        {
          id: 'review',
          label: m.counter_in_istruttoria_direzione(),
          count: s.inIstruttoriaDirezione,
          section: 'schede-fido',
          filter: 'istruttoria-direzione',
        },
        {
          id: 'approval',
          label: m.counter_in_delibera_primo_livello(),
          count: s.inDeliberaPrimoLivello,
          section: 'schede-fido',
          filter: 'delibera-primo-livello',
        },
        {
          id: 'blocked',
          label: m.counter_bloccate(),
          count: s.bloccate,
          section: 'schede-fido',
          filter: 'bloccate',
        },
      ]}
    />
  )
}

export function MandatiPanel({ className }: { className?: string }) {
  const { data } = useSuspenseQuery(anagraficaQueries.counters())
  const open = useOpenSection()
  const md = data.mandati

  return (
    <EntityPanel
      className={className}
      section="mandati-intermediari"
      quickOpenLabel={m.quickopen_mandati()}
      onQuickOpen={(q) => open('mandati-intermediari', q)}
      counters={[
        {
          id: 'revoke',
          label: m.counter_revoca_richiesta(),
          count: md.revocaRichiesta,
          section: 'mandati-intermediari',
          filter: 'revoca-richiesta',
        },
        {
          id: 'activation',
          label: m.counter_attesa_attivazione(),
          count: md.attesaAttivazione,
          section: 'mandati-intermediari',
          filter: 'attesa-attivazione',
        },
        {
          id: 'ivass',
          label: m.counter_da_trasmettere_ivass(),
          count: md.daTrasmettereIvass,
          section: 'mandati-intermediari',
          filter: 'da-trasmettere-ivass',
        },
      ]}
    />
  )
}
