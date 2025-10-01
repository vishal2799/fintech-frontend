// ============================================
// 1. SCHEMA
// src/modules/serviceTemplates/schema/serviceTemplate.schema.ts
// ============================================

import { z } from "zod";

export const serviceTemplateSchema = z.object({
  serviceActionId: z.string().uuid("Invalid service action ID"),
  templateId: z.string().uuid("Invalid template ID"),
  isDefault: z.boolean().optional().default(false),
  isActive: z.boolean().optional().default(true),
});

export const updateServiceTemplateSchema = z.object({
  templateId: z.string().uuid("Invalid template ID").optional(),
  isDefault: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export type ServiceTemplate = {
  id: string;
  serviceActionId: string;
  templateId: string;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  serviceAction: {
    id: string;
    name: string;
    code: string;
  };
  template: {
    id: string;
    name: string;
    hasCommission: boolean;
    commissionType?: string;
    commissionValue?: string;
    hasFee: boolean;
    feeType?: string;
    feeValue?: string;
  };
};

export type CreateServiceTemplateInput = z.infer<typeof serviceTemplateSchema>;
export type UpdateServiceTemplateInput = z.infer<typeof updateServiceTemplateSchema>;

