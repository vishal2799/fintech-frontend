// src/pages/super-admin/TenantListPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  useTenants,
  useDeleteTenant,
  useUpdateTenantStatus,
} from '../api/tenants.hooks';
import { Select, Menu, Badge } from '@mantine/core';
import { IconChevronDown, IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { ClientTable } from '../../../../../components/ClientTable';

export default function TenantListPage() {
  const navigate = useNavigate();
  const { data = [] } = useTenants();
  const deleteTenant = useDeleteTenant();
  const updateTenantStatus = useUpdateTenantStatus();

  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const handleDelete = async (row: any) => {
    if (!confirm('Delete this tenant?')) return;
    try {
      await deleteTenant.mutateAsync(row.id);
      notifications.show({ message: 'Deleted', color: 'red' });
    } catch (err: any) {
      notifications.show({ message: err.message || 'Delete failed', color: 'red' });
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateTenantStatus.mutateAsync({ id, status });
      notifications.show({ message: 'Status updated', color: 'blue' });
    } catch (err: any) {
      notifications.show({ message: err.message || 'Status update failed', color: 'red' });
    }
  };

  return (
    <ClientTable
      title="Tenants"
      data={data}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'slug', label: 'Slug' },
        {
          key: 'themeColor',
          label: 'Theme',
          render: (row) => (
            <div
              className="w-4 h-4 rounded-full border"
              style={{ backgroundColor: row.themeColor }}
            />
          ),
        },
        {
          key: 'status',
          label: 'Status',
          render: (row) => (
            <Menu withinPortal position="bottom-start" shadow="md">
              <Menu.Target>
                <Badge
                  variant="light"
                  color={getStatusColor(row.status)}
                  rightSection={<IconChevronDown size={12} />}
                  style={{ cursor: 'pointer' }}
                >
                  {row.status}
                </Badge>
              </Menu.Target>
              <Menu.Dropdown>
                {['ACTIVE', 'DISABLED', 'SUSPENDED'].map((status) => (
                  <Menu.Item
                    key={status}
                    onClick={() => handleStatusChange(row.id, status)}
                    leftSection={
                      row.status === status ? <IconCheck size={14} /> : null
                    }
                  >
                    {status}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          ),
        },
      ]}
      searchFields={['name', 'slug']}
      filterControls={
        <Select
          placeholder="Filter by status"
          data={['ACTIVE', 'DISABLED', 'SUSPENDED'].map((x) => ({
            label: x,
            value: x,
          }))}
          value={statusFilter}
          onChange={setStatusFilter}
          clearable
        />
      }
      filterFn={(row) => !statusFilter || row.status === statusFilter}
      onEdit={(row) => navigate(`/super-admin/tenants/edit/${row.id}`)}
      onDelete={handleDelete}
      onCreate={() => navigate('/super-admin/tenants/create')}
      perPage={4}
    />
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case 'ACTIVE':
      return 'green';
    case 'DISABLED':
      return 'gray';
    case 'SUSPENDED':
      return 'red';
    default:
      return 'gray';
  }
}
