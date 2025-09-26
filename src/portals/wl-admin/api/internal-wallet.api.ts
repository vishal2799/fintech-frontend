import axios from '../../../api/axios';
import type {
  CreditWalletInput,
  DebitWalletInput,
  HoldWalletInput,
  ReleaseWalletInput,
} from '../schema/internal-wallet.schema';
import type { CreditRequest, UserWalletSummary } from '../types/internal-wallet.types';

const BASE_URL = '/user-wallet/super-admin';

export const fetchUserWalletSummaries = async (): Promise<UserWalletSummary[]> => {
  const res = await axios.get(`${BASE_URL}/tenant-wallets`);
  return res.data.data;
};

export const creditUserWallet = async (payload: CreditWalletInput) => {
  const res = await axios.post(`${BASE_URL}/credit`, payload);
  return res.data;
};

export const debitUserWallet = async (payload: DebitWalletInput) => {
  const res = await axios.post(`${BASE_URL}/debit`, payload);
  return res.data;
};

export const holdUserWallet = async (payload: HoldWalletInput) => {
  const res = await axios.post(`${BASE_URL}/hold`, payload);
  return res.data;
};

export const releaseUserWallet = async (payload: ReleaseWalletInput) => {
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

export const getProofDownloadUrl = async (creditRequestId: string) => {
  const { data } = await axios.get(`/user-wallet/proof/${creditRequestId}`);
  return data.data; // { downloadUrl, fileKey }
};