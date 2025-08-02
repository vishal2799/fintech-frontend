import { useMemo } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import ServerTable, {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from '../../../components/ServerTable2'
import { AUDIT_LOG_EXPORT_COLUMNS, exportAuditLogs, fetchAuditLogs, type AuditLogFilters } from '../api/auditLogss.api'
import { useTableFilters } from '../../../hooks/useTableFilters'
import { sortByToState, stateToSortBy } from '../../../utils/tableSortMapper'
import { AUDIT_LOG_COLUMNS } from '../../../utils/auditLogColumns'
import { TextInput, Button, Group } from '@mantine/core'
import type { SortParams } from '../../../types/types'
import { ExportMenu } from '../../../components/ExportMenu2'

export default function AuditLogsPage() {
  const { filters, setFilters, resetFilters } = useTableFilters()

  const { data } = useQuery({
    queryKey: ['auditLogs', filters],
    queryFn: () => fetchAuditLogs(filters as AuditLogFilters),
    placeholderData: keepPreviousData
    // placeholderData: { result: [], rowCount: 0 },
  })

  const paginationState = {
    pageIndex: filters.pageIndex ?? DEFAULT_PAGE_INDEX,
    pageSize: filters.pageSize ?? DEFAULT_PAGE_SIZE,
  }

  const sortingState = sortByToState(filters.sortBy as SortParams['sortBy'])
  //const sortingState = sortByToState(filters.sortBy)
  const columns = useMemo(() => AUDIT_LOG_COLUMNS, [])

  return (
    <div className="p-4 space-y-4">
      <Group align="flex-end">
        <TextInput
          label="Search"
          value={filters.search || ''}
          onChange={e => setFilters({ search: e.target.value, pageIndex: 0 })}
          placeholder="Search in activity, module..."
        />
        <Button onClick={() => resetFilters()} disabled={Object.keys(filters).length === 0}>
          Reset
        </Button>
              <ExportMenu
  title="Audit Logs"
  columns={AUDIT_LOG_EXPORT_COLUMNS}
  data={data?.result ?? []}
  onExportAll={() => exportAuditLogs({ type: 'all' })}
  onExportFiltered={() =>
    exportAuditLogs({ type: 'filtered', filters: { ...filters, pageIndex: 0, pageSize: 10000 } })
  }
/>
      </Group>

      <ServerTable
        data={data?.result ?? []}
        columns={columns}
        pagination={paginationState}
        onPaginationChange={updater => {
          const next =
            typeof updater === 'function' ? updater(paginationState) : updater
          setFilters(next)
        }}
        totalCount={data?.rowCount ?? 0}
        sorting={sortingState}
        onSortingChange={updater => {
          const next =
            typeof updater === 'function' ? updater(sortingState) : updater
          setFilters({ sortBy: stateToSortBy(next) })
        }}
      />
    </div>
  )
}

// import { useMemo } from 'react'
// import { useSearchParams } from 'react-router'
// import { useQuery, keepPreviousData } from '@tanstack/react-query'
// import { fetchAuditLogs } from '../api/auditLogss.api'
// import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '../../../components/table'
// import { cleanEmptyParams } from '../../../utils/cleanEmptyParams'
// import { sortByToState, stateToSortBy } from '../../../utils/tableSortMapper'
// import { AUDIT_LOG_COLUMNS } from '../../../utils/auditLogColumns'
// import Table from '../../../components/table'
// import type { SortParams } from '../../../types/types'

// export default function AuditLogsPage() {
//   const [searchParams, setSearchParams] = useSearchParams()
//   const filters = Object.fromEntries(searchParams.entries())

//   const setFilters = (partial: Record<string, any>) => {
//     const merged = { ...filters, ...partial }
//     setSearchParams(cleanEmptyParams(merged), { replace: true })
//   }

//   const resetFilters = () => setSearchParams({}, { replace: true })

//   const paginationState = {
//     pageIndex: Number(filters.pageIndex ?? DEFAULT_PAGE_INDEX),
//     pageSize: Number(filters.pageSize ?? DEFAULT_PAGE_SIZE),
//   }

// //   const sortingState = sortByToState(filters.sortBy)
// const sortingState = sortByToState(filters.sortBy as SortParams['sortBy'])

//   const { data } = useQuery({
//     queryKey: ['auditLogs', filters],
//     queryFn: () => fetchAuditLogs(filters),
//     placeholderData: keepPreviousData,
//   })


//   const columns = useMemo(() => AUDIT_LOG_COLUMNS, [])

//   return (
//     <div className="p-4 flex flex-col gap-2">
//       <h1 className="text-xl font-semibold mb-2">Audit Logs</h1>
//       <Table
//         data={data?.result ?? []}
//         columns={columns}
//         pagination={paginationState}
//         paginationOptions={{
//           rowCount: data?.rowCount ?? 0,
//           onPaginationChange: updater => {
//             const updated =
//               typeof updater === 'function'
//                 ? updater(paginationState)
//                 : updater
//             setFilters(updated)
//           },
//         }}
//         filters={filters}
//         onFilterChange={setFilters}
//         sorting={sortingState}
//         onSortingChange={updaterOrValue => {
//           const newSorting =
//             typeof updaterOrValue === 'function'
//               ? updaterOrValue(sortingState)
//               : updaterOrValue
//           setFilters({ sortBy: stateToSortBy(newSorting) })
//         }}
//       />
//       <div className="flex items-center gap-2">
//         {data?.rowCount ?? 0} logs found
//         <button
//           className="border rounded p-1 text-sm disabled:opacity-50"
//           onClick={resetFilters}
//           disabled={Object.keys(filters).length === 0}
//         >
//           Reset Filters
//         </button>
//       </div>
//     </div>
//   )
// }
