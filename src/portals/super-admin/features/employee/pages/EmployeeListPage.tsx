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
          renderExport: (row: Employee) => row.role?.name || '', // 👈 Fix export
        },
      ]}
      searchFields={['name', 'email', 'mobile', 'role.name']}
      onEdit={(row: Employee) =>
        navigate(`/employees/edit/${row.id}`)
      }
      onDelete={handleDelete}
      onCreate={() => navigate('/employees/create')}
    />
  );
}
