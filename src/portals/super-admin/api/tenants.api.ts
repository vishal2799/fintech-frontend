import axios from '../../../api/axios';
import type { Tenant } from '../types/tenant.types';
import type {
  CreateTenantInput,
  UpdateTenantInput,
  UpdateTenantStatusInput,
} from '../schema/tenant.schema';

const baseURL = '/admin/tenants';

export const getTenants = async (): Promise<Tenant[]> => {
  const res = await axios.get(baseURL);
  return res.data.data;
};

export const createTenant = async (data: CreateTenantInput) => {
  const res = await axios.post(baseURL, data);
  return res.data;
};

export const updateTenant = async (id: string, data: UpdateTenantInput) => {
  const res = await axios.patch(`${baseURL}/${id}`, data);
  return res.data;
};

export const updateTenantStatus = async (
  id: string,
  data: UpdateTenantStatusInput
) => {
  const res = await axios.patch(`${baseURL}/${id}/status`, data);
  return res.data;
};

export const deleteTenant = async (id: string) => {
  const res = await axios.delete(`${baseURL}/${id}`);
  return res.data;
};
