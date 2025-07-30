import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/employees.api';
import type { Employee } from '../types/employees.types';
import type { UpdateEmployeeInput } from '../schema/employees.schema';

export const useEmployees = () =>
  useQuery<Employee[]>({
    queryKey: ['employees'],
    queryFn: api.getEmployees,
  });

export const useCreateEmployee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.createEmployee,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['employees'] });
    },
  });
};

export const useUpdateEmployee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEmployeeInput }) =>
      api.updateEmployee(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['employees'] });
    },
  });
};

export const useDeleteEmployee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.deleteEmployee,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['employees'] });
    },
  });
};
