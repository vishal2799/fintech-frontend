import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from './retailers.api';
import type { UserInput, User } from '../types/user.types';


export const useRetailers = () =>
  useQuery<User[]>({
    queryKey: ['retailers'],
    queryFn: api.getRetailers,
  });

export const useCreateRetailer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.createRetailer,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['retailers'] });
    },
  });
};

export const useUpdateRetailer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UserInput> }) =>
      api.updateRetailer(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['retailers'] });
    },
  });
};

export const useDeleteRetailer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.deleteRetailer,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['retailers'] });
    },
  });
};