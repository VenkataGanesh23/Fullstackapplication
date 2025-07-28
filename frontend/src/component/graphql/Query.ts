import { gql } from "@apollo/client";

export const GET_ALL_CONTENT=gql`
query Query {
  getAllContents {
    id
    title
    images
    descriptions
    createdAt
    updatedAt
  }
}
`

export const GET_ALL_CONTENT_BY_ID=gql`
query Query($getContentByIdId: Int!) {
  getContentById(id: $getContentByIdId) {
    id
    title
    images
    descriptions
    createdAt
    updatedAt
  }
}
`

export const GET_ALL_PRODUCTS = gql`
query Query {
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
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: Int!) {
    getProductById(id: $id) {
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
`;


export const UPDATE_PRODUCT_ID=gql`
query Query($categoryId: Int!) {
  getProductsByCategory(categoryId: $categoryId) {
    status {
      code
      message
    }
    products {
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

export const GET_ALL_CATEGORIES=gql`
query Query {
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
query Query($getCategoryByIdId: Int!) {
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
export const GET_PRODUCT_BY_CATEGORY=gql`
query Query($categoryId: Int!) {
  getProductsByCategory(categoryId: $categoryId) {
    status {
      code
      message
    }
    products {
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