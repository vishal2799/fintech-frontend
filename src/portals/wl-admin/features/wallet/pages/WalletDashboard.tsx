// src/pages/tenant/wallet/pages/WalletDashboard.tsx
import { Card, Container, Group, Stack, Text, Title } from '@mantine/core';
import { useWalletBalance, useWalletLedger } from '../api/wallet.hooks';
import { ClientTable } from '../../../../../components/ClientTable';

export default function WalletDashboard() {
  const { data: balance } = useWalletBalance();
  const { data: ledger = [] } = useWalletLedger();

  return (
    <Container size="lg">
      <Stack mb="lg">
        <Card shadow="sm" withBorder>
          <Title order={4} mb="sm">Wallet Balance</Title>
          <Group gap="xl">
            <Text size="md">💰 Balance: ₹{balance?.balance}</Text>
            <Text size="md">🧊 Held: ₹{balance?.heldAmount}</Text>
          </Group>
        </Card>

        <ClientTable
          title="Wallet Ledger"
          data={ledger}
          columns={[
            { key: 'type', label: 'Type' },
            { key: 'metaType', label: 'Meta Type' },
            { key: 'amount', label: 'Amount' },
            { key: 'status', label: 'Status', type: 'badge' },
            {
              key: 'createdAt',
              label: 'Time',
              render: (row) => new Date(row.createdAt).toLocaleString(),
            },
          ]}
          searchFields={['type', 'metaType', 'status']}
          perPage={10}
        />
      </Stack>
    </Container>
  );
}
