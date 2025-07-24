// wl-admin.schema.ts
import { z } from "zod";

export const createWLAdminSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  mobile: z.string().min(10, "Mobile is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  tenantId: z.string().min(1, "Tenant is required"),
});

export const updateWLAdminSchema = createWLAdminSchema
  .omit({ password: true })
//   .extend({
//     status: z.enum(["ACTIVE", "LOCKED", "BLOCKED"]),
// });


export const updateWLAdminStatusSchema = z.object({
  status: z.enum(['ACTIVE', 'LOCKED', 'BLOCKED'], {
    error: 'Invalid status value',
  }),
});


export type CreateWLAdminInput = z.infer<typeof createWLAdminSchema>;
export type UpdateWLAdminInput = z.infer<typeof updateWLAdminSchema>;
export type UpdateWLAdminStatusInput = z.infer<typeof updateWLAdminStatusSchema>;
