import { Table, Button, Group, Card, Title } from '@mantine/core';
import { useCreditRequests, useApproveRequest, useRejectRequest } from '../api/wallet.hooks';
import { notifications } from '@mantine/notifications';

export default function CreditRequestsPage() {
  const { data = [] } = useCreditRequests();
  const approve = useApproveRequest();
  const reject = useRejectRequest();

  const handleAction = async (id: string, type: 'approve' | 'reject') => {
    try {
      if (type === 'approve') await approve.mutateAsync(id);
      else await reject.mutateAsync(id);
      notifications.show({ message: `Request ${type}d`, color: 'green' });
    } catch (err: any) {
      notifications.show({ message: err.message || 'Error', color: 'red' });
    }
  };

  return (
    <Card>
      <Title order={4} mb="sm">Credit Requests</Title>
      <Table withTableBorder withColumnBorders withRowBorders highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Tenant</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>Requested By</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((r: any) => (
            <Table.Tr key={r.id}>
              <Table.Td>{r.fromTenantId}</Table.Td>
              <Table.Td>{r.amount}</Table.Td>
              <Table.Td>{r.requestedByUserId}</Table.Td>
              <Table.Td>{r.status}</Table.Td>
              <Table.Td>
                 {r.status === 'PENDING' && (
                  <Group>
                    <Button size="xs" onClick={() => handleAction(r.id, 'approve')}>Approve</Button>
                    <Button size="xs" color="red" onClick={() => handleAction(r.id, 'reject')}>Reject</Button>
                  </Group>
                )}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
}
