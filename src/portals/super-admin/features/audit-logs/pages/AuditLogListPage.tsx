import {
  Table,
  TextInput,
  Select,
  Pagination,
  Loader,
  Title,
  Container,
  Group,
  Flex,
  Button,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconSearch } from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { useAuditLogs } from '../api/auditLogs.hooks';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import dayjs from 'dayjs';

const ITEMS_PER_PAGE = 10;

const columnHelper = createColumnHelper<any>();

export default function AuditLogListPage() {
  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<[string | null, string | null]>([null, null]);
//   const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<{ id: string; desc: boolean }>({
    id: 'createdAt',
    desc: true,
  });

  const filters = {
    page,
    limit: ITEMS_PER_PAGE,
    search,
    module: moduleFilter || undefined,
    startDate: dateRange[0] ? dayjs(dateRange[0]).toISOString() : undefined,
    endDate: dateRange[1] ? dayjs(dateRange[1]).toISOString() : undefined,
    sortBy: sort.id,
    sortDir: sort.desc ? 'desc' : 'asc',
  };

  const { data, isLoading } = useAuditLogs(filters);

  const columns = useMemo(
    () => [
      columnHelper.accessor('activity', {
        header: 'Activity',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('module', {
        header: 'Module',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('url', {
        header: 'URL',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('method', {
        header: 'Method',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('createdAt', {
        header: 'Time',
        cell: (info) => dayjs(info.getValue()).format('YYYY-MM-DD HH:mm:ss'),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: data?.data || [],
    columns,
    pageCount: Math.ceil((data?.total || 0) / ITEMS_PER_PAGE),
    manualPagination: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting: [sort],
    },
    onSortingChange: (updater) => {
      const nextSort = typeof updater === 'function' ? updater([sort])[0] : updater[0];
      setSort(nextSort);
    },
  });
  

  if (isLoading) return <Loader />;

  return (
    <Container size="xl">
      <Flex justify="space-between" align="center" mb="md">
        <Title order={2}>Audit Logs</Title>
        <Button variant="outline" onClick={() => setPage(1)}>
          Refresh
        </Button>
      </Flex>

      <Group grow mb="md">
        <TextInput
          placeholder="Search activity or URL"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          leftSection={<IconSearch size={16} />}
        />
        <Select
          placeholder="Filter by module"
          data={[
            { label: 'User Management', value: 'USER_MANAGEMENT' },
            { label: 'Wallet', value: 'WALLET' },
            { label: 'KYC', value: 'KYC' },
            { label: 'Audit Logs', value: 'AUDIT_LOGS' },
            { label: 'Service', value: 'SERVICE' },
            { label: 'General', value: 'GENERAL' },
            { label: 'Tenants Management', value: 'TENANTS_MANAGEMENT' },
          ]}
          clearable
          value={moduleFilter}
          onChange={setModuleFilter}
        />
        <DatePickerInput
          type="range"
          value={dateRange}
          onChange={setDateRange}
          placeholder="Pick date range"
        />
      </Group>

      <Table striped withTableBorder withColumnBorders>
        <Table.Thead>
          {table.getHeaderGroups().map((hg) => (
            <Table.Tr key={hg.id}>
              {hg.headers.map((header) => (
                <Table.Th
                  key={header.id}
                  onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                  style={{ cursor: header.column.getCanSort() ? 'pointer' : undefined }}
                >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() === 'asc' ? ' 🔼' : ''}
                  {header.column.getIsSorted() === 'desc' ? ' 🔽' : ''}
                </Table.Th>
              ))}
            </Table.Tr>
          ))}
        </Table.Thead>
        <Table.Tbody>
          {table.getRowModel().rows.map((row) => (
            <Table.Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Table.Td key={cell.id}>  {flexRender(cell.column.columnDef.cell, cell.getContext())}
</Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Pagination
        total={Math.ceil((data?.total || 0) / ITEMS_PER_PAGE)}
        value={page}
        onChange={setPage}
        mt="md"
      />
    </Container>
  );
}
