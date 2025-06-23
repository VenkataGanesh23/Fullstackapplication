import { gql } from 'apollo-server-express';

export const contentTypeDefs = gql`
  input ContentInput {
    title: String!
    images: [String!]!
    descriptions: [String!]!
  }

  input ContentUpdateInput {
    title: String
    images: [String!]
    descriptions: [String!]
  }

  type Content {
    id: Int!
    title: String!
    images: [String!]!
    descriptions: [String!]!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getAllContents: [Content!]!
    getContentById(id: Int!): Content
    searchContents(title: String!): [Content!]!
  }

  type Mutation {
    createContent(data: ContentInput!): Content!
    updateContent(id: Int!, data: ContentUpdateInput!): Content!
    deleteContent(id: Int!): Boolean!
  }
`;
