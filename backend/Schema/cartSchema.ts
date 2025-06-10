import { gql } from "apollo-server";

export const cartTypeDefs = gql`
  type CartItem {
    id: Int!
    product: Product!
    quantity: Int!
  }

  type Cart {
    id: Int!
    userId: Int!
    items: [CartItem!]!
    createdAt: String!
    updatedAt: String!
  }

  type CartResponse {
    code: Int!
    message: String!
    cart: Cart
  }

  type Mutation {
    addToCart(productId: Int!, quantity: Int!): CartResponse!
    removeFromCart(productId: Int!): CartResponse!
    clearCart: CartResponse!
  }

  type Query {
    getCart: CartResponse!
  }
`;
