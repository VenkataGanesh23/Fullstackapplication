import { productRepository } from "../Repository/productRepository";

export const productResolver = {
  Query: {
    getAllProducts: () => productRepository.getAllProducts(),
    getProductById: (_: any, args: { id: number }) =>
      productRepository.getProductById(args.id),
    getProductsByCategory: (_: any, args: { categoryId: number }) =>
      productRepository.getProductsByCategory(args.categoryId),
  },

  Mutation: {
    createProduct: (_: any, args: { data: any }) =>
      productRepository.createProduct(args.data),
    updateProduct: (_: any, args: { id: number; data: any }) =>
      productRepository.updateProduct(args.id, args.data),
    deleteProduct: (_: any, args: { id: number }) =>
      productRepository.deleteProduct(args.id),
    restoreProduct: (_: any, args: { id: number }) =>
      productRepository.restoreProduct(args.id),
  },
};
