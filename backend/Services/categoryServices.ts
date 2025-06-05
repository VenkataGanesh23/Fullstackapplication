import { PrismaClient } from "@prisma/client";

export default class CategoryServices {
  constructor(private prisma: PrismaClient) {}

  create(data: { name: string; description?: string }) {
    return this.prisma.category.create({ data });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  findById(id: number) {
    return this.prisma.category.findUnique({ where: { id } });
  }

  delete(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }
}
