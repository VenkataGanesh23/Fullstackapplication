import { Box, Typography } from "@mui/material";
import CollapsibleSection from "../CollapsibleSection/CollapsibleSection";

export interface Product {
  description: string;
  colors: string[];
  brand: string;
  subCategory: string;
  category: {
    name: string;
  };
}

interface ProductDescriptionProps {
  product: Product;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
  const {
    description,
    colors,
    brand,
    subCategory,
    category,
  } = product;

  return (
    <Box sx={{ px: 4 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        About Product
      </Typography>
      <Typography sx={{ whiteSpace: "pre-line", mb: 2 }}>
        {description}
      </Typography>
      { <ul style={{ marginBottom: "1rem" }}>
        <li>
          <strong>Colors:</strong> {colors.join(", ")}
        </li>
      </ul> }

      <CollapsibleSection
        title="Delivery & Returns"
        content="All purchases are subject to delivery fees.

Standard delivery 4–9 business days
Orders are processed and delivered Monday–Friday (excluding public holidays)"
      />
      <CollapsibleSection
        title="Reviews"
        content="No reviews yet"
        showRating
        showTitleRating
      />
      <CollapsibleSection
        title="Product Information"
        content={`Brand: ${brand}\nCategory: ${category.name}`}
      />
      <CollapsibleSection
        title="Product Info"
        content="Declaration of Importer: Direct import by the individual customer
Marketed by: Nike Global Trading B.V. Singapore Branch, 30 Pasir Panjang Road, #10-31/32, Mapletree Business City, Singapore 117 440"
      />
    </Box>
  );
};

export default ProductDescription;
