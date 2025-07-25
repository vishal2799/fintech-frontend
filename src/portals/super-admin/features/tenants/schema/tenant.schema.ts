// src/pages/super-admin/tenants/schema/tenant.schema.ts
import { z } from 'zod';

export const createTenantSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required').transform((val) => val.toLowerCase()),
  logoUrl: z
    .url('Logo URL must be a valid URL')
    .optional()
    .or(z.literal('')),
  themeColor: z.string().optional(),
});

export const updateTenantSchema = createTenantSchema.partial();


export const updateTenantStatusSchema = z.object({
  status: z.enum(['ACTIVE', 'DISABLED'], {
    error: 'Status must be ACTIVE or DISABLED',
  }),
});

export type CreateTenantInput = z.infer<typeof createTenantSchema>;
export type UpdateTenantInput = z.infer<typeof updateTenantSchema>;
export type UpdateTenantStatusInput = z.infer<typeof updateTenantStatusSchema>;
