import { gql } from "apollo-server";

export const categoryTypeDefs = gql`
  type Category {
    id: Int!
    name: String!
    description: String
    createdAt: String!
  }

  type CategoryResponse {
    code: Int!
    message: String!
    category: Category
  }

  type CategoryListResponse {
    code: Int!
    message: String!
    categories: [Category!]!
  }

  type Query {
    getAllCategories: CategoryListResponse!
    getCategoryById(id: Int!): CategoryResponse!
  }

  type Mutation {
    createCategory(name: String!, description: String): CategoryResponse!
    deleteCategory(id: Int!): CategoryResponse!
  }
`;
