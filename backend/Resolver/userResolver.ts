// resolvers.ts
import { Context } from '../src/context';
import { Prisma,User } from '@prisma/client';
import { userService } from '../graphql/layers';

export const userResolver = {
   Query:{
    getAllUsers: async (_parent: any, _args: any, ctx: Context) => {
      return await ctx.prisma.user.findMany();
    }
   },

  Mutation: {
    signUp: async (_: any, args: any, ctx: Context) => {
      return await userService.signUp(args.first_name, args.last_name, args.email, args.password, args.dob);
     },

    signIn: async (_: any, args: any, ctx: Context) => {
      return await userService.signIn(args.email, args.password);
    },

    userConfirm: async (_parent: any, args: any) => {
      return await userService.confirm(args.token);
    },

    requestPasswordReset: async (_parent: any, args: User) => {
      return await userService.requestPasswordReset( args.email );
    },

     resetPassword: async (_parent: any, args: any) => {
      return await userService.resetPassword(args.token, args.password);
    },
  },
};
