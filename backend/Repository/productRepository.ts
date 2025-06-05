import { productService } from "../Services/productServices";
import { responseStatus } from "../src/helper/static";

export const productRepository = {
  async createProduct(data: any) {
    try {
      console.log("I am here")
      const product = await productService.create(data);
      console.log(product, "hello")
      return {
        status: responseStatus(200, "Product created successfully"),
        product,
      };
    } catch (err) {
      console.log(err, "hello")
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
    } catch (err) {
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
    } catch (err) {
      return {
        status: responseStatus(500, "Failed to fetch product"),
        product: null,
      };
    }
  },

  async deleteProduct(id: number) {
    try {
      await productService.delete(id);
      return responseStatus(200, "Product deleted");
    } catch (err) {
      return responseStatus(500, "Failed to delete product");
    }
  },
};
