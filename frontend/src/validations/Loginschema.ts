import { z } from 'zod';

export const Loginschema = z.object({
  EmailAddress: z
    .string()
    .nonempty('Email is required')
    .email('Invalid email format')
    .regex(/@gmail\.com$/, 'Email must be a valid Gmail address'),

  Password: z
    .string()
    .nonempty('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export type loginformdata = z.infer<typeof Loginschema>;
