import CategoryServices from "../Services/categoryServices";

export default class CategoryRepository {
  constructor(private repo: CategoryServices) {}

  async createCategory(name: string, description?: string) {
    const category = await this.repo.create({ name, description });
    return { code: 200, message: "Category created successfully", category };
  }

  async getAllCategories() {
    const categories = await this.repo.findAll();
    return { code: 200, message: "Categories retrieved", categories };
  }

  async getCategoryById(id: number) {
    const category = await this.repo.findById(id);
    if (!category) return { code: 404, message: "Category not found", category: null };
    return { code: 200, message: "Category found", category };
  }

  async deleteCategory(id: number) {
    const category = await this.repo.delete(id);
    return { code: 200, message: "Category deleted", category };
  }
}
