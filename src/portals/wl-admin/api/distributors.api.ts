import axios from '../../../api/axios';
import type { UserInput } from '../types/user.types';

export const getDistributors = async () => {
  const res = await axios.get('/wl-admin/distributors');
  return res.data.data;
};

export const createDistributor = async (data: UserInput & { parentId: string }) => {
  const res = await axios.post('/wl-admin/distributors', data);
  return res.data;
};

export const updateDistributor = async (id: string, data: Partial<UserInput>) => {
  const res = await axios.patch(`/wl-admin/distributors/${id}`, data);
  return res.data;
};

export const deleteDistributor = async (id: string) => {
  const res = await axios.delete(`/wl-admin/distributors/${id}`);
  return res.data;
};
