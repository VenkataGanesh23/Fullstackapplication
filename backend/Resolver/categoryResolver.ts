import CategoryService from "../Services/categoryServices";
import CategoryRepository from "../Repository/categoryRepository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const service = new CategoryService(prisma);
const repo = new CategoryRepository(service);

export const categoryResolver = {
  Query: {
    getAllCategories: () => repo.getAllCategories(),
    getCategoryById: (_: any, args: { id: number }) => repo.getCategoryById(args.id),
  },
  Mutation: {
    createCategory: (_: any, args: { name: string; description?: string }) =>
      repo.createCategory(args.name, args.description),
    deleteCategory: (_: any, args: { id: number }) => repo.deleteCategory(args.id),
  },
};
