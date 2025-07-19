import axios from '../../../../../api/axios';
import type { Employee } from '../types/employees.types';

const baseURL = '/employees';

export const getEmployees = async (): Promise<Employee[]> => {
  const res = await axios.get(baseURL);
  return res.data.data;
};

export const createEmployee = async (data: {
  name: string;
  email: string;
  mobile: string;
  password: string;
  roleId: string;
}) => {
  const res = await axios.post(baseURL, data);
  return res.data;
};

export const updateEmployee = async (id: string, data: Partial<Employee>) => {
  const res = await axios.patch(`${baseURL}/${id}`, data);
  return res.data;
};

export const deleteEmployee = (id: string) =>
  axios.delete(`${baseURL}/${id}`);
