import API from '../../../../../api/axios';
import type { CreditRequestInput } from '../schema/wallet.schema';
import type { CreditRequest, TenantWallet, WalletTransaction } from '../types/wallet.types';

export const getWalletBalance = async (): Promise<TenantWallet> => {
  const res = await API.get('/wallet/balance');
  return res.data.data;
};

export const getWalletLedger = async (): Promise<WalletTransaction[]> => {
  const res = await API.get('/wallet/ledger');
  return res.data.data;
};

export const requestCredit = async (payload: CreditRequestInput) => {
  const res = await API.post('/wallet/request-credit', payload);
  return res.data;
};

export const getCreditRequests = async (): Promise<CreditRequest[]> => {
  const res = await API.get('/wallet/requests');
  return res.data.data;
};


// import axios from '../../../../../api/axios';
// import type { WalletBalance, WalletTransaction } from '../types/wallet.types';

// const baseURL = '/wallet';

// export const getWalletBalance = async (): Promise<WalletBalance> => {
//   const res = await axios.get(`${baseURL}/balance`);
//   return res.data.data;
// };

// export const getWalletLedger = async (): Promise<WalletTransaction[]> => {
//   const res = await axios.get(`${baseURL}/ledger`);
//   return res.data.data;
// };

// export const requestWalletCredit = async (payload: {
//   amount: number;
//   remarks?: string;
// }) => {
//   const res = await axios.post(`${baseURL}/credit-request`, payload);
//   return res.data;
// };
