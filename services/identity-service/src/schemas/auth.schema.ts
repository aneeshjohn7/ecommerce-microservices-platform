import { z } from 'zod';

export const registerSchema = z.object({
  email: z.email().transform((email) => email.trim().toLowerCase()),
  password: z
    .string()
    .min(8)
    .max(128)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/,
      'Password must contain uppercase, lowercase, number, and special character.',
    ),
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  phone: z.string().optional().nullable().transform((phone) => phone?.trim() || null),
});
