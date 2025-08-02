import { type ColumnDef } from '@tanstack/react-table'
import type { AuditLog } from '../portals/super-admin/api/auditLogss.api'

export const AUDIT_LOG_COLUMNS: ColumnDef<AuditLog, any>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Time',
    cell: info => new Date(info.getValue() as string).toLocaleString(),
    size: 200,
  },
  {
    accessorKey: 'activity',
    header: 'Activity',
    size: 220,
  },
  {
    accessorKey: 'module',
    header: 'Module',
    size: 200,
  },
  {
    accessorKey: 'method',
    header: 'Method',
    size: 100,
  },
  {
    accessorKey: 'url',
    header: 'URL',
    size: 270,
  },
  {
    accessorKey: 'actorType',
    header: 'Actor Type',
    size: 150,
  },
  {
    accessorKey: 'actorId',
    header: 'Actor ID',
    size: 380,
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
