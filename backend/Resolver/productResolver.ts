import { productRepository } from "../Repository/productRepository";

export const productResolver = {
  Query: {
    getAllProducts: () => productRepository.getAllProducts(),
    getProductById: (_: any, args: { id: number }) =>
      productRepository.getProductById(args.id),
  },
   Mutation: {
    createProduct: (_: any, args: { data: any }) =>
       productRepository.createProduct(args.data),
    deleteProduct: (_: any, args: { id: number }) =>
      productRepository.deleteProduct(args.id),
  },
};
