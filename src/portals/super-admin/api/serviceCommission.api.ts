import { type ServiceCommissionForm } from '../schema/serviceCommission.schema';
import API from '../../../api/axios';

const base = '/commissions';

export const serviceCommissionApi = {
  getAll: () => API.get(base),
  getById: (id: string) => API.get(`${base}/${id}`),
  create: (data: ServiceCommissionForm) => API.post(base, data),
  update: (id: string, data: Partial<ServiceCommissionForm>) => API.put(`${base}/${id}`, data),
  remove: (id: string) => API.delete(`${base}/${id}`),
};
