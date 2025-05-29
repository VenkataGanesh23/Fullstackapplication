import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      email
      first_name
      last_name
      DOB
    }
  }
`;
export const SIGNUP = gql`
  mutation Signup(
    $email: String!
    $password: String!
    $first_name: String!
    $last_name: String!
    $DOB: String!
  ) {
    signup(
      email: $email
      password: $password
      first_name: $first_name
      last_name: $last_name
      DOB: $DOB
    ) {
      token
      user {
        id
        email
        first_name
        last_name
        DOB
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login(
    $email: String!, 
    $password: String!
  ) {
    login(
      email: $email, 
      password: $password
    ) {
      token
      user {
        id
        email
        first_name
        last_name
        DOB
      }
    }
  }
`;

