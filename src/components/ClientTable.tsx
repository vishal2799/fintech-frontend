// src/components/shared/ClientTable.tsx
import {
  Table,
  Pagination,
  TextInput,
  Group,
  Button,
  Badge,
  Container,
  Switch,
} from '@mantine/core';
import { IconEdit, IconSearch, IconSelector, IconTrash } from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { ExportMenu } from './ExportMenu';

interface Column<T> {
  key: keyof T;
  label: string;
  type?: 'text' | 'badge' | 'toggle';
  render?: (row: T) => React.ReactNode;
}

interface Props<T> {
  title: string;
  data: T[];
  columns: Column<T>[];
  searchFields?: (keyof T)[];
  perPage?: number;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onToggle?: (row: T) => void;
  onCreate?: () => void;
  filterControls?: React.ReactNode;
  filterFn?: (row: T) => boolean;
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
}: Props<T>) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = useMemo(() => {
    let result = [...data];
    if (filterFn) result = result.filter(filterFn);

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((row) =>
        searchFields.some((key) => `${row[key]}`.toLowerCase().includes(q))
      );
    }

    if (sortKey) {
      result.sort((a, b) => {
        const valA = `${a[sortKey!]}`;
        const valB = `${b[sortKey!]}`;
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
    }

    return result;
  }, [data, search, sortKey, sortAsc, searchFields, filterFn]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

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

      <Table striped withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            {columns.map((col:any) => (
              <Table.Th
  key={col.key}
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
            {(onEdit || onDelete) && <Table.Th>Actions</Table.Th>}
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {paginated.map((row) => (
            <Table.Tr key={row.id}>
              {columns.map((col) => (
                <Table.Td key={String(col.key)}>
                  {col.render ? (
                    col.render(row)
                  ) : col.type === 'badge' ? (
                    <Badge
                      color={String(row[col.key]) === 'ACTIVE' ? 'green' : 'red'}
                    >
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
              {(onEdit || onDelete) && (
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
