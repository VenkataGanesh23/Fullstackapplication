import React from "react";
import { useQuery } from "@apollo/client";
// import { GET_PRODUCTS_BY_CATEGORY } from "../../graphql/Query";
import ProductCard from "../Products/ProductCard";
import { Link, useParams } from "react-router-dom";

interface ProductGridProps {
  hideFilters: boolean;
  sortOption: string | null;
  category: any;
}

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  colors: { id: string; name: string }[];
  category?: { name: string };
  subCategory?: string;
  createdAt: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ hideFilters, sortOption, category }) => {
  const { categoryPath } = useParams();
  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables: { 
      categoryPath,
      sort: sortOption
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

  // Type-safe sorting function
  const sortedProducts = [...(data?.getProductsByCategory || [])].sort((a: Product, b: Product) => {
    switch (sortOption) {
      case "priceHighLow":
        return b.price - a.price;
      case "priceLowHigh":
        return a.price - b.price;
      case "newest":
        // Convert dates to timestamps for comparison
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className={`product-grid-container ${hideFilters ? "filters-hidden" : ""}`}>
      <div className="product-grid">
        {sortedProducts.map((product: Product) => (
          <Link
            key={product.id}
            to={`/ProductDetails/${product.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ProductCard
              title={product.name}
              subtitle={product.subCategory || product.category?.name || "Shoes"}
              price={`₹ ${product.price.toLocaleString()}`} // Format price with commas
              image={product.images?.[0]}
              link={`/ProductDetails/${product.id}`}
              colorCount={`${product.colors?.length || 1} Colour${
                product.colors?.length > 1 ? "s" : ""
              }`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;