import type {
  AnagraficaCounters,
  AttentionItem,
  AttentionPage,
  AutomaticDiscards,
  RecentActivityItem,
  StatusCount,
} from '@/api/generated/model'

/** Realistic data for the Anagrafica dashboard (dev mocks + tests). */

const minutesAgo = (min: number) =>
  new Date(Date.now() - min * 60_000).toISOString()

export const recentActivityFixture = (): RecentActivityItem[] => [
  {
    id: 'C-10231',
    kind: 'CONTRAENTE',
    label: 'Costruzioni Meridionali S.p.A.',
    version: 3,
    updatedAt: minutesAgo(2),
  },
  {
    id: 'C-10877',
    kind: 'CONTRAENTE',
    label: 'Amendola Raffaele',
    updatedAt: minutesAgo(20),
  },
  {
    id: 'SF-1905',
    kind: 'SCHEDA_FIDO',
    label: 'Scheda fido 1905',
    updatedAt: minutesAgo(26 * 60),
  },
  {
    id: 'C-09412',
    kind: 'CONTRAENTE',
    label: 'Vesuvio Infrastrutture S.p.A.',
    updatedAt: minutesAgo(27 * 60),
  },
]

const firstAttentionItems: AttentionItem[] = [
  {
    id: 'A-1',
    title: 'Documento in scadenza',
    subject: 'Bilancio ufficiale · Costruzioni Meridionali S.p.A.',
    priority: 'HIGH',
    dueInDays: 6,
    target: { section: 'contraenti', id: 'C-10231' },
  },
  {
    id: 'A-2',
    title: 'Revisione aperta da 14 gg',
    subject: 'Vesuvio Infrastrutture S.p.A.',
    priority: 'NORMAL',
    target: { section: 'contraenti', id: 'C-09412' },
  },
  {
    id: 'A-3',
    title: 'Proposta fido in attesa delibera',
    subject: 'Consorzio Portuale Levante',
    priority: 'HIGH',
    dueInDays: 3,
    target: { section: 'schede-fido', id: 'SF-2210' },
  },
  {
    id: 'A-4',
    title: 'Mandato sospeso',
    subject: 'A021 - MEDIAZIONI IRPINE S.R.L.',
    priority: 'NORMAL',
    target: { section: 'mandati-intermediari', id: 'A021' },
  },
  {
    id: 'A-5',
    title: 'Documento scaduto',
    subject: 'DURC · Edilizia Sannita S.r.l.',
    priority: 'HIGH',
    expired: true,
    target: { section: 'contraenti', id: 'C-11002' },
  },
]

const allAttentionItems: AttentionItem[] = [
  ...firstAttentionItems,
  ...Array.from(
    { length: 18 },
    (_, i): AttentionItem => ({
      id: `A-${i + 6}`,
      title: i % 2 === 0 ? 'Documento in scadenza' : 'Revisione da completare',
      subject: `Contraente di esempio ${i + 1} S.r.l.`,
      priority: 'NORMAL',
      dueInDays: i % 2 === 0 ? 10 + i : null,
      target: { section: 'contraenti', id: `C-2${String(i).padStart(4, '0')}` },
    }),
  ),
]

export const attentionFixture = (limit = 5): AttentionPage => ({
  items: allAttentionItems.slice(0, limit),
  total: allAttentionItems.length,
})

export const statusSummaryFixture = (): StatusCount[] => [
  { status: 'ATTIVO', count: 10 },
  { status: 'NUOVA_REVISIONE', count: 3 },
  { status: 'ANNULLATO', count: 1 },
  { status: 'ATTIVO_TEMPORANEO', count: 1 },
  { status: 'ATTIVO_TEMPORANEO_SCADUTO', count: 1 },
]

export const countersFixture = (): AnagraficaCounters => ({
  contraenti: {
    revisioniInCorso: 106,
    attivazioniTemporanee: 16,
    documentiInScadenza: 8,
  },
  schedeFido: {
    inIstruttoriaDirezione: 11,
    inDeliberaPrimoLivello: 5,
    bloccate: 4,
  },
  mandati: { revocaRichiesta: 2, attesaAttivazione: 1, daTrasmettereIvass: 3 },
})

export const automaticDiscardsFixture = (): AutomaticDiscards => {
  const lastRun = new Date()
  lastRun.setHours(4, 0, 0, 0)
  return {
    lastRunAt: lastRun.toISOString(),
    jobs: ['REVISIONI_ANNULLATE', 'PROPOSTE_FIDO_ANNULLATE'],
  }
}
