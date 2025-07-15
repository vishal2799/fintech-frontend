import { useEffect, useMemo, useState } from 'react';
import {
  Table,
  TextInput,
  Button,
  Badge,
  Group,
  Select,
  Pagination,
  Loader,
  Title,
  Container,
  Flex,
  Menu,
  UnstyledButton,
  Text,
} from '@mantine/core';
import { useTenants, useDeleteTenant, useUpdateTenantStatus } from '../api/tenants.hooks';
import { IconPlus, IconSearch, IconTrash, IconEdit, IconChevronDown, IconCheck, IconSelector, IconChevronUp } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import { notifications } from '@mantine/notifications';

const ITEMS_PER_PAGE = 2;

export default function TenantListPage() {
  const navigate = useNavigate();
  const { data: tenants = [], isLoading } = useTenants();
  const deleteTenant = useDeleteTenant();
  const updateTenantStatus = useUpdateTenantStatus();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const [sortBy, setSortBy] = useState<'name' | 'slug' | null>(null);
const [reverseSortDirection, setReverseSortDirection] = useState(false);

const setSorting = (field: 'name' | 'slug') => {
  const reversed = sortBy === field ? !reverseSortDirection : false;
  setSortBy(field);
  setReverseSortDirection(reversed);
};

const filteredTenants = useMemo(() => {
  let filtered = tenants.filter((tenant) => {
    const matchesSearch =
      !search ||
      tenant.name?.toLowerCase().includes(search.toLowerCase()) ||
      tenant.slug?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = !statusFilter || tenant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (sortBy) {
    filtered = [...filtered].sort((a, b) => {
      const valA = a[sortBy]?.toLowerCase() || '';
      const valB = b[sortBy]?.toLowerCase() || '';
      return reverseSortDirection ? valB.localeCompare(valA) : valA.localeCompare(valB);
    });
  }

  return filtered;
}, [tenants, search, statusFilter, sortBy, reverseSortDirection]);

const handleStatusChange = async (id: string, status: string) => {
  if (updateTenantStatus.isPending) return;
  try {
        await updateTenantStatus.mutateAsync({ id, status });
        notifications.show({ message: 'Tenant updated', color: 'blue' });
      } catch (err: any) {
        notifications.show({ message: err.message || 'Error', color: 'red' });
      }
};

useEffect(() => {
  setPage(1); // reset to first page when filters change
}, [search, statusFilter]);

  const paginatedTenants = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredTenants.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTenants, page]);

  const rows = paginatedTenants.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.slug}</Table.Td>
      {/* <Table.Td className={`text-${getStatusColor(element.status)}`}>{element.status}</Table.Td> */}
      <Table.Td><div
                    className="w-4 h-4 rounded-full border"
                   style={{ backgroundColor: element.themeColor }}
                   /></Table.Td>
      <Table.Td>
               <Group gap="xs">
                    <Button
                       size="xs"
                       variant="light"
                      color="blue"
                      onClick={() =>
                         navigate(`/super-admin/tenants/${element.id}/edit`)
                       }
                       leftSection={<IconEdit size={14} />}
                     >
                       Edit
                     </Button>
                     <Button
                       size="xs"
                       variant="light"
                       color="red"
                       onClick={() => deleteTenant.mutate(element.id)}
                     leftSection={<IconTrash size={14} />}
                     >
                       Delete
                     </Button>
                     <Menu withinPortal position="bottom-start" shadow="md">
    <Menu.Target>
      <Badge
        variant="light"
        color={getStatusColor(element.status)}
        rightSection={<IconChevronDown size={12} />}
        style={{ cursor: 'pointer' }}
      >
        {element.status}
      </Badge>
    </Menu.Target>
    <Menu.Dropdown>
      {['ACTIVE', 'DISABLED', 'SUSPENDED'].map((status) => (
        <Menu.Item
          key={status}
          onClick={() => handleStatusChange(element.id, status)}
          leftSection={
            element.status === status ? <IconCheck size={14} /> : null
          }
        >
          {status}
        </Menu.Item>
      ))}
    </Menu.Dropdown>
  </Menu>
                     {/* <Button
                     size="xs"
                       variant="light"
                       color="red"
                       onClick={() => handleStatus(element.id, 'DISABLED')}
                       leftSection={<IconTrash size={14} />}
                     >
                       Status
                     </Button> */}
                   </Group>
        </Table.Td>             
    </Table.Tr>
  ));

  if (isLoading) return <Loader />;

  return (
        <Container size={'lg'}>
  
    <Flex direction={'column'} gap={'md'}>
      <Group>
        <Title order={2}>Tenants</Title>
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={() => navigate('/super-admin/tenants/create')}
        >
          Create Tenant
        </Button>
      </Group>

      <Group grow>
        <TextInput
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          leftSection={<IconSearch size={16} />}
        />
        <Select
          placeholder="Filter by status"
          data={[
            { label: 'Active', value: 'ACTIVE' },
            { label: 'Disabled', value: 'DISABLED' },
            { label: 'Suspended', value: 'SUSPENDED' },
          ]}
          clearable
          value={statusFilter}
          onChange={setStatusFilter}
        />
      </Group>

      <Table striped withTableBorder withColumnBorders layout={"fixed"}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
  <UnstyledButton onClick={() => setSorting('name')} className="w-full">
    <Group justify="space-between">
      <Text fw={500} fz="sm">Name</Text>
      {sortBy === 'name' ? (
        reverseSortDirection ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
      ) : (
        <IconSelector size={14} />
      )}
    </Group>
  </UnstyledButton>
</Table.Th>

<Table.Th>
  <UnstyledButton onClick={() => setSorting('slug')} className="w-full">
    <Group justify="space-between">
      <Text fw={500} fz="sm">Slug</Text>
      {sortBy === 'slug' ? (
        reverseSortDirection ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
      ) : (
        <IconSelector size={14} />
      )}
    </Group>
  </UnstyledButton>
</Table.Th>

            <Table.Th>Theme</Table.Th>
            <Table.Th>Actions</Table.Th>

          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {paginatedTenants.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={6}>No tenants found</Table.Td>
            </Table.Tr>
          ) : rows}
        </Table.Tbody>
      </Table>

      <Pagination
        total={Math.ceil(filteredTenants.length / ITEMS_PER_PAGE)}
        value={page}
        onChange={setPage}
      />
    </Flex>
    </Container>
  );
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'ACTIVE':
      return 'green';
    case 'DISBALED':
      return 'gray';
    case 'SUSPENDED':
      return 'red';
    default:
      return 'gray';
  }
};
