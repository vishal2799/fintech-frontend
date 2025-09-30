// ============================================
// 1. SCHEMA
// src/modules/commissionTemplates/schema/commissionTemplate.schema.ts
// ============================================

import { z } from "zod";

export const commissionTemplateSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),
  
  hasCommission: z.boolean().default(false),
  commissionType: z.enum(['fixed', 'percentage']).optional(),
  commissionValue: z.string().optional(),
  
  hasFee: z.boolean().default(false),
  feeType: z.enum(['fixed', 'percentage']).optional(),
  feeValue: z.string().optional(),
  
  isActive: z.boolean().optional().default(true),
}).refine((data) => {
  return data.hasCommission || data.hasFee;
}, {
  message: 'Template must have either commission or fee enabled',
  path: ['hasCommission'],
}).refine((data) => {
  if (data.hasCommission) {
    return data.commissionType && data.commissionValue;
  }
  return true;
}, {
  message: 'Commission type and value are required when commission is enabled',
  path: ['commissionType'],
}).refine((data) => {
  if (data.hasFee) {
    return data.feeType && data.feeValue;
  }
  return true;
}, {
  message: 'Fee type and value are required when fee is enabled',
  path: ['feeType'],
});

export const updateCommissionTemplateSchema = commissionTemplateSchema.partial();

export type CommissionTemplate = {
  id: string;
  name: string;
  description?: string;
  hasCommission: boolean;
  commissionType?: 'fixed' | 'percentage';
  commissionValue?: string;
  hasFee: boolean;
  feeType?: 'fixed' | 'percentage';
  feeValue?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateCommissionTemplateInput = z.infer<typeof commissionTemplateSchema>;
export type UpdateCommissionTemplateInput = z.infer<typeof updateCommissionTemplateSchema>;

