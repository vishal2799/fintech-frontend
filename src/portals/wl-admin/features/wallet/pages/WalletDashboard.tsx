// src/pages/tenant/wallet/WalletDashboard.tsx
import { Card, Group, Title, Text, Table } from '@mantine/core';
import { useWalletBalance, useWalletLedger } from '../api/wallet.hooks';

export default function WalletDashboard() {
  const { data: balance } = useWalletBalance();
  const { data: ledger = [] } = useWalletLedger();

  return (
    <>
      <Card shadow="sm" mb="md">
        <Title order={4}>Wallet Balance</Title>
        <Group>
          <Text>Balance: ₹{balance?.balance}</Text>
          <Text>Held: ₹{balance?.heldAmount}</Text>
        </Group>
      </Card>

      <Card shadow="sm">
        <Title order={4} mb="sm">Ledger</Title>
        <Table highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Type</Table.Th>
              <Table.Th>Meta</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Time</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {ledger.map((txn: any) => (
              <Table.Tr key={txn.id}>
                <Table.Td>{txn.type}</Table.Td>
                <Table.Td>{txn.metaType}</Table.Td>
                <Table.Td>{txn.amount}</Table.Td>
                <Table.Td>{txn.status}</Table.Td>
                <Table.Td>{new Date(txn.createdAt).toLocaleString()}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </>
  );
}
