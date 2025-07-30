import { useNavigate } from 'react-router';
import { Select } from '@mantine/core';
import { useState } from 'react';
import {
  useRetailers,
  useDeleteRetailer,
  useUpdateRetailer,
} from '../api/retailers.hooks';
import { showError, showSuccess } from '../../../../../utils/notifications';
import { ClientTable } from '../../../../../components/ClientTable';

const RETAILER_STATUS_OPTIONS = ['ACTIVE', 'BLOCKED', 'LOCKED'] as const;

export default function RetailerListPage() {
  const navigate = useNavigate();
  const { data = [] } = useRetailers();
  const deleteRetailer = useDeleteRetailer();
  const updateRetailer = useUpdateRetailer();

  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const handleDelete = async (row: any) => {
    if (!confirm('Delete this retailer?')) return;
    try {
      await deleteRetailer.mutateAsync(row.id);
      showSuccess('Retailer deleted');
    } catch (err) {
      showError(err);
    }
  };

  const handleToggle = async (row: any) => {
    const newStatus = row.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE';
    try {
      await updateRetailer.mutateAsync({ id: row.id, data: { status: newStatus } });
      showSuccess(`Retailer ${newStatus.toLowerCase()}`);
    } catch (err) {
      showError(err);
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
        {
          key: 'status',
          label: 'Status',
          type: 'toggle',
        },
      ]}
      searchFields={['name', 'email', 'mobile']}
      filterControls={
        <Select
          placeholder="Filter by status"
          data={RETAILER_STATUS_OPTIONS.map((x) => ({ label: x, value: x }))}
          value={statusFilter}
          onChange={setStatusFilter}
          clearable
        />
      }
      filterFn={(row) => !statusFilter || row.status === statusFilter}
      onEdit={(row) => navigate(`/admin/retailers/edit/${row.id}`)}
      onCreate={() => navigate('/admin/retailers/create')}
      onDelete={handleDelete}
      onToggle={handleToggle}
    />
  );
}
