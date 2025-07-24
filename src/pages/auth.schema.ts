import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, { message: 'Password cannot be empty' }),
});

export type LoginInput = z.infer<typeof loginSchema>;
