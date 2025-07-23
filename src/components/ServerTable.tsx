import {
  Table,
  Pagination,
  Container,
  UnstyledButton,
  Group,
  Text,
} from '@mantine/core';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';
import {
  IconChevronDown,
  IconChevronUp,
  IconSelector,
} from '@tabler/icons-react';

export type ServerTableProps<T> = {
  columns: ColumnDef<T, any>[];
  data: T[];
  total: number;
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onPageChange: (page: number) => void;
  onSortChange?: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
};

export function ServerTable<T>({
  columns,
  data,
  total,
  page,
  limit,
  sortBy,
  sortOrder,
  onPageChange,
  onSortChange,
}: ServerTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(total / limit),
  });

  const totalPages = Math.ceil(total / limit);

  const handleSort = (key: string) => {
    if (!onSortChange) return;
    if (sortBy === key) {
      onSortChange(key, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      onSortChange(key, 'asc');
    }
  };

  const getSortIcon = (key: string) => {
    if (sortBy !== key) return <IconSelector size={14} />;
    return sortOrder === 'asc' ? (
      <IconChevronUp size={14} />
    ) : (
      <IconChevronDown size={14} />
    );
  };

  return (
    <Container size="lg">
      <Table striped withColumnBorders withTableBorder highlightOnHover>
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const colKey = header.column.id;
                return (
                  <Table.Th key={header.id} style={{ width: header.getSize() }}>
                    <UnstyledButton onClick={() => handleSort(colKey)}>
                      <Group justify="space-between" gap={4}>
                        <Text size="sm" fw={500}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </Text>
                        {getSortIcon(colKey)}
                      </Group>
                    </UnstyledButton>
                  </Table.Th>
                );
              })}
            </Table.Tr>
          ))}
        </Table.Thead>
        <Table.Tbody>
          {table.getRowModel().rows.map((row) => (
            <Table.Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Table.Td key={cell.id} style={{ width: cell.column.getSize() }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {totalPages > 1 && (
        <Pagination mt="md" value={page} onChange={onPageChange} total={totalPages} />
      )}
    </Container>
  );
}
