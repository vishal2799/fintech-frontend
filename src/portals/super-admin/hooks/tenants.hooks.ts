import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/tenants.api';
import type { Tenant } from '../types/tenant.types';
import type {
  CreateTenantInput,
  UpdateTenantInput,
  UpdateTenantStatusInput,
} from '../schema/tenant.schema';

export const useTenants = () =>
  useQuery<Tenant[]>({
    queryKey: ['tenants'],
    queryFn: api.getTenants,
  });

export const useCreateTenant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTenantInput) => api.createTenant(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
    },
  });
};

export const useUpdateTenant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTenantInput }) =>
      api.updateTenant(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
    },
  });
};

export const useUpdateTenantStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTenantStatusInput }) =>
      api.updateTenantStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
    },
  });
};

export const useDeleteTenant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteTenant(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
    },
  });
};
