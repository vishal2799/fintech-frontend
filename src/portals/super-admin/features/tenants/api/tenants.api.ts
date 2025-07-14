import axios from '../../../../../api/axios';
import type { Tenant } from '../types/tenant.types';

export const getTenants = async (): Promise<Tenant[]> => {
  const res = await axios.get('/admin/tenants');
  return res.data.data;
};

export const createTenant = async (data: Partial<Tenant>) => {
  const res = await axios.post('/admin/tenants', data);
  return res.data
}
export const updateTenant = async (id: string, data: Partial<Tenant>) => {
 const res = await axios.patch(`/admin/tenants/${id}`, data);
 return res.data
}

export const deleteTenant = (id: string) =>
  axios.delete(`/admin/tenants/${id}`);
