import { z } from 'zod';

export const userWalletActionSchema = z.object({
  userId: z.string(),
  amount: z.number().positive('Amount must be greater than zero'),
  description: z.string().optional(),
});

export const creditWalletSchema = userWalletActionSchema;
export const debitWalletSchema = userWalletActionSchema;
export const holdWalletSchema = userWalletActionSchema;
export const releaseWalletSchema = z.object({
  tenantId: z.string(),
  amount: z.number().positive('Amount must be greater than zero'),
});

export type CreditWalletInput = z.infer<typeof creditWalletSchema>;
export type DebitWalletInput = z.infer<typeof debitWalletSchema>;
export type HoldWalletInput = z.infer<typeof holdWalletSchema>;
export type ReleaseWalletInput = z.infer<typeof releaseWalletSchema>;