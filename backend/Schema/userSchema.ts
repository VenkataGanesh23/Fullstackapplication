import { gql } from "apollo-server";

export const userTypeDefs = gql`
  type User {
    id: Int!
    email: String!
    first_name: String!
    last_name: String!
    dob: String!
  }

  type AuthStatus {
    status: ResponseStatus!
  }

  type AuthRequest {
    status: ResponseStatus!
    user: User
  }


  type ResponseStatus {
    code: Int!
    message: String!
  }

  type AuthPayload {
    status: ResponseStatus!
    token: String
    user: User
  }

  type confirmResponse {
    status: ResponseStatus!
    user: User
  }

  type SignUpResponse {
    status: ResponseStatus!
    user: User
  }

  type UserListResponse {
    status: ResponseStatus!
    users: [User!]!
  }

  type Query {
    getAllUsers(limit: Int, offset: Int): UserListResponse!
  }

  type Mutation {
    signUp(
      first_name: String!
      last_name: String!
      email: String!
      password: String!
      dob: String!
    ): SignUpResponse!

    signIn(email: String!, password: String!): AuthPayload!

    userConfirm(token: String!): confirmResponse

    requestPasswordReset(email: String!): AuthStatus!

    resetPassword(token: String!, newPassword: String!): AuthRequest!
  }
`;
