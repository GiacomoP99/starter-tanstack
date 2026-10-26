import { useSuspenseQuery } from '@tanstack/react-query'
import { anagraficaQueries } from '../api/queries'
import { RecentActivityList } from '../components/recent-activity-list'

export function RecentActivity() {
  const { data } = useSuspenseQuery(anagraficaQueries.recentActivity())
  return <RecentActivityList items={data} />
}
