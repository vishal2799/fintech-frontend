import { useNavigate } from 'react-router';
import {
  useBankAccounts,
  useDeleteBankAccount,
} from '../hooks/bankAccounts.hooks';
import { ClientTable } from '../../../components/ClientTable';
import { showError, showSuccess } from '../../../utils/notifications';
import type { BankAccount } from '../schema/bankAccount.schema';

export default function BankAccountsListPage() {
  const navigate = useNavigate();
  const { data = [] } = useBankAccounts();
  const deleteBankAccount = useDeleteBankAccount();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteBankAccount.mutateAsync(id);
      showSuccess(res);
    } catch (err) {
      showError(err);
    }
  };

  return (
    <ClientTable<BankAccount>
      title="Bank Accounts"
      data={data}
      columns={[
        { key: 'bankName', label: 'Bank Name', width: 200 },
        { key: 'accountNumber', label: 'Account Number', width: 200 },
        { key: 'ifscCode', label: 'IFSC', width: 150 },
        { key: 'accountHolderName', label: 'Account Holder', width: 200 },
        { key: 'branchName', label: 'Branch', width: 150 },
      ]}
      searchFields={['bankName', 'accountNumber', 'ifscCode', 'accountHolderName', 'branchName']}
      onEdit={(row) => navigate(`/settings/edit-bank/${row.id}`)}
      onDelete={(row) => handleDelete(row.id)}
      onCreate={() => navigate('/settings/add-bank')}
      perPage={5}
      rowActionsWidth={200}
    />
  );
}
