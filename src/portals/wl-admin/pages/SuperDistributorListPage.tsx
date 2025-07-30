import { Loader, Select } from '@mantine/core';
import { useNavigate } from 'react-router';
import {
  useSuperDistributors,
  useDeleteSuperDistributor,
} from '../hooks/superDistributors.hooks';
import { showError, showSuccess } from '../../../utils/notifications';
import { ClientTable } from '../../../components/ClientTable';
import { useState } from 'react';

export default function SuperDistributorListPage() {
  const navigate = useNavigate();
  const { data = [], isLoading } = useSuperDistributors();
  const deleteMutation = useDeleteSuperDistributor();

  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const handleDelete = async (row: any) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await deleteMutation.mutateAsync(row.id);
      showSuccess('Deleted successfully');
    } catch (err: any) {
      showError(err);
    }
  };

  if (isLoading) return <Loader mx="auto" my="xl" />;

  return (
    <ClientTable
      title="Super Distributors"
      data={data}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'mobile', label: 'Mobile' },
        {
          key: 'status',
          label: 'Status',
          type: 'badge',
          render: (row) => (
            <span
              className="capitalize"
              style={{
                backgroundColor: getStatusColor(row.status),
                color: 'white',
                padding: '2px 8px',
                borderRadius: 6,
                fontSize: 12,
              }}
            >
              {row.status}
            </span>
          ),
        },
      ]}
      searchFields={['name', 'email', 'mobile']}
      filterControls={
        <Select
          placeholder="Filter by status"
          data={['ACTIVE', 'DISABLED', 'SUSPENDED'].map((s) => ({
            label: s,
            value: s,
          }))}
          value={statusFilter}
          onChange={setStatusFilter}
          clearable
        />
      }
      filterFn={(row) => !statusFilter || row.status === statusFilter}
      onEdit={(row) => navigate(`/admin/super-distributors/edit/${row.id}`)}
      onCreate={() => navigate('/admin/super-distributors/create')}
      onDelete={handleDelete}
    />
  );
}

const statusColorMap = {
  ACTIVE: '#16a34a',
  DISABLED: '#6b7280',
  SUSPENDED: '#dc2626',
} as const;

function getStatusColor(status: string | undefined) {
  return statusColorMap[status as keyof typeof statusColorMap] ?? '#6b7280';
}
