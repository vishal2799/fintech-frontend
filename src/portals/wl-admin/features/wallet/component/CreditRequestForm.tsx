import { Button, Stack, Textarea, NumberInput, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router';
import { useRequestWalletCredit } from '../api/wallet.hooks';
import { notifications } from '@mantine/notifications';

export default function CreditRequestForm() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      amount: 0,
      remarks: '',
    },
    validate: {
      amount: (val) => (val <= 0 ? 'Amount must be greater than 0' : null),
    },
  });

  const mutation = useRequestWalletCredit();

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      await mutation.mutateAsync(values);
      notifications.show({ message: 'Credit request sent', color: 'green' });
      navigate(-1);
    } catch (err: any) {
      notifications.show({ message: err.message || 'Error', color: 'red' });
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <NumberInput
          label="Amount"
          withAsterisk
          {...form.getInputProps('amount')}
        />
        <Textarea
          label="Remarks"
          placeholder="Reason for credit request"
          {...form.getInputProps('remarks')}
        />

        <Group mt="md">
          <Button type="submit" loading={mutation.isPending}>
            Submit Request
          </Button>
          <Button variant="light" onClick={() => navigate(-1)}>Cancel</Button>
        </Group>
      </Stack>
    </form>
  );
}
