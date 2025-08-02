import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
  type SortingState,
} from '@tanstack/react-table'
import {
  Table as MantineTable,
  Text,
  Button,
  Select,
  Group,
  Box,
  Table,
} from '@mantine/core'

export const DEFAULT_PAGE_INDEX = 0
export const DEFAULT_PAGE_SIZE = 10

type Props<T extends object> = {
  data: T[]
  columns: ColumnDef<T, any>[]
  pagination: PaginationState
  onPaginationChange: (updaterOrValue: PaginationState | ((old: PaginationState) => PaginationState)) => void
  totalCount: number
  sorting: SortingState
  onSortingChange: (updaterOrValue: SortingState | ((old: SortingState) => SortingState)) => void
}


export default function ServerTable<T extends object>({
  data,
  columns,
  pagination,
  onPaginationChange,
  totalCount,
  sorting,
  onSortingChange,
}: Props<T>) {
  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      sorting,
    },
    onPaginationChange,
    onSortingChange,
    manualPagination: true,
    manualSorting: true,
    pageCount: Math.ceil(totalCount / pagination.pageSize),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <Box>
      <MantineTable striped highlightOnHover withTableBorder>
        <Table.Thead>
          {table.getHeaderGroups().map(headerGroup => (
            <Table.Tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <Table.Th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
                >
                  <Group gap="xs">
                    <Text fw={500}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </Text>
                    {{
                      asc: '↑',
                      desc: '↓',
                    }[header.column.getIsSorted() as string] ?? null}
                  </Group>
                </Table.Th>
              ))}
            </Table.Tr>
          ))}
        </Table.Thead>
        <Table.Tbody>
          {table.getRowModel().rows.map(row => (
            <Table.Tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <Table.Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </MantineTable>

      <Group mt="md" justify="space-between">
        <Group>
          <Button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            variant="light"
          >
            {'<<'}
          </Button>
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            variant="light"
          >
            {'<'}
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            variant="light"
          >
            {'>'}
          </Button>
          <Button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            variant="light"
          >
            {'>>'}
          </Button>
        </Group>

        <Text size="sm">
          Page {pagination.pageIndex + 1} of {table.getPageCount()}
        </Text>

        <Select
          data={['10', '20', '30', '40', '50']}
          value={pagination.pageSize.toString()}
          onChange={value =>
            onPaginationChange({
              ...pagination,
              pageSize: Number(value),
            })
          }
          placeholder="Page size"
          maw={100}
        />
      </Group>
    </Box>
  )
}
