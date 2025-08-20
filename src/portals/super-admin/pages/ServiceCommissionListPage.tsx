import { useNavigate } from 'react-router';
import { ClientTable } from '../../../components/ClientTable';
import { showError, showSuccess } from '../../../utils/notifications';
import {
  useServiceCommissions,
  useDeleteServiceCommission,
} from '../hooks/serviceCommission.hooks';
import type { ServiceCommission } from '../types/serviceCommission.types';

export default function ServiceCommissionListPage() {
  const navigate = useNavigate();
  const { data = [] } = useServiceCommissions();
  const deleteCommission = useDeleteServiceCommission();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteCommission.mutateAsync(id);
      showSuccess(res);
    } catch (err) {
      showError(err);
    }
  };

  return (
    <ClientTable<ServiceCommission>
      title="Service Commissions"
      data={data}
      columns={[
        { key: 'serviceName', label: 'Service', width: 200 },
        { key: 'operatorName', label: 'Operator', width: 150 },
        { key: 'level', label: 'Level', width: 150 },
        { key: 'value', label: 'Value', width: 100 },
        { key: 'valueType', label: 'Type', width: 100 },
      ]}
      searchFields={['serviceId', 'operatorId', 'level']}
      onEdit={(row) => navigate(`/commission/edit/${row.id}`)}
      onDelete={(row) => handleDelete(row.id)}
      onCreate={() => navigate('/commission/create')}
      perPage={10}
      rowActionsWidth={200}
    />
  );
}
