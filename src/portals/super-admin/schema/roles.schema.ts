import { z } from 'zod';

export const createRoleSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  scope: z.enum(['TENANT', 'PLATFORM'], {
    error: 'Invalid scope',
  }),
  permissionIds: z.array(z.string()).optional(),
});

export const updateRoleSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  description: z.string().optional(),
  permissionIds: z.array(z.string()).optional(),
});

export type CreateRoleInput = z.infer<typeof createRoleSchema>;
export type UpdateRoleInput = z.infer<typeof updateRoleSchema>;
