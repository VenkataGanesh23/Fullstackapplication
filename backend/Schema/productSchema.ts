import { gql } from "apollo-server";

export const productTypeDefs = gql`
  type Category {
    id: Int!
    name: String!
    description: String
    createdAt: String!
  }

  type Product {
    id: Int!
    name: String!
    description: String!
    price: Float!
    gender: String!
    category: Category!
    subCategory: String!
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
    gender: String!
    categoryId: Int!
    subCategory: String!
    brand: String!
    sizes: [String!]!
    colors: [String!]!
    images: [String!]!
    stock: Int!
  }

  input UpdateProductInput {
    name: String
    description: String
    price: Float
    gender: String
    categoryId: Int
    subCategory: String
    brand: String
    sizes: [String!]
    colors: [String!]
    images: [String!]
    stock: Int
    isActive: Boolean
  }

  type Query {
    getAllProducts: ProductListResponse!
    getProductById(id: Int!): ProductResponse!
    getProductsByCategory(categoryId: Int!): ProductListResponse!
  }

  type Mutation {
    createProduct(data: CreateProductInput!): ProductResponse!
    updateProduct(id: Int!, data: UpdateProductInput!): ProductResponse!
    deleteProduct(id: Int!): ResponseStatus!
    restoreProduct(id: Int!): ProductResponse!
  }
`;
