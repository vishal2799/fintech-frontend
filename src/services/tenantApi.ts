import axios from '../api/axios';
import type { Tenant, CreateTenantInput, UpdateTenantInput } from '../types/tenantTypes';

interface PaginatedTenantResponse {
  data: Tenant[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export const fetchTenants = async ({
  page = 1,
  perPage = 2
}: {
  page?: number;
  perPage?: number;
}): Promise<PaginatedTenantResponse> => {
  const res = await axios.get('/admin/tenants', {
    params: { page, perPage }
  });
  return res.data.data;
};

// export const fetchTenants = async (): Promise<Tenant[]> => {
//   const res = await axios.get('/admin/tenants');
//   return res.data.data;
// };

export const createTenant = async (data: CreateTenantInput): Promise<Tenant> => {
  const res = await axios.post('/admin/tenants', data);
  return res.data;
};

export const updateTenant = async (data: UpdateTenantInput): Promise<Tenant> => {
  const res = await axios.patch(`/admin/tenants/${data.id}`, data);
  return res.data;
};

export const deleteTenant = async (id: string): Promise<void> => {
  await axios.delete(`/admin/tenants/${id}`);
};
