import axios from '../../../api/axios';
import type { Permission } from '../types/permissions.types';
import type {
  CreatePermissionInput,
  UpdatePermissionInput,
} from '../schema/permissions.schema';

const baseURL = '/permissions';

export const getPermissions = async (): Promise<Permission[]> => {
  const res = await axios.get(baseURL);
  return res.data.data;
};

export const createPermission = async (data: CreatePermissionInput): Promise<Permission> => {
  const res = await axios.post(baseURL, data);
  return res.data;
};

export const updatePermission = async (
  id: string,
  data: UpdatePermissionInput
): Promise<Permission> => {
  const res = await axios.patch(`${baseURL}/${id}`, data);
  return res.data;
};

export const deletePermission = async (id: string): Promise<void> => {
  await axios.delete(`${baseURL}/${id}`);
};
