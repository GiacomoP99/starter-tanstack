import { useSuspenseQuery } from '@tanstack/react-query'
import { anagraficaQueries } from '../api/queries'
import { ContraentiStatusChart } from '../components/contraenti-status-chart'

export function ContraentiStatus() {
  const { data } = useSuspenseQuery(anagraficaQueries.statusSummary())
  return <ContraentiStatusChart data={data} />
}
