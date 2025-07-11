import axios from '../api/axios';
import type { Tenant, CreateTenantInput, UpdateTenantInput } from '../types/tenantTypes';

export const fetchTenants = async (): Promise<Tenant[]> => {
  const res = await axios.get('/admin/tenants');
  return res.data;
};

export const createTenant = async (data: CreateTenantInput): Promise<Tenant> => {
  const res = await axios.post('/admin/tenants', data);
  return res.data;
};

export const updateTenant = async (data: UpdateTenantInput): Promise<Tenant> => {
  const res = await axios.put(`/admin/tenants/${data.id}`, data);
  return res.data;
};

export const deleteTenant = async (id: string): Promise<void> => {
  await axios.delete(`/admin/tenants/${id}`);
};
