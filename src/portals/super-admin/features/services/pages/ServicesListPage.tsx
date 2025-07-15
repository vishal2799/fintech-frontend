// ✅ Super Admin – Services List Page
import {
  Badge,
  Button,
  Group,
  Table,
  Title,
  Switch,
  Container,
  Loader,
  TextInput,
  Stack,
  Modal,
} from '@mantine/core';
import { useState } from 'react';
import {
  useServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
} from '../api/services.hooks';
import { notifications } from '@mantine/notifications';
import { IconPlus } from '@tabler/icons-react';
import type { Service } from '../types/services.types';

export default function ServiceListPage() {
  const { data: services = [], isLoading } = useServices();
  const createService = useCreateService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();

  const [modalOpened, setModalOpened] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<{ name: string; code: string }>({ name: '', code: '' });
  const [togglePending, setTogglePending] = useState<string | null>(null);

  const handleOpenCreate = () => {
    setEditId(null);
    setFormValues({ name: '', code: '' });
    setModalOpened(true);
  };

  const handleOpenEdit = (svc: Service) => {
    setEditId(svc.id);
    setFormValues({ name: svc.name, code: svc.code });
    setModalOpened(true);
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await updateService.mutateAsync({ id: editId, data: formValues });
        notifications.show({ message: 'Service updated', color: 'blue' });
      } else {
        await createService.mutateAsync({ ...formValues, isGlobalEnabled: true });
        notifications.show({ message: 'Service created', color: 'green' });
      }
      setModalOpened(false);
    } catch (err: any) {
      notifications.show({ message: err.message || 'Error', color: 'red' });
    }
  };

  const handleToggle = async (svc: Service) => {
    setTogglePending(svc.id);
    try {
      await updateService.mutateAsync({ id: svc.id, data: { isGlobalEnabled: !svc.isGlobalEnabled } });
    } catch (err: any) {
      notifications.show({ message: err.message || 'Toggle failed', color: 'red' });
    } finally {
      setTogglePending(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      await deleteService.mutateAsync(id);
      notifications.show({ message: 'Service deleted', color: 'red' });
    } catch (err: any) {
      notifications.show({ message: err.message || 'Delete failed', color: 'red' });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Container size="lg">
      <Group justify="space-between" mb="md">
        <Title order={2}>Services</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={handleOpenCreate}>
          New Service
        </Button>
      </Group>

      <Table striped withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Code</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Toggle</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {services.map((svc) => (
            <Table.Tr key={svc.id}>
              <Table.Td>{svc.name}</Table.Td>
              <Table.Td>{svc.code}</Table.Td>
              <Table.Td>
                <Badge color={svc.isGlobalEnabled ? 'green' : 'red'}>
                  {svc.isGlobalEnabled ? 'Enabled' : 'Disabled'}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Switch
                  checked={svc.isGlobalEnabled}
                  onChange={() => handleToggle(svc)}
                  disabled={togglePending === svc.id}
                />
              </Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <Button size="xs" variant="light" onClick={() => handleOpenEdit(svc)}>
                    Edit
                  </Button>
                  <Button size="xs" variant="light" color="red" onClick={() => handleDelete(svc.id)}>
                    Delete
                  </Button>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={editId ? 'Edit Service' : 'Create Service'}
      >
        <Stack>
          <TextInput
            label="Name"
            value={formValues.name}
            onChange={(e) => setFormValues((f) => ({ ...f, name: e.target.value }))}
          />
          <TextInput
            label="Code"
            value={formValues.code}
            onChange={(e) => setFormValues((f) => ({ ...f, code: e.target.value }))}
          />
          <Button
            onClick={handleSubmit}
            fullWidth
            loading={createService.isPending || updateService.isPending}
          >
            {editId ? 'Update' : 'Create'}
          </Button>
        </Stack>
      </Modal>
    </Container>
  );
}
