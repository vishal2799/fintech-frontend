import api from '../../../api/axios';
import { type UpdateWLServicesInput } from '../schema/wl-services.schema';

export const getWLServices = async () => {
  const res = await api.get('/wl-services/my');
  return res.data.data;
};

export const updateWLServices = async (data: UpdateWLServicesInput) => {
  const res = await api.put('/wl-services/my', data);
  return res.data.data;
};
