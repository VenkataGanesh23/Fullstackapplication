import CartRepository from "../Repository/cartRepository";
const cartRepository = new CartRepository();

export const cartResolver = {
  Query: {
    getCart: async (_: any, { userId }: { userId: number }) => {
      const cart = await cartRepository.getCart(userId);
      return {
        code: 200,
        message: "Cart fetched successfully",
        cart,
      };
    },
  },
  Mutation: {
    addToCart: async (_: any, args: { userId: number; productId: number; quantity: number }) => {
      const cart = await cartRepository.addToCart(args.userId, args.productId, args.quantity);
      return {
        code: 200,
        message: "Product added to cart",
        cart,
      };
    },
    removeFromCart: async (_: any, args: { userId: number; productId: number }) => {
      const cart = await cartRepository.removeFromCart(args.userId, args.productId);
      return {
        code: 200,
        message: "Product removed from cart",
        cart,
      };
    },
    clearCart: async (_: any, { userId }: { userId: number }) => {
      const cart = await cartRepository.clearCart(userId);
      return {
        code: 200,
        message: "Cart cleared",
        cart,
      };
    },
  },
};
