import {
  ActionIcon,
  Button,
  Group,
  Image,
  Modal,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { ClientTable } from '../../../components/ClientTable';
import {
  useApproveCreditRequest,
  usePendingCreditRequests,
  useRejectCreditRequest,
} from '../hooks/wallet.hooks';
import { showSuccess, showError } from '../../../utils/notifications';
import type { CreditRequest } from '../types/wallet.types';
import { getProofDownloadUrl } from '../api/wallet.api';
import { IconEye } from '@tabler/icons-react';

export default function PendingCreditRequestListPage() {
  const { data = [] } = usePendingCreditRequests();
  const approve = useApproveCreditRequest();
  const reject = useRejectCreditRequest();

  const [selected, setSelected] = useState<CreditRequest | null>(null);
  const [remarks, setRemarks] = useState('');
  const [opened, { open, close }] = useDisclosure(false);
  const [proofOpened, { open: openProof, close: closeProof }] = useDisclosure(false);
const [proofImageUrl, setProofImageUrl] = useState<string | null>(null);

const handleViewProof = async (logId: string) => {
  try {
    // 🔹 Fetch image download URL for this proof
    const res = await getProofDownloadUrl(logId); // similar to your getTenantLogoDownloadUrl
    if (res?.downloadUrl) {
      setProofImageUrl(res.downloadUrl);
      openProof();
    } else {
      setProofImageUrl('');
      openProof()
      console.warn('No proof image found for this log.');
    }
  } catch (err) {
    console.error('Error fetching proof image:', err);
  }
};



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
          { key: 'tenantName', label: 'Tenant', width: 200 },
          { key: 'amount', label: 'Amount', width: 120, render: (r) => `₹ ${r.amount}` },
          { key: 'requestedByUserName', label: 'Requested By', width: 160 },
          { key: 'remarks', label: 'Remarks', width: 160 },
        //   {
        //     key: 'status',
        //     label: 'Status',
        //     width: 130,
        //     render: (row) => (
        //       <Badge color={getStatusColor(row.status)}>{row.status}</Badge>
        //     ),
        //   },
        ]}
        rowActions={(row) =>
          row.status === 'PENDING'
            ? [
                <Button
                  size="xs"
                  variant="light"
                  color='green'
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
                <Button variant="light" size='xs' onClick={() => handleViewProof(row.id)}>
  View Proof
</Button>

              ]
            : []
        }
        rowActionsWidth={270}
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
      <Modal opened={proofOpened} onClose={closeProof}        
       title="Credit Request Proof" size={'md'}>
        {proofImageUrl ? (
    <Image
      src={proofImageUrl}
      alt="Proof"
      radius="md"
      fit="contain"
    />
  ) : (
    <Text size="sm" c="dimmed">No proof available</Text>
   )} </Modal>
    </>
  );
}

// const getStatusColor = (status: string) => {
//   switch (status) {
//     case 'PENDING':
//       return 'yellow';
//     case 'APPROVED':
//       return 'green';
//     case 'REJECTED':
//       return 'red';
//     default:
//       return 'gray';
//   }
// };
