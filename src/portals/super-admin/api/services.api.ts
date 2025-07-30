import axios from '../../../api/axios';
import type { Service } from '../types/services.types';

export const getServices = async (): Promise<Service[]> => {
  const res = await axios.get('/services');
  return res.data.data;
};

export const createService = async (data: { name: string; code: string; isGlobalEnabled: boolean }) => {
  const res = await axios.post('/services', data);
  return res.data;
};

export const updateService = async (
  id: string,
  data: Partial<{ name: string; code: string; isGlobalEnabled: boolean }>
) => {
  const res = await axios.put(`/services/${id}`, data);
  return res.data;
};

export const deleteService = async (id: string) => {
  const res = await axios.delete(`/services/${id}`);
  return res.data;
};
