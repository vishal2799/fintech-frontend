// src/portals/superadmin/schema/serviceRuleType.schema.ts
import { z } from 'zod';

export const createServiceRuleTypeSchema = z.object({
  serviceId: z.string().uuid(),          // must be a valid UUID
  code: z.string().min(1, 'Code is required'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  isActive: z.boolean().optional(),      // defaults handled server-side
});

export const updateServiceRuleTypeSchema = createServiceRuleTypeSchema.partial();

export type CreateServiceRuleTypeInput = z.infer<typeof createServiceRuleTypeSchema>;
export type UpdateServiceRuleTypeInput = z.infer<typeof updateServiceRuleTypeSchema>;
