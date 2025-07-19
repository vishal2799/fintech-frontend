// src/pages/super-admin/settings/permissions/hooks/permissions.hooks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/permissions.api';
import type { Permission } from '../types/permissions.types';

export const usePermissions = () =>
  useQuery<Permission[]>({
    queryKey: ['permissions'],
    queryFn: api.getPermissions,
  });

export const useCreatePermission = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.createPermission,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['permissions'] });
    },
  });
};

export const useUpdatePermission = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Permission> }) =>
      api.updatePermission(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['permissions'] });
    },
  });
};

export const useDeletePermission = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.deletePermission,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['permissions'] });
    },
  });
};
