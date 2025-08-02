import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  useTenants,
  // useDeleteTenant,
  useUpdateTenantStatus,
} from '../hooks/tenants.hooks';
import { Select, Menu, Badge } from '@mantine/core';
import { IconChevronDown, IconCheck } from '@tabler/icons-react';
import { ClientTable } from '../../../components/ClientTable';
import { STATUS_OPTIONS, type TenantStatus } from '../../../constants/constants';
import { showError, showSuccess } from '../../../utils/notifications';

export default function TenantListPage() {
  const navigate = useNavigate();
  const { data = [] } = useTenants();
  // const deleteTenant = useDeleteTenant();
  const updateTenantStatus = useUpdateTenantStatus();

  const [statusFilter, setStatusFilter] = useState<string | null>(null);

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
        { key: 'name', label: 'Name', width: 200 },
        { key: 'slug', label: 'Slug', width: 200 },
        {
          key: 'themeColor',
          label: 'Theme',
          width: 130,
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
          width: 150,
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
      onEdit={(row) => navigate(`/tenants/edit/${row.id}`)}
      // onDelete={handleDelete}
      onCreate={() => navigate('/tenants/create')}
      perPage={4}
      rowActionsWidth={120}
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
