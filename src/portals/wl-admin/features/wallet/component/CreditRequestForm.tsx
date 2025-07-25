import {
  Button,
  NumberInput,
  Stack,
  Textarea,
  Group,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { notifications } from '@mantine/notifications';
import { useCreditRequest } from '../api/wallet.hooks';
import {
  creditRequestSchema,
  type CreditRequestInput,
} from '../schema/wallet.schema';

export default function WalletRequestForm() {
  const creditRequest = useCreditRequest();

  const form = useForm<CreditRequestInput>({
    initialValues: {
      amount: 0,
      remarks: '',
    },
    validate: zod4Resolver(creditRequestSchema),
  });

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      await creditRequest.mutateAsync(values);
      notifications.show({
        message: 'Credit request submitted',
        color: 'green',
      });
      form.reset();
    } catch (err: any) {
      notifications.show({
        message: err?.response?.data?.message || 'Submission failed',
        color: 'red',
      });
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <NumberInput
          label="Amount"
          withAsterisk
          min={1}
          {...form.getInputProps('amount')}
        />

        <Textarea
          label="Remarks"
          autosize
          minRows={2}
          maxRows={4}
          {...form.getInputProps('remarks')}
        />

        <Group mt="md">
          <Button type="submit" loading={creditRequest.isPending}>
            Submit Request
          </Button>
        </Group>
      </Stack>
    </form>
  );
}


// import { Button, Stack, Textarea, NumberInput, Group } from '@mantine/core';
// import { useForm } from '@mantine/form';
// import { useNavigate } from 'react-router';
// import { useRequestWalletCredit } from '../api/wallet.hooks';
// import { notifications } from '@mantine/notifications';

// export default function CreditRequestForm() {
//   const navigate = useNavigate();
//   const form = useForm({
//     initialValues: {
//       amount: 0,
//       remarks: '',
//     },
//     validate: {
//       amount: (val) => (val <= 0 ? 'Amount must be greater than 0' : null),
//     },
//   });

//   const mutation = useRequestWalletCredit();

//   const handleSubmit = form.onSubmit(async (values) => {
//     try {
//       await mutation.mutateAsync(values);
//       notifications.show({ message: 'Credit request sent', color: 'green' });
//       navigate(-1);
//     } catch (err: any) {
//       notifications.show({ message: err.message || 'Error', color: 'red' });
//     }
//   });

//   return (
//     <form onSubmit={handleSubmit}>
//       <Stack>
//         <NumberInput
//           label="Amount"
//           withAsterisk
//           {...form.getInputProps('amount')}
//         />
//         <Textarea
//           label="Remarks"
//           placeholder="Reason for credit request"
//           {...form.getInputProps('remarks')}
//         />

//         <Group mt="md">
//           <Button type="submit" loading={mutation.isPending}>
//             Submit Request
//           </Button>
//           <Button variant="light" onClick={() => navigate(-1)}>Cancel</Button>
//         </Group>
//       </Stack>
//     </form>
//   );
// }
