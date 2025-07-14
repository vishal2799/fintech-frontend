import {
  TextInput,
  Button,
  Select,
  ColorInput,
  Stack,
  Group,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCreateTenant, useUpdateTenant } from '../api/tenants.hooks';
import type { Tenant, TenantStatus } from '../types/tenant.types';
import { useNavigate } from 'react-router';
import { notifications } from '@mantine/notifications';

type Props = {
  mode: 'create' | 'edit';
  initialValues?: Partial<Tenant>;
};

const statusOptions: { label: string; value: TenantStatus }[] = [
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Inactive', value: 'INACTIVE' },
  { label: 'Suspended', value: 'SUSPENDED' },
];

export default function TenantForm({ mode, initialValues }: Props) {
  const navigate = useNavigate();
  const form = useForm<Partial<Tenant>>({
    initialValues: {
      name: '',
      slug: '',
      logoUrl: '',
      themeColor: '#004aad',
      status: 'ACTIVE',
      ...initialValues,
    },
  });

  const createMutation = useCreateTenant();
  const updateMutation = useUpdateTenant();

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      if (mode === 'create') {
        await createMutation.mutateAsync(values);
        notifications.show({ message: 'Tenant created', color: 'green' });
      } else if (mode === 'edit' && initialValues?.id) {
        await updateMutation.mutateAsync({ id: initialValues?.id, data: values });
        notifications.show({ message: 'Tenant updated', color: 'blue' });
      }
      navigate('/super-admin/tenants');
    } catch (err: any) {
      notifications.show({ message: err.message || 'Error', color: 'red' });
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput
          label="Name"
          withAsterisk
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Slug"
          withAsterisk
          placeholder="yourbrand.fintech.com"
          {...form.getInputProps('slug')}
        />
        <TextInput
          label="Logo URL"
          placeholder="https://cdn.com/logo.png"
          {...form.getInputProps('logoUrl')}
        />
        <ColorInput
          label="Theme Color"
          {...form.getInputProps('themeColor')}
        />
        {/* <Select
          label="Status"
          data={statusOptions}
          {...form.getInputProps('status')}
        /> */}

        <Group mt="md">
          <Button type="submit" loading={createMutation.isPending || updateMutation.isPending}>
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
