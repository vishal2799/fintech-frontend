import {
  Modal,
  Switch,
  Stack,
  Button,
  Group,
  Loader,
  Text,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useTenantServices, useUpdateTenantServices } from '../hooks/tenantService.hooks';
import { notifications } from '@mantine/notifications';

type Props = {
  tenantId: string;
  opened: boolean;
  onClose: () => void;
};

export const TenantServiceModal = ({ tenantId, opened, onClose }: Props) => {
  const { data = [], isLoading } = useTenantServices(tenantId);
  const mutation = useUpdateTenantServices(tenantId);

  const [localState, setLocalState] = useState<
    { serviceId: string; isEnabled: boolean }[]
  >([]);

  const handleToggle = (serviceId: string) => {
    setLocalState(prev =>
      prev.map(s =>
        s.serviceId === serviceId
          ? { ...s, isEnabled: !s.isEnabled }
          : s
      )
    );
  };

  // Sync local state with fetched data
  useEffect(() => {
    if (data?.length) {
      setLocalState(data.map(({ id, isEnabled }: {id: any; isEnabled: any}) => ({
        serviceId: id,
        isEnabled,
      })));
    }
  }, [data]);

  const handleSave = async () => {
    try {
      await mutation.mutateAsync(localState);
      notifications.show({ message: 'Tenant services updated', color: 'green' });
      onClose();
    } catch (err: any) {
      notifications.show({ message: err.message || 'Update failed', color: 'red' });
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Configure Services">
      {isLoading ? (
        <Group justify="center" py="xl">
          <Loader />
        </Group>
      ) : (
        <Stack>
          {data.map((svc:any) => (
            <Group key={svc.id} justify="space-between">
              <div>
                <Text size="sm" fw={500}>{svc.name}</Text>
                <Text size="xs" c="dimmed">{svc.description || svc.code}</Text>
              </div>
              <Switch
                checked={localState.find(s => s.serviceId === svc.id)?.isEnabled}
                onChange={() => handleToggle(svc.id)}
              />
            </Group>
          ))}
          <Button onClick={handleSave} loading={mutation.isPending}>
            Save Changes
          </Button>
        </Stack>
      )}
    </Modal>
  );
};
