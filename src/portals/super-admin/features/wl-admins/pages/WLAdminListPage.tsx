import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  useWLAdmins,
  useUpdateWLAdminStatus,
  useDeleteWLAdmin,
} from '../api/wl-admins.hooks';
import { Select, Menu, Badge } from '@mantine/core';
import { IconChevronDown, IconCheck } from '@tabler/icons-react';
import { ClientTable } from '../../../../../components/ClientTable';
import { WL_ADMIN_STATUSES, statusColorMap } from '../../../../../constants/constants';
import type { WLAdmin, WLAdminStatus } from '../types/wl-admin.types';
import { showSuccess, showError } from '../../../../../utils/notifications';

export default function WLAdminListPage() {
  const navigate = useNavigate();
  const { data = [] } = useWLAdmins();
  const updateStatus = useUpdateWLAdminStatus();
  const deleteWLAdmin = useDeleteWLAdmin();

  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const handleStatusChange = async (id: string, status: WLAdminStatus) => {
    try {
      const res = await updateStatus.mutateAsync({ id, status });
      showSuccess(res);
    } catch (err) {
      showError(err);
    }
  };

  const handleDelete = async (row: { id: string }) => {
    if (!confirm('Are you sure you want to delete this WL Admin?')) return;
    try {
      const res = await deleteWLAdmin.mutateAsync(row.id);
      showSuccess(res);
    } catch (err) {
      showError(err);
    }
  };

  return (
    <ClientTable<WLAdmin>
      title="WL Admins"
      data={data}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        {
          key: 'status',
          label: 'Status',
          render: (row) => (
            <Menu withinPortal position="bottom-start" shadow="md">
              <Menu.Target>
                <Badge
                  variant="light"
                  color={statusColorMap[row.status] || 'gray'}
                  rightSection={<IconChevronDown size={12} />}
                  style={{ cursor: 'pointer' }}
                >
                  {row.status}
                </Badge>
              </Menu.Target>
              <Menu.Dropdown>
                {WL_ADMIN_STATUSES.map((status) => (
                  <Menu.Item
                    key={status}
                    onClick={() => handleStatusChange(row.id, status)}
                    leftSection={row.status === status ? <IconCheck size={14} /> : null}
                  >
                    {status}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          ),
        },
      ]}
      searchFields={['name', 'email']}
      filterControls={
        <Select
          placeholder="Filter by status"
          data={WL_ADMIN_STATUSES.map((x) => ({
            label: x,
            value: x,
          }))}
          value={statusFilter}
          onChange={setStatusFilter}
          clearable
        />
      }
      filterFn={(row) => !statusFilter || row.status === statusFilter}
      onEdit={(row) => navigate(`/wl-admins/edit/${row?.id}`)}
      onDelete={handleDelete}
      onCreate={() => navigate('/wl-admins/create')}
      perPage={5}
    />
  );
}
