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

import { useRoles } from '../hooks/roles.hooks';
import {
  useCreateEmployee,
  useUpdateEmployee,
} from '../hooks/employees.hooks';

import type { Employee } from '../types/employees.types';
import {
  createEmployeeSchema,
  updateEmployeeSchema,
  type CreateEmployeeInput,
  type UpdateEmployeeInput,
} from '../schema/employees.schema';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { showError, showSuccess } from '../../../utils/notifications';

type Props = {
  mode: 'create' | 'edit';
  initialValues?: Partial<Employee>;
};

export default function EmployeeForm({ mode, initialValues }: Props) {
  const navigate = useNavigate();
  const create = useCreateEmployee();
  const update = useUpdateEmployee();
  const { data: roles = [] } = useRoles();

  const schema = mode === "create" ? createEmployeeSchema : updateEmployeeSchema;
  
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      password: '',
      roleId: '',
      ...initialValues,
    },
    validate: zod4Resolver(schema)
  });

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      if (mode === 'create') {
        const payload: CreateEmployeeInput = {
          name: values.name!,
          email: values.email!,
          mobile: values.mobile!,
          password: values.password!,
          roleId: values.roleId,
        };
        const createRes = await create.mutateAsync(payload);
        showSuccess(createRes);
      } else if (initialValues?.id) {
        const payload: UpdateEmployeeInput = {
          name: values.name!,
          email: values.email!,
          mobile: values.mobile!,
          roleId: values.roleId,
        };
        const updateRes = await update.mutateAsync({ id: initialValues.id, data: payload });
        showSuccess(updateRes);
      }
      navigate('/employees/list');
    } catch (err: any) {
      showError(err);
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


// import {
//   Button,
//   Group,
//   PasswordInput,
//   Stack,
//   TextInput,
//   Select,
// } from '@mantine/core';
// import { useForm } from '@mantine/form';
// import { useNavigate } from 'react-router';
// import { notifications } from '@mantine/notifications';
// import { useRoles } from '../../roles/api/roles.hooks';
// import {
//   useCreateEmployee,
//   useUpdateEmployee,
// } from '../api/employees.hooks';

// type Props = {
//   mode: 'create' | 'edit';
//   initialValues?: any;
// };

// export default function EmployeeForm({ mode, initialValues }: Props) {
//   const navigate = useNavigate();
//   const create = useCreateEmployee();
//   const update = useUpdateEmployee();
//   const { data: roles = [] } = useRoles();

//   const form = useForm<any>({
//     initialValues: {
//       name: '',
//       email: '',
//       mobile: '',
//       password: '',
//       roleId: '',
//       ...initialValues,
//     },
//   });

//   const handleSubmit = form.onSubmit(async (values) => {
//     try {
//       if (mode === 'create') {
//         await create.mutateAsync(values);
//         notifications.show({ message: 'Employee created', color: 'green' });
//       } else if (initialValues?.id) {
//         await update.mutateAsync({ id: initialValues.id, data: values });
//         notifications.show({ message: 'Employee updated', color: 'blue' });
//       }
//       navigate('/super-admin/employees/list');
//     } catch (err: any) {
//       // console.log(err.response.data.message)
//       notifications.show({ message: err.response.data.message || 'Error', color: 'red' });
//     }
//   });

//   return (
//     <form onSubmit={handleSubmit}>
//       <Stack>
//         <TextInput label="Name" withAsterisk {...form.getInputProps('name')} />
//         <TextInput label="Email" withAsterisk {...form.getInputProps('email')} />
//         <TextInput label="Mobile" withAsterisk {...form.getInputProps('mobile')} />
//         {mode === 'create' && (
//           <PasswordInput
//             label="Password"
//             withAsterisk
//             {...form.getInputProps('password')}
//           />
//         )}
//         <Select
//           label="Role"
//           withAsterisk
//           data={roles.map((r) => ({ label: r.name, value: r.id }))}
//           {...form.getInputProps('roleId')}
//         />
//         <Group mt="md">
//           <Button type="submit" loading={create.isPending || update.isPending}>
//             {mode === 'create' ? 'Create' : 'Update'}
//           </Button>
//           <Button variant="light" onClick={() => navigate(-1)}>
//             Cancel
//           </Button>
//         </Group>
//       </Stack>
//     </form>
//   );
// }
