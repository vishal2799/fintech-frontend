import axios from '../../../../../api/axios';
import type { WalletBalance, WalletTransaction } from '../types/wallet.types';

const baseURL = '/wallet';

export const getWalletBalance = async (): Promise<WalletBalance> => {
  const res = await axios.get(`${baseURL}/balance`);
  return res.data.data;
};

export const getWalletLedger = async (): Promise<WalletTransaction[]> => {
  const res = await axios.get(`${baseURL}/ledger`);
  return res.data.data;
};

export const requestWalletCredit = async (payload: {
  amount: number;
  remarks?: string;
}) => {
  const res = await axios.post(`${baseURL}/credit-request`, payload);
  return res.data;
};
