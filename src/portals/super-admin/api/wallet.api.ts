import axios from '../../../api/axios';
import type {
  CreditWalletInput,
  DebitWalletInput,
  HoldWalletInput,
  ReleaseWalletInput,
} from '../schema/wallet.schema';
import type { CreditRequest, TenantWalletSummary } from '../types/wallet.types';

const BASE_URL = '/wallet/super-admin';

export const fetchTenantWalletSummaries = async (): Promise<TenantWalletSummary[]> => {
  const res = await axios.get(`${BASE_URL}/tenant-wallets`);
  return res.data.data;
};

export const creditTenantWallet = async (payload: CreditWalletInput) => {
  const res = await axios.post(`${BASE_URL}/credit`, payload);
  return res.data;
};

export const debitTenantWallet = async (payload: DebitWalletInput) => {
  const res = await axios.post(`${BASE_URL}/debit`, payload);
  return res.data;
};

export const holdTenantWallet = async (payload: HoldWalletInput) => {
  const res = await axios.post(`${BASE_URL}/hold`, payload);
  return res.data;
};

export const releaseTenantWallet = async (payload: ReleaseWalletInput) => {
  const res = await axios.post(`${BASE_URL}/release`, payload);
  return res.data;
};

export const getAllCreditRequests = async (): Promise<CreditRequest[]> => {
  const res = await axios.get(`${BASE_URL}/credit-requests`);
  return res.data.data;
};

export const getPendingCreditRequests = async (): Promise<CreditRequest[]> => {
  const res = await axios.get(`${BASE_URL}/pending-credit-requests`);
  return res.data.data;
};

export const approveCreditRequest = async (id: string) => {
  const res = await axios.post(`${BASE_URL}/approve/${id}`, {});
  return res.data;
};

export const rejectCreditRequest = async(params: { id: string; remarks?: string }) => {
  const res = await axios.post(`${BASE_URL}/reject/${params.id}`, { remarks: params.remarks });
  return res.data;
};

// import axios from '../../../../../api/axios';
// import type {
//   ManualTopupInput,
//   DebitWalletInput,
//   HoldFundsInput,
//   ReleaseFundsInput,
// } from '../schema/wallet.schema';
// import type { WalletBalance, WalletTransaction, CreditRequest, TenantWalletSummary } from '../types/wallet.types';

// export const fetchTenantWalletSummaries = async (): Promise<TenantWalletSummary[]> => {
//   const res = await axios.get(`/wallet/super-admin/tenant-wallets`);
//   return res.data.data;
// };

// // Balance & Ledger
// export const getTenantWalletBalance = async (tenantId: string): Promise<WalletBalance> => {
//   const res = await axios.get(`/wallet/balance/${tenantId}`);
//   return res.data.data;
// };

// export const getTenantWalletLedger = async (tenantId: string): Promise<WalletTransaction[]> => {
//   const res = await axios.get(`/wallet/ledger/${tenantId}`);
//   return res.data.data;
// };

// // Manual Top-up
// export const manualTopupWallet = async (data: ManualTopupInput) => {
//   const res = await axios.post(`/wallet/topup`, data);
//   return res.data;
// };

// // Debit
// export const debitTenantWallet = async (data: DebitWalletInput) => {
//   const res = await axios.post(`/wallet/debit`, data);
//   return res.data;
// };

// // Hold
// export const holdTenantFunds = async (data: HoldFundsInput) => {
//   const res = await axios.post(`/wallet/hold`, data);
//   return res.data;
// };

// // Release
// export const releaseTenantFunds = async (data: ReleaseFundsInput) => {
//   const res = await axios.post(`/wallet/release`, data);
//   return res.data;
// };

// // Credit Requests (optional, if used in Super Admin view)
// export const getAllCreditRequests = async (): Promise<CreditRequest[]> => {
//   const res = await axios.get(`/wallet/requests`);
//   return res.data.data;
// };

// export const approveCreditRequest = async (id: string) => {
//   const res = await axios.post(`/wallet/requests/${id}/approve`);
//   return res.data;
// };

// export const rejectCreditRequest = async(id: string, remarks?: string) => {
//   const res = await axios.post(`/wallet/requests/${id}/reject`, { remarks });
//   return res.data;
// };


// // // src/pages/super-admin/wallet/api/wallet.api.ts
// // import axios from '../../../../../api/axios';
// // import type { CreditRequest } from '../types/wallet.types';

// // const baseURL = '/wallet';

// // export const getCreditRequests = async (): Promise<CreditRequest[]> => {
// //   const res = await axios.get(`${baseURL}/credit-requests`);
// //   return res.data.data;
// // };

// // export const approveRequest = async (id: string): Promise<any> => {
// //   const res = await axios.post(`${baseURL}/credit-requests/${id}/approve`);
// //   return res.data;
// // };

// // export const rejectRequest = async (
// //   id: string,
// //   remarks?: string
// // ): Promise<any> => {
// //   const res = await axios.post(`${baseURL}/credit-requests/${id}/reject`, { remarks });
// //   return res.data;
// // };
