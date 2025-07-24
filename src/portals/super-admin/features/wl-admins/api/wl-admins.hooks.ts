import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getWLAdmins,
  getWLAdminById,
  createWLAdmin,
  updateWLAdmin,
  updateWLAdminStatus,
  deleteWLAdmin,
} from '../api/wl-admins.api';

import type {
  CreateWLAdminInput,
  UpdateWLAdminInput,
} from '../schema/wl-admins.schema';

export const useWLAdmins = (tenantId?: string) =>
  useQuery({
    queryKey: ['wl-admins', tenantId],
    queryFn: () => getWLAdmins(tenantId),
  });

export const useWLAdmin = (id: string) =>
  useQuery({
    queryKey: ['wl-admin', id],
    queryFn: () => getWLAdminById(id),
    enabled: !!id,
  });

export const useCreateWLAdmin = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateWLAdminInput) => createWLAdmin(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['wl-admins'] });
    },
  });
};

export const useUpdateWLAdmin = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWLAdminInput }) =>
      updateWLAdmin(id, data),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ['wl-admins'] });
      qc.invalidateQueries({ queryKey: ['wl-admin', variables.id] });
    },
  });
};


export const useDeleteWLAdmin = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteWLAdmin(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['wl-admins'] });
    },
  });
};

export const useUpdateWLAdminStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateWLAdminStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['wl-admins'] });
      // optionally: qc.invalidateQueries({ queryKey: ['wl-admin', id] });
    },
  });
};
