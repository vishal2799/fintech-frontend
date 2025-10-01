import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTenantCommissions,
  getTenantCommissionByService,
  getTenantCommissionByRole,
  updateTenantCommissions,
} from "../api/tenantCommissions.api";
import type { UpdateTenantCommissionsInput } from "../schema/tenantCommissions.schema";

export const useTenantCommissions = () =>
  useQuery({
    queryKey: ["tenant-commissions"],
    queryFn: getTenantCommissions,
  });

export const useTenantCommissionByService = (serviceTemplateId: string) =>
  useQuery({
    queryKey: ["tenant-commissions", serviceTemplateId],
    queryFn: () => getTenantCommissionByService(serviceTemplateId),
    enabled: !!serviceTemplateId,
  });

export const useTenantCommissionByRole = (serviceTemplateId: string, roleCode: string) =>
  useQuery({
    queryKey: ["tenant-commissions", serviceTemplateId, roleCode],
    queryFn: () => getTenantCommissionByRole(serviceTemplateId, roleCode),
    enabled: !!serviceTemplateId && !!roleCode,
  });

export const useUpdateTenantCommissions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateTenantCommissionsInput) => updateTenantCommissions(input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tenant-commissions"] });
      queryClient.invalidateQueries({ queryKey: ["tenant-commissions", variables.serviceTemplateId] });
    },
  });
};
