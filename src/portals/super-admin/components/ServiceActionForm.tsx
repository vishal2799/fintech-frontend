// ============================================
// 6. FORM COMPONENT
// src/modules/serviceActions/components/ServiceActionForm.tsx
// ============================================

import { Button, Stack, TextInput, Textarea, Group, Switch } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router';
import {
  useCreateServiceAction,
  useUpdateServiceAction,
} from '../hooks/serviceActions.hooks';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import {
  serviceActionSchema,
  updateServiceActionSchema,
  type CreateServiceActionInput,
  type UpdateServiceActionInput,
  type ServiceAction
} from '../schema/serviceAction.schema';
import { showError, showSuccess } from '../../../utils/notifications';

type Props = {
  mode: 'create' | 'edit';
  initialValues?: Partial<ServiceAction>;
};

export default function ServiceActionForm({ mode, initialValues }: Props) {
  const navigate = useNavigate();

  const schema = mode === 'create' ? serviceActionSchema : updateServiceActionSchema;

  const form = useForm<CreateServiceActionInput | UpdateServiceActionInput>({
    initialValues: {
      name: '',
      code: '',
      description: '',
      isActive: true,
      ...initialValues,
    },
    validate: zod4Resolver(schema),
  });

  const create = useCreateServiceAction();
  const update = useUpdateServiceAction();

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      if (mode === 'create') {
        const res = await create.mutateAsync(values as CreateServiceActionInput);
        showSuccess(res);
      } else if (initialValues?.id) {
        const res = await update.mutateAsync({
          id: initialValues.id,
          data: values as UpdateServiceActionInput,
        });
        showSuccess(res);
      }
      navigate('/service-actions/list');
    } catch (err: any) {
      showError(err);
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput 
          label="Name" 
          withAsterisk 
          placeholder="e.g., DMT Account Verification"
          {...form.getInputProps('name')} 
        />
        
        <TextInput 
          label="Code" 
          withAsterisk 
          placeholder="e.g., dmt-verify-account"
          description="Lowercase letters, numbers, and hyphens only"
          {...form.getInputProps('code')} 
        />
        
        <Textarea 
          label="Description" 
          placeholder="Describe what this action does..."
          minRows={3}
          {...form.getInputProps('description')} 
        />

        <Switch
          label="Active"
          description="Inactive actions cannot be used in transactions"
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