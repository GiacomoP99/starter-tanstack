import { useQuery } from '@tanstack/react-query'
import { ErrorState } from '@/components/common/error-state'
import { ListSkeleton } from '@/components/common/list-skeleton'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { m } from '@/lib/i18n'
import { anagraficaQueries } from '../api/queries'
import { AttentionList } from '../components/attention-list'

interface AttentionAllModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Full list of attention items. The request starts only when the modal
 * opens (`enabled: open`) and is cached afterwards.
 */
export function AttentionAllModal({
  open,
  onOpenChange,
}: AttentionAllModalProps) {
  const query = useQuery({ ...anagraficaQueries.attentionAll(), enabled: open })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        closeLabel={m.common_close()}
        className="grid-rows-[auto_minmax(0,1fr)] sm:max-w-2xl"
      >
        <DialogHeader>
          <DialogTitle>{m.anagrafica_attention_all_title()}</DialogTitle>
          {query.data && (
            <DialogDescription>
              {m.anagrafica_attention_all_description({
                count: query.data.total,
              })}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="min-h-0 overflow-y-auto pr-2">
          {query.isPending ? (
            <ListSkeleton rows={6} />
          ) : query.isError ? (
            <ErrorState onRetry={() => query.refetch()} />
          ) : (
            <AttentionList items={query.data.items} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
