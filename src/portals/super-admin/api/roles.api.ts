import axios from '../../../api/axios';
import type {
  CreateRoleInput,
  UpdateRoleInput,
} from '../schema/roles.schema';
import type { Role, RoleWithPermissions } from '../types/role.types';

const BASE_URL = '/roles';

/**
 * List all roles (based on tenant context)
 */
export const getRoles = async (): Promise<Role[]> => {
  const res = await axios.get(BASE_URL);
  return res.data.data;
};

export const getRoleById = async (id: string): Promise<RoleWithPermissions> => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data.data;
};

/**
 * Get permissions assigned to a specific role
 */
export const getRolePermissions = async (roleId: string): Promise<string[]> => {
  const res = await axios.get(`${BASE_URL}/${roleId}/permissions`);
  return res.data.data.map((perm: { id: string }) => perm.id);
};

/**
 * Create a role with selected permissions
 */
export const createRole = async (payload: CreateRoleInput) => {
  const res = await axios.post(BASE_URL, payload);
  return res.data;
};

/**
 * Update role details and permissions
 */
export const updateRole = async (id: string, data: UpdateRoleInput) => {
  const res = await axios.patch(`${BASE_URL}/${id}`, data);
  return res.data;
};

/**
 * Delete a role
 */
export const deleteRole = async (id: string) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};
