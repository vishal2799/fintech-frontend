// src/pages/super-admin/audit-logs/components/AuditLogTable.tsx
import { useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { AuditLog } from '../types/auditLog2.types';
import { ServerTable } from '../../../../../components/ServerTable';
import { useAuditLogs } from '../api/auditLogs2.hooks';

export default function AuditLogTable() {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const limit = 10;

  const { data } = useAuditLogs({ page, limit, sortBy, sortOrder });

//   const columns = useMemo<ColumnDef<AuditLog, any>[]>(
//     () => [
//       { accessorKey: 'activity', header: 'Activity' },
//       { accessorKey: 'method', header: 'Method' },
//       { accessorKey: 'module', header: 'Module' },
//       { accessorKey: 'tenantId', header: 'Tenant' },
//       {
//         accessorKey: 'createdAt',
//         header: 'Time',
//         cell: (info) => new Date(info.getValue<string>()).toLocaleString(),
//       },
//     ],
//     []
//   );

const columns: ColumnDef<AuditLog, any>[] = [
  { accessorKey: 'activity', header: 'Activity', size: 250 },
  { accessorKey: 'method', header: 'Method', size: 100 },
  { accessorKey: 'module', header: 'Module', size: 150 },
  { accessorKey: 'tenantId', header: 'Tenant', size: 150 },
  {
    accessorKey: 'createdAt',
    header: 'Time',
    size: 200,
    cell: (info) => new Date(info.getValue<string>()).toLocaleString(),
  },
];


  return (
    <ServerTable
      columns={columns}
      data={data?.data || []}
      total={data?.total || 0}
      page={page}
      limit={limit}
      sortBy={sortBy}
      sortOrder={sortOrder}
      onPageChange={setPage}
      onSortChange={(key, order) => {
        setSortBy(key);
        setSortOrder(order);
      }}
    />
  );
}
