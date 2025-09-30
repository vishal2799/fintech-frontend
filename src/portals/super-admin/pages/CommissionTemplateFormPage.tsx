// ============================================
// 5. FORM PAGE
// src/modules/commissionTemplates/pages/CommissionTemplateFormPage.tsx
// ============================================

import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Container, Title, Loader } from '@mantine/core';
import { useCommissionTemplates } from '../hooks/commissionTemplates.hooks';
import CommissionTemplateForm from '../components/CommissionTemplateForm';
import type { CommissionTemplate } from '../schema/commissionTemplate.schema';

export default function CommissionTemplateFormPage() {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);

  const { data: templates = [], isLoading } = useCommissionTemplates();
  const [initialValues, setInitialValues] = useState<Partial<CommissionTemplate> | null>(null);

  useEffect(() => {
    if (isEdit && templates.length > 0) {
      const match = templates.find((t: CommissionTemplate) => t.id === id);
      if (match) setInitialValues(match);
    }
  }, [isEdit, id, templates]);

  if (isEdit && (isLoading || !initialValues)) return <Loader />;

  return (
    <Container size="lg">
      <Title order={2} mb="md">
        {isEdit ? 'Edit Commission Template' : 'Create Commission Template'}
      </Title>
      <CommissionTemplateForm mode={isEdit ? 'edit' : 'create'} initialValues={initialValues || {}} />
    </Container>
  );
}