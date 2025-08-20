import { Button, Stack, TextInput, Select, Group, Switch } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router';
import {
  useCreateServiceCommission,
  useUpdateServiceCommission,
} from '../hooks/serviceCommission.hooks';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import type { ServiceCommissionForm } from '../schema/serviceCommission.schema';
import { serviceCommissionSchema, updateServiceCommissionSchema } from '../schema/serviceCommission.schema';
import { showError, showSuccess } from '../../../utils/notifications';
import { useServices } from '../hooks/services.hooks';
import { useServiceOperators } from '../hooks/serviceOperator.hooks';

type Props = {
  mode: 'create' | 'edit';
  initialValues?: Partial<ServiceCommissionForm>;
};

export default function ServiceCommissionForm({ mode, initialValues }: Props) {
  const navigate = useNavigate();
    const { data: services = [], isLoading: servicesLoading } = useServices();
    const { data: operators = [], isLoading: operatorsLoading } = useServiceOperators();

  const schema = mode === 'create' ? serviceCommissionSchema : updateServiceCommissionSchema;

  const form = useForm<ServiceCommissionForm>({
    initialValues: {
      serviceId: '',
      operatorId: '',
      level: 'RETAILER',
      value: '0',
      valueType: 'PERCENTAGE',
      isActive: true,
      ...initialValues,
    },
    validate: zod4Resolver(schema),
  });

  const create = useCreateServiceCommission();
  const update = useUpdateServiceCommission();

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      if (mode === 'create') {
        const res = await create.mutateAsync(values);
        showSuccess(res);
      } else if (initialValues?.id) {
        const res = await update.mutateAsync({ id: initialValues.id, data: values });
        showSuccess(res);
      }
      navigate('/commission/list');
    } catch (err) {
      showError(err);
    }
  });

  const serviceOptions = services.map(s => ({
    value: s.id,
    label: `${s.name} (${s.code})`,
  }));

  const operatorOptions = operators.map((s:{id: string, name: string, code: string}) => ({
    value: s.id,
    label: `${s.name} (${s.code})`,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <Select
          label="Service"
          placeholder={servicesLoading ? 'Loading services...' : 'Select service'}
          data={serviceOptions}
          searchable
          withAsterisk
          {...form.getInputProps('serviceId')}
        />

        <Select
          label="Operator"
          placeholder={operatorsLoading ? 'Loading operators...' : 'Select operator'}
          data={operatorOptions}
          searchable
          withAsterisk
          {...form.getInputProps('operatorId')}
        />

        <Select
          label="Level"
          data={['TENANT', 'SUPER_DISTRIBUTOR', 'DISTRIBUTOR', 'RETAILER']}
          {...form.getInputProps('level')}
        />
        <TextInput label="Value" type="number" {...form.getInputProps('value')} />
        <Select
          label="Value Type"
          data={['PERCENTAGE', 'FIXED']}
          {...form.getInputProps('valueType')}
        />
        <Switch
                  label="Active"
                  {...form.getInputProps('isActive', { type: 'checkbox' })}
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
