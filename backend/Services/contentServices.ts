import { ContentRepository } from '../Repository/contentRepository';
import { Content } from '@prisma/client';
import { Prisma } from '@prisma/client';

type ContentInput = {
  title: string;
  images: string[];
  descriptions: string[];
};

type ContentUpdateInput = {
  title?: string;
  images?: string[];
  descriptions?: string[];
};

export class ContentService {
  constructor(private repository: ContentRepository) {}

  async getAllContents(): Promise<Content[]> {
    return this.repository.getAllContents();
  }

  async createContent(data: ContentInput): Promise<Content> {
    if (!data.images || data.images.length === 0) {
      throw new Error('At least one image is required');
    }
    return this.repository.createContent(data);
  }

  async getContentById(id: number): Promise<Content | null> {
    return this.repository.getContentById(id);
  }

  async updateContent(id: number, data: ContentUpdateInput): Promise<Content> {
    const updateData: Prisma.ContentUpdateInput = {
      ...(data.title && { title: { set: data.title } }),
      ...(data.images && { images: { set: data.images } }),
      ...(data.descriptions && { descriptions: { set: data.descriptions } }),
    };

    return this.repository.updateContent(id, updateData);
  }

  async deleteContent(id: number): Promise<Content> {
    return this.repository.deleteContent(id);
  }

  async searchContents(title: string): Promise<Content[]> {
    return this.repository.getContentsByTitle(title);
  }
}
