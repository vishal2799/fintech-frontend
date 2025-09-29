// ============================================
// 4. LIST PAGE
// src/modules/serviceActions/pages/ServiceActionsListPage.tsx
// ============================================

import { useNavigate } from 'react-router';
import {
  useServiceActions,
  useDeleteServiceAction,
} from '../hooks/serviceActions.hooks';
import { ClientTable } from '../../../components/ClientTable';
import { showError, showSuccess } from '../../../utils/notifications';
import type { ServiceAction } from '../schema/serviceAction.schema';
import { Badge } from '@mantine/core';

export default function ServiceActionsListPage() {
  const navigate = useNavigate();
  const { data = [] } = useServiceActions();

  console.log(data, '...sa')
  const deleteServiceAction = useDeleteServiceAction();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteServiceAction.mutateAsync(id);
      showSuccess(res);
    } catch (err) {
      showError(err);
    }
  };

  return (
    <ClientTable<ServiceAction>
      title="Service Actions"
      data={data}
      columns={[
        { key: 'name', label: 'Name', width: 200 },
        { key: 'code', label: 'Code', width: 200 },
        { key: 'description', label: 'Description', width: 300 },
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
      searchFields={['name', 'code', 'description']}
      onEdit={(row) => navigate(`/service-actions/edit/${row.id}`)}
      onDelete={(row) => handleDelete(row.id)}
      onCreate={() => navigate('/service-actions/create')}
      perPage={10}
      rowActionsWidth={200}
    />
  );
}
