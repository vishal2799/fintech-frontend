import { z } from 'zod';

export const creditRequestSchema = z.object({
  amount: z
    .number({ error: 'Amount must be a number' })
    .positive('Amount must be greater than zero'),
  remarks: z.string().optional(),
  proofUrl: z.string().optional(),
});

export type CreditRequestInput = z.infer<typeof creditRequestSchema>;
