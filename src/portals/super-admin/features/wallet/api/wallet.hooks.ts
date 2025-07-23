// src/pages/super-admin/wallet/api/wallet.hooks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from './wallet.api';
import type { CreditRequest } from '../types/wallet.types';

export const useCreditRequests = () =>
  useQuery<CreditRequest[]>({
    queryKey: ['credit-requests'],
    queryFn: api.getCreditRequests,
  });

export const useApproveRequest = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.approveRequest,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['credit-requests'] }),
  });
};

export const useRejectRequest = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.rejectRequest,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['credit-requests'] }),
  });
};
