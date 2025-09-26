import API from '../../../api/axios';
import type { CreditRequestInput } from '../schema/wallet.schema';
import type { CreditRequest, TenantWallet, WalletTransaction } from '../types/wallet.types';

export const getWalletBalance = async (): Promise<TenantWallet> => {
  const res = await API.get('/wallet/admin/balance');
  return res.data.data;
};

export const getWalletLedger = async (): Promise<WalletTransaction[]> => {
  const res = await API.get('/wallet/admin/ledger');
  return res.data.data;
};

export const requestCredit = async (payload: CreditRequestInput) => {
  const res = await API.post('/wallet/admin/request-credit', payload);
  return res.data;
};

export const getCreditRequests = async (): Promise<CreditRequest[]> => {
  const res = await API.get('/wallet/admin/credit-requests');
  return res.data.data;
};

export const getProofUploadUrl = async (creditRequestId: string, fileName: string, mimeType: string) => {
  const { data } = await API.post('/wallet/proof/upload-url', { creditRequestId, fileName, mimeType });
  return data.data; // { uploadUrl, fileKey }
};

export const updateProofKey = async (creditRequestId: string, fileKey: string) => {
  const { data } = await API.post('/wallet/proof/update', { creditRequestId, fileKey });
  return data;
};

export const getProofDownloadUrl = async (creditRequestId: string) => {
  const { data } = await API.get(`/wallet/proof/${creditRequestId}`);
  return data.data; // { downloadUrl, fileKey }
};
