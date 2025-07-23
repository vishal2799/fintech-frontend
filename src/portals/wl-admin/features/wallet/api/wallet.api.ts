import axios from '../../../../../api/axios';

const baseURL = '/wallet';

export const getWalletBalance = async () => {
  const res = await axios.get(`${baseURL}/balance`);
  return res.data.data;
};

export const getWalletLedger = async () => {
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
