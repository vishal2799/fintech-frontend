import { useNavigate } from 'react-router';
import { useDistributors, useDeleteDistributor } from '../hooks/distributors.hooks';
import { showError, showSuccess } from '../../../utils/notifications';
import { ClientTable } from '../../../components/ClientTable';

export default function DistributorListPage() {
  const navigate = useNavigate();
  const { data = [] } = useDistributors();
  const deleteMutation = useDeleteDistributor();

  // const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const handleDelete = async (row: any) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await deleteMutation.mutateAsync(row.id);
      showSuccess('Deleted successfully');
    } catch (err) {
      showError(err);
    }
  };

  return (
    <ClientTable
      title="Distributors"
      data={data}
      columns={[
        { key: 'name', label: 'Name', width: 150 },
        { key: 'email', label: 'Email', width: 160 },
        { key: 'mobile', label: 'Mobile', width: 120 },
        {
          key: 'status',
          label: 'Status',
          width: 120,
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
      // filterControls={
      //   <Select
      //     placeholder="Filter by status"
      //     data={['ACTIVE', 'DISABLED', 'SUSPENDED'].map((s) => ({
      //       label: s,
      //       value: s,
      //     }))}
      //     value={statusFilter}
      //     onChange={setStatusFilter}
      //     clearable
      //   />
      // }
      // filterFn={(row) => !statusFilter || row.status === statusFilter}
      onEdit={(row) => navigate(`/admin/distributors/edit/${row.id}`)}
      onCreate={() => navigate('/admin/distributors/create')}
      onDelete={handleDelete}
      rowActionsWidth={140}
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
