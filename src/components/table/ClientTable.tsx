// components/table/ClientTable.tsx
import type { ColumnDef } from '@tanstack/react-table';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import { useState } from 'react';
import { UniversalTable } from './UniversalTable';

type Props<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
};

export function ClientTable<T>({ data, columns }: Props<T>) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [page, setPage] = useState(1);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      pagination: {
        pageIndex: page - 1,
        pageSize: 10,
      },
    },
    onPaginationChange: (updater) => {
      const nextPage = typeof updater === 'function' ? updater({ pageIndex: page - 1, pageSize: 10 }) : updater;
      setPage(nextPage.pageIndex + 1);
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <UniversalTable
      table={table}
      enablePagination
      globalFilter={globalFilter}
      onGlobalFilterChange={setGlobalFilter}
      total={data.length}
      page={page}
      onPageChange={setPage}
    />
  );
}
