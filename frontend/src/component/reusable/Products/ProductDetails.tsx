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

const mockImages = [img1, img1, img1, img1, img2];

const availableSizes = [
  "UK 6 (EU 40)",
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
      // Proceed to add to cart
    }
  };
  const productDescriptionData = {
    about: "Created for the hardwood but taken to the streets...",
    color: "Colour Shown: White/White/Black",
    style: "Style: DD1391-100",
    origin: "Country/Region of Origin: China, Indonesia, Vietnam",
    productDetails: "View Product Details",
    deliveryReturns: `All purchases are subject to delivery fees.

Standard delivery 4–9 business days
Orders are processed and delivered Monday–Friday (excluding public holidays)

Nike Members enjoy free returns.`,
    reviews: "No reviews yet",
    declaration:
      "Declaration of Importer: Direct import by the individual customer",
    marketedBy:
      "Marketed by: Nike Global Trading B.V. Singapore Branch, 30 Pasir Panjang Road...",
    note: "The ® may appear once or twice on the tongue and/or sockliner as a result of a change implemented by Nike. The product you purchase may appear differently in this respect than the one depicted on Nike.com or NikeApp.",
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex", p: 4, height: "100vh", overflow: "auto" }}>
        {/* Left - Thumbnails + Main Image */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "60%",
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            {/* Thumbnails */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {mockImages.map((img, index) => (
                <Box
                  key={index}
                  component="img"
                  src={img}
                  onMouseEnter={() => setImageIndex(index)}
                  sx={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 1,
                    cursor: "pointer",
                    opacity: imageIndex === index ? 0.6 : 1,
                    transition: "opacity 0.3s, transform 0.3s",
                    "&:hover": {
                      opacity: 0.7,
                      transform: "scale(1.05)",
                    },
                  }}
                />
              ))}
            </Box>

            {/* Main Image */}
            <Box sx={{ position: "relative", width: "500px", height: "auto" }}>
              <Box
                component="img"
                src={mockImages[imageIndex]}
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 2,
                  objectFit: "contain",
                }}
              />

              {/* Bottom-Centered Arrows */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 10,
                  left: "90%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: 2,
                  borderRadius: 5,
                }}
              >
                <ArrowBackIosNewRoundedIcon
                  onClick={handlePrevImage}
                  sx={{
                    fontSize: 18,
                    cursor: "pointer",
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "50%",
                    width: 32,
                    height: 32,
                    padding: "6px",
                    boxSizing: "border-box",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      borderColor: "black",
                    },
                  }}
                />
                <ArrowForwardIosRoundedIcon
                  onClick={handleNextImage}
                  sx={{
                    fontSize: 18,
                    cursor: "pointer",
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "50%",
                    width: 32,
                    height: 32,
                    padding: "6px",
                    boxSizing: "border-box",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      borderColor: "black",
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Right - Details */}
        <Box
          sx={{
            width: "40%",
            pl: 4,
            overflowY: "auto",
            maxHeight: "100vh",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Typography variant="h6">Nike Dunk Low Retro</Typography>
          <Typography color="text.secondary" gutterBottom>
            Men's Shoe
          </Typography>
          <Typography variant="h5" sx={{ mt: 1 }}>
            MRP : ₹ 8,295.00
          </Typography>
          <Typography fontSize={12} color="gray" sx={{ mb: 2 }}>
            Inclusive of all taxes
            <br />
            (Also includes all applicable duties)
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Box
              component="img"
              src={img1}
              alt="icon"
              sx={{
                width: 80,
                height: 80,
                border: "1px solid black",
                borderRadius: 2,
              }}
            />
            <Box
              component="img"
              src="/images/design_your_own.webp"
              alt="design"
              sx={{ width: 80, height: 40 }}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: showError ? "red" : "inherit",
              }}
            >
              Select Size
            </Typography>
            <Typography variant="subtitle1" sx={{ cursor: "pointer" }}>
              Size Guide
            </Typography>
          </Box>

          <ToggleButtonGroup
            value={selectedSize}
            exclusive
            onChange={handleSizeChange}
            sx={{
              flexWrap: "wrap",
              gap: 1,
              border: showError ? "1px solid red" : "none",
              padding: "10px 0px ",
            }}
          >
            <Box
              sx={{
                margin: "0px auto",
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0px, 1fr))",
                gap: "7px",
                maxWidth: "100%",
                border: "1px solid transparent",
              }}
            >
              {availableSizes.map((size) => (
                <ToggleButton
                  key={size}
                  value={size}
                  sx={{
                    height: 50,
                    width: 180,
                    color: "black",
                    textTransform: "none",
                    "&:hover": {
                      border: "1px solid black",
                      backgroundColor: "white",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "white",
                      border: "1px solid black",
                      color: "black",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "white",
                      border: "1px solid black",
                    },
                  }}
                >
                  {size}
                </ToggleButton>
              ))}
            </Box>
          </ToggleButtonGroup>
          {showError && (
            <Typography sx={{ color: "red", mt: 2, fontSize: "1rem" }}>
              Please select a size
            </Typography>
          )}

          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleAddCart}
              sx={{
                backgroundColor: "black",
                borderRadius: 50,
                width: "370px",
                margin: "18px 24px 10px 0px",
                padding: "20px",
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "1rem",
                lineHeight: 1.5,
              }}
            >
              Add to Bag
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                borderRadius: 50,
                width: "370px",
                color: "black",
                margin: "18px 24px 10px 0px",
                padding: "20px",
                border: "1px solid gray",
                "&:hover": {
                  border: "1px solid black",
                },
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "1rem",
                lineHeight: 1.5,
              }}
            >
              Favorite
              <FavoriteBorderRoundedIcon className="product-fav-icon" />
            </Button>
          </Box>
          <ProductDescription {...productDescriptionData} />
          <Box sx={{ height: 200 }} />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default ProductDetails;
