import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as api from './roles.api';
import type { Role } from '../types/role.types';

export const useRoles = () =>
  useQuery<Role[]>({
    queryKey: ['roles'],
    queryFn: api.getRoles,
  });

export const useCreateRole = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.createRole,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['roles'] });
    },
  });
};

export const useUpdateRole = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.updateRole(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['roles'] });
    },
  });
};

export const useUpdateRolePermissions = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, permissionIds }: { id: string; permissionIds: string[] }) =>
      api.updateRolePermissions(id, permissionIds),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['roles'] });
    },
  });
};

export const useDeleteRole = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.deleteRole,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['roles'] });
    },
  });
};

export const usePermissionsForRole = (id: string) =>
  useQuery({
    queryKey: ['roles', id, 'permissions'],
    queryFn: () => api.getPermissionsForRole(id),
    enabled: !!id,
  });
