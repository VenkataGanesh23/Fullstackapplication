import { Context } from '../src/context';
import { cartService } from '../graphql/layers';

export const cartResolver = {
  Query: {
    getActiveCart: async (_parent: any, args: { userId: number }, ctx: Context) => {
      return await cartService.getActiveCart(args.userId);
    },
  },

  Mutation: {
    addToCart: async (
      _parent: any,
      args: {
        cartId: number;
        productId: number;
        quantity: number;
        size?: string;
        color?: string;
      },
      ctx: Context
    ) => {
      return await cartService.addToCart(
        args.cartId,
        args.productId,
        args.quantity,
        args.size,
        args.color
      );
    },

    updateCartItem: async (
      _parent: any,
      args: {
        cartItemId: number;
        quantity: number;
        size?: string;
        color?: string;
      },
      ctx: Context
    ) => {
      return await cartService.updateCartItem(
        args.cartItemId,
        args.quantity,
        args.size,
        args.color
      );
    },

    removeCartItem: async (
      _parent: any,
      args: { cartItemId: number },
      ctx: Context
    ) => {
      return await cartService.removeCartItem(args.cartItemId);
    },

    clearCart: async (_parent: any, args: { userId: number }, ctx: Context) => {
      return await cartService.clearCart(args.userId);
    },
  },
};
