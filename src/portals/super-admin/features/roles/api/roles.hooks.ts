import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/roles.api';
import type { CreateRoleInput, UpdateRoleInput } from '../schema/roles.schema';

export const useRoles = () => {
  return useQuery({
    queryKey: ['roles'],
    queryFn: api.getRoles,
  });
};

export const useRole = (id: string) => {
  return useQuery({
    queryKey: ['role', id],
    queryFn: () => api.getRoleById(id),
    enabled: !!id,
  });
};

export const useRolePermissions = (id: string) =>
  useQuery({
    queryKey: ['role-permissions', id],
    queryFn: () => api.getRolePermissions(id),
    enabled: !!id,
  });

export const useCreateRole = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateRoleInput) => api.createRole(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['roles'] });
    },
  });
};

export const useUpdateRole = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRoleInput }) =>
      api.updateRole(id, data),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ['roles'] });
      qc.invalidateQueries({ queryKey: ['role', variables.id] });
      qc.invalidateQueries({ queryKey: ['role-permissions', variables.id] }); // 👈 force fresh permissions
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
