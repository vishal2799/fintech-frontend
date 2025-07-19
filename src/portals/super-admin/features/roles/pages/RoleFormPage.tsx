import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { usePermissionsForRole, useRoles } from '../api/roles.hooks';
import { Container, Loader, Title } from '@mantine/core';
import RoleForm from '../components/RoleForm';

export default function RoleFormPage() {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);

  const { data: roles = [], isLoading: rolesLoading } = useRoles();
  const { data: permissions = [], isLoading: permsLoading } = usePermissionsForRole(id || '');

  const [initialValues, setInitialValues] = useState<any | null>(null);

  useEffect(() => {
  if (
    isEdit &&
    id &&
    roles.length > 0 &&
    !rolesLoading &&
    !permsLoading &&
    permissions.length > 0
  ) {
    const match = roles.find((r) => r.id === id);
    if (match) {
      setInitialValues({
        ...match,
        permissionIds: permissions.map((p:any) => p.id),
      });
    }
  }
}, [isEdit, roles, rolesLoading, permissions, permsLoading, id]);


  if (isEdit && (rolesLoading || permsLoading || !initialValues)) {
    return <Loader />;
  }

  return (
    <Container size="lg">
      <Title order={2} mb="md">
        {isEdit ? 'Edit Role' : 'Create Role'}
      </Title>
      <RoleForm mode={isEdit ? 'edit' : 'create'} initialValues={initialValues || {}} />
    </Container>
  );
}
