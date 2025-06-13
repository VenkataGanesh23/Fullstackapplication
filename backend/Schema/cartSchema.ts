import { gql } from "apollo-server";

export const cartTypeDefs = gql`
  type CartItem {
    id: Int!
    productId: Int!
    quantity: Int!
    size: String
    color: String
    product: Product
    addedAt: String!
  }

  type Cart {
    id: Int!
    userId: Int!
    isActive: Boolean!
    createdAt: String!
    updatedAt: String!
    cartItems: [CartItem!]!
  }

  type CartResponseStatus {
    code: Int!
    message: String!
  }

  type CartResponse {
    status: CartResponseStatus!
    cart: Cart
  }

  type CartItemsResponse {
    status: CartResponseStatus!
    cartItems: [CartItem!]!
  }

  type Query {
    getActiveCart(userId: Int!): CartResponse!
  }

  input CartItemInput {
    productId: Int!
    quantity: Int!
    size: String
    color: String
  }

  type Mutation {
    addToCart(userId: Int!, item: CartItemInput!): CartResponse!
    updateCartItem(cartItemId: Int!, quantity: Int!, size: String, color: String): CartResponse!
    removeCartItem(cartItemId: Int!): CartResponse!
    clearCart(userId: Int!): CartResponse!
  }
`;

