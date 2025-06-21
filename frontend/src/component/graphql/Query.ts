import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      status {
        code
        message
      }
      products {
        id
        name
        description
        price
        category
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
`;

export const GET_PRODUCT_BY_ID=gql`
query Query($getProductByIdId: Int!) {
  getProductById(id: $getProductByIdId) {
    status {
      code
      message
    }
    product {
      id
      name
      description
      price
      category
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
export const GET_ALL_CATEGORIES=gql`
query GetAllCategories {
  getAllCategories {
    code
    message
    categories {
      id
      name
      description
      createdAt
    }
  }
}
`
export const GET_CATEGORIES_BY_ID=gql`
query GetAllCategories($getCategoryByIdId: Int!) {
  getCategoryById(id: $getCategoryByIdId) {
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