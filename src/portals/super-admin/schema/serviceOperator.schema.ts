import { z } from "zod";

export const createServiceOperatorSchema = z.object({
  serviceId: z.string().min(1, "Service is required"),
  name: z.string().min(2, "Operator name is required"),
  code: z.string().min(2, "Operator code is required"),
  isActive: z.boolean().default(true),
});

export const updateServiceOperatorSchema = createServiceOperatorSchema.partial();

export type CreateServiceOperatorInput = z.infer<typeof createServiceOperatorSchema>;
export type UpdateServiceOperatorInput = z.infer<typeof updateServiceOperatorSchema>;
