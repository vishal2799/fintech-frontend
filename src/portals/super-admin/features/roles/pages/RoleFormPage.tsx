// src/pages/super-admin/settings/roles/pages/RoleFormPage.tsx

import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useRole, useRolePermissions } from '../api/roles.hooks';
import { Container, Loader, Title } from '@mantine/core';
import RoleForm from '../components/RoleForm';
import type { Role } from '../types/role.types';

export default function RoleFormPage() {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);

  // const { data: allRoles = [], isLoading: rolesLoading } = useRoles();
  const { data: permissionIds = [], isLoading: permsLoading } = useRolePermissions(id || '');
  const { data: roleData } = useRole(id || '');

  const [initialValues, setInitialValues] = useState<Partial<Role & { permissionIds: string[] }> | null>(null);

  useEffect(() => {
    if (isEdit && id && roleData && permissionIds.length >= 0 && !permsLoading) {
      setInitialValues({
        ...roleData,
        permissionIds,
      });
    }
  }, [isEdit, id, roleData, permissionIds, permsLoading]);

  if (isEdit && (permsLoading || !initialValues)) return <Loader />;

  return (
    <Container size="lg">
      <Title order={2} mb="md">
        {isEdit ? 'Edit Role' : 'Create Role'}
      </Title>

      <RoleForm
        mode={isEdit ? 'edit' : 'create'}
        initialValues={initialValues || {}}
      />
    </Container>
  );
}
