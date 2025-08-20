import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Container, Title, Loader } from '@mantine/core';
import { useServiceCommissions } from '../hooks/serviceCommission.hooks';
import ServiceCommissionForm from '../components/ServiceCommissionForm';
import type { ServiceCommissionForm as SCForm } from '../schema/serviceCommission.schema';
import type { ServiceCommission } from '../types/serviceCommission.types';

export default function ServiceCommissionFormPage() {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);

  const { data: commissions = [], isLoading } = useServiceCommissions();
  const [initialValues, setInitialValues] = useState<Partial<SCForm> | null>(null);

  useEffect(() => {
    if (isEdit && commissions.length > 0) {
      const match = commissions.find((c:ServiceCommission) => c.id === id);
      if (match) setInitialValues(match);
    }
  }, [isEdit, id, commissions]);

  if (isEdit && (isLoading || !initialValues)) return <Loader />;

  return (
    <Container size="lg">
      <Title order={2} mb="md">
        {isEdit ? 'Edit Service Commission' : 'Create Service Commission'}
      </Title>
      <ServiceCommissionForm
        mode={isEdit ? 'edit' : 'create'}
        initialValues={initialValues || {}}
      />
    </Container>
  );
}
