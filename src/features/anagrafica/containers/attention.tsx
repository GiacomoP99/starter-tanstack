import { useSuspenseQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { m } from '@/lib/i18n'
import { anagraficaQueries } from '../api/queries'
import { AttentionList } from '../components/attention-list'
import { AttentionAllModal } from '../modals/attention-all-modal'

export function Attention() {
  const { data } = useSuspenseQuery(anagraficaQueries.attentionPreview())
  const [showAll, setShowAll] = useState(false)

  return (
    <>
      <AttentionList
        items={data.items}
        className="max-h-48 overflow-y-auto pr-2"
      />
      {data.total > data.items.length && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="mt-3 text-sm font-semibold underline underline-offset-4 hover:no-underline"
        >
          {m.anagrafica_attention_see_all({ count: data.total })}
        </button>
      )}
      <AttentionAllModal open={showAll} onOpenChange={setShowAll} />
    </>
  )
}
