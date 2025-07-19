// src/pages/super-admin/RoleListPage.tsx

import { useNavigate } from 'react-router';
import { useDeleteRole, useRoles } from '../api/roles.hooks';
import { notifications } from '@mantine/notifications';
import { ClientTable } from '../../../../../components/ClientTable';

export default function RoleListPage() {
  const navigate = useNavigate();
  const { data = [] } = useRoles();
  const deleteRole = useDeleteRole();

  const handleDelete = async (row: any) => {
    if (!confirm(`Delete role "${row.name}"?`)) return;
    try {
      await deleteRole.mutateAsync(row.id);
      notifications.show({ message: 'Role deleted', color: 'red' });
    } catch (err: any) {
      notifications.show({ message: err.message || 'Delete failed', color: 'red' });
    }
  };

  return (
    <ClientTable
      title="Roles"
      data={data}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description' },
        { key: 'scope', label: 'Scope' },
        {
          key: 'permissions',
          label: 'Permissions',
          render: (row) => row.permissions?.length || 0
        }
      ]}
      searchFields={['name', 'description']}
      onEdit={(row) => navigate(`/super-admin/roles/edit/${row.id}`)}
      onDelete={handleDelete}
      onCreate={() => navigate('/super-admin/roles/create')}
      perPage={5}
    />
  );
}
