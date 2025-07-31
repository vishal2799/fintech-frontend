import { z } from 'zod';

export const UpdateWLServiceSchema = z.object({
  serviceId: z.string().uuid(),
  isEnabled: z.boolean(),
});

export const UpdateWLServicesSchema = z.object({
  services: z.array(UpdateWLServiceSchema),
});

export type UpdateWLServicesInput = z.infer<typeof UpdateWLServicesSchema>;
