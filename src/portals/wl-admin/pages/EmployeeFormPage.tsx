import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Container, Loader, Title } from '@mantine/core';

import { useEmployees } from '../hooks/employees.hooks';
import EmployeeForm from '../components/EmployeeForm';
import type { Employee } from '../types/employees.types';

type FormEmployee = Partial<Employee> & { roleId?: string };

export default function EmployeeFormPageWL() {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);

  const { data: employees = [], isLoading } = useEmployees();
  const [initialValues, setInitialValues] = useState<FormEmployee | null>(null);

  useEffect(() => {
    if (isEdit && employees.length > 0) {
      const match = employees.find((e) => e.id === id);
      if (match) {
        setInitialValues({
          ...match,
          roleId: match.role?.id,
        });
      }
    }
  }, [isEdit, employees, id]);

  if (isEdit && (isLoading || !initialValues)) {
    return <Loader />;
  }

  return (
    <Container fluid size="lg">
      <Title order={2} mb="md">
        {isEdit ? 'Edit Employee' : 'Create Employee'}
      </Title>
      <EmployeeForm
        mode={isEdit ? 'edit' : 'create'}
        initialValues={initialValues || {}}
      />
    </Container>
  );
}
