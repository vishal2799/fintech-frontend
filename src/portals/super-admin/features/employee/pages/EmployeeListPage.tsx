import { useEmployees, useDeleteEmployee } from '../api/employees.hooks';
import { useNavigate } from 'react-router';
import { ClientTable } from '../../../../../components/ClientTable';
import { notifications } from '@mantine/notifications';

export default function EmployeeListPage() {
  const { data = [] } = useEmployees();
  const navigate = useNavigate();
  const deleteEmployee = useDeleteEmployee();

  const handleDelete = async (row: any) => {
    if (!confirm('Delete this employee?')) return;
    try {
      await deleteEmployee.mutateAsync(row.id);
      notifications.show({ message: 'Deleted', color: 'red' });
    } catch (err: any) {
      notifications.show({ message: err.message || 'Delete failed', color: 'red' });
    }
  };

  return (
    <ClientTable
      title="Employees"
      data={data}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'mobile', label: 'Mobile' },
        {
  key: 'role', // still needs a valid key, even if unused
  label: 'Role',
  render: (row) => row.role?.name || '-',
}
      ]}
      searchFields={['name', 'email', 'mobile']}
      onEdit={(row) => navigate(`/super-admin/employees/edit/${row.id}`)}
      onDelete={handleDelete}
      onCreate={() => navigate('/super-admin/employees/create')}
    />
  );
}
