import axios from '../../../../../api/axios';
import type { Role } from '../types/role.types';

const baseURL = '/roles';

export const getRoles = async (): Promise<Role[]> => {
  const res = await axios.get(baseURL);
  return res.data.data;
};

export const createRole = async (data: {
  name: string;
  description?: string;
  permissionIds: string[];
  scope?: 'PLATFORM' | 'TENANT';
}) => {
  const res = await axios.post(baseURL, data);
  return res.data;
};

export const updateRole = async (
  id: string,
  data: Partial<{ name: string; description: string; permissionIds: string[] }>
) => {
  const res = await axios.patch(`${baseURL}/${id}`, data);
  return res.data;
};

export const updateBasicRole = async (
  id: string,
  data: Partial<{ name: string; description: string }>
) => {
  const res = await axios.patch(`${baseURL}/${id}`, data);
  return res.data;
};

export const updateRolePermissions = async (
  id: string,
  permissionIds: string[]
) => {
  const res = await axios.patch(`${baseURL}/${id}/permissions`, { permissionIds });
  return res.data;
};

export const deleteRole = async (id: string) => {
  return axios.delete(`${baseURL}/${id}`);
};

export const getPermissionsForRole = async (id: string) => {
  const res = await axios.get(`${baseURL}/${id}/permissions`);
  return res.data.data;
};
