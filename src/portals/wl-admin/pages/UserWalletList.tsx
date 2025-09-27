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
  useUserWalletSummaries,
  useDebitUserWallet,
  useHoldUserWallet,
  useReleaseUserWallet,
  useCreditUserWallet,
} from '../hooks/internal-wallet.hooks';
import { showSuccess, showError } from '../../../utils/notifications';
import type { UserWalletSummary } from '../types/internal-wallet.types';

export default function UserWalletListPage() {
  const { data = [] } = useUserWalletSummaries();
  // const navigate = useNavigate();

  const credit = useCreditUserWallet();
  const debit = useDebitUserWallet();
  const hold = useHoldUserWallet();
  const release = useReleaseUserWallet();

  const [action, setAction] = useState<'CREDIT' | 'DEBIT' | 'HOLD' | 'RELEASE' | null>(null);
  const [selectedTenant, setSelectedTenant] = useState<UserWalletSummary | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [opened, { open, close }] = useDisclosure(false);

  const openModal = (tenant: UserWalletSummary, actionType: typeof action) => {
    setSelectedTenant(tenant);
    setAction(actionType);
    setAmount(0);
    setDescription('');
    open();
  };

  const handleSubmit = async () => {
    if (!selectedTenant || !action) return;

    const basePayload = {
      memberId: selectedTenant.userId,
      amount,
      description,
    };

    try {
      if (action === 'CREDIT') {
        const res = await credit.mutateAsync(basePayload);
        showSuccess(res);
      } else if (action === 'DEBIT') {
        const res = await debit.mutateAsync(basePayload);
        showSuccess(res);
      } else if (action === 'HOLD') {
        const res = await hold.mutateAsync(basePayload);
        showSuccess(res);
      } else if (action === 'RELEASE') {
        const res = await release.mutateAsync({ memberId: basePayload.memberId, amount });
        showSuccess(res);
      }
      close();
    } catch (err: any) {
      showError(err);
    }
  }; 

  return (
    <>
      <ClientTable<UserWalletSummary>
        title="User Wallets"
        data={data}
        columns={[
          { key: 'userName', label: 'User', width: 200 },
          {
            key: 'balance',
            label: 'Balance',
            render: (row) => <Text fw={500}>₹ {row.balance}</Text>,
            renderExport: (row) => row.balance,
            width: 150
          },
          {
            key: 'heldAmount',
            label: 'Held Amount',
            render: (row) => <Text fw={500} c="gray">₹ {row.heldAmount}</Text>,
            renderExport: (row) => row.heldAmount,
            width: 150
          },
        ]}
        searchFields={['userName']}
        // onCreate={() => navigate('/super-admin/tenants/create')}
        rowActions={(row) => [
          <Button size="xs" variant="light" onClick={() => openModal(row, 'CREDIT')}>Credit</Button>,
          <Button size="xs" variant="light" color='red' onClick={() => openModal(row, 'DEBIT')}>Debit</Button>,
          <Button size="xs" variant="light" color="orange" onClick={() => openModal(row, 'HOLD')}>Hold</Button>,
          <Button size="xs" variant="light" color="green" onClick={() => openModal(row, 'RELEASE')}>Release</Button>,
        ]}
        perPage={5}
        rowActionsWidth={350}
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
          <TextInput label="User" disabled value={selectedTenant?.userName || ''} />
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
