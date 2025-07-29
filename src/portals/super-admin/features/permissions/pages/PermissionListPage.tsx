import { useNavigate } from 'react-router';
import { usePermissions, useDeletePermission } from '../api/permissions.hooks';
import { ClientTable } from '../../../../../components/ClientTable';
import type { Permission } from '../types/permissions.types';
import { showError, showSuccess } from '../../../../../utils/notifications';

export default function PermissionListPage() {
  const navigate = useNavigate();
  const { data = [] } = usePermissions();
  const deletePermission = useDeletePermission();

  const handleDelete = async (row: Permission) => {
    if (!confirm('Delete this permission?')) return;
    try {
      const res = await deletePermission.mutateAsync(row.id);
      showSuccess(res); // if you use standardized backend responses
    } catch (err) {
      showError(err);
    }
  };

  return (
    <ClientTable<Permission>
      title="Permissions"
      data={data}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'module', label: 'Module' },
        { key: 'scope', label: 'Scope' },
        { key: 'description', label: 'Description' },
      ]}
      searchFields={['name', 'module', 'description', 'scope']}
      onEdit={(row) => navigate(`/permissions/edit/${row.id}`)}
      onDelete={handleDelete}
      onCreate={() => navigate('/permissions/create')}
      perPage={10}
    />
  );
}
