import { Button, Stack, TextInput, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router';
import {
  useCreateBankAccount,
  useUpdateBankAccount,
} from '../hooks/bankAccounts.hooks';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import {
  bankAccountSchema,
  updateBankAccountSchema,
  type CreateBankAccountInput,
  type UpdateBankAccountInput,
  type BankAccount
} from '../schema/bankAccount.schema';
import { showError, showSuccess } from '../../../utils/notifications';

type Props = {
  mode: 'create' | 'edit';
  initialValues?: Partial<BankAccount>;
};

export default function BankAccountForm({ mode, initialValues }: Props) {
  const navigate = useNavigate();

  const schema = mode === 'create' ? bankAccountSchema : updateBankAccountSchema;

  const form = useForm<CreateBankAccountInput | UpdateBankAccountInput>({
    initialValues: {
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      accountHolderName: '',
      branchName: '',
      ...initialValues,
    },
    validate: zod4Resolver(schema),
  });

  const create = useCreateBankAccount();
  const update = useUpdateBankAccount();

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      if (mode === 'create') {
        const res = await create.mutateAsync(values as CreateBankAccountInput);
        showSuccess(res);
      } else if (initialValues?.id) {
        const res = await update.mutateAsync({
          id: initialValues.id,
          data: values as UpdateBankAccountInput,
        });
        showSuccess(res);
      }
      navigate('/settings/banks');
    } catch (err: any) {
      showError(err);
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput label="Bank Name" withAsterisk {...form.getInputProps('bankName')} />
        <TextInput label="Account Number" withAsterisk {...form.getInputProps('accountNumber')} />
        <TextInput label="IFSC" withAsterisk {...form.getInputProps('ifscCode')} />
        <TextInput label="Account Holder Name" withAsterisk {...form.getInputProps('accountHolderName')} />
        <TextInput label="Branch" {...form.getInputProps('branchName')} />

        <Group mt="md">
          <Button type="submit" loading={create.isPending || update.isPending}>
            {mode === 'create' ? 'Create' : 'Update'}
          </Button>
          <Button variant="light" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
