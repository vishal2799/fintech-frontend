import { Button, Stack, TextInput, Textarea, Group, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router';
import { notifications } from '@mantine/notifications';
import { useCreatePermission, useUpdatePermission } from '../api/permissions.hooks';
import type { Permission } from '../types/permissions.types';

type Props = {
  mode: 'create' | 'edit';
  initialValues?: Partial<Permission>;
};

export default function PermissionForm({ mode, initialValues }: Props) {
  const navigate = useNavigate();
  const form = useForm<Partial<Permission>>({
    initialValues: {
      name: '',
      module: '',
      description: '',
      scope: 'TENANT',
      ...initialValues,
    },
  });

  const create = useCreatePermission();
  const update = useUpdatePermission();

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      if (mode === 'create') {
        await create.mutateAsync(values as any);
        notifications.show({ message: 'Permission created', color: 'green' });
      } else if (initialValues?.id) {
        await update.mutateAsync({ id: initialValues.id, data: values });
        notifications.show({ message: 'Permission updated', color: 'blue' });
      }
      navigate('/super-admin/permissions/list');
    } catch (err: any) {
      notifications.show({ message: err.message || 'Error', color: 'red' });
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput label="Name" withAsterisk {...form.getInputProps('name')} />
        <TextInput label="Module" withAsterisk {...form.getInputProps('module')} />
        <Textarea label="Description" {...form.getInputProps('description')} />

        <Select
          label="Scope"
          withAsterisk
          data={[
            { label: 'Platform', value: 'PLATFORM' },
            { label: 'Tenant', value: 'TENANT' },
            { label: 'Both', value: 'BOTH' },
          ]}
          {...form.getInputProps('scope')}
        />

        <Group mt="md">
          <Button type="submit" loading={create.isPending || update.isPending}>
            {mode === 'create' ? 'Create' : 'Update'}
          </Button>
          <Button variant="light" onClick={() => navigate(-1)}>Cancel</Button>
        </Group>
      </Stack>
    </form>
  );
}
