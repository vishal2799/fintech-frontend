// src/pages/tenant/wallet/CreditRequestForm.tsx
import { Button, Card, Group, NumberInput, Textarea } from '@mantine/core';
import { useState } from 'react';
import { useRequestWalletCredit } from '../api/wallet.hooks';
import { notifications } from '@mantine/notifications';

export default function CreditRequestForm() {
  const [amount, setAmount] = useState<number>(0);
  const [remarks, setRemarks] = useState('');
  const mutation = useRequestWalletCredit();

  const handleSubmit = async () => {
    try {
      await mutation.mutateAsync({ amount, remarks });
      notifications.show({ message: 'Request sent', color: 'green' });
    } catch (err: any) {
      notifications.show({ message: err.message || 'Error', color: 'red' });
    }
  };

  return (
    <Card shadow="sm">
      <NumberInput
        label="Amount"
        value={amount}
        onChange={(v) => setAmount(typeof v === 'number' ? v : Number(v) || 0)}
        required
      />
      <Textarea label="Remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
      <Group mt="md">
        <Button onClick={handleSubmit} loading={mutation.isPending}>
          Submit Request
        </Button>
      </Group>
    </Card>
  );
}
