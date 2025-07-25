import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/wallet.api';
import type { CreditRequestInput } from '../schema/wallet.schema';
import type { CreditRequest } from '../types/wallet.types';

/**
 * Get wallet balance
 */
export const useWalletBalance = () => {
  return useQuery({
    queryKey: ['wallet', 'balance'],
    queryFn: api.getWalletBalance,
  });
};

/**
 * Get wallet ledger (transactions)
 */
export const useWalletLedger = () => {
  return useQuery({
    queryKey: ['wallet', 'ledger'],
    queryFn: api.getWalletLedger,
  });
};

/**
 * Submit credit request
 */
export const useCreditRequest = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: CreditRequestInput) => api.requestCredit(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['wallet', 'ledger'] });
      qc.invalidateQueries({ queryKey: ['wallet', 'balance'] });
    },
  });
};

export const useCreditRequests = () => {
  return useQuery<CreditRequest[]>({
    queryKey: ['credit-requests'],
    queryFn: api.getCreditRequests,
  });
};


// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import * as api from './wallet.api';
// import type { WalletBalance, WalletTransaction } from '../types/wallet.types';

// export const useWalletBalance = () =>
//   useQuery<WalletBalance>({
//     queryKey: ['wallet', 'balance'],
//     queryFn: api.getWalletBalance,
//   });

// export const useWalletLedger = () =>
//   useQuery<WalletTransaction[]>({
//     queryKey: ['wallet', 'ledger'],
//     queryFn: api.getWalletLedger,
//   });

// export const useRequestWalletCredit = () => {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: api.requestWalletCredit,
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: ['wallet', 'ledger'] });
//       qc.invalidateQueries({ queryKey: ['wallet', 'balance'] });
//     },
//   });
// };
