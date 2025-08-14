import {
  Badge,
  Button,
  Image,
  Modal,
  Text,
} from '@mantine/core';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { ClientTable } from '../../../components/ClientTable';
import {
  useAllCreditRequests,
} from '../hooks/wallet.hooks';
import type { CreditRequest } from '../types/wallet.types';
import { getProofDownloadUrl } from '../api/wallet.api';

export default function CreditRequestListPage() {
  const { data = [] } = useAllCreditRequests();

  const [selected, setSelected] = useState<CreditRequest | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
const [proofImageUrl, setProofImageUrl] = useState<string | null>(null);

  const handleProofClick = async (request: CreditRequest) => {
    setSelected(request);
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
        columns={[
          { key: 'tenantName', label: 'Tenant', width: 200 },
          { key: 'amount', label: 'Amount', width: 120, render: (r) => `₹ ${r.amount}` },
          { key: 'requestedByUserName', label: 'Requested By', width: 160 },
          { key: 'remarks', label: 'Remarks', width: 160 },
          {
            key: 'status',
            label: 'Status',
            width: 130,
            render: (row) => (
              <Badge color={getStatusColor(row.status)}>{row.status}</Badge>
            ),
          },
        ]}
        rowActions={(row) =>
          row.status !== 'PENDING'
            ? [
                <Button
                  size="xs"
                  variant="light"
                  color="red"
                  onClick={() => handleProofClick(row)}
                >
                  View Proof
                </Button>,
              ]
            : []
        }
        rowActionsWidth={120}
        searchFields={['tenantName', 'requestedByUserName', 'remarks']}
        perPage={5}
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
