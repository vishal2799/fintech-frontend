import axios from '../../../api/axios';

export const getTenantServices = async () => {
  const res = await axios.get('/services/tenant');
  return res.data.data;
};

export const updateTenantService = async (serviceId: string, isEnabled: boolean) => {
  const res = await axios.patch(`/services/tenant/${serviceId}`, { isEnabled });
  return res.data;
};
