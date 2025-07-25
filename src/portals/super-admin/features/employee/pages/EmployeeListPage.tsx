import { useNavigate } from 'react-router';
import { useEmployees, useDeleteEmployee } from '../api/employees.hooks';
import { ClientTable } from '../../../../../components/ClientTable';
import type { Employee } from '../types/employees.types';
import { showError, showSuccess } from '../../../../../utils/notifications';

export default function EmployeeListPage() {
  const { data: employees = [] } = useEmployees();
  const deleteEmployee = useDeleteEmployee();
  const navigate = useNavigate();

  const handleDelete = async (row: Employee) => {
    const confirmDelete = window.confirm(`Delete employee "${row.name}"?`);
    if (!confirmDelete) return;

    try {
      const res = await deleteEmployee.mutateAsync(row.id);
      showSuccess(res);
    } catch (err: any) {
      showError(err);
    }
  };

  return (
    <ClientTable
      title="Employees"
      data={employees}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'mobile', label: 'Mobile' },
        {
          key: 'role',
          label: 'Role',
          render: (row: Employee) => row.role?.name || '-',
        },
      ]}
      searchFields={['name', 'email', 'mobile']}
      onEdit={(row: Employee) =>
        navigate(`/super-admin/employees/edit/${row.id}`)
      }
      onDelete={handleDelete}
      onCreate={() => navigate('/super-admin/employees/create')}
    />
  );
}
