// ============================================
// 1. SCHEMA
// src/modules/serviceActions/schema/serviceAction.schema.ts
// ============================================

import { z } from "zod";

export const serviceActionSchema = z.object({
  name: z.string().min(2, "Name is required"),
  code: z.string().min(2, "Code is required").regex(/^[a-z0-9-]+$/, "Code must be lowercase with hyphens only"),
  description: z.string().optional(),
  isActive: z.boolean().optional().default(true),
});

export const updateServiceActionSchema = serviceActionSchema.partial();

export type ServiceAction = {
  id: string;
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateServiceActionInput = z.infer<typeof serviceActionSchema>;
export type UpdateServiceActionInput = z.infer<typeof updateServiceActionSchema>;

