import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Container, Title, Loader } from '@mantine/core';
import { useBankAccounts } from '../hooks/bankAccounts.hooks';
import BankAccountForm from '../components/BankAccountForm';
import type { BankAccount } from '../schema/bankAccount.schema';

export default function BankAccountFormPage() {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);

  const { data: bankAccounts = [], isLoading } = useBankAccounts();
  const [initialValues, setInitialValues] = useState<Partial<BankAccount> | null>(null);

  useEffect(() => {
    if (isEdit && bankAccounts.length > 0) {
      const match = bankAccounts.find((b:BankAccount) => b.id === id);
      if (match) setInitialValues(match);
    }
  }, [isEdit, id, bankAccounts]);

  if (isEdit && (isLoading || !initialValues)) return <Loader />;

  return (
    <Container size="lg">
      <Title order={2} mb="md">
        {isEdit ? 'Edit Bank Account' : 'Create Bank Account'}
      </Title>
      <BankAccountForm mode={isEdit ? 'edit' : 'create'} initialValues={initialValues || {}} />
    </Container>
  );
}
