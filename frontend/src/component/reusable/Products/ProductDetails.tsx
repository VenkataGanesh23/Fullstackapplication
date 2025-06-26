import {
  Box,
  Button,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "../../graphql/Query";
import Navbar from "../Nav&Footer/Navbar";
import Footer from "../Nav&Footer/Footer";
import ProductDescription from "./ProductDescription";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import DesignServicesRoundedIcon from "@mui/icons-material/DesignServicesRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useState } from "react";
import "../../css/Productdetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id: parseInt(id || "0") },
  });

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  if (loading) return <Typography>Loading...</Typography>;
  if (error || !data?.getProductById?.product)
    return <Typography>Product not found.</Typography>;

  const product = data.getProductById.product;
  const availableSizes = product.sizes || [];
  const images = product.images || [];
  const disabledSizes: string[] = [];

  const handleSizeChange = (_: any, newSize: string | null) => {
    if (!disabledSizes.includes(newSize || "")) {
      setSelectedSize(newSize);
    }
  };

  const handleAddCart = () => {
    if (!selectedSize) {
      setShowError(true);
    } else {
      setShowError(false);
      // Add to cart logic
    }
  };

  const handleNextImage = () => {
    setImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {/* Left Section */}
        <Box className="left-section">
          <Box className="thumbnails">
            {images.map((img: string, i: number) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                className={`thumbnail ${imageIndex === i ? "active" : ""}`}
                onMouseEnter={() => setImageIndex(i)}
              />
            ))}
          </Box>
          <Box className="main-image-wrapper">
            <img src={images[imageIndex]} alt="main" className="main-image" />
            <Box className="image-nav-buttons">
              <ArrowBackIosNewRoundedIcon
                onClick={handlePrevImage}
                className="arrow-btn"
              />
              <ArrowForwardIosRoundedIcon
                onClick={handleNextImage}
                className="arrow-btn"
              />
            </Box>
          </Box>
        </Box>

        {/* Right Section */}
        <Box
          className="right-section"
          sx={{
            overflowY: "auto",
            height: "100vh",
            pr: 3,
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Typography variant="h6" sx={{ mt: 8 }}>{product.name}</Typography>
          <Typography color="text.secondary">{product.brand}</Typography>
          <Typography variant="h5" sx={{ mt: 1 }}>
            MRP : ₹ {product.price}
          </Typography>
          <Typography className="tax-info">
            Inclusive of all taxes <br /> (Also includes all applicable duties)
          </Typography>

          <Box className="size-header">
            <Typography sx={{ color: showError ? "red" : "inherit" }}>
              Select Size
            </Typography>
            <Typography className="size-guide">
              <DesignServicesRoundedIcon fontSize="small" /> Size Guide
            </Typography>
          </Box>

          <ToggleButtonGroup
            value={selectedSize}
            exclusive
            onChange={handleSizeChange}
            className={`size-group ${showError ? "error" : ""}`}
          >
            {availableSizes.map((size: string) => (
              <ToggleButton
                key={size}
                value={size}
                className={`size-button ${
                  disabledSizes.includes(size) ? "disabled" : ""
                }`}
                disabled={disabledSizes.includes(size)}
              >
                {size}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          {showError && (
            <Typography className="error-msg">Please select a size</Typography>
          )}

          <Box className="actions">
            <Button
              variant="contained"
              onClick={handleAddCart}
              className="btn add-to-bag"
            >
              Add to Bag
            </Button>
            <Button variant="outlined" className="btn favorite">
              Favorite <FavoriteBorderRoundedIcon sx={{ ml: 1 }} />
            </Button>
          </Box>

          <Box className="product-description">
            <ProductDescription product={product} />
          </Box>

          <Box sx={{ height: 100 }} />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default ProductDetails;
