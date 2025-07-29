// src/pages/super-admin/settings/roles/pages/RoleListPage.tsx

import { useNavigate } from 'react-router';
import { useDeleteRole, useRoles } from '../api/roles.hooks';
import { ClientTable } from '../../../../../components/ClientTable';
import type { Role } from '../types/role.types';
import { showError, showSuccess } from '../../../../../utils/notifications';

export default function RoleListPage() {
  const navigate = useNavigate();
  const { data = [] } = useRoles();
  const deleteRole = useDeleteRole();

  const handleDelete = async (row: Role) => {
    if (!confirm(`Delete role "${row.name}"?`)) return;
    try {
      const res = await deleteRole.mutateAsync(row.id);
      showSuccess(res);
    } catch (err: any) {
      showError(err);
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
      ]}
      searchFields={['name', 'description', 'scope']}
      onEdit={(row) => navigate(`/roles/edit/${row.id}`)}
      onDelete={handleDelete}
      onCreate={() => navigate('/roles/create')}
      perPage={5}
    />
  );
}
