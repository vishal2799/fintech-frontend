import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { serviceCommissionApi } from '../api/serviceCommission.api';
import type { ServiceCommissionForm } from '../schema/serviceCommission.schema';

export const useServiceCommissions = () => {
  return useQuery({
    queryKey: ['serviceCommissions'],
    queryFn: () => serviceCommissionApi.getAll().then(res => res.data.data),
  });
};

export const useServiceCommission = (id: string) => {
  return useQuery({
    queryKey: ['serviceCommission', id],
    queryFn: () => serviceCommissionApi.getById(id).then(res => res.data.data),
    enabled: !!id,
  });
};

export const useCreateServiceCommission = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ServiceCommissionForm) => serviceCommissionApi.create(data).then(res => res.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['serviceCommissions'] });
    },
  });
};

export const useUpdateServiceCommission = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ServiceCommissionForm> }) =>
      serviceCommissionApi.update(id, data).then(res => res.data.data),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ['serviceCommissions'] });
      qc.invalidateQueries({ queryKey: ['serviceCommission', variables.id] });
    },
  });
};

export const useDeleteServiceCommission = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => serviceCommissionApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['serviceCommissions'] });
    },
  });
};
