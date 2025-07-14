// src/pages/super-admin/Tenants.tsx
import { useState } from 'react';
import { useTenantsPaginated } from '../../hooks/useTenantsPaginated';
import { DataTablePaginated } from '../../components/table/DataTable';
import type { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<any>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'slug', header: 'Slug' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded text-xs ${
          row.original.status === 'ACTIVE'
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        }`}
      >
        {row.original.status}
      </span>
    ),
  },
];

export default function TenantList() {
  const [page, setPage] = useState(1);
  const perPage = 2;

  const { data, isLoading } = useTenantsPaginated(page, perPage);

  if (isLoading) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <h1 className="text-xl font-semibold mb-4">Tenants</h1>
      <DataTablePaginated
        columns={columns}
        data={data?.data ?? []}
        total={data?.total ?? 0}
        page={page}
        perPage={perPage}
        setPage={setPage}
      />
    </div>
  );
}
