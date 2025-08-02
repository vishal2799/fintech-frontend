import { type ColumnDef } from '@tanstack/react-table'
import type { AuditLog } from '../portals/super-admin/api/auditLogss.api'

export const AUDIT_LOG_COLUMNS: ColumnDef<AuditLog, any>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Time',
    cell: info => new Date(info.getValue() as string).toLocaleString(),
  },
  {
    accessorKey: 'activity',
    header: 'Activity',
  },
  {
    accessorKey: 'module',
    header: 'Module',
  },
  {
    accessorKey: 'method',
    header: 'Method',
  },
  {
    accessorKey: 'url',
    header: 'URL',
  },
  {
    accessorKey: 'actorType',
    header: 'Actor Type',
  },
  {
    accessorKey: 'actorId',
    header: 'Actor ID',
  },
]


// import { type ColumnDef } from '@tanstack/react-table'
// import { type AuditLog } from '../portals/super-admin/types/auditLogs.types'

// export const AUDIT_LOG_COLUMNS: ColumnDef<AuditLog>[] = [
//   {
//     accessorKey: 'createdAt',
//     header: 'Timestamp',
//     meta: { filterKey: 'createdAt' },
//   },
//   {
//     accessorKey: 'actorId',
//     header: 'User ID',
//     meta: { filterKey: 'actorId' },
//   },
//   {
//     accessorKey: 'activity',
//     header: 'Activity',
//     meta: { filterKey: 'activity' },
//   },
//   {
//     accessorKey: 'module',
//     header: 'Module',
//     meta: { filterKey: 'module' },
//   },
//   {
//     accessorKey: 'method',
//     header: 'Method',
//     meta: { filterKey: 'method' },
//   },
//   {
//     accessorKey: 'url',
//     header: 'URL',
//     meta: { filterKey: 'url' },
//   },
// ]
