import { z } from "zod";

export const bankAccountSchema = z.object({
  bankName: z.string().min(2, "Bank name is required"),
  accountNumber: z.string().min(6, "Account number is required"),
  ifscCode: z.string().min(4, 'IFSC code is required'),
  // ifsc: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"),
  accountHolderName: z.string().min(2, "Account holder name is required"),
  branchName: z.string().optional(),
});

export const updateBankAccountSchema = bankAccountSchema.partial();

export type BankAccount = {
  id: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
  branchName?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateBankAccountInput = z.infer<typeof bankAccountSchema>;
export type UpdateBankAccountInput = z.infer<typeof updateBankAccountSchema>;
