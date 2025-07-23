import {
  TextInput,
  Button,
  ColorInput,
  Stack,
  Group,
} from '@mantine/core';
import { useNavigate } from 'react-router';
import { useCreateTenant, useUpdateTenant } from '../api/tenants.hooks';
import { showError, showSuccess } from '../../../../../utils/notifications';
import {
  createTenantSchema,
  updateTenantSchema,
  type CreateTenantInput
} from '../schema/tenant.schema.ts';
import type { Tenant } from '../types/tenant.types';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';

type Props = {
  mode: 'create' | 'edit';
  initialValues?: Partial<Tenant>;
};

export default function TenantForm({ mode, initialValues }: Props) {
  const navigate = useNavigate();

  const schema = mode === 'create' ? createTenantSchema : updateTenantSchema;

const form = useForm({
  initialValues: {
    name: '',
    slug: '',
    logoUrl: '',
    themeColor: '#004aad',
    status: 'ACTIVE',
    ...initialValues,
  },
  validate: zod4Resolver(schema)
});


  const createMutation = useCreateTenant();
  const updateMutation = useUpdateTenant();

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      if (mode === 'create') {
        const res = await createMutation.mutateAsync(values as CreateTenantInput);
        showSuccess(res);
      } else if (mode === 'edit' && initialValues?.id) {
        const res = await updateMutation.mutateAsync({
          id: initialValues.id,
          data: values,
        });
        showSuccess(res);
      }
      navigate('/super-admin/tenants/list');
    } catch (err) {
      showError(err);
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput label="Name" withAsterisk {...form.getInputProps('name')} />
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
        <ColorInput label="Theme Color" {...form.getInputProps('themeColor')} />
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
