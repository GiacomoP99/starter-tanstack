import {
  createColumnHelper,
  createSortedRowModel,
  rowSortingFeature,
  sortFns,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import type { MonthlyMetric } from '@/api/generated/model'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrency } from '@/lib/format'
import { m } from '@/lib/i18n'

const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns,
})

const helper = createColumnHelper<typeof features, MonthlyMetric>()

const columns = helper.columns([
  helper.accessor('month', { header: () => m.metrics_col_month() }),
  helper.accessor('orders', { header: () => m.metrics_col_orders() }),
  helper.accessor('revenue', {
    header: () => m.metrics_col_revenue(),
    cell: (info) => formatCurrency(info.getValue()),
  }),
])

export function MetricsTable({ data }: { data: MonthlyMetric[] }) {
  const table = useTable({ features, columns, data })

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((group) => (
          <TableRow key={group.id}>
            {group.headers.map((header) => {
              const sorted = header.column.getIsSorted()
              const SortIcon =
                sorted === 'asc'
                  ? ArrowUp
                  : sorted === 'desc'
                    ? ArrowDown
                    : ArrowUpDown
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : (
                    <button
                      type="button"
                      className="inline-flex items-center gap-1"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <table.FlexRender header={header} />
                      <SortIcon className="size-3.5 text-muted-foreground" />
                    </button>
                  )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getAllCells().map((cell) => (
              <TableCell key={cell.id}>
                <table.FlexRender cell={cell} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
