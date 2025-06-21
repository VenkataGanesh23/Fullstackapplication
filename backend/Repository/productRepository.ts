import { productService } from "../Services/productServices";
import { responseStatus } from "../src/helper/static";

export const productRepository = {
  async createProduct(data: any) {
    try {
      const product = await productService.create(data);
      return {
        status: responseStatus(200, "Product created successfully"),
        product,
      };
    } catch (error) {
      return {
        status: responseStatus(500, "Failed to create product"),
      };
    }
  },

  async getAllProducts() {
    try {
      const products = await productService.getAll();
      return {
        status: responseStatus(200, "Products fetched successfully"),
        products,
      };
    } catch (error) {
      return {
        status: responseStatus(500, "Failed to fetch products"),
        products: [],
      };
    }
  },

  async getProductById(id: number) {
    try {
      const product = await productService.getById(id);
      if (!product) {
        return {
          status: responseStatus(404, "Product not found"),
          product: null,
        };
      }
      return {
        status: responseStatus(200, "Product found"),
        product,
      };
    } catch (error) {
      return {
        status: responseStatus(500, "Failed to fetch product"),
        product: null,
      };
    }
  },

  async getProductsByCategory(categoryId: number) {
    try {
      const products = await productService.getByCategory(categoryId);
      return {
        status: responseStatus(200, "Products fetched successfully"),
        products,
      };
    } catch (error) {
      return {
        status: responseStatus(500, "Failed to fetch products by category"),
        products: [],
      };
    }
  },

  async updateProduct(id: number, data: any) {
    try {
      const product = await productService.update(id, data);
      return {
        status: responseStatus(200, "Product updated successfully"),
        product,
      };
    } catch (error) {
      return {
        status: responseStatus(500, "Failed to update product"),
      };
    }
  },

  async deleteProduct(id: number) {
    try {
      await productService.delete(id);
      return responseStatus(200, "Product deleted");
    } catch (error) {
      return responseStatus(500, "Failed to delete product");
    }
  },

  async restoreProduct(id: number) {
    try {
      const product = await productService.restore(id);
      return {
        status: responseStatus(200, "Product restored successfully"),
        product,
      };
    } catch (error) {
      return {
        status: responseStatus(500, "Failed to restore product"),
      };
    }
  },
};
