import { z } from 'zod';

export const Forgetschema = z
  .object({
    EmailAddress: z
      .string()
      .nonempty('Email is required')
      .email('Invalid email format')
      .regex(/@gmail\.com$/, 'Email must be a valid Gmail address'),

  })
export type Forgetdata = z.infer<typeof Forgetschema>;
