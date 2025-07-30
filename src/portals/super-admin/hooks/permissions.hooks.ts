import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/permissions.api';
import type { Permission } from '../types/permissions.types';
import type {
  CreatePermissionInput,
  UpdatePermissionInput,
} from '../schema/permissions.schema';

export const usePermissions = () =>
  useQuery<Permission[]>({
    queryKey: ['permissions'],
    queryFn: api.getPermissions,
  });

export const useCreatePermission = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePermissionInput) => api.createPermission(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['permissions'] });
    },
  });
};

export const useUpdatePermission = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePermissionInput }) =>
      api.updatePermission(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['permissions'] });
    },
  });
};

export const useDeletePermission = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deletePermission(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['permissions'] });
    },
  });
};
