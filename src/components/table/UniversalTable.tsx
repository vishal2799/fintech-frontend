// components/UniversalTable.tsx
import { flexRender, type Table } from '@tanstack/react-table';
import { Pagination, TextInput, Loader } from '@mantine/core';

interface UniversalTableProps<T> {
  table: Table<T>;
  loading?: boolean;
  enablePagination?: boolean;
  enableGlobalFilter?: boolean;
  total?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
}

export function UniversalTable<T>({
  table,
  loading,
  enablePagination = true,
  enableGlobalFilter = true,
  total,
  page = 1,
  onPageChange,
  globalFilter,
  onGlobalFilterChange,
}: UniversalTableProps<T>) {
     const pageSize = table.getState().pagination?.pageSize ?? 10;
  const totalPages =
    total && enablePagination ? Math.max(1, Math.ceil(total / pageSize)) : 1;

  return (
    <div>
      {enableGlobalFilter && (
        <TextInput
          placeholder="Search..."
          value={globalFilter ?? ''}
          onChange={(e) => onGlobalFilterChange?.(e.target.value)}
          mb="md"
        />
      )}

      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                     {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted() as string] ?? ''}
                  {
                //   flexRender(header.column.columnDef.header, header.getContext()) 
                //   header.isPlaceholder ? null : header.column.columnDef.header
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={100}>
                <Loader />
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {enablePagination && total && onPageChange && (
        <Pagination
          total={totalPages}
          value={page}
          onChange={onPageChange}
          mt="md"
        />
      )}
    </div>
  );
}
