// ============================================
// 5. FORM PAGE
// src/modules/serviceTemplates/pages/ServiceTemplateFormPage.tsx
// ============================================

import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Container, Title, Loader } from '@mantine/core';
import { useServiceTemplates } from '../hooks/serviceTemplates.hooks';
import ServiceTemplateForm from '../components/ServiceTemplateForm';
import type { ServiceTemplate } from '../schema/serviceTemplate.schema';

export default function ServiceTemplateFormPage() {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);

  const { data: serviceTemplates = [], isLoading } = useServiceTemplates();
  const [initialValues, setInitialValues] = useState<Partial<ServiceTemplate> | null>(null);

  useEffect(() => {
    if (isEdit && serviceTemplates.length > 0) {
      const match = serviceTemplates.find((st: ServiceTemplate) => st.id === id);
      if (match) setInitialValues(match);
    }
  }, [isEdit, id, serviceTemplates]);

  if (isEdit && (isLoading || !initialValues)) return <Loader />;

  return (
    <Container size="lg">
      <Title order={2} mb="md">
        {isEdit ? 'Edit Service Template' : 'Link Service Action to Template'}
      </Title>
      <ServiceTemplateForm mode={isEdit ? 'edit' : 'create'} initialValues={initialValues || {}} />
    </Container>
  );
}