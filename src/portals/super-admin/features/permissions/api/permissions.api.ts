// src/pages/super-admin/settings/permissions/api/permissions.api.ts
import axios from '../../../../../api/axios';
import type { Permission } from '../types/permissions.types';

const baseURL = '/permissions';


export const getPermissions = async (): Promise<Permission[]> => {
  const res = await axios.get(baseURL);
  return res.data.data;
};

export const createPermission = async (data: Partial<Permission>) => {
  const res = await axios.post(baseURL, data);
  return res.data;
};

export const updatePermission = async (id: string, data: Partial<Permission>) => {
  const res = await axios.patch(`${baseURL}/${id}`, data);
  return res.data;
};

export const deletePermission = (id: string) => {
  return axios.delete(`${baseURL}/${id}`);
};
