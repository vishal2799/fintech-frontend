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
} from '../hooks/roles.hooks';
import type { Role } from '../types/role.types';
import { usePermissions } from '../hooks/permissions.hooks';
import { createRoleSchema, updateRoleSchema } from '../schema/roles.schema';
import { zod4Resolver } from 'mantine-form-zod-resolver';

type Props = {
  mode: 'create' | 'edit';
  initialValues?: Partial<Role> & { permissionIds?: string[] };
};

export default function RoleForm({ mode, initialValues }: Props) {
  const navigate = useNavigate();
  const create = useCreateRole();
  const update = useUpdateRole();
  const { data: permissions = [] } = usePermissions();

    const schema = mode === "create" ? createRoleSchema : updateRoleSchema;
  

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      scope: 'PLATFORM',
      permissionIds: [],
      ...initialValues,
    },
    validate: zod4Resolver(schema)
  });

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      const payload = {
        name: values.name!,
        scope: values.scope as 'TENANT' | 'PLATFORM',
        description: values.description ?? '',
        permissionIds: values.permissionIds || [],
      };

      if (mode === 'create') {
        await create.mutateAsync(payload);
        notifications.show({ message: 'Role created', color: 'green' });
      } else if (initialValues?.id) {
        await update.mutateAsync({ id: initialValues.id, data: payload });
        notifications.show({ message: 'Role updated', color: 'blue' });
      }

      navigate('/roles/list');
    } catch (err: any) {
      notifications.show({ message: err.message || 'Error occurred', color: 'red' });
    }
  });

  // ✅ Dynamically filter based on scope
  // const allowedScopes = form.values.scope === 'PLATFORM' ? ['PLATFORM', 'BOTH'] : ['TENANT', 'BOTH'];
  const allowedScopes = ['PLATFORM', 'BOTH'];

  const filteredPermissions = permissions.filter((p) =>
    allowedScopes.includes(p.scope)
  );

  const groupedPermissions = Object.entries(
    filteredPermissions.reduce((acc: Record<string, { label: string; value: string }[]>, p) => {
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

        {/* <Select
          label="Scope"
          withAsterisk
          data={[
            { label: 'Platform', value: 'PLATFORM' },
            { label: 'Tenant', value: 'TENANT' },
          ]}
          {...form.getInputProps('scope')}
          disabled
        /> */}

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
