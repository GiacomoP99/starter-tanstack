import { useSuspenseQuery } from '@tanstack/react-query'
import { anagraficaQueries } from '../api/queries'
import { AutomaticDiscardsBar } from '../components/automatic-discards-bar'

export function AutomaticDiscardsInfo() {
  const { data } = useSuspenseQuery(anagraficaQueries.automaticDiscards())
  return <AutomaticDiscardsBar data={data} />
}
