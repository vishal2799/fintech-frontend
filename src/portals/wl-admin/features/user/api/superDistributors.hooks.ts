// src/hooks/users/useSuperDistributors.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from './superDistributors.api';
import type { UserInput, User } from '../types/user.types';

export const useSuperDistributors = () =>
  useQuery<User[]>({
    queryKey: ['super-distributors'],
    queryFn: api.getSuperDistributors,
  });

export const useCreateSuperDistributor = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.createSuperDistributor,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['super-distributors'] });
    },
  });
};

export const useUpdateSuperDistributor = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UserInput> }) =>
      api.updateSuperDistributor(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['super-distributors'] });
    },
  });
};

export const useDeleteSuperDistributor = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.deleteSuperDistributor,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['super-distributors'] });
    },
  });
};
