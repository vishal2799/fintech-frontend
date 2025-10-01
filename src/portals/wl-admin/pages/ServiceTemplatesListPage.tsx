// ============================================
// 4. LIST PAGE
// src/modules/serviceTemplates/pages/ServiceTemplatesListPage.tsx
// ============================================

import { useNavigate } from 'react-router';

import { ClientTable } from '../../../components/ClientTable';
import { showError, showSuccess } from '../../../utils/notifications';
import { Badge, Button, Group, Text } from '@mantine/core';
import { useDeleteServiceTemplate, useServiceTemplates } from '../../super-admin/hooks/serviceTemplates.hooks';
import type { ServiceTemplate } from '../../super-admin/schema/serviceTemplate.schema';

export default function ServiceTemplatesListPage() {
  const navigate = useNavigate();
  const { data = [] } = useServiceTemplates();
  const deleteServiceTemplate = useDeleteServiceTemplate();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteServiceTemplate.mutateAsync(id);
      showSuccess(res);
    } catch (err) {
      showError(err);
    }
  };

  return (
    <ClientTable<ServiceTemplate>
      title="Service Templates"
      data={data}
      columns={[
        { 
          key: 'serviceAction', 
          label: 'Service Action', 
          width: 200,
          render: (row) => (
            <div>
              <Text fw={500}>{row.serviceAction.name}</Text>
              <Text size="xs" c="dimmed">{row.serviceAction.code}</Text>
            </div>
          )
        },
        { 
          key: 'template', 
          label: 'Commission Template', 
          width: 250,
          render: (row) => (
            <div>
              <Text>{row.template.name}</Text>
              <Group gap="xs" mt={4}>
                {row.template.hasCommission && (
                  <Badge size="sm" color="blue">
                    Commission: {row.template.commissionType === 'fixed' ? '₹' : '%'} {row.template.commissionValue}
                  </Badge>
                )}
                {row.template.hasFee && (
                  <Badge size="sm" color="grape">
                    Fee: {row.template.feeType === 'fixed' ? '₹' : '%'} {row.template.feeValue}
                  </Badge>
                )}
              </Group>
            </div>
          )
        },
        { 
          key: 'isDefault', 
          label: 'Default', 
          width: 100,
          render: (row) => (
            <Badge color={row.isDefault ? 'cyan' : 'gray'} variant={row.isDefault ? 'filled' : 'light'}>
              {row.isDefault ? 'Default' : 'Not Default'}
            </Badge>
          )
        },
        { 
          key: 'isActive', 
          label: 'Status', 
          width: 100,
          render: (row) => (
            <Badge color={row.isActive ? 'green' : 'red'}>
              {row.isActive ? 'Active' : 'Inactive'}
            </Badge>
          )
        },
      ]}
      searchFields={['serviceAction.name', 'serviceAction.code', 'template.name']}
    //   onEdit={(row) => navigate(`/service-templates/edit/${row.id}`)}
    //   onDelete={(row) => handleDelete(row.id)}
    //   onCreate={() => navigate('/service-templates/create')}
    rowActions={(row) => [
                  <Button size="xs" variant="light" onClick={() => navigate(`/admin/commission-templates/edit/${row.id}`)
}>Configure</Button>
    ]}
      perPage={10}
      rowActionsWidth={200}
    />
  );
}

