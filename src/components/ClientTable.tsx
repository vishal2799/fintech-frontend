import {
  Table,
  Pagination,
  TextInput,
  Group,
  Button,
  Badge,
  Container,
  Switch,
  // useMantineTheme,
  Text,
} from '@mantine/core';
import { IconEdit, IconSearch, IconSelector, IconTrash } from '@tabler/icons-react';
import { useMemo, useState, useEffect } from 'react';
import { ExportMenu } from './ExportMenu';

interface Column<T> {
  key: keyof T;
  label: string;
  type?: 'text' | 'badge' | 'toggle';
  render?: (row: T) => React.ReactNode;
  renderExport?: (row: T) => string;
}

interface Props<T> {
  title: string;
  data: T[];
  columns: Column<T>[];
  searchFields?: string[];
  perPage?: number;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onToggle?: (row: T) => void;
  onCreate?: () => void;
  filterControls?: React.ReactNode;
  filterFn?: (row: T) => boolean;
  rowActions?: (row: T) => React.ReactNode[];
}

function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((acc, key) => acc?.[key], obj) ?? '';
}


export function ClientTable<T extends { id: string }>({
  title,
  data,
  columns,
  searchFields = [],
  perPage = 10,
  onEdit,
  onDelete,
  onToggle,
  onCreate,
  filterControls,
  filterFn,
  rowActions,
}: Props<T>) {
  // const theme = useMantineTheme();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  // Filter + sort + search
  const filtered = useMemo(() => {
    let result = [...data];

    if (filterFn) result = result.filter(filterFn);

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((row) =>
  searchFields.some((path) =>
    getNestedValue(row, path).toLowerCase().includes(q)
  )
);
    }

    if (sortKey) {
      result.sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];

        // If both values are strings
        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortAsc
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }

        // If both values are numbers
        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortAsc ? valA - valB : valB - valA;
        }

        // Fallback string comparison
        return sortAsc
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
    }

    return result;
  }, [data, search, sortKey, sortAsc, searchFields, filterFn]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  // ✅ Reset page if it overflows after filtering
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  // ✅ Reset page when search/filter changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  const toggleSort = (key: keyof T) => {
    if (key === sortKey) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <Container size="lg">
      <Group justify="space-between" mb="md">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Group>
          {searchFields.length > 0 && (
            <TextInput
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              leftSection={<IconSearch size={16} />}
            />
          )}
          {onCreate && (
            <Button onClick={onCreate} variant="light">
              + Create
            </Button>
          )}
          <ExportMenu title={title} columns={columns} data={filtered} />
        </Group>
      </Group>

      {filterControls && <Group mb="md">{filterControls}</Group>}

      <Table striped withTableBorder withColumnBorders layout={'fixed'}>
        <Table.Thead>
          <Table.Tr>
            {columns.map((col) => (
              <Table.Th
                key={String(col.key)}
                onClick={() => toggleSort(col.key)}
                style={{ cursor: 'pointer' }}
              >
                <Group justify="space-between">
                  <span>{col.label}</span>
                  {sortKey === col.key ? (
                    sortAsc ? ' ↑' : ' ↓'
                  ) : (
                    <IconSelector size={14} style={{ opacity: 0.4 }} />
                  )}
                </Group>
              </Table.Th>
            ))}
            {(onEdit || onDelete || rowActions) && <Table.Th>Actions</Table.Th>}
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {paginated.length === 0 && (
  <Table.Tr>
    <Table.Td colSpan={columns.length + 1}>
      <Text c="dimmed">No data found</Text>
    </Table.Td>
  </Table.Tr>
)}
          {paginated.map((row) => (
            <Table.Tr key={row.id}>
              {columns.map((col) => (
                <Table.Td key={String(col.key)}>
                  {col.render ? (
                    col.render(row)
                  ) : col.type === 'badge' ? (
                    // <Badge color={['ACTIVE', 'SUCCESS'].includes(String(row[col.key])) ? theme.primaryColor : 'red'}>
                      <Badge color={['ACTIVE', 'SUCCESS'].includes(String(row[col.key])) ? 'green' : 'red'}> 
                      {String(row[col.key])}
                    </Badge>
                  ) : col.type === 'toggle' ? (
                    <Switch
                      size="xs"
                      checked={String(row[col.key]) === 'ACTIVE'}
                      onChange={() => onToggle?.(row)}
                    />
                  ) : (
                    String(row[col.key])
                  )}
                </Table.Td>
              ))}
              {(onEdit || onDelete || rowActions) && (
                <Table.Td>
                  <Group gap="xs">
                    {onEdit && (
                      <Button
                        size="xs"
                        variant="light"
                        onClick={() => onEdit(row)}
                        leftSection={<IconEdit size={14} />}
                      >
                        Edit
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        size="xs"
                        variant="light"
                        color="red"
                        onClick={() => onDelete(row)}
                        leftSection={<IconTrash size={14} />}
                      >
                        Delete
                      </Button>
                    )}
                    {rowActions?.(row)?.map((action, idx) => (
                      <span key={idx}>{action}</span>
                    ))}
                  </Group>
                </Table.Td>
              )}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {totalPages > 1 && (
        <Pagination value={page} onChange={setPage} total={totalPages} mt="md" />
      )}
    </Container>
  );
}
