// ✅ React Query Hooks – src/hooks/wl-admins.hooks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getWLAdmins,
  getWLAdminById,
  createWLAdmin,
  updateWLAdmin,
  updateWLAdminStatus,
  deleteWLAdmin,
  type CreateWLAdminDto,
  type UpdateWLAdminDto,
} from './wl-admins.api';

export const useWLAdmins = (tenantId?: string) => {
  return useQuery({
    queryKey: ['wl-admins', tenantId],
    queryFn: () => getWLAdmins(tenantId),
  });
};

export const useWLAdmin = (id: string) => {
  return useQuery({
    queryKey: ['wl-admin', id],
    queryFn: () => getWLAdminById(id),
    enabled: !!id,
  });
};

export const useCreateWLAdmin = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateWLAdminDto) => createWLAdmin(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['wl-admins'] }),
  });
};

export const useUpdateWLAdmin = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWLAdminDto }) =>
      updateWLAdmin(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['wl-admins'] }),
  });
};

export const useDeleteWLAdmin = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteWLAdmin(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['wl-admins'] }),
  });
};

export const useUpdateWLAdminStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateWLAdminStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['wl-admins'] }),
  });
};
