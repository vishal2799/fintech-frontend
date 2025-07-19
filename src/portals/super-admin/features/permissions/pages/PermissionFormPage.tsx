import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Container, Title, Loader } from '@mantine/core';
import { usePermissions } from '../api/permissions.hooks';
import PermissionForm from '../components/PermissionForm';

export default function PermissionFormPage() {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);
  const { data: permissions = [], isLoading } = usePermissions();
  const [initialValues, setInitialValues] = useState<any | null>(null);

  useEffect(() => {
    if (isEdit && permissions.length > 0) {
      const found = permissions.find((p) => p.id === id);
      if (found) setInitialValues(found);
    }
  }, [isEdit, permissions, id]);

  if (isEdit && (isLoading || !initialValues)) return <Loader />;

  return (
    <Container size="lg">
      <Title order={2} mb="md">
        {isEdit ? 'Edit Permission' : 'Create Permission'}
      </Title>
      <PermissionForm mode={isEdit ? 'edit' : 'create'} initialValues={initialValues || {}} />
    </Container>
  );
}
