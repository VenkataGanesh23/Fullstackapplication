import { z } from 'zod';

export const Passwordschema = z
  .object({

    Password: z
      .string()
      .nonempty('Password is required')
      .min(8, 'Password must contain at least 8 characters')
      .regex(/[A-Za-z]/, 'Must contain at least one letter')
      .regex(/\d/, 'Must contain at least one number')
      .regex(/[!@%$]/, 'Must contain at least one special character (!@%$)'),

    ConfirmPassword: z
      .string()
      .nonempty('Confirm password is required'),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    message: "Passwords don't match",
    path: ['ConfirmPassword'],
  });

export type Passworddata = z.infer<typeof Passwordschema>;
