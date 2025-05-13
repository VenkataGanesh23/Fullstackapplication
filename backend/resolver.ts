// resolvers.ts
import { hashPassword, comparePasswords, generateToken } from './utils/auth';
import { Context } from './context';
import { Prisma } from '@prisma/client';

export const resolvers = {
   Query:{
    getAllUsers: async (_parent: any, _args: any, ctx: Context) => {
      return await ctx.prisma.user.findMany();
    }
   },

  Mutation: {
    signup: async (_: any, args: any, ctx: Context) => {
      const { email, password, first_name, last_name, DOB } = args;
      const existingUser = await ctx.prisma.user.findUnique({ where: { email } });
      if (existingUser) throw new Error('User already exists');

      const hashedPassword = await hashPassword(password);
      const user = await ctx.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          first_name,
          last_name,
          DOB,
        },
      });
      const token = generateToken(user.id);
      return { token, user };
     },

    login: async (_: any, args: any, ctx: Context) => {
      const { email, password } = args;
      const user = await ctx.prisma.user.findUnique({ where: { email } });

      if (!user) throw new Error('No user found');

      const valid = await comparePasswords(password, user.password);
      if (!valid) throw new Error('Incorrect password');

      const token = generateToken(user.id);
      return { token, user };
    },

    
  },
};
