// ============================================
// 6. FORM COMPONENT
// src/modules/serviceTemplates/components/ServiceTemplateForm.tsx
// ============================================

import { Button, Stack, Group, Switch, Select, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router';
import {
  useCreateServiceTemplate,
  useUpdateServiceTemplate,
} from '../hooks/serviceTemplates.hooks';
import { useServiceActions } from '../hooks/serviceActions.hooks';
import { useCommissionTemplates } from '../hooks/commissionTemplates.hooks';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import {
  serviceTemplateSchema,
  updateServiceTemplateSchema,
  type CreateServiceTemplateInput,
  type UpdateServiceTemplateInput,
  type ServiceTemplate
} from '../schema/serviceTemplate.schema';
import { showError, showSuccess } from '../../../utils/notifications';
import { IconInfoCircle } from '@tabler/icons-react';

type Props = {
  mode: 'create' | 'edit';
  initialValues?: Partial<ServiceTemplate>;
};

export default function ServiceTemplateForm({ mode, initialValues }: Props) {
  const navigate = useNavigate();

  const schema = mode === 'create' ? serviceTemplateSchema : updateServiceTemplateSchema;

  const { data: serviceActions = [], isLoading: loadingActions } = useServiceActions();
  const { data: templates = [], isLoading: loadingTemplates } = useCommissionTemplates();

  const form = useForm<CreateServiceTemplateInput | UpdateServiceTemplateInput>({
    initialValues: {
      serviceActionId: initialValues?.serviceActionId || '',
      templateId: initialValues?.templateId || '',
      isDefault: initialValues?.isDefault || false,
      isActive: initialValues?.isActive ?? true,
    },
    validate: zod4Resolver(schema),
  });

  const create = useCreateServiceTemplate();
  const update = useUpdateServiceTemplate();

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      if (mode === 'create') {
        const res = await create.mutateAsync(values as CreateServiceTemplateInput);
        showSuccess(res);
      } else if (initialValues?.id) {
        const res = await update.mutateAsync({
          id: initialValues.id,
          data: values as UpdateServiceTemplateInput,
        });
        showSuccess(res);
      }
      navigate('/service-templates/list');
    } catch (err: any) {
      showError(err);
    }
  });

  const serviceActionOptions = serviceActions.map((action: any) => ({
    value: action.id,
    label: `${action.name} (${action.code})`,
  }));

  const templateOptions = templates.map((template: any) => ({
    value: template.id,
    label: template.name,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <Alert icon={<IconInfoCircle size={16} />} color="blue" variant="light">
          Link a service action to a commission template. If set as default, this template will be used for commission calculations for this service action.
        </Alert>

        <Select
          label="Service Action"
          withAsterisk
          placeholder="Select service action"
          data={serviceActionOptions}
          disabled={mode === 'edit' || loadingActions}
          searchable
          {...form.getInputProps('serviceActionId')}
        />

        <Select
          label="Commission Template"
          withAsterisk
          placeholder="Select template"
          data={templateOptions}
          disabled={loadingTemplates}
          searchable
          {...form.getInputProps('templateId')}
        />

        <Switch
          label="Set as Default Template"
          description="This template will be used by default for this service action"
          {...form.getInputProps('isDefault', { type: 'checkbox' })}
        />

        <Switch
          label="Active"
          description="Inactive mappings will not be used for commission calculations"
          {...form.getInputProps('isActive', { type: 'checkbox' })}
        />

        <Group mt="md">
          <Button type="submit" loading={create.isPending || update.isPending}>
            {mode === 'create' ? 'Create' : 'Update'}
          </Button>
          <Button variant="light" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
