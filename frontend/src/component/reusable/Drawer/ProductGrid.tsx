// ProductGrid.tsx
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "../../graphql/Query";
import ProductCard from "../Products/ProductCard";
import { Link } from "react-router-dom";

interface ProductGridProps {
  hideFilters: boolean;
  sortOption: string | null;
}

const ProductGrid: React.FC<ProductGridProps> = ({ hideFilters }) => {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div
      className={`product-grid-container ${hideFilters ? "filters-hidden" : ""}`}
    >
      <div className="product-grid">
        {data?.getAllProducts?.products?.map((product: any) => (
          <Link
            key={product.id}
            to={`/ProductDetails/${product.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ProductCard
              key={product.id}
              title={product.name}
              subtitle={
                product.subCategory || product.category?.name || "Shoes"
              }
              price={`₹ ${product.price}`}
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
