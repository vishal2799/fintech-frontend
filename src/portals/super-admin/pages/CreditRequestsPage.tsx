import {
  Badge,
  Button,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { ClientTable } from '../../../components/ClientTable';
import {
  useAllCreditRequests,
  useApproveCreditRequest,
  useRejectCreditRequest,
} from '../hooks/wallet.hooks';
import { showSuccess, showError } from '../../../utils/notifications';
import type { CreditRequest } from '../types/wallet.types';

export default function CreditRequestListPage() {
  const { data = [] } = useAllCreditRequests();
  const approve = useApproveCreditRequest();
  const reject = useRejectCreditRequest();

  const [selected, setSelected] = useState<CreditRequest | null>(null);
  const [remarks, setRemarks] = useState('');
  const [opened, { open, close }] = useDisclosure(false);

  const handleRejectClick = (request: CreditRequest) => {
    setSelected(request);
    setRemarks('');
    open();
  };

  const confirmReject = async () => {
    if (!selected) return;
    try {
      await reject.mutateAsync({ id: selected.id, remarks });
      showSuccess('Request rejected');
      close();
    } catch (err) {
      showError(err);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await approve.mutateAsync(id);
      showSuccess('Request approved');
    } catch (err) {
      showError(err);
    }
  };

  return (
    <>
      <ClientTable
        title="Credit Requests"
        data={data}
        columns={[
          { key: 'tenantName', label: 'Tenant' },
          { key: 'amount', label: 'Amount', render: (r) => `₹ ${r.amount}` },
          { key: 'requestedByUserName', label: 'Requested By' },
          { key: 'remarks', label: 'Remarks' },
          {
            key: 'status',
            label: 'Status',
            render: (row) => (
              <Badge color={getStatusColor(row.status)}>{row.status}</Badge>
            ),
          },
        ]}
        rowActions={(row) =>
          row.status === 'PENDING'
            ? [
                <Button
                  size="xs"
                  variant="light"
                  onClick={() => handleApprove(row.id)}
                  loading={approve.isPending}
                >
                  Approve
                </Button>,
                <Button
                  size="xs"
                  variant="light"
                  color="red"
                  onClick={() => handleRejectClick(row)}
                >
                  Reject
                </Button>,
              ]
            : []
        }
        searchFields={['tenantName', 'requestedByUserName', 'remarks']}
        perPage={5}
      />

      <Modal
        opened={opened}
        onClose={close}
        title="Reject Credit Request"
        centered
      >
        <Stack>
          <Text>
            Rejecting credit request of{' '}
            <strong>{selected?.tenantName}</strong> for amount ₹
            {selected?.amount}
          </Text>

          <TextInput
            label="Remarks (optional)"
            value={remarks}
            onChange={(e) => setRemarks(e.currentTarget.value)}
          />

          <Group justify="flex-end" mt="md">
            <Button variant="light" onClick={close}>
              Cancel
            </Button>
            <Button color="red" onClick={confirmReject} loading={reject.isPending}>
              Reject
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'yellow';
    case 'APPROVED':
      return 'green';
    case 'REJECTED':
      return 'red';
    default:
      return 'gray';
  }
};


// import { useCreditRequests, useApproveRequest, useRejectRequest } from '../api/wallet.hooks';
// import { notifications } from '@mantine/notifications';
// import { ClientTable } from '../../../../../components/ClientTable';
// import { Button } from '@mantine/core';

// export default function CreditRequestsPage() {
//   const { data = [] } = useCreditRequests();
//   const approve = useApproveRequest();
//   const reject = useRejectRequest();

//   const handleApprove = async (row: any) => {
//     try {
//       await approve.mutateAsync(row.id);
//       notifications.show({ message: 'Request approved', color: 'green' });
//     } catch (err: any) {
//       notifications.show({ message: err.message || 'Approval failed', color: 'red' });
//     }
//   };

//   const handleReject = async (row: any) => {
//     if (!confirm('Reject this request?')) return;
//     try {
//       await reject.mutateAsync(row.id);
//       notifications.show({ message: 'Request rejected', color: 'red' });
//     } catch (err: any) {
//       notifications.show({ message: err.message || 'Rejection failed', color: 'red' });
//     }
//   };

//   return (
//     <ClientTable
//       title="Credit Requests"
//       data={data}
//       columns={[
//         { key: 'fromTenantId', label: 'Tenant ID' },
//         { key: 'amount', label: 'Amount' },
//         { key: 'requestedByUserId', label: 'Requested By' },
//         { key: 'status', label: 'Status' },
//       ]}
//       searchFields={['fromTenantId', 'requestedByUserId', 'status']}
//       rowActions={(row) =>
//   row.status === 'PENDING'
//     ? [
//         <Button key="approve" size="xs" onClick={() => handleApprove(row)}>
//           Approve
//         </Button>,
//         <Button key="reject" size="xs" color="red" onClick={() => handleReject(row)}>
//           Reject
//         </Button>,
//       ]
//     : []
// }
//       perPage={10}
//     />
//   );
// }

