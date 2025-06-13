import CartRepository  from "../Repository/cartRepository";

class CartService {
  private cartRepository: CartRepository;

  constructor(cartRepository: CartRepository) {
    this.cartRepository = cartRepository;
  }

  async getActiveCart(userId: number) {
    return await this.cartRepository.findActiveCartByUserId(userId);
  }

  async createCart(userId: number) {
    return await this.cartRepository.createCart(userId);
  }

  async addToCart(cartId: number, productId: number, quantity: number, size?: string, color?: string) {
    return await this.cartRepository.addCartItem(cartId, productId, quantity, size, color);
  }

  async updateCartItem(cartItemId: number, quantity: number, size?: string, color?: string) {
    return await this.cartRepository.updateCartItem(cartItemId, quantity, size, color);
  }

  async removeCartItem(cartItemId: number) {
    return await this.cartRepository.removeCartItem(cartItemId);
  }

  async clearCart(userId: number) {
    return await this.cartRepository.clearCartItems(userId);
  }
}

export default CartService;
