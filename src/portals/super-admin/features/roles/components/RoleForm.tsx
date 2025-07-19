import {
  Button,
  Group,
  MultiSelect,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router';
import { notifications } from '@mantine/notifications';
import {
  useCreateRole,
  useUpdateRole,
} from '../api/roles.hooks';
import type { Role } from '../types/role.types';
import { usePermissions } from '../../permissions/api/permissions.hooks';

type Props = {
  mode: 'create' | 'edit';
  initialValues?: Partial<Role> & { permissionIds?: string[] };
};

export default function RoleForm({ mode, initialValues }: Props) {
  const navigate = useNavigate();
  const create = useCreateRole();
  const update = useUpdateRole();
  const { data: permissions = [] } = usePermissions();

  const form = useForm<Partial<Role> & { permissionIds: string[] }>({
    initialValues: {
      name: '',
      description: '',
      permissionIds: [],
      ...initialValues,
    },
    validate: {
      name: (value) => (!value ? 'Role name is required' : null),
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      const payload = {
        name: values.name!,
        description: values.description || '',
        permissionIds: values.permissionIds || [],
      };

      if (mode === 'create') {
        await create.mutateAsync(payload);
        notifications.show({ message: 'Role created', color: 'green' });
      } else if (initialValues?.id) {
        await update.mutateAsync({ id: initialValues.id, data: payload });
        notifications.show({ message: 'Role updated', color: 'blue' });
      }

      navigate('/super-admin/roles/list');
    } catch (err: any) {
      notifications.show({ message: err.message || 'Error occurred', color: 'red' });
    }
  });

  // Group permissions by module
  const groupedPermissions = Object.entries(
    permissions.reduce((acc: Record<string, { label: string; value: string }[]>, p: any) => {
      if (!acc[p.module]) acc[p.module] = [];
      acc[p.module].push({ label: p.name, value: p.id });
      return acc;
    }, {})
  ).map(([module, items]) => ({
    group: module,
    items,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput
          label="Role Name"
          withAsterisk
          {...form.getInputProps('name')}
        />

        <TextInput
          label="Description"
          {...form.getInputProps('description')}
        />

        <MultiSelect
          label="Permissions"
          data={groupedPermissions}
          searchable
          clearable
          nothingFoundMessage="No permissions found"
          value={form.values.permissionIds}
  onChange={(val) => form.setFieldValue('permissionIds', val)}
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
