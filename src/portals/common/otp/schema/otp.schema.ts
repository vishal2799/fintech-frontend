import { z } from 'zod';

export const sendOtpSchema = z.object({
  identifier: z.string().min(3, 'Identifier is required'),
  useCase: z.enum(['LOGIN', 'SIGNUP', 'FORGOT_PASSWORD', 'VERIFY_CONTACT']),
});

export const verifyOtpSchema = z.object({
  identifier: z.string().min(3, 'Identifier is required'),
  useCase: z.enum(['LOGIN', 'SIGNUP', 'FORGOT_PASSWORD', 'VERIFY_CONTACT']),
  otp: z.string().min(4, 'OTP is required'),
});

export type SendOtpInput = z.infer<typeof sendOtpSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
