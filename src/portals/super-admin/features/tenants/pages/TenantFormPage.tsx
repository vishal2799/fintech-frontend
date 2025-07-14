import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import TenantForm from '../components/TenantForm';
import { useTenants } from '../api/tenants.hooks';
import { Title, Loader, Container } from '@mantine/core';

export default function TenantFormPage() {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);
  const { data: tenants = [], isLoading } = useTenants();
  const [initialValues, setInitialValues] = useState<any | null>(null);

  useEffect(() => {
    if (isEdit && tenants.length > 0) {
      const match = tenants.find((t) => t?.id === id);
      if (match) setInitialValues(match);
    }
  }, [isEdit, tenants, id]);

  if (isEdit && (isLoading || !initialValues)) {
    return <Loader />;
  }

  return (
    <Container size={'lg'}>
      <Title order={2} mb="md">
        {isEdit ? 'Edit Tenant' : 'Create Tenant'}
      </Title>
      <TenantForm mode={isEdit ? 'edit' : 'create'} initialValues={initialValues || {}} />
    </Container>
  );
}
