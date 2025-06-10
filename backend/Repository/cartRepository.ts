import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class CartRepository {
  async getCart(userId: number) {
    return await prisma.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async addToCart(userId: number, productId: number, quantity: number) {
    let cart = await prisma.cart.findFirst({ where: { userId } });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId,
        },
      });
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }

    return this.getCart(userId);
  }

  async removeFromCart(userId: number, productId: number) {
    const cart = await prisma.cart.findFirst({ where: { userId } });
    if (!cart) return null;

    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    return this.getCart(userId);
  }

  async clearCart(userId: number) {
    const cart = await prisma.cart.findFirst({ where: { userId } });
    if (!cart) return null;

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return this.getCart(userId);
  }
}

export default CartRepository;
