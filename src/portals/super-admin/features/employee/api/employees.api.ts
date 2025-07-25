import API from '../../../../../api/axios';
import type { CreateEmployeeInput, UpdateEmployeeInput } from '../schema/employees.schema';
import type { Employee } from '../types/employees.types';

const BASE_URL = '/employees';

/**
 * List all employees for the current tenant
 */
export const getEmployees = async (): Promise<Employee[]> => {
  const res = await API.get(BASE_URL);
  return res.data.data;
};

/**
 * Create a new employee
 */
export const createEmployee = async (payload: CreateEmployeeInput) => {
  const res = await API.post(BASE_URL, payload);
  return res.data;
};

/**
 * Update employee (basic info + role)
 */
export const updateEmployee = async (id: string, data: UpdateEmployeeInput) => {
  const res = await API.put(`${BASE_URL}/${id}`, data);
  return res.data;
};

/**
 * Delete employee
 */
export const deleteEmployee = async (id: string) => {
  const res = await API.delete(`${BASE_URL}/${id}`);
  return res.data;
};
