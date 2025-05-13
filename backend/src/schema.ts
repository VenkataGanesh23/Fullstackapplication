import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
   id: Int!
   email: String!
   first_name: String!
   last_name: String!
   DOB: String!
}
  

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    getAllUsers: [User]
  }

  type Mutation {
    signup(first_name: String!, last_name: String!, DOB: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    requestPasswordReset(email: String!): String!
    resetPassword(token: String!, newPassword: String!): String!
  }
`;
