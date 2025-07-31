import { Button } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { ClientTable } from '../../../components/ClientTable';
import { getTenants } from '../api/tenants.api';
import { TenantServiceModal } from '../components/TenantServiceModal';

export const TenantServicesListPage = () => {
  const { data = [] } = useQuery({
    queryKey: ['tenants'],
    queryFn: getTenants,
  });

  const [selectedTenantId, setSelectedTenantId] = useState<string | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const handleOpenModal = (id: string) => {
    setSelectedTenantId(id);
    open();
  };

  return (
    <>
        <ClientTable
          title="All Tenants"
          data={data}
          searchFields={['name', 'code']}
          columns={[
            { key: 'name', label: 'Name' },
            // { key: 'code', label: 'Code' },
            { key: 'status', label: 'Status', type: 'badge' },
          ]}
          rowActions={(row) => [
            // <PermissionGuard permission={PERMISSIONS.TENANTS_UPDATE} key="configure">
              <Button
                size="xs"
                variant="light"
                onClick={() => handleOpenModal(row.id)}
              >
                Configure Services
              </Button>
            // </PermissionGuard>,
          ]}
        />

      {selectedTenantId && (
        <TenantServiceModal
          tenantId={selectedTenantId}
          opened={opened}
          onClose={close}
        />
      )}
    </>
  );
};
