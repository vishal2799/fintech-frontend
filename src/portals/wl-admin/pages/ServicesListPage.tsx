import {
  Badge,
  Container,
  Group,
  Loader,
  Switch,
  Table,
  Title,
} from '@mantine/core';
import { useTenantServices, useUpdateTenantService } from '../hooks/services.hooks';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';

export default function WLAdminServicesPage() {
  const { data = [], isLoading } = useTenantServices();
  const updateTenantService = useUpdateTenantService();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const handleToggle = async (serviceId: string, current: boolean) => {
    setPendingId(serviceId);
    try {
      await updateTenantService.mutateAsync({ serviceId, isEnabled: !current });
      notifications.show({ message: 'Service updated', color: 'green' });
    } catch (err: any) {
      notifications.show({ message: err.message || 'Error updating service', color: 'red' });
    } finally {
      setPendingId(null);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Container size="lg">
      <Group justify="space-between" mb="md">
        <Title order={2}>My Services</Title>
      </Group>

      <Table striped withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Code</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Toggle</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((svc: any) => (
            <Table.Tr key={svc.id}>
              <Table.Td>{svc.name}</Table.Td>
              <Table.Td>{svc.code}</Table.Td>
              <Table.Td>
                <Badge color={svc.isEnabled ? 'green' : 'red'}>
                  {svc.isEnabled ? 'Enabled' : 'Disabled'}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Switch
                  checked={svc.isEnabled}
                  onChange={() => handleToggle(svc.id, svc.isEnabled)}
                  disabled={pendingId === svc.id}
                />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Container>
  );
}
