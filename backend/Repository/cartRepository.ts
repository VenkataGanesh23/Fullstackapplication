import { Prisma, PrismaClient } from '@prisma/client';
import { responseStatus } from "../src/helper/static"; 

class CartRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findActiveCartByUserId(userId: number) {
    try {
      const cart = await this.prisma.cart.findFirst({
        where: { userId, isActive: true },
        include: {
          cartItems: {
            include: {
              product: true, // Include product details if needed
            },
          },
        },
      });
      return {
        status: responseStatus(200, 'Cart fetched successfully'),
        cart,
      };
    } catch (err) {
      console.error(err);
      return {
        status: responseStatus(500, 'Failed to fetch cart. Please try again later.'),
      };
    }
  }

  async createCart(userId: number) {
    try {
      const cart = await this.prisma.cart.create({
        data: { userId, isActive: true },
      });
      return {
        status: responseStatus(200, 'Cart created successfully'),
        cart,
      };
    } catch (err) {
      console.error(err);
      return {
        status: responseStatus(500, 'Failed to create cart. Please try again later.'),
      };
    }
  }

  async addCartItem(
    cartId: number,
    productId: number,
    quantity: number,
    size?: string,
    color?: string
  ) {
    try {
      // Check if the cart item with same product and variants exists
      const existingCartItem = await this.prisma.cartItem.findFirst({
        where: {
          cartId,
          productId,
          size,
          color,
        },
      });

      if (existingCartItem) {
        // Update quantity by incrementing
        const updatedItem = await this.prisma.cartItem.update({
          where: { id: existingCartItem.id },
          data: {
            quantity: existingCartItem.quantity + quantity,
          },
        });
        return {
          status: responseStatus(200, 'Cart item quantity updated successfully'),
          cartItem: updatedItem,
        };
      } else {
        // Create new cart item
        const cartItem = await this.prisma.cartItem.create({
          data: {
            cartId,
            productId,
            quantity,
            size,
            color,
          },
        });
        return {
          status: responseStatus(200, 'Item added to cart successfully'),
          cartItem,
        };
      }
    } catch (err) {
      console.error(err);
      return {
        status: responseStatus(500, 'Failed to add item to cart. Please try again later.'),
      };
    }
  }

  async updateCartItem(
    cartItemId: number,
    quantity: number,
    size?: string,
    color?: string
  ) {
    try {
      const data: { quantity: number; size?: string; color?: string } = { quantity };
      if (size !== undefined) data.size = size;
      if (color !== undefined) data.color = color;

      const updatedItem = await this.prisma.cartItem.update({
        where: { id: cartItemId },
        data,
      });

      return {
        status: responseStatus(200, 'Cart item updated successfully'),
        cartItem: updatedItem,
      };
    } catch (err) {
      console.error(err);
      return {
        status: responseStatus(500, 'Failed to update cart item. Please try again later.'),
      };
    }
  }

  async removeCartItem(cartItemId: number) {
    try {
      await this.prisma.cartItem.delete({
        where: { id: cartItemId },
      });
      return {
        status: responseStatus(200, 'Cart item removed successfully'),
      };
    } catch (err) {
      console.error(err);
      return {
        status: responseStatus(500, 'Failed to remove cart item. Please try again later.'),
      };
    }
  }

  async clearCartItems(userId: number) {
    try {
      // Find active cart first
      const cart = await this.prisma.cart.findFirst({
        where: { userId, isActive: true },
      });
      if (!cart) {
        return {
          status: responseStatus(404, "Active cart not found for user"),
        };
      }

      await this.prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      return {
        status: responseStatus(200, 'Cart cleared successfully'),
      };
    } catch (err) {
      console.error(err);
      return {
        status: responseStatus(500, 'Failed to clear cart. Please try again later.'),
      };
    }
  }
}

export default CartRepository;
