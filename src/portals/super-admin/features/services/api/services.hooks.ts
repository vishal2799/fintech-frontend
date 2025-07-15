// src/hooks/services.hooks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from './services.api';
import type { Service } from '../types/services.types';

export const useServices = () =>
  useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: api.getServices,
  });

export const useCreateService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.createService,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['services'] });
    },
  });
};

export const useUpdateService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Service> }) =>
      api.updateService(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['services'] });
    },
  });
};

export const useDeleteService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.deleteService,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['services'] });
    },
  });
};
