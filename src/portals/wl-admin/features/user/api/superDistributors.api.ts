import axios from '../../../../../api/axios';
import type { UserInput } from '../types/user.types';

export const getSuperDistributors = async () => {
  const res = await axios.get('/wl-admin/super-distributor');
  return res.data.data;
};

export const createSuperDistributor = async (data: UserInput) => {
  const res = await axios.post('/wl-admin/super-distributor', data);
  return res.data;
};

export const updateSuperDistributor = async (id: string, data: Partial<UserInput>) => {
  const res = await axios.patch(`/wl-admin/super-distributor/${id}`, data);
  return res.data;
};

export const deleteSuperDistributor = async (id: string) => {
  const res = await axios.delete(`/wl-admin/super-distributor/${id}`);
  return res.data;
};
