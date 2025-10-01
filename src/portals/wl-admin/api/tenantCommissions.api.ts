import api from '../../../api/axios';
import type { TenantCommission, UpdateTenantCommissionsInput } from "../schema/tenantCommissions.schema";

export const getTenantCommissions = async (): Promise<TenantCommission[]> => {
  const res = await api.get("/tenant-commissions");
  return res.data.data;
};

export const getTenantCommissionByService = async (serviceTemplateId: string): Promise<TenantCommission[]> => {
  const res = await api.get(`/tenant-commissions/${serviceTemplateId}`);
  return res.data.data;
};

export const getTenantCommissionByRole = async (serviceTemplateId: string, roleCode: string): Promise<TenantCommission> => {
  const res = await api.get(`/tenant-commissions/${serviceTemplateId}/role/${roleCode}`);
  return res.data.data;
};

export const updateTenantCommissions = async (input: UpdateTenantCommissionsInput): Promise<TenantCommission[]> => {
  const res = await api.post(`/tenant-commissions/${input.serviceTemplateId}`, input);
  return res.data.data;
};
