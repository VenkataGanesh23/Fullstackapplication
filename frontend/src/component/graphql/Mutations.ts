import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      email
      first_name
      last_name
      dob
    }
  }
`;

export const SIGNUP = gql`
  mutation SignUp($firstName: String!, $lastName: String!, $email: String!, $password: String!, $dob: String!) {
  signUp(first_name: $firstName, last_name: $lastName, email: $email, password: $password, dob: $dob) {
    status {
      code
      message
    }
    user {
      id
      email
    }
  }
}
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        id
        email
        first_name
        last_name
        dob
      }
    }
  }
`;

export const REQUEST_PASSWORD_RESET = gql`
    mutation RequestPasswordReset($email: String!) {
  requestPasswordReset(email: $email) {
    status {
      code
      message
    }
  }
}
`;

export const NEW_PASSWORD = gql`
mutation ResetPassword($token: String!, $newPassword: String!) {
  resetPassword(token: $token, newPassword: $newPassword) {
    status {
      code
      message
    }
    user {
      id
      email
      first_name
      last_name
      dob
    }
  }
}
`;
export const RESTORE_PRODUCT_BY_ID=gql`
mutation Mutation($restoreProductId: Int!) {
  restoreProduct(id: $restoreProductId) {
    status {
      code
      message
    }
    product {
      id
      name
      description
      price
      category {
        id
        name
        description
        createdAt
      }
      subCategory
      brand
      sizes
      colors
      images
      stock
      isActive
      createdAt
      updatedAt
      userId
    }
  }
}
`

export const DELETE_PRODUCT=gql`
mutation Mutation($deleteProductId: Int!) {
  deleteProduct(id: $deleteProductId) {
    code
    message
  }
}
`
export const CREATE_CONTENT_INPUT=gql`
mutation Mutation($data: ContentInput!) {
  createContent(data: $data) {
    id
    title
    images
    descriptions
    createdAt
    updatedAt
  }
}
`

export const CREATE_CATEGORY=gql`
mutation Mutation($name: String!) {
  createCategory(name: $name) {
    code
    message
    category {
      id
      name
      description
      createdAt
    }
  }
}
`
export const DELETE_CATEGORY=gql`
mutation Mutation($deleteCategoryId: Int!) {
  deleteCategory(id: $deleteCategoryId) {
    code
    message
    category {
      id
      name
      description
      createdAt
    }
  }
}
`