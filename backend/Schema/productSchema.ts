import { gql } from "apollo-server";

export const productTypeDefs = gql`
  type Product {
    id: Int!
    name: String!
    description: String!
    price: Float!
    category: String!
    subCategory : String!
    brand: String!
    sizes: [String!]!
    colors: [String!]!
    images: [String!]!
    stock: Int!
    isActive: Boolean!
    createdAt: String!
    updatedAt: String!
    userId: Int
  }

  type ProductResponse {
    status: ResponseStatus!
    product: Product
  }

  type ProductListResponse {
    status: ResponseStatus!
    products: [Product!]!
  }

  input CreateProductInput {
    name: String!
    description: String!
    price: Float!
    category: String!
    subCategory: String!
    brand: String!
    sizes: [String!]!
    colors: [String!]!
    images: [String!]!
    stock: Int!
  }

  type Query {
    getAllProducts: ProductListResponse!
    getProductById(id: Int!): ProductResponse!
  }

  type Mutation {
    createProduct(data: CreateProductInput!): ProductResponse!
    deleteProduct(id: Int!): ResponseStatus!
  }
`;
