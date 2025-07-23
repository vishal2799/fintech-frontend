import { useCreditRequests, useApproveRequest, useRejectRequest } from '../api/wallet.hooks';
import { notifications } from '@mantine/notifications';
import { ClientTable } from '../../../../../components/ClientTable';
import { Button } from '@mantine/core';

export default function CreditRequestsPage() {
  const { data = [] } = useCreditRequests();
  const approve = useApproveRequest();
  const reject = useRejectRequest();

  const handleApprove = async (row: any) => {
    try {
      await approve.mutateAsync(row.id);
      notifications.show({ message: 'Request approved', color: 'green' });
    } catch (err: any) {
      notifications.show({ message: err.message || 'Approval failed', color: 'red' });
    }
  };

  const handleReject = async (row: any) => {
    if (!confirm('Reject this request?')) return;
    try {
      await reject.mutateAsync(row.id);
      notifications.show({ message: 'Request rejected', color: 'red' });
    } catch (err: any) {
      notifications.show({ message: err.message || 'Rejection failed', color: 'red' });
    }
  };

  return (
    <ClientTable
      title="Credit Requests"
      data={data}
      columns={[
        { key: 'fromTenantId', label: 'Tenant ID' },
        { key: 'amount', label: 'Amount' },
        { key: 'requestedByUserId', label: 'Requested By' },
        { key: 'status', label: 'Status' },
      ]}
      searchFields={['fromTenantId', 'requestedByUserId', 'status']}
      rowActions={(row) =>
  row.status === 'PENDING'
    ? [
        <Button key="approve" size="xs" onClick={() => handleApprove(row)}>
          Approve
        </Button>,
        <Button key="reject" size="xs" color="red" onClick={() => handleReject(row)}>
          Reject
        </Button>,
      ]
    : []
}
      perPage={10}
    />
  );
}
