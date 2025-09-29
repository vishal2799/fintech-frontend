// ============================================
// 3. HOOKS
// src/modules/serviceActions/hooks/serviceActions.hooks.ts
// ============================================

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceActionsApi } from "../api/serviceActions.api";
import type { CreateServiceActionInput, UpdateServiceActionInput } from "../schema/serviceAction.schema";

export const useServiceActions2 = (params?: { isActive?: boolean; search?: string; page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ["serviceActions", params],
    queryFn: () => serviceActionsApi.getAll2(params).then(res => res.data.data),
  });
};

export const useServiceActions = () => {
  return useQuery({
    queryKey: ["serviceActions"],
    queryFn: () => serviceActionsApi.getAll().then(res => res.data.data),
  });
};

export const useServiceActionById = (id: string) => {
  return useQuery({
    queryKey: ["serviceAction", id],
    queryFn: () => serviceActionsApi.getById(id).then(res => res.data.data),
    enabled: !!id,
  });
};

export const useServiceActionByCode = (code: string) => {
  return useQuery({
    queryKey: ["serviceAction", "code", code],
    queryFn: () => serviceActionsApi.getByCode(code).then(res => res.data.data),
    enabled: !!code,
  });
};

export const useCreateServiceAction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateServiceActionInput) => serviceActionsApi.create(data).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceActions"] });
    },
  });
};

export const useUpdateServiceAction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateServiceActionInput }) =>
      serviceActionsApi.update(id, data).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceActions"] });
    },
  });
};

export const useDeleteServiceAction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => serviceActionsApi.delete(id).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceActions"] });
    },
  });
};