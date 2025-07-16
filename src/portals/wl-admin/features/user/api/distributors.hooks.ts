import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from './distributors.api';
import type { UserInput, User } from '../types/user.types';

export const useDistributors = () =>
  useQuery<User[]>({
    queryKey: ['distributors'],
    queryFn: api.getDistributors,
  });

export const useCreateDistributor = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.createDistributor,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['distributors'] });
    },
  });
};

export const useUpdateDistributor = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UserInput> }) =>
      api.updateDistributor(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['distributors'] });
    },
  });
};

export const useDeleteDistributor = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.deleteDistributor,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['distributors'] });
    },
  });
};
