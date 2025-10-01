// ============================================
// 3. HOOKS
// src/modules/serviceTemplates/hooks/serviceTemplates.hooks.ts
// ============================================

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceTemplatesApi } from "../api/serviceTemplates.api";
import type { CreateServiceTemplateInput, UpdateServiceTemplateInput } from "../schema/serviceTemplate.schema";

export const useServiceTemplates = () => {
  return useQuery({
    queryKey: ["serviceTemplates"],
    queryFn: () => serviceTemplatesApi.getAll().then(res => res.data.data),
  });
};

export const useDefaultServiceTemplates = () => {
  return useQuery({
    queryKey: ["serviceTemplates"],
    queryFn: () => serviceTemplatesApi.getDefault().then(res => res.data.data),
  });
};

export const useServiceTemplates2 = (params?: { serviceActionId?: string; templateId?: string; isActive?: boolean; page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ["serviceTemplates", params],
    queryFn: () => serviceTemplatesApi.getAll2(params).then(res => res.data.data),
  });
};

export const useServiceTemplateById = (id: string) => {
  return useQuery({
    queryKey: ["serviceTemplate", id],
    queryFn: () => serviceTemplatesApi.getById(id).then(res => res.data.data),
    enabled: !!id,
  });
};

export const useServiceTemplateByAction = (serviceActionId: string) => {
  return useQuery({
    queryKey: ["serviceTemplate", "action", serviceActionId],
    queryFn: () => serviceTemplatesApi.getByServiceAction(serviceActionId).then(res => res.data.data),
    enabled: !!serviceActionId,
  });
};

export const useCreateServiceTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateServiceTemplateInput) => serviceTemplatesApi.create(data).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceTemplates"] });
    },
  });
};

export const useUpdateServiceTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateServiceTemplateInput }) =>
      serviceTemplatesApi.update(id, data).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceTemplates"] });
    },
  });
};

export const useDeleteServiceTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => serviceTemplatesApi.delete(id).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceTemplates"] });
    },
  });
};