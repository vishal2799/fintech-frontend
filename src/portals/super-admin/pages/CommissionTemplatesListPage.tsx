// ============================================
// 4. LIST PAGE
// src/modules/commissionTemplates/pages/CommissionTemplatesListPage.tsx
// ============================================

import { useNavigate } from 'react-router';
import {
  useCommissionTemplates,
  useDeleteCommissionTemplate,
} from '../hooks/commissionTemplates.hooks';
import { ClientTable } from '../../../components/ClientTable';
import { showError, showSuccess } from '../../../utils/notifications';
import type { CommissionTemplate } from '../schema/commissionTemplate.schema';
import { Badge, Group, Text } from '@mantine/core';

export default function CommissionTemplatesListPage() {
  const navigate = useNavigate();
  const { data = [] } = useCommissionTemplates();
  const deleteTemplate = useDeleteCommissionTemplate();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteTemplate.mutateAsync(id);
      showSuccess(res);
    } catch (err) {
      showError(err);
    }
  };

  return (
    <ClientTable<CommissionTemplate>
      title="Commission Templates"
      data={data}
      columns={[
        { key: 'name', label: 'Name', width: 200 },
        { key: 'description', label: 'Description', width: 250 },
        { 
          key: 'hasCommission', 
          label: 'Commission', 
          width: 150,
          render: (row) => (
            row.hasCommission ? (
              <Group gap="xs">
                <Badge size="sm" color="blue">
                  {row.commissionType === 'fixed' ? '₹' : '%'} {row.commissionValue}
                </Badge>
              </Group>
            ) : (
              <Text c="dimmed" size="sm">-</Text>
            )
          )
        },
        { 
          key: 'hasFee', 
          label: 'Fee', 
          width: 150,
          render: (row) => (
            row.hasFee ? (
              <Group gap="xs">
                <Badge size="sm" color="grape">
                  {row.feeType === 'fixed' ? '₹' : '%'} {row.feeValue}
                </Badge>
              </Group>
            ) : (
              <Text c="dimmed" size="sm">-</Text>
            )
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
      searchFields={['name', 'description']}
      onEdit={(row) => navigate(`/commission-templates/edit/${row.id}`)}
      onDelete={(row) => handleDelete(row.id)}
      onCreate={() => navigate('/commission-templates/create')}
      perPage={10}
      rowActionsWidth={200}
    />
  );
}

