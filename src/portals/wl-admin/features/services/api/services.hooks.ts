import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from './services.api';

export const useTenantServices = () =>
  useQuery({
    queryKey: ['tenant-services'],
    queryFn: api.getTenantServices,
  });

export const useUpdateTenantService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ serviceId, isEnabled }: { serviceId: string; isEnabled: boolean }) =>
      api.updateTenantService(serviceId, isEnabled),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tenant-services'] });
    },
  });
};
