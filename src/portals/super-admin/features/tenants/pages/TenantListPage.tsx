import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  useTenants,
  // useDeleteTenant,
  useUpdateTenantStatus,
} from '../api/tenants.hooks';
import { Select, Menu, Badge } from '@mantine/core';
import { IconChevronDown, IconCheck } from '@tabler/icons-react';
import { ClientTable } from '../../../../../components/ClientTable';
import { STATUS_OPTIONS, type TenantStatus } from '../constants';
// import type { Tenant } from '../types/tenant.types';
import { showError, showSuccess } from '../../../../../utils/notifications';

export default function TenantListPage() {
  const navigate = useNavigate();
  const { data = [] } = useTenants();
  // const deleteTenant = useDeleteTenant();
  const updateTenantStatus = useUpdateTenantStatus();

  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // const handleDelete = async (row: Tenant) => {
  //   if (!confirm('Delete this tenant?')) return;
  //   try {
  //     const res = await deleteTenant.mutateAsync(row.id);
  //     showSuccess(res);
  //   } catch (err: any) {
  //     showError(err);
  //   }
  // };

  const handleStatusChange = async (id: string, status: TenantStatus) => {
  try {
    const res = await updateTenantStatus.mutateAsync({ id, data: { status } });
    showSuccess(res);
  } catch (err) {
    showError(err);
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
                {STATUS_OPTIONS.map((status) => (
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
          data={STATUS_OPTIONS.map((x) => ({
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
      // onDelete={handleDelete}
      onCreate={() => navigate('/super-admin/tenants/create')}
      perPage={4}
    />
  );
}

const statusColorMap = {
  ACTIVE: 'green',
  DISABLED: 'gray',
  SUSPENDED: 'red',
} as const;

function getStatusColor(status: string | undefined) {
  return statusColorMap[status as keyof typeof statusColorMap] ?? 'gray';
}
