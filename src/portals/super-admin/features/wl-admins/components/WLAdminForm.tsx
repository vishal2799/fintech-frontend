import { useNavigate } from "react-router";
import { useTenants } from "../../tenants/api/tenants.hooks";
import { useCreateWLAdmin, useUpdateWLAdmin } from "../api/wl-admins.hooks";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { Button, Group, PasswordInput, Select, Stack, TextInput } from "@mantine/core";
import type { WLAdmin } from '../types/wl-admin.types';
import type { CreateWLAdminDto } from "../api/wl-admins.api";

type Props = {
  mode: 'create' | 'edit';
  initialValues?: Partial<WLAdmin>;
};

export default function WLAdminForm({ mode, initialValues }: Props) {
  const navigate = useNavigate();
  const { data: tenants = [] } = useTenants();
  const create = useCreateWLAdmin();
  const update = useUpdateWLAdmin();

  const form = useForm<Partial<WLAdmin> & { password?: string }>({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      password: '',
      tenantId: '',
      status: 'ACTIVE',
      ...initialValues,
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      if (mode === 'create') {
      const payload: CreateWLAdminDto = {
        name: values.name!,
        email: values.email!,
        mobile: values.mobile!,
        password: values.password!,
        tenantId: values.tenantId!,
      };
      await create.mutateAsync(payload);
      notifications.show({ message: 'Created', color: 'green' });
      } else if (initialValues?.id) {
        await update.mutateAsync({ id: initialValues.id, data: values });
        notifications.show({ message: 'Updated', color: 'blue' });
      }
      navigate('/super-admin/wl-admins/list');
    } catch (err: any) {
      notifications.show({ message: err.message || 'Error', color: 'red' });
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput label="Name" withAsterisk {...form.getInputProps('name')} />
        <TextInput label="Email" withAsterisk {...form.getInputProps('email')} />
        <TextInput label="Mobile" withAsterisk {...form.getInputProps('mobile')} />

        {mode === 'create' && (
          <PasswordInput label="Password" withAsterisk {...form.getInputProps('password')} />
        )}

        <Select
          label="Tenant"
          data={tenants.map((t: any) => ({ label: t.name, value: t.id }))}
          {...form.getInputProps('tenantId')}
          disabled={mode === 'edit'}
        />

        {mode === 'edit' && (
          <Select
            label="Status"
            data={['ACTIVE', 'LOCKED', 'BLOCKED'].map((s) => ({ label: s, value: s }))}
            {...form.getInputProps('status')}
          />
        )}

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
