import { z } from "zod";

export const tenantCommissionSplitSchema = z.object({
  roleCode: z.string(),
  commissionPercentage: z.number().min(0).max(100),
  feePercentage: z.number().min(0).max(100),
});

export const tenantCommissionSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
  serviceTemplateId: z.string().uuid(),
  roleCode: z.string(),
  commissionPercentage: z.number(),
  feePercentage: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const updateTenantCommissionsSchema = z.object({
  serviceTemplateId: z.string().uuid(),
  splits: z.array(tenantCommissionSplitSchema).min(1),
});

export type TenantCommission = z.infer<typeof tenantCommissionSchema>;
export type TenantCommissionSplit = z.infer<typeof tenantCommissionSplitSchema>;
export type UpdateTenantCommissionsInput = z.infer<typeof updateTenantCommissionsSchema>;
