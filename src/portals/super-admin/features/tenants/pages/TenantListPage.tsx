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
} from '@mantine/core';
import { useTenants, useDeleteTenant, useUpdateTenantStatus } from '../api/tenants.hooks';
import { IconPlus, IconSearch, IconTrash, IconEdit } from '@tabler/icons-react';
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

const filteredTenants = useMemo(() => {
  return tenants.filter((tenant) => {
    const matchesSearch =
      !search ||
      tenant.name?.toLowerCase().includes(search.toLowerCase()) ||
      tenant.slug?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      !statusFilter || tenant.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
}, [tenants, search, statusFilter]);

const handleStatus = async (id:string, status:string) => {
  try {
        await updateTenantStatus.mutateAsync({ id, status });
        notifications.show({ message: 'Tenant updated', color: 'blue' });
      } catch (err: any) {
        notifications.show({ message: err.message || 'Error', color: 'red' });
      }
}

useEffect(() => {
  setPage(1); // reset to first page when filters change
}, [search, statusFilter]);

  const paginatedTenants = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredTenants.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTenants, page]);

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-4">
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

      <Table striped withColumnBorders>
        <thead>
          <tr>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Theme</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTenants.length === 0 ? (
            <tr>
              <td colSpan={6}>No tenants found</td>
            </tr>
          ) : (
            paginatedTenants.map((tenant) => (
              <tr key={tenant.id}>
                <td>{tenant.name}</td>
                <td>{tenant.slug}</td>
                <td>
                  <Badge color={getStatusColor(tenant.status)}>
                    {tenant.status}
                  </Badge>
                </td>
                <td>
                  <div
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: tenant.themeColor }}
                  />
                </td>
                <td>
                  <Group gap="xs">
                    <Button
                      size="xs"
                      variant="light"
                      color="blue"
                      onClick={() =>
                        navigate(`/super-admin/tenants/${tenant.id}/edit`)
                      }
                      leftSection={<IconEdit size={14} />}
                    >
                      Edit
                    </Button>
                    <Button
                      size="xs"
                      variant="light"
                      color="red"
                      onClick={() => deleteTenant.mutate(tenant.id)}
                      leftSection={<IconTrash size={14} />}
                    >
                      Delete
                    </Button>
                    <Button
                      size="xs"
                      variant="light"
                      color="red"
                      onClick={() => handleStatus(tenant.id, 'DISABLED')}
                      leftSection={<IconTrash size={14} />}
                    >
                      Status
                    </Button>
                  </Group>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Pagination
        total={Math.ceil(filteredTenants.length / ITEMS_PER_PAGE)}
        value={page}
        onChange={setPage}
        mt="md"
      />
    </div>
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
