import { useNavigate } from 'react-router';
import { usePermissions, useDeletePermission } from '../api/permissions.hooks';
import { notifications } from '@mantine/notifications';
import { ClientTable } from '../../../../../components/ClientTable';

export default function PermissionListPage() {
  const navigate = useNavigate();
  const { data = [] } = usePermissions();
  const deletePermission = useDeletePermission();

  const handleDelete = async (row: any) => {
    if (!confirm('Delete this permission?')) return;
    try {
      await deletePermission.mutateAsync(row.id);
      notifications.show({ message: 'Deleted', color: 'red' });
    } catch (err: any) {
      notifications.show({ message: err.message || 'Delete failed', color: 'red' });
    }
  };

  return (
    <ClientTable
      title="Permissions"
      data={data}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'module', label: 'Module' },
        { key: 'scope', label: 'Scope' },
        { key: 'description', label: 'Description' },
      ]}
      searchFields={['name', 'module', 'description', 'scope']}
      onEdit={(row) => navigate(`/super-admin/permissions/edit/${row.id}`)}
      onDelete={handleDelete}
      onCreate={() => navigate('/super-admin/permissions/create')}
      perPage={10}
    />
  );
}
