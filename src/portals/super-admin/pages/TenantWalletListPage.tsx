import {
  Button,
  Group,
  Text,
  NumberInput,
  Modal,
  Stack,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { ClientTable } from '../../../components/ClientTable';
import {
  useTenantWalletSummaries,
  useDebitTenantWallet,
  useHoldTenantWallet,
  useReleaseTenantWallet,
  useCreditTenantWallet,
} from '../hooks/wallet.hooks';
import { showSuccess, showError } from '../../../utils/notifications';
import type { TenantWalletSummary } from '../types/wallet.types';

export default function TenantWalletListPage() {
  const { data = [] } = useTenantWalletSummaries();
  // const navigate = useNavigate();

  const credit = useCreditTenantWallet();
  const debit = useDebitTenantWallet();
  const hold = useHoldTenantWallet();
  const release = useReleaseTenantWallet();

  const [action, setAction] = useState<'CREDIT' | 'DEBIT' | 'HOLD' | 'RELEASE' | null>(null);
  const [selectedTenant, setSelectedTenant] = useState<TenantWalletSummary | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [opened, { open, close }] = useDisclosure(false);

  const openModal = (tenant: TenantWalletSummary, actionType: typeof action) => {
    setSelectedTenant(tenant);
    setAction(actionType);
    setAmount(0);
    setDescription('');
    open();
  };

  const handleSubmit = async () => {
    if (!selectedTenant || !action) return;

    const basePayload = {
      tenantId: selectedTenant.tenantId,
      amount,
      description,
    };

    try {
      if (action === 'CREDIT') {
        await credit.mutateAsync(basePayload);
        showSuccess('Debited successfully');
      } else if (action === 'DEBIT') {
        await debit.mutateAsync(basePayload);
        showSuccess('Debited successfully');
      } else if (action === 'HOLD') {
        await hold.mutateAsync(basePayload);
        showSuccess('Held amount successfully');
      } else if (action === 'RELEASE') {
        await release.mutateAsync({ tenantId: basePayload.tenantId, amount });
        showSuccess('Released held amount');
      }
      close();
    } catch (err: any) {
      showError(err);
    }
  }; 

  return (
    <>
      <ClientTable<TenantWalletSummary>
        title="Tenant Wallets"
        data={data}
        columns={[
          { key: 'tenantName', label: 'Tenant' },
          {
            key: 'balance',
            label: 'Balance',
            render: (row) => <Text fw={500}>₹ {row.balance}</Text>,
            renderExport: (row) => row.balance,
          },
          {
            key: 'heldAmount',
            label: 'Held Amount',
            render: (row) => <Text fw={500} c="gray">₹ {row.heldAmount}</Text>,
            renderExport: (row) => row.heldAmount,
          },
        ]}
        searchFields={['tenantName']}
        // onCreate={() => navigate('/super-admin/tenants/create')}
        rowActions={(row) => [
          <Button size="xs" variant="light" onClick={() => openModal(row, 'CREDIT')}>Credit</Button>,
          <Button size="xs" variant="light" color='red' onClick={() => openModal(row, 'DEBIT')}>Debit</Button>,
          <Button size="xs" variant="light" color="orange" onClick={() => openModal(row, 'HOLD')}>Hold</Button>,
          <Button size="xs" variant="light" color="green" onClick={() => openModal(row, 'RELEASE')}>Release</Button>,
        ]}
        perPage={5}
      />

      <Modal
        opened={opened}
        onClose={close}
        title={action === 'CREDIT'
  ? 'Credit Wallet'
  : action === 'DEBIT'
  ? 'Debit Wallet'
  : action === 'HOLD'
  ? 'Hold Amount'
  : 'Release Amount'}
        centered
      >
        <Stack>
          <TextInput label="Tenant" disabled value={selectedTenant?.tenantName || ''} />
          <NumberInput
            label="Amount"
            value={amount}
            onChange={(val) => setAmount(Number(val) || 0)}
            min={1}
            withAsterisk
          />
          {action !== 'RELEASE' && (
            <TextInput
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
            />
          )}

          <Group justify="flex-end" mt="md">
            <Button variant="light" onClick={close}>Cancel</Button>
            <Button loading={credit.isPending || debit.isPending || hold.isPending || release.isPending} onClick={handleSubmit}>
              {action === 'CREDIT'
  ? 'Credit'
  : action === 'DEBIT'
  ? 'Debit'
  : action === 'HOLD'
  ? 'Hold'
  : 'Release'}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
