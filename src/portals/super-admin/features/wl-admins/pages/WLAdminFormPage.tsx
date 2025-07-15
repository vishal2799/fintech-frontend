import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Title, Loader, Container } from '@mantine/core';
import { useWLAdmins } from '../api/wl-admins.hooks';
import WLAdminForm from '../components/WLAdminForm';

export default function WLAdminFormPage() {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);
  const { data: admins = [], isLoading } = useWLAdmins();
  const [initialValues, setInitialValues] = useState<any | null>(null);

  useEffect(() => {
    if (isEdit && admins.length > 0) {
      const match = admins.find((a:any) => a.id === id);
      if (match) setInitialValues(match);
    }
  }, [isEdit, admins, id]);

  if (isEdit && (isLoading || !initialValues)) return <Loader />;

  return (
    <Container size="lg">
      <Title order={2} mb="md">
        {isEdit ? 'Edit WL Admin' : 'Create WL Admin'}
      </Title>
      <WLAdminForm mode={isEdit ? 'edit' : 'create'} initialValues={initialValues || {}} />
    </Container>
  );
}
