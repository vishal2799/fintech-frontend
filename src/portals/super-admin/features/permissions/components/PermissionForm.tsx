import {
  Button,
  Stack,
  TextInput,
  Textarea,
  Group,
  Select,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router';
import {
  useCreatePermission,
  useUpdatePermission,
} from '../api/permissions.hooks';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import {
  createPermissionSchema,
  updatePermissionSchema,
  type CreatePermissionInput,
  type UpdatePermissionInput,
} from '../schema/permissions.schema';
import type { Permission } from '../types/permissions.types';
import { showError, showSuccess } from '../../../../../utils/notifications';

type Props = {
  mode: 'create' | 'edit';
  initialValues?: Partial<Permission>;
};

export default function PermissionForm({ mode, initialValues }: Props) {
  const navigate = useNavigate();

  const schema = mode === 'create' ? createPermissionSchema : updatePermissionSchema;

  const form = useForm<CreatePermissionInput | UpdatePermissionInput>({
    initialValues: {
      name: '',
      module: '',
      description: '',
      scope: 'TENANT',
      ...initialValues,
    },
    validate: zod4Resolver(schema),
  });

  const create = useCreatePermission();
  const update = useUpdatePermission();

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      if (mode === 'create') {
        const res = await create.mutateAsync(values as CreatePermissionInput);
        showSuccess(res);
      } else if (initialValues?.id) {
        const res = await update.mutateAsync({
          id: initialValues.id,
          data: values as UpdatePermissionInput,
        });
        showSuccess(res);
      }
      navigate('/super-admin/permissions/list');
    } catch (err: any) {
      showError(err);
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
          <Button variant="light" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
