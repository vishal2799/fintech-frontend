import { useNavigate } from 'react-router';
import { usePermissions, useDeletePermission } from '../hooks/permissions.hooks';
import { ClientTable } from '../../../components/ClientTable';
import type { Permission } from '../types/permissions.types';
import { showError, showSuccess } from '../../../utils/notifications';

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
        { key: 'name', label: 'Name', width: 250 },
        { key: 'module', label: 'Module', width: 250 },
        { key: 'scope', label: 'Scope', width: 150 },
        { key: 'description', label: 'Description', width: 300 },
      ]}
      searchFields={['name', 'module', 'description', 'scope']}
      onEdit={(row) => navigate(`/permissions/edit/${row.id}`)}
      onDelete={handleDelete}
      onCreate={() => navigate('/permissions/create')}
      perPage={10}
      rowActionsWidth={210}
    />
  );
}
