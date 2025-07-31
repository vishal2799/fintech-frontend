import api from '../../../api/axios';

export const fetchTenantServices = (tenantId: string) =>
  api.get(`/tenant-services/${tenantId}`).then(res => res.data.data);

export const updateTenantServices = (tenantId: string, payload: { serviceId: string; isTenantGloballyEnabled: boolean }[]) =>
  api.put(`/tenant-services/${tenantId}`, payload).then(res => res.data.data);
