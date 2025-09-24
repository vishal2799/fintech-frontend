import axios from '../../../api/axios';
import type { UserInput } from '../types/user.types';

export const getRetailers = async () => {
  const res = await axios.get('/wl-admin/retailers/sd');
  return res.data.data;
};

// export const getRetailers = async () => {
//   const res = await axios.get('/wl-admin/retailers');
//   return res.data.data;
// };

export const createRetailer = async (data: UserInput & { parentId: string }) => {
  const res = await axios.post('/wl-admin/retailers', data);
  return res.data;
};

export const updateRetailer = async (id: string, data: Partial<UserInput>) => {
  const res = await axios.patch(`/wl-admin/retailers/${id}`, data);
  return res.data;
};

export const deleteRetailer = async (id: string) => {
  const res = await axios.delete(`/wl-admin/retailers/${id}`);
  return res.data;
};
