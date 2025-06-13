import { Box, Typography } from "@mui/material";
import CollapsibleSection from "../CollapsibleSection/CollapsibleSection";

interface ProductDescriptionProps {
  about: string;
  color: string;
  style: string;
  origin: string;
  productDetails: string;
  deliveryReturns: string;
  reviews: string;
  declaration: string;
  marketedBy: string;
  note: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  about,
  color,
  style,
  origin,
  productDetails,
  deliveryReturns,
  reviews,
  declaration,
  marketedBy,
  note,
}) => {
  return (
    <Box sx={{ px: 4 }}>
      <Typography sx={{ whiteSpace: "pre-line" }}>{about}</Typography>
      <ul>
        <li>{color}</li>
        <li>{style}</li>
        <li>{origin}</li>
      </ul>
      <Typography
        onClick={() => {
          console.log("Product details clicked");
        }}
        sx={{
          cursor: "pointer",
          textDecoration: "underline",
          color: "black",
          mt: 1,
          mb: 2,
          "&:hover": {
            color: "grey",
          },
        }}
      >
        {productDetails}
      </Typography>

      <CollapsibleSection
        title="Delivery & Returns"
        content={deliveryReturns}
      />
      <CollapsibleSection
        title="Reviews"
        content={reviews}
        showRating
        showTitleRating
      />
      <CollapsibleSection
        title="Product Information"
        content={`${declaration}\n\n${marketedBy}`}
      />
      <CollapsibleSection title="More Info" content={note} />
    </Box>
  );
};

export default ProductDescription;
