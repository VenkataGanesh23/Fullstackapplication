import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const productService = {
  create: (data: any) => {
    return prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        subCategory: data.subCategory,
        brand: data.brand,
        sizes: data.sizes,
        colors: data.colors,
        images: data.images,
        stock: data.stock,
        category: {connect: { id: data.categoryId },},
        ...(data.userId && { user: { connect: { id: data.userId } } }),
      },
      include: {
        category: true,
      },
    });
  },

  getAll: () =>
    prisma.product.findMany({
      where: { isActive: true },
      include: { category: true },
    }),

  getById: (id: number) =>
    prisma.product.findUnique({
      where: { id },
      include: { category: true },
    }),

  getByCategory: (categoryId: number) =>
    prisma.product.findMany({
      where: { categoryId, isActive: true },
      include: { category: true },
    }),

  update: (id: number, data: any) =>
    prisma.product.update({
      where: { id },
      data: {
        ...data,
        ...(data.categoryId && {
          category: { connect: { id: data.categoryId } },
        }),
      },
      include: { category: true },
    }),

  delete: (id: number) =>
    prisma.product.update({
      where: { id },
      data: { isActive: false },
    }),

  restore: (id: number) =>
    prisma.product.update({
      where: { id },
      data: { isActive: true },
      include: { category: true },
    }),
};
