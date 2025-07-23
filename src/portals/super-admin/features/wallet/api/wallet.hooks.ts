import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from './wallet.api';

export const useCreditRequests = () =>
  useQuery({
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
