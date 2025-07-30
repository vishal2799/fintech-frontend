import { useParams } from 'react-router';
import { Title, Loader, Container } from '@mantine/core';
import WLAdminForm from '../components/WLAdminForm';
import { useWLAdmin } from '../hooks/wl-admins.hooks';

export default function WLAdminFormPage() {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);

  const { data: admin, isLoading } = useWLAdmin(id || '');

  if (isEdit && isLoading) return <Loader />;

  return (
    <Container size="lg">
      <Title order={2} mb="md">
        {isEdit ? 'Edit WL Admin' : 'Create WL Admin'}
      </Title>
      <WLAdminForm
        mode={isEdit ? 'edit' : 'create'}
        initialValues={isEdit ? admin : undefined}
      />
    </Container>
  );
}
