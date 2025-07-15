// ✅ WLAdminListPage.tsx
import {
  Badge,
  Button,
  Group,
  Select,
  Table,
  TextInput,
  Title,
  Pagination,
  Menu,
  Container,
  Flex,
  Loader,
} from '@mantine/core';
import { IconChevronDown, IconCheck, IconEdit, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import { useWLAdmins, useDeleteWLAdmin, useUpdateWLAdminStatus } from '../api/wl-admins.hooks';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { notifications } from '@mantine/notifications';

const ITEMS_PER_PAGE = 10;

export default function WLAdminListPage() {
  const navigate = useNavigate();
  const { data: wlAdmins = [], isLoading } = useWLAdmins();
  const deleteWLAdmin = useDeleteWLAdmin();
  const updateWLAdminStatus = useUpdateWLAdminStatus();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [search, statusFilter]);

  const filtered = useMemo(() => {
    return wlAdmins.filter((admin: any) => {
      const matchSearch =
        !search ||
        admin.name.toLowerCase().includes(search.toLowerCase()) ||
        admin.email.toLowerCase().includes(search.toLowerCase());
      const matchStatus = !statusFilter || admin.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [wlAdmins, search, statusFilter]);

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateWLAdminStatus.mutateAsync({ id, status });
      notifications.show({ message: 'Status updated', color: 'blue' });
    } catch (err: any) {
      notifications.show({ message: err.message || 'Failed', color: 'red' });
    }
  };

    if (isLoading) return <Loader />;
  

  return (
    <Container size="lg">
      <Flex direction="column" gap="md">
        <Group justify="space-between">
          <Title order={2}>WL Admins</Title>
          <Button onClick={() => navigate('/super-admin/wl-admins/create')} leftSection={<IconPlus size={16} />}>
            Create WL Admin
          </Button>
        </Group>

        <Group grow>
          <TextInput
            placeholder="Search by name or email"
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
          <Select
            placeholder="Filter by status"
            data={['ACTIVE', 'LOCKED', 'BLOCKED'].map((s) => ({ label: s, value: s }))}
            clearable
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </Group>

        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {paginated.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={4}>No WL Admins found</Table.Td>
              </Table.Tr>
            ) : (
              paginated.map((admin: any) => (
                <Table.Tr key={admin.id}>
                  <Table.Td>{admin.name}</Table.Td>
                  <Table.Td>{admin.email}</Table.Td>
                  <Table.Td>
                    <Menu withinPortal shadow="md">
                      <Menu.Target>
                        <Badge
                          variant="light"
                          color={statusColor(admin.status)}
                          rightSection={<IconChevronDown size={12} />}
                          style={{ cursor: 'pointer' }}
                        >
                          {admin.status}
                        </Badge>
                      </Menu.Target>
                      <Menu.Dropdown>
                        {['ACTIVE', 'BLOCKED', 'LOCKED'].map((status) => (
                          <Menu.Item
                            key={status}
                            onClick={() => handleStatusChange(admin.id, status)}
                            leftSection={admin.status === status ? <IconCheck size={14} /> : null}
                          >
                            {status}
                          </Menu.Item>
                        ))}
                      </Menu.Dropdown>
                    </Menu>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Button
                        size="xs"
                        variant="light"
                        color="blue"
                        onClick={() => navigate(`/super-admin/wl-admins/${admin.id}/edit`)}
                        leftSection={<IconEdit size={14} />}
                      >
                        Edit
                      </Button>
                      <Button
                        size="xs"
                        variant="light"
                        color="red"
                        onClick={() => deleteWLAdmin.mutate(admin.id)}
                        leftSection={<IconTrash size={14} />}
                      >
                        Delete
                      </Button>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))
            )}
          </Table.Tbody>
        </Table>

        <Pagination
          value={page}
          onChange={setPage}
          total={Math.ceil(filtered.length / ITEMS_PER_PAGE)}
        />
      </Flex>
    </Container>
  );
}

const statusColor = (status: string) => {
  switch (status) {
    case 'ACTIVE': return 'green';
    case 'BLOCKED': return 'orange';
    case 'LOCKED': return 'gray';
    default: return 'gray';
  }
};
