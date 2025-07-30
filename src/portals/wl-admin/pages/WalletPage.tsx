import { Container, Group, Loader, Stack, Title, Text, Badge } from '@mantine/core';
import { useWalletBalance, useWalletLedger } from '../hooks/wallet.hooks';
import { ClientTable } from '../../../components/ClientTable';
import type { WalletTransaction } from '../types/wallet.types';

export default function WalletPage() {
  const { data: balanceData, isLoading: loadingBalance } = useWalletBalance();
  const { data: ledgerData = [], isLoading: loadingLedger } = useWalletLedger();

  if (loadingBalance || loadingLedger) return <Loader />;

  return (
    <Container size="lg">
      <Stack gap="md">
        <Group justify="space-between">
          <Title order={2}>Wallet Overview</Title>
        </Group>

        <Group>
          <StatBox label="Balance" value={`₹${Number(balanceData?.balance).toFixed(2)}`} color="green" />
          <StatBox label="Held Amount" value={`₹${Number(balanceData?.heldAmount).toFixed(2)}`} color="orange" />
        </Group>

        <ClientTable<WalletTransaction>
          title="Wallet Ledger"
          data={ledgerData}
          searchFields={['type', 'metaType', 'description', 'status']}
          columns={[
            {
              key: 'type',
              label: 'Type',
              render: (row) => <Badge color={row.type === 'CREDIT' ? 'green' : 'red'}>{row.type}</Badge>,
              renderExport: (row) => row.type,
            },
            {
              key: 'metaType',
              label: 'Meta',
            },
            {
              key: 'amount',
              label: 'Amount',
              render: (row) => `₹${Number(row.amount).toFixed(2)}`,
              renderExport: (row) => Number(row.amount).toFixed(2),
            },
            {
              key: 'status',
              label: 'Status',
              render: (row) => <Badge color={getStatusColor(row.status)}>{row.status}</Badge>,
              renderExport: (row) => row.status,
            },
            {
              key: 'description',
              label: 'Description',
            },
            // {
            //   key: 'createdAt',
            //   label: 'Date',
            //   render: (row) => formatDateTime(row.createdAt),
            //   renderExport: (row) => formatDateTime(row.createdAt),
            // },
          ]}
          perPage={10}
        />
      </Stack>
    </Container>
  );
}

function StatBox({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <Stack p="sm" bg={`${color || 'gray'}.0`} style={{ border: `1px solid var(--mantine-color-${color || 'gray'}-4)`, borderRadius: 8 }} gap={2}>
      <Text size="sm" c="dimmed">
        {label}
      </Text>
      <Text fw={600} size="lg" c={color}>
        {value}
      </Text>
    </Stack>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case 'SUCCESS':
      return 'green';
    case 'FAILED':
      return 'red';
    case 'PENDING':
      return 'yellow';
    default:
      return 'gray';
  }
}
