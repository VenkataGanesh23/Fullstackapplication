import { Context } from '../src/utils/context';

export const contentResolver = {
  Query: {
    getAllContents: async (_parent: any, _args: any, ctx: Context) => {
      return await ctx.prisma.content.findMany();
    },

    getContentById: async (_parent: any, args: { id: number }, ctx: Context) => {
      return await ctx.prisma.content.findUnique({
        where: { id: args.id },
      });
    },

    searchContents: async (_parent: any, args: { title: string }, ctx: Context) => {
      return await ctx.prisma.content.findMany({
        where: {
          title: {
            contains: args.title,
            mode: 'insensitive',
          },
        },
      });
    },
  },

  Mutation: {
    createContent: async (_parent: any, args: { data: any }, ctx: Context) => {
      const { title, images, descriptions } = args.data;
      if (!images || !Array.isArray(images) || images.length === 0) {
        throw new Error('At least one image is required.');
      }

      return await ctx.prisma.content.create({
        data: {
          title,
          images,
          descriptions,
        },
      });
    },

    updateContent: async (_parent: any, args: { id: number; data: any }, ctx: Context) => {
      const { title, images, descriptions } = args.data;

      return await ctx.prisma.content.update({
        where: { id: args.id },
        data: {
          ...(title && { title }),
          ...(images && { images: { set: images } }),
          ...(descriptions && { descriptions: { set: descriptions } }),
        },
      });
    },

    deleteContent: async (_parent: any, args: { id: number }, ctx: Context) => {
      await ctx.prisma.content.delete({
        where: { id: args.id },
      });
      return true;
    },
  },
};
