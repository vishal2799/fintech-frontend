import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from './wallet.api';

export const useWalletBalance = () =>
  useQuery({
    queryKey: ['wallet', 'balance'],
    queryFn: api.getWalletBalance,
  });

export const useWalletLedger = () =>
  useQuery({
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
