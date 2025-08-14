import { useCreditRequests } from '../hooks/wallet.hooks';
// import { formatDateTime } from '../../../../../utils/formatters';
import { ClientTable } from '../../../components/ClientTable';
import type { CreditRequest } from '../types/wallet.types';
import { Badge, Button, Image, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { getProofDownloadUrl } from '../api/wallet.api';

export default function CreditRequestListPage() {
  const { data = [] } = useCreditRequests();
    const [opened, { open, close }] = useDisclosure(false);
  const [proofImageUrl, setProofImageUrl] = useState<string | null>(null);
  // const navigate = useNavigate();

    const handleProofClick = async (request: CreditRequest) => {
      try {
          // 🔹 Fetch image download URL for this proof
          const res = await getProofDownloadUrl(request.id); // similar to your getTenantLogoDownloadUrl
          if (res?.downloadUrl) {
            setProofImageUrl(res.downloadUrl);
          } else {
            setProofImageUrl('');
            console.warn('No proof image found for this log.');
          }
        } catch (err) {
          console.error('Error fetching proof image:', err);
        }
      open();
    };

  return (
    <>
    <ClientTable
      title="Credit Requests"
      data={data}
      searchFields={['status', 'remarks']}
      columns={[
        {
          key: 'amount',
          label: 'Amount',
          render: (row: CreditRequest) => `₹${Number(row.amount).toFixed(2)}`,
          renderExport: (row) => Number(row.amount).toFixed(2),
        },
        {
          key: 'status',
          label: 'Status',
          render: (row: CreditRequest) => (
            <Badge color={getStatusColor(row.status)}>{row.status}</Badge>
          ),
          renderExport: (row) => row.status,
        },
        {
          key: 'remarks',
          label: 'Remarks',
        },
        // {
        //   key: 'createdAt',
        //   label: 'Requested At',
        //   render: (row: CreditRequest) => formatDateTime(row.createdAt),
        //   renderExport: (row) => formatDateTime(row.createdAt),
        // },
        // {
        //   key: 'updatedAt',
        //   label: 'Updated At',
        //   render: (row: CreditRequest) =>
        //     row.status === 'APPROVED' ? formatDateTime(row.updatedAt) : '-',
        //   renderExport: (row) =>
        //     row.status === 'APPROVED' ? formatDateTime(row.updatedAt) : '-',
        // },
      ]}
      rowActions={(row) => [
                      <Button
                        size="xs"
                        variant="light"
                        color="green"
                        onClick={() => handleProofClick(row)}
                      >
                        View Proof
                      </Button>,
                    ]}
      perPage={10}
      // onCreate={() => navigate('/wl-admin/wallet/request')}
    />
          <Modal
            opened={opened}
            onClose={close}
            title="Credit Request Proof"
            centered
            size={'md'}
          >
            {proofImageUrl ? (
                <Image
                  src={proofImageUrl}
                  alt="Proof"
                  radius="md"
                  fit="contain"
                />
              ) : (
                <Text size="sm" c="dimmed">No proof available</Text>
               )}
            {/* <Stack>
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
            </Stack> */}
          </Modal>
          </>
  );
}

function getStatusColor(status: string) {
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
}


// // src/pages/tenant/wallet/pages/WalletDashboard.tsx
// import { Card, Container, Group, Stack, Text, Title } from '@mantine/core';
// import { useWalletBalance, useWalletLedger } from '../api/wallet.hooks';
// import { ClientTable } from '../../../../../components/ClientTable';

// export default function WalletDashboard() {
//   const { data: balance } = useWalletBalance();
//   const { data: ledger = [] } = useWalletLedger();

//   return (
//     <Container size="lg">
//       <Stack mb="lg">
//         <Card shadow="sm" withBorder>
//           <Title order={4} mb="sm">Wallet Balance</Title>
//           <Group gap="xl">
//             <Text size="md">💰 Balance: ₹{balance?.balance}</Text>
//             <Text size="md">🧊 Held: ₹{balance?.heldAmount}</Text>
//           </Group>
//         </Card>

//         <ClientTable
//           title="Wallet Ledger"
//           data={ledger}
//           columns={[
//             { key: 'type', label: 'Type' },
//             { key: 'metaType', label: 'Meta Type' },
//             { key: 'amount', label: 'Amount' },
//             { key: 'status', label: 'Status', type: 'badge' },
//             {
//               key: 'createdAt',
//               label: 'Time',
//               render: (row) => new Date(row.createdAt).toLocaleString(),
//             },
//           ]}
//           searchFields={['type', 'metaType', 'status']}
//           perPage={10}
//         />
//       </Stack>
//     </Container>
//   );
// }
