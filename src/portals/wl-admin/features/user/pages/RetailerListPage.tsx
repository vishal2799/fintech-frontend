import { useNavigate } from 'react-router';
import { Select } from '@mantine/core';
import { useState } from 'react';
import {
  useRetailers,
  useDeleteRetailer,
  useUpdateRetailer,
} from '../api/retailers.hooks';
import { notifications } from '@mantine/notifications';
import { ClientTable } from '../../../../../components/ClientTable';

export default function RetailerListPage() {
  const navigate = useNavigate();
  const { data = [] } = useRetailers();
  const deleteRetailer = useDeleteRetailer();
  const updateRetailer = useUpdateRetailer();

  const [status, setStatus] = useState<string | null>(null);

  const handleDelete = async (row: any) => {
    if (!confirm('Delete this retailer?')) return;
    try {
      await deleteRetailer.mutateAsync(row.id);
      notifications.show({ message: 'Retailer deleted', color: 'red' });
    } catch (err: any) {
      notifications.show({ message: err.message || 'Delete failed', color: 'red' });
    }
  };

  const handleToggle = async (row: any) => {
    const newStatus = row.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE';
    try {
      await updateRetailer.mutateAsync({ id: row.id, data: { status: newStatus } });
      notifications.show({ message: 'Status updated', color: 'blue' });
    } catch (err: any) {
      notifications.show({ message: err.message || 'Update failed', color: 'red' });
    }
  };

  return (
    <ClientTable
      title="Retailers"
      data={data}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'mobile', label: 'Mobile' },
        { key: 'status', label: 'Status', type: 'toggle' },
      ]}
      searchFields={['name', 'email', 'mobile']}
      filterControls={
        <Select
          placeholder="Filter by status"
          data={['ACTIVE', 'BLOCKED', 'LOCKED'].map((x) => ({ label: x, value: x }))}
          value={status}
          onChange={setStatus}
          clearable
        />
      }
      filterFn={(row) => !status || row.status === status}
      onEdit={(row) => navigate(`/wl-admin/retailers/${row.id}/edit`)}
      onCreate={() => navigate('/wl-admin/retailers/create')}
      onDelete={handleDelete}
      onToggle={handleToggle}
    />
  );
}
