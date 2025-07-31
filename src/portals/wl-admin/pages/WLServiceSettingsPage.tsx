import { useEffect } from 'react';
import { Button, Switch, Table, Title, Loader, Center } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { isEqual } from 'lodash-es';

import { useWLServices, useUpdateWLServices } from '../hooks/wl-services.hooks';
import { UpdateWLServicesSchema } from '../schema/wl-services.schema';

// ✅ Define form type explicitly
type ServiceFormValue = {
  serviceId: string;
  isEnabled: boolean;
};

export default function WLServiceSettingsPage() {
  const { data, isLoading } = useWLServices();
  const updateMutation = useUpdateWLServices();

  const form = useForm<{ services: ServiceFormValue[] }>({
    validate: zod4Resolver(UpdateWLServicesSchema),
    initialValues: { services: [] },
  });

  // ✅ Sync fetched services to form only when changed
  useEffect(() => {
    if (!data) return;

    const mapped = data.map((s:any) => ({
      serviceId: s.serviceId,
      isEnabled: s.isEnabled,
    }));

    if (!isEqual(form.values.services, mapped)) {
      form.setValues({ services: mapped });
    }
  }, [data]);

  const handleToggle = (serviceId: string, checked: boolean) => {
    form.setFieldValue(
      'services',
      form.values.services.map((s) =>
        s.serviceId === serviceId ? { ...s, isEnabled: checked } : s
      )
    );
  };

  const handleSubmit = () => {
    updateMutation.mutate(form.values);
  };

  if (isLoading || !data) {
    return (
      <Center py="lg">
        <Loader />
      </Center>
    );
  }

  return (
    <div>
      <Title order={3} mb="md">
        My Services
      </Title>

      <Table striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Service</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((service:any) => (
            <Table.Tr key={service.serviceId}>
              <Table.Td>{service.name}</Table.Td>
              <Table.Td>
                <Switch
                  checked={
                    form.values.services.find((s) => s.serviceId === service.serviceId)
                      ?.isEnabled || false
                  }
                  onChange={(event) =>
                    handleToggle(service.serviceId, event.currentTarget.checked)
                  }
                />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Button mt="md" onClick={handleSubmit} loading={updateMutation.isPending}>
        Save Changes
      </Button>
    </div>
  );
}
