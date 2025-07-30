import { z } from 'zod';

export const tenantWalletActionSchema = z.object({
  tenantId: z.string(),
  amount: z.number().positive('Amount must be greater than zero'),
  description: z.string().optional(),
});

export const creditWalletSchema = tenantWalletActionSchema;
export const debitWalletSchema = tenantWalletActionSchema;
export const holdWalletSchema = tenantWalletActionSchema;
export const releaseWalletSchema = z.object({
  tenantId: z.string(),
  amount: z.number().positive('Amount must be greater than zero'),
});

export type CreditWalletInput = z.infer<typeof creditWalletSchema>;
export type DebitWalletInput = z.infer<typeof debitWalletSchema>;
export type HoldWalletInput = z.infer<typeof holdWalletSchema>;
export type ReleaseWalletInput = z.infer<typeof releaseWalletSchema>;


// import { z } from 'zod';

// export const manualTopupSchema = z.object({
//   tenantId: z.string(),
//   amount: z
//     .number({ error: 'Amount must be a number' })
//     .positive('Amount must be greater than 0'),
//   description: z.string().optional(),
// });

// export const debitWalletSchema = z.object({
//   tenantId: z.string(),
//   amount: z
//     .number({ error: 'Amount must be a number' })
//     .positive('Amount must be greater than 0'),
//   description: z.string().optional(),
// });

// export const holdFundsSchema = z.object({
//   tenantId: z.string(),
//   amount: z
//     .number({ error: 'Amount must be a number' })
//     .positive('Amount must be greater than 0'),
//   reason: z.string().optional(),
// });

// export const releaseFundsSchema = z.object({
//   tenantId: z.string(),
//   amount: z
//     .number({ error: 'Amount must be a number' })
//     .positive('Amount must be greater than 0'),
//   reason: z.string().optional(),
// });

// // Types
// export type ManualTopupInput = z.infer<typeof manualTopupSchema>;
// export type DebitWalletInput = z.infer<typeof debitWalletSchema>;
// export type HoldFundsInput = z.infer<typeof holdFundsSchema>;
// export type ReleaseFundsInput = z.infer<typeof releaseFundsSchema>;
