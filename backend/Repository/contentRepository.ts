import { PrismaClient, Content, Prisma } from '@prisma/client';

export class ContentRepository {
  constructor(private prisma: PrismaClient) {}

  async createContent(data: Prisma.ContentCreateInput): Promise<Content> {
    return this.prisma.content.create({ data });
  }

  async getAllContents(): Promise<Content[]> {
    return this.prisma.content.findMany();
  }

  async getContentById(id: number): Promise<Content | null> {
    return this.prisma.content.findUnique({ where: { id } });
  }

  async updateContent(id: number, data: Prisma.ContentUpdateInput): Promise<Content> {
    return this.prisma.content.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async deleteContent(id: number): Promise<Content> {
    return this.prisma.content.delete({ where: { id } });
  }

  async getContentsByTitle(title: string): Promise<Content[]> {
    return this.prisma.content.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
      },
    });
  }
}
