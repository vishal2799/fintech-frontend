import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTenantServices, updateTenantServices } from '../api/tenantService.api';

export const useTenantServices = (tenantId: string) =>
  useQuery({
    queryKey: ['tenant-services', tenantId],
    queryFn: () => fetchTenantServices(tenantId),
    enabled: !!tenantId,
  });

export const useUpdateTenantServices = (tenantId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { serviceId: string; isTenantGloballyEnabled: boolean }[]) =>
      updateTenantServices(tenantId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenant-services', tenantId] });
    },
  });
};
