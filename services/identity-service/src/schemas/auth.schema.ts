import { z } from 'zod';
/**
 * Schema for user registration.
 */
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

/**
 * Schema for user login.
 */
export const loginSchema = z.object({
  email: z.email().transform((email) => email.trim().toLowerCase()),
  password: z.string().min(8).max(128),
});
