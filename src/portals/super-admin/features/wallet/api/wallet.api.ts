// src/pages/super-admin/wallet/api/wallet.api.ts
import axios from '../../../../../api/axios';
import type { CreditRequest } from '../types/wallet.types';

const baseURL = '/wallet';

export const getCreditRequests = async (): Promise<CreditRequest[]> => {
  const res = await axios.get(`${baseURL}/credit-requests`);
  return res.data.data;
};

export const approveRequest = async (id: string): Promise<any> => {
  const res = await axios.post(`${baseURL}/credit-requests/${id}/approve`);
  return res.data;
};

export const rejectRequest = async (
  id: string,
  remarks?: string
): Promise<any> => {
  const res = await axios.post(`${baseURL}/credit-requests/${id}/reject`, { remarks });
  return res.data;
};
