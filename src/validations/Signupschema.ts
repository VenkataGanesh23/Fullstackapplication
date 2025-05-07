import { z } from 'zod';

export const signupschema = z
  .object({
    FirstName: z
      .string()
      .nonempty('First name is required')
      .regex(/^[A-Za-z]+$/, 'First name should contain only letters'),

    LastName: z
      .string()
      .nonempty('Last name is required')
      .regex(/^[A-Za-z]+$/, 'Last name should contain only letters'),

    EmailAddress: z
      .string()
      .nonempty('Email is required')
      .email('Invalid email format')
      .regex(/@gmail\.com$/, 'Email must be a valid Gmail address'),

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

    DateofBirth: z
      .string()
      .nonempty('Date of Birth is required')
      .refine((value) => {
        const dob = new Date(value);
        const today = new Date();
        const ageDiff = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        const dayDiff = today.getDate() - dob.getDate();

        return (
          ageDiff > 18 ||
          (ageDiff === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)))
        );
      }, {
        message: 'You must be at least 18 years old',
      }),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    message: "Passwords don't match",
    path: ['ConfirmPassword'],
  });

export type signupformdata = z.infer<typeof signupschema>;
