import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const otpLoginSchema = z.object({
  identifier: z.string().email(),
  otp: z.string().min(4).max(6),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type OtpLoginInput = z.infer<typeof otpLoginSchema>;
