import { useState } from 'react';
import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Modal,
  Table,
  Text,
  Tooltip,
} from '@mantine/core';
import { IconEdit, IconTrash, IconPlus } from '@tabler/icons-react';
import { useServiceRuleTypes, useDeleteServiceRuleType } from '../hooks/serviceRuleType.hooks';
import type { ServiceRuleType } from '../types/serviceRuleType.types';
import { ServiceRuleTypeForm } from '../components/ServiceRuleTypeForm';

export const ServiceRuleTypesTable = () => {
  const { data = [], isLoading } = useServiceRuleTypes();
  const deleteMutation = useDeleteServiceRuleType();

  const [opened, setOpened] = useState(false);
  const [editing, setEditing] = useState<ServiceRuleType | null>(null);

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <>
      <Group justify="space-between" mb="md">
        <Text size="xl" fw={600}>Service Rule Types</Text>
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={() => { setEditing(null); setOpened(true); }}
        >
          Add Rule Type
        </Button>
      </Group>

      <Table striped withTableBorder withColumnBorders layout='fixed'>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={150}>ServiceName</Table.Th>
            <Table.Th w={120}>Code</Table.Th>
            <Table.Th w={150}>Name</Table.Th>
            {/* <Table.Th>Description</Table.Th> */}
            <Table.Th w={130}>Status</Table.Th>
            <Table.Th w={120}>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((r) => (
            <Table.Tr key={r.id}>
              <Table.Td>
                {/* if you expand service server-side, replace with r.service?.name */}
                <Text size="sm" c="dimmed">{r.serviceName}</Text>
              </Table.Td>
              <Table.Td><Text fw={500}>{r.code}</Text></Table.Td>
              <Table.Td>{r.name}</Table.Td>
              {/* <Table.Td>{r.description || '-'}</Table.Td> */}
              <Table.Td>
                <Badge color={r.isActive ? 'green' : 'gray'} variant="filled">
                  {r.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <Tooltip label="Edit">
                    <ActionIcon
                      variant="light"
                      color="blue"
                      onClick={() => { setEditing(r); setOpened(true); }}
                    >
                      <IconEdit size={16} />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="Delete">
                    <ActionIcon
                      variant="light"
                      color="red"
                      onClick={() => deleteMutation.mutate(r.id)}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={editing ? 'Edit Rule Type' : 'Add Rule Type'}
        centered
        size="lg"
      >
        <ServiceRuleTypeForm
          initial={editing}
          onSuccess={() => setOpened(false)}
        />
      </Modal>
    </>
  );
};
