// src/portals/superadmin/hooks/useServiceRuleTypes.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getServiceRuleTypesAPI,
  createServiceRuleTypeAPI,
  updateServiceRuleTypeAPI,
  deleteServiceRuleTypeAPI,
  getServicesSummaryAPI,
} from '../api/serviceRuleType.api';
import {
  type CreateServiceRuleTypeInput,
  type UpdateServiceRuleTypeInput,
} from '../schema/serviceRuleType.schema';
import { type ServiceRuleType, type ServiceSummary } from '../types/serviceRuleType.types';

const QUERY_KEY = ['service-rule-types'];

// 🔹 fetch all
export const useServiceRuleTypes = () =>
  useQuery<ServiceRuleType[]>({
    queryKey: QUERY_KEY,
    queryFn: getServiceRuleTypesAPI,
  });

  export const useServicesSummary = () =>
  useQuery<ServiceSummary[]>({
    queryKey: ['services', 'summary'],
    queryFn: getServicesSummaryAPI,
  });

// 🔹 create
export const useCreateServiceRuleType = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateServiceRuleTypeInput) =>
      createServiceRuleTypeAPI(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
};

// 🔹 update
export const useUpdateServiceRuleType = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateServiceRuleTypeInput }) =>
      updateServiceRuleTypeAPI(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
};

// 🔹 delete
export const useDeleteServiceRuleType = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteServiceRuleTypeAPI(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
};
