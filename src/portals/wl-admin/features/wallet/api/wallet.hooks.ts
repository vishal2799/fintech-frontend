import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from './wallet.api';
import type { WalletBalance, WalletTransaction } from '../types/wallet.types';

export const useWalletBalance = () =>
  useQuery<WalletBalance>({
    queryKey: ['wallet', 'balance'],
    queryFn: api.getWalletBalance,
  });

export const useWalletLedger = () =>
  useQuery<WalletTransaction[]>({
    queryKey: ['wallet', 'ledger'],
    queryFn: api.getWalletLedger,
  });

export const useRequestWalletCredit = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.requestWalletCredit,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['wallet', 'ledger'] });
      qc.invalidateQueries({ queryKey: ['wallet', 'balance'] });
    },
  });
};
