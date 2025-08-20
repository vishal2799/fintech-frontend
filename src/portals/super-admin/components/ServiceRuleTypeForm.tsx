import { Button, Stack, TextInput, Textarea, Select, Switch, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  createServiceRuleTypeSchema,
  updateServiceRuleTypeSchema,
  type CreateServiceRuleTypeInput,
} from '../schema/serviceRuleType.schema';
import { useCreateServiceRuleType, useUpdateServiceRuleType, useServicesSummary } from '../hooks/serviceRuleType.hooks';
import type { ServiceRuleType } from '../types/serviceRuleType.types';
import { zod4Resolver } from 'mantine-form-zod-resolver';

type FormValues = CreateServiceRuleTypeInput;

interface Props {
  initial?: ServiceRuleType | null;
  onSuccess: () => void;
}

export const ServiceRuleTypeForm = ({ initial, onSuccess }: Props) => {
  const isEdit = Boolean(initial?.id);

  const { data: services = [], isLoading: servicesLoading } = useServicesSummary();

  const createMutation = useCreateServiceRuleType();
  const updateMutation = useUpdateServiceRuleType();

  const form = useForm<FormValues>({
    validate: zod4Resolver(isEdit ? updateServiceRuleTypeSchema : createServiceRuleTypeSchema),
    initialValues: {
      serviceId: initial?.serviceId ?? '',
      code: initial?.code ?? '',
      name: initial?.name ?? '',
      description: initial?.description ?? '',
      isActive: initial?.isActive ?? true,
    },
  });

  const onSubmit = (values: FormValues) => {
    if (isEdit && initial) {
      updateMutation.mutate(
        { id: initial.id, payload: values },
        { onSuccess }
      );
    } else {
      createMutation.mutate(values, { onSuccess });
    }
  };

  const serviceOptions = services.map(s => ({
    value: s.id,
    label: `${s.name} (${s.code})`,
  }));

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap="sm">
        <Select
          label="Service"
          placeholder={servicesLoading ? 'Loading services...' : 'Select service'}
          data={serviceOptions}
          searchable
          withAsterisk
          {...form.getInputProps('serviceId')}
        />
        <Group grow>
          <TextInput
            label="Code"
            placeholder="e.g. dmt_charge"
            withAsterisk
            {...form.getInputProps('code')}
          />
          <TextInput
            label="Name"
            placeholder="e.g. DMT Charge"
            withAsterisk
            {...form.getInputProps('name')}
          />
        </Group>
        <Textarea
          label="Description"
          placeholder="Optional description"
          autosize
          minRows={2}
          {...form.getInputProps('description')}
        />
        <Switch
          label="Active"
          {...form.getInputProps('isActive', { type: 'checkbox' })}
        />

        <Button
          type="submit"
          loading={createMutation.isPending || updateMutation.isPending}
        >
          {isEdit ? 'Update' : 'Create'}
        </Button>
      </Stack>
    </form>
  );
};
