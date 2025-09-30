// ============================================
// 6. FORM COMPONENT
// src/modules/commissionTemplates/components/CommissionTemplateForm.tsx
// ============================================

import { Button, Stack, TextInput, Textarea, Group, Switch, Select, Paper, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router';
import {
  useCreateCommissionTemplate,
  useUpdateCommissionTemplate,
} from '../hooks/commissionTemplates.hooks';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import {
  commissionTemplateSchema,
  updateCommissionTemplateSchema,
  type CreateCommissionTemplateInput,
  type UpdateCommissionTemplateInput,
  type CommissionTemplate
} from '../schema/commissionTemplate.schema';
import { showError, showSuccess } from '../../../utils/notifications';

type Props = {
  mode: 'create' | 'edit';
  initialValues?: Partial<CommissionTemplate>;
};

export default function CommissionTemplateForm({ mode, initialValues }: Props) {
  const navigate = useNavigate();

  const schema = mode === 'create' ? commissionTemplateSchema : updateCommissionTemplateSchema;

  const form = useForm<CreateCommissionTemplateInput | UpdateCommissionTemplateInput>({
    initialValues: {
      name: '',
      description: '',
      hasCommission: false,
      commissionType: undefined,
      commissionValue: '',
      hasFee: false,
      feeType: undefined,
      feeValue: '',
      isActive: true,
      ...initialValues,
    },
    validate: zod4Resolver(schema),
  });

  const create = useCreateCommissionTemplate();
  const update = useUpdateCommissionTemplate();

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      if (mode === 'create') {
        const res = await create.mutateAsync(values as CreateCommissionTemplateInput);
        showSuccess(res);
      } else if (initialValues?.id) {
        const res = await update.mutateAsync({
          id: initialValues.id,
          data: values as UpdateCommissionTemplateInput,
        });
        showSuccess(res);
      }
      navigate('/commission-templates/list');
    } catch (err: any) {
      showError(err);
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput 
          label="Template Name" 
          withAsterisk 
          placeholder="e.g., DMT Standard Template"
          {...form.getInputProps('name')} 
        />
        
        <Textarea 
          label="Description" 
          placeholder="Describe this commission template..."
          minRows={2}
          {...form.getInputProps('description')} 
        />

        {/* Commission Configuration */}
        <Paper withBorder p="md">
          <Stack>
            <Text fw={500} size="sm">Commission Configuration</Text>
            
            <Switch
              label="Enable Commission"
              description="Enable commission for this template"
              {...form.getInputProps('hasCommission', { type: 'checkbox' })}
            />

            {form.values.hasCommission && (
              <>
                <Select
                  label="Commission Type"
                  withAsterisk
                  placeholder="Select type"
                  data={[
                    { value: 'fixed', label: 'Fixed Amount (₹)' },
                    { value: 'percentage', label: 'Percentage (%)' },
                  ]}
                  {...form.getInputProps('commissionType')}
                />

                <TextInput
                  label="Commission Value"
                  withAsterisk
                  placeholder={form.values.commissionType === 'fixed' ? 'e.g., 10' : 'e.g., 2.5'}
                  description={
                    form.values.commissionType === 'fixed' 
                      ? 'Enter fixed amount in rupees' 
                      : 'Enter percentage value'
                  }
                  {...form.getInputProps('commissionValue')}
                />
              </>
            )}
          </Stack>
        </Paper>

        {/* Fee Configuration */}
        <Paper withBorder p="md">
          <Stack>
            <Text fw={500} size="sm">Fee Configuration</Text>
            
            <Switch
              label="Enable Fee"
              description="Enable fee for this template"
              {...form.getInputProps('hasFee', { type: 'checkbox' })}
            />

            {form.values.hasFee && (
              <>
                <Select
                  label="Fee Type"
                  withAsterisk
                  placeholder="Select type"
                  data={[
                    { value: 'fixed', label: 'Fixed Amount (₹)' },
                    { value: 'percentage', label: 'Percentage (%)' },
                  ]}
                  {...form.getInputProps('feeType')}
                />

                <TextInput
                  label="Fee Value"
                  withAsterisk
                  placeholder={form.values.feeType === 'fixed' ? 'e.g., 5' : 'e.g., 1.5'}
                  description={
                    form.values.feeType === 'fixed' 
                      ? 'Enter fixed amount in rupees' 
                      : 'Enter percentage value'
                  }
                  {...form.getInputProps('feeValue')}
                />
              </>
            )}
          </Stack>
        </Paper>

        <Switch
          label="Active"
          description="Inactive templates cannot be assigned to services"
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