import axios from '../../../../../api/axios';

const baseURL = '/wallet';

export const getCreditRequests = async () => {
  const res = await axios.get(`${baseURL}/credit-requests`);
  return res.data.data;
};

export const approveRequest = async (id: string) => {
  const res = await axios.post(`${baseURL}/credit-requests/${id}/approve`);
  return res.data;
};

export const rejectRequest = async (id: string, remarks?: string) => {
  const res = await axios.post(`${baseURL}/credit-requests/${id}/reject`, { remarks });
  return res.data;
};
