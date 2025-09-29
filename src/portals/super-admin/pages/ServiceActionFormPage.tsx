// ============================================
// 5. FORM PAGE
// src/modules/serviceActions/pages/ServiceActionFormPage.tsx
// ============================================

import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Container, Title, Loader } from '@mantine/core';
import { useServiceActions } from '../hooks/serviceActions.hooks';
import ServiceActionForm from '../components/ServiceActionForm';
import type { ServiceAction } from '../schema/serviceAction.schema';

export default function ServiceActionFormPage() {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);

  const { data: serviceActions = [], isLoading } = useServiceActions();
  const [initialValues, setInitialValues] = useState<Partial<ServiceAction> | null>(null);

  useEffect(() => {
    if (isEdit && serviceActions.length > 0) {
      const match = serviceActions.find((sa: ServiceAction) => sa.id === id);
      if (match) setInitialValues(match);
    }
  }, [isEdit, id, serviceActions]);

  if (isEdit && (isLoading || !initialValues)) return <Loader />;

  return (
    <Container size="lg">
      <Title order={2} mb="md">
        {isEdit ? 'Edit Service Action' : 'Create Service Action'}
      </Title>
      <ServiceActionForm mode={isEdit ? 'edit' : 'create'} initialValues={initialValues || {}} />
    </Container>
  );
}
