import { z } from 'zod';

export const serviceCommissionSchema = z.object({
  id: z.string().optional(),
  serviceId: z.string(),
  operatorId: z.string().optional(),
  level: z.enum(['TENANT', 'SUPER_DISTRIBUTOR', 'DISTRIBUTOR', 'RETAILER']),
  value: z.string(),
  valueType: z.enum(['PERCENTAGE', 'FIXED']),
  isActive: z.boolean().default(true),
});

export type ServiceCommissionForm = z.infer<typeof serviceCommissionSchema>;

// Update / Partial Schema
export const updateServiceCommissionSchema = serviceCommissionSchema
  .partial()
  .extend({
    id: z.string(), // id is required for update
  });

export type UpdateServiceCommissionForm = z.infer<typeof updateServiceCommissionSchema>;