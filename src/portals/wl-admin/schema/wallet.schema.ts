import { z } from 'zod';

export const creditRequestSchema = z.object({
  amount: z
    .number({ error: 'Amount must be a number' })
    .positive('Amount must be greater than zero'),
  remarks: z.string().optional(),
  proofUrl: z.string().optional(),
  bankId: z.string().min(1, 'Please select a bank'),
});

export type CreditRequestInput = z.infer<typeof creditRequestSchema>;
