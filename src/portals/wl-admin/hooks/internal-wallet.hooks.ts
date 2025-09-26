import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/internal-wallet.api';
import type {
  CreditWalletInput,
  DebitWalletInput,
  HoldWalletInput,
  ReleaseWalletInput,
} from '../schema/internal-wallet.schema';
import type { CreditRequest } from '../types/internal-wallet.types';

export const useUserWalletSummaries = () => {
  return useQuery({
    queryKey: ['user-wallet-summaries'],
    queryFn: api.fetchUserWalletSummaries,
  });
};

export const useCreditUserWallet = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreditWalletInput) => api.creditUserWallet(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['user-wallet-summaries'] });
    },
  });
};

export const useDebitUserWallet = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: DebitWalletInput) => api.debitUserWallet(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['user-wallet-summaries'] });
    },
  });
};

export const useHoldUserWallet = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: HoldWalletInput) => api.holdUserWallet(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['user-wallet-summaries'] });
    },
  });
};

export const useReleaseUserWallet = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: ReleaseWalletInput) => api.releaseUserWallet(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['user-wallet-summaries'] });
    },
  });
};

export const useAllCreditRequests = () =>
  useQuery<CreditRequest[]>({
    queryKey: ['credit-requests'],
    queryFn: api.getAllCreditRequests,
  });


export const usePendingCreditRequests = () =>
  useQuery<CreditRequest[]>({
    queryKey: ['credit-requests'],
    queryFn: api.getPendingCreditRequests,
  });  

export const useApproveCreditRequest = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.approveCreditRequest(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['credit-requests'] });
    },
  });
};

export const useRejectCreditRequest = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { id: string; remarks?: string }) =>
      api.rejectCreditRequest(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['credit-requests'] });
    },
  });
};
