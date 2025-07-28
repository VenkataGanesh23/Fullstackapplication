// types.ts
export interface Category {
  id: string;
  name: string;
  path: string;
  count: number;
  parent?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  gender?: string;
  price: number;
  colors: string[];
  // other product properties
}

export const categories: Category[] = [
  { id: 'jordan', name: 'Jordan', path: 'jordan', count: 80 },
  { id: 'jordan-shoes', name: 'Shoes', path: 'jordan/shoes', parent: 'jordan', count: 80 },
  { id: 'jordan-clothing', name: 'Clothing', path: 'jordan/clothing', parent: 'jordan', count: 45 },
  { id: 'mens-shoes', name: "Men's Shoes", path: 'mens-shoes', count: 120 },
  { id: 'womens-shoes', name: "Women's Shoes", path: 'womens-shoes', count: 95 },
];

export const products: Product[] = [
  // Your product data here
];