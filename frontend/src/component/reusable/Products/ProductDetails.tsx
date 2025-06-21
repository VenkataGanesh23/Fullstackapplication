import Footer from "../Nav&Footer/Footer";
import Navbar from "../Nav&Footer/Navbar";
import {
  Box,
  Button,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useState } from "react";
import img1 from "../../../assets/shoes/nike-just-do-it2.avif";
import img2 from "../../../assets/shoes/nike-just-do-it3.avif";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ProductDescription from "./ProductDescription";
import "../../css/Productdetails.css";
import DesignServicesRoundedIcon from "@mui/icons-material/DesignServicesRounded";


const mockImages = [img1, img1, img1, img1, img2];

const availableSizes = [
  "UK 5.5",
  "UK 6 (EU 39)",
  "UK 6 (EU 40)",
  "UK 6.5",
  "UK 7",
  "UK 7.5",
  "UK 8",
  "UK 8.5",
  "UK 9",
  "UK 9.5",
  "UK 10",
  "UK 10.5",
  "UK 11",
  "UK 12",
  "UK 12.5",
  "UK 13",
  "UK 13.5",
];
const disabledSizes = ["UK 5.5", "UK 6 (EU 39)", "UK 6.5"];

const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const handleNextImage = () => {
    setImageIndex((prev) => (prev + 1) % mockImages.length);
  };

  const handlePrevImage = () => {
    setImageIndex((prev) => (prev === 0 ? mockImages.length - 1 : prev - 1));
  };

  const handleSizeChange = (
    event: React.MouseEvent<HTMLElement>,
    newSize: string | null
  ) => {
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

  const productDescriptionData = {
    about: "Created for the hardwood but taken to the streets...",
    color: "Colour Shown: White/White/Black",
    style: "Style: DD1391-100",
    origin: "Country/Region of Origin: China, Indonesia, Vietnam",
    productDetails: "View Product Details",
    deliveryReturns: `All purchases are subject to delivery fees.`,
    reviews: "No reviews yet",
    declaration:
      "Declaration of Importer: Direct import by the individual customer",
    marketedBy:
      "Marketed by: Nike Global Trading B.V. Singapore Branch, 30 Pasir Panjang Road...",
    note: "The ® may appear once or twice on the tongue and/or sockliner...",
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Left Section */}
        <Box className="left-section">
          <Box className="thumbnails">
            {mockImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                className={`thumbnail ${imageIndex === index ? "active" : ""}`}
                onMouseEnter={() => setImageIndex(index)}
              />
            ))}
          </Box>
          <Box className="main-image-wrapper">
            <img
              src={mockImages[imageIndex]}
              alt="main"
              className="main-image"
            />
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

        {/* Right Section (scrollable only) */}
        <Box
          className="right-section"
          sx={{
            overflowY: "auto",
            height: "100vh",
            pr: 3,
            scrollbarWidth: "none", // Firefox
            "&::-webkit-scrollbar": {
              display: "none", // Chrome/Safari
            },
          }}
        >
          <Typography variant="h6" sx={{mt:8}}>Nike Dunk Low Retro</Typography>
          <Typography color="text.secondary">Men's Shoe</Typography>
          <Typography variant="h5" sx={{ mt: 1 }}>
            MRP : ₹ 8,295.00
          </Typography>
          <Typography className="tax-info">
            Inclusive of all taxes <br /> (Also includes all applicable duties)
          </Typography>

          <Box className="size-header">
            <Typography sx={{ color: showError ? "red" : "inherit" }}>
              Select Size
            </Typography>
            <Typography className="size-guide" >
              <DesignServicesRoundedIcon fontSize="small" />
              <span className="guide-icon" /> Size Guide
            </Typography>
          </Box>

          <ToggleButtonGroup
            value={selectedSize}
            exclusive
            onChange={handleSizeChange}
            className={`size-group ${showError ? "error" : ""}`}
          >
            {availableSizes.map((size) => (
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
            <ProductDescription {...productDescriptionData} />
          </Box>

          {/* Optional padding to allow full scroll */}
          <Box sx={{ height: 100 }} />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default ProductDetails;
