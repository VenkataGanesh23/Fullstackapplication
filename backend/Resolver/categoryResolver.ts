import CategoryService from "../Services/categoryServices";
import CategoryRepository from "../Repository/categoryRepository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const repo = new CategoryService(prisma);
const service = new CategoryRepository(repo);

export const categoryResolver = {
  Query: {
    getAllCategories: () => service.getAllCategories(),
    getCategoryById: (_: any, args: { id: number }) => service.getCategoryById(args.id),
  },
  Mutation: {
    createCategory: (_: any, args: { name: string; description?: string }) =>
      service.createCategory(args.name, args.description),
    deleteCategory: (_: any, args: { id: number }) => service.deleteCategory(args.id),
  },
};
