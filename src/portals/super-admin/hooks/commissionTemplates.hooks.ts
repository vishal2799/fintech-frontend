// ============================================
// 3. HOOKS
// src/modules/commissionTemplates/hooks/commissionTemplates.hooks.ts
// ============================================

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { commissionTemplatesApi } from "../api/commissionTemplates.api";
import type { CreateCommissionTemplateInput, UpdateCommissionTemplateInput } from "../schema/commissionTemplate.schema";

export const useCommissionTemplates = () => {
  return useQuery({
    queryKey: ["commissionTemplates"],
    queryFn: () => commissionTemplatesApi.getAll().then(res => res.data.data),
  });
};

export const useCommissionTemplates2 = (params?: { isActive?: boolean; search?: string; page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ["commissionTemplates", params],
    queryFn: () => commissionTemplatesApi.getAll2(params).then(res => res.data.data),
  });
};

export const useCommissionTemplateById = (id: string) => {
  return useQuery({
    queryKey: ["commissionTemplate", id],
    queryFn: () => commissionTemplatesApi.getById(id).then(res => res.data.data),
    enabled: !!id,
  });
};

export const useCreateCommissionTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCommissionTemplateInput) => commissionTemplatesApi.create(data).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commissionTemplates"] });
    },
  });
};

export const useUpdateCommissionTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCommissionTemplateInput }) =>
      commissionTemplatesApi.update(id, data).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commissionTemplates"] });
    },
  });
};

export const useDeleteCommissionTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => commissionTemplatesApi.delete(id).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commissionTemplates"] });
    },
  });
};