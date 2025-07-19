import {
  Button,
  Group,
  PasswordInput,
  Stack,
  TextInput,
  Select,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router';
import { notifications } from '@mantine/notifications';
import { useRoles } from '../../roles/api/roles.hooks';
import {
  useCreateEmployee,
  useUpdateEmployee,
} from '../api/employees.hooks';

type Props = {
  mode: 'create' | 'edit';
  initialValues?: any;
};

export default function EmployeeForm({ mode, initialValues }: Props) {
  const navigate = useNavigate();
  const create = useCreateEmployee();
  const update = useUpdateEmployee();
  const { data: roles = [] } = useRoles();

  const form = useForm<any>({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      password: '',
      roleId: '',
      ...initialValues,
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      if (mode === 'create') {
        await create.mutateAsync(values);
        notifications.show({ message: 'Employee created', color: 'green' });
      } else if (initialValues?.id) {
        await update.mutateAsync({ id: initialValues.id, data: values });
        notifications.show({ message: 'Employee updated', color: 'blue' });
      }
      navigate('/super-admin/employees/list');
    } catch (err: any) {
      // console.log(err.response.data.message)
      notifications.show({ message: err.response.data.message || 'Error', color: 'red' });
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput label="Name" withAsterisk {...form.getInputProps('name')} />
        <TextInput label="Email" withAsterisk {...form.getInputProps('email')} />
        <TextInput label="Mobile" withAsterisk {...form.getInputProps('mobile')} />
        {mode === 'create' && (
          <PasswordInput
            label="Password"
            withAsterisk
            {...form.getInputProps('password')}
          />
        )}
        <Select
          label="Role"
          withAsterisk
          data={roles.map((r) => ({ label: r.name, value: r.id }))}
          {...form.getInputProps('roleId')}
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
