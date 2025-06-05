import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const productService = {
  create: (data: any) => prisma.product.create({ data }),
  getAll: () => prisma.product.findMany({ where: { isActive: true } }),
  getById: (id: number) => prisma.product.findUnique({ where: { id } }),
  delete: (id: number) =>
    prisma.product.update({ where: { id }, data: { isActive: false } }),
};
