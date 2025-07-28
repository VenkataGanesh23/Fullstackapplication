import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Divider,
  Grid,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "../graphql/Query";

type AddedToBagPopupProps = {
  open: boolean;
  productId: number;
  selectedSize: string;
  onClose: () => void;
  onViewBag: () => void;
  setShowBagPopup: (value: boolean) => void;
};

const AddedToBagPopup: React.FC<AddedToBagPopupProps> = ({
  open,
  productId,
  selectedSize: initialSelectedSize,
  onClose,
  onViewBag,
  setShowBagPopup,
}) => {
  const [showConfirmPopup, setShowConfirmPopup] = useState(false); // Moved before useQuery
  const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id: productId },
    skip: !open && !showConfirmPopup, // Now this can access showConfirmPopup
  });

  const [imageIndex, setImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(
    initialSelectedSize || ""
  );
  const [showSizeError, setShowSizeError] = useState(false);

  // Handle body overflow
  useEffect(() => {
    if (open || showConfirmPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open, showConfirmPopup]);

  // Auto-close confirmation popup after 3 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showConfirmPopup) {
      timer = setTimeout(() => {
        setShowConfirmPopup(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showConfirmPopup]);

  if (!open && !showConfirmPopup) return null;

  if (loading) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1400,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !data?.getProductById?.product) return null;

  const product = data.getProductById.product;
  const sizes = product.sizes || [];
  const images = product.images || [];

  const handlePrevImage = () => {
    setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setImageIndex((prev) => (prev + 1) % images.length);
  };

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
    setShowSizeError(false);
  };

  const handleAddToBagClick = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }

    // Show confirmation first
    setShowConfirmPopup(true);
    // Then close the size selection popup
    onClose();
  };

  const handleCloseBagPopup = () => {
    setShowConfirmPopup(false);
  };

  return (
    <>
      {/* Overlay for size selection popup */}
      {open && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1300,
          }}
        />
      )}

      {/* Size Selection Popup */}
      {open && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxHeight: "600px",
            maxWidth: "1100px",
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            zIndex: 1400,
            overflow: "hidden",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {/* Left Side - Product Image */}
          <Box sx={{ width: "45%", position: "relative", height: "100%" }}>
            <img
              src={images[imageIndex]}
              alt={`Product ${imageIndex}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {images.length > 1 && (
              <>
                <IconButton
                  onClick={handlePrevImage}
                  sx={{
                    position: "absolute",
                    top: "90%",
                    left: 300,
                    transform: "translateY(-50%)",
                    bgcolor: "white",
                  }}
                >
                  <ArrowBackIosNewRoundedIcon />
                </IconButton>
                <IconButton
                  onClick={handleNextImage}
                  sx={{
                    position: "absolute",
                    top: "90%",
                    right: 10,
                    transform: "translateY(-50%)",
                    bgcolor: "white",
                  }}
                >
                  <ArrowForwardIosRoundedIcon />
                </IconButton>
              </>
            )}
          </Box>

          {/* Right Side - Product Details */}
          <Box
            sx={{
              width: "70%",
              p: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {product.name}
              </Typography>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 0.9 }}>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {product.category?.name || "Uncategorized"}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1, fontWeight: 500 }}>
                MRP: ₹{product.price?.toLocaleString() || "0"}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                {selectedSize}
              </Typography>

              {/* Sizes */}
              {sizes.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={0}>
                    {sizes.map((size: string) => (
                      <Box
                        key={size}
                        sx={{
                          width: "25%",
                          padding: "4px",
                          boxSizing: "border-box",
                        }}
                      >
                        <Button
                          fullWidth
                          variant="outlined"
                          sx={{
                            py: 1,
                            borderRadius: 2,
                            textTransform: "none",
                            fontSize: "0.875rem",
                            color: "black",
                            border:
                              selectedSize === size
                                ? "1px solid black"
                                : "1px solid rgba(145, 138, 138, 0.5)",
                            height: "44px",
                            "&:hover": { border: "1px solid black" },
                          }}
                          onClick={() => handleSizeClick(size)}
                        >
                          {size}
                        </Button>
                      </Box>
                    ))}
                  </Grid>
                </Box>
              )}
            </Box>

            <Divider sx={{ my: 3 }} />

            {showSizeError && (
              <Typography
                sx={{
                  color: "red",
                  border: "1px solid red",
                  borderRadius: 1,
                  p: 1,
                  mb: 2,
                  fontWeight: "bold",
                }}
              >
                Please select a size
              </Typography>
            )}

            {/* Action Buttons */}
            <Box
              sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}
            >
              <Typography
                onClick={() => {
                  onClose();
                  window.location.href = `/Productdetails/${productId}`;
                }}
                sx={{
                  py: 1.5,
                  borderRadius: "999px",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                View Full Product
              </Typography>
              <Button
                variant="contained"
                sx={{
                  py: 1.5,
                  borderRadius: "999px",
                  textTransform: "none",
                  backgroundColor: "black",
                  "&:hover": { backgroundColor: "grey.800" },
                }}
                onClick={handleAddToBagClick}
              >
                Add to Bag
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {/* Confirmation Popup */}
      {showConfirmPopup && (
        <>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              backgroundColor: "rgba(0,0,0,0.3)",
              zIndex: 1200,
            }}
          />
          <Box
            sx={{
              position: "fixed",
              top: 58,
              right: 20,
              width: 430,
              bgcolor: "#fff",
              borderRadius: "0 0 20px 20px",
              p: 2,
              zIndex: 1600,
            }}
          >
            <IconButton
              onClick={handleCloseBagPopup}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "black",
                backgroundColor: "rgba(221, 216, 216, 0.73)",
                "&:hover": {
                  backgroundColor: "rgb(175, 169, 169)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography sx={{ color: "black", fontSize: 19 }}>
                Added to Bag
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <img
                src={product.images[0]}
                alt="bag"
                style={{ width: 100, height: 100, objectFit: "cover" }}
              />
              <Box>
                <Typography sx={{ fontSize: "20px", mt: 3 }}>
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  {product.category?.name}
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  MRP : ₹ {product.price}
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  Size: {selectedSize}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.6, mt: 0.5 }}>
                  Inclusive of all taxes
                </Typography>
              </Box>
            </Box>

            <Box>
              <Button
                sx={{
                  ml: 3,
                  mt: 3,
                  padding: "20px",
                  borderRadius: "999px",
                  backgroundColor: "white",
                  color: "black",
                  "&:hover": { border: "1px solid black" },
                  width: "40%",
                  border: "1px solid #CACACB",
                }}
                onClick={onViewBag}
              >
                View Bag
              </Button>
              <Button
                variant="contained"
                sx={{
                  ml: 3,
                  mt: 3,
                  padding: "20px",
                  borderRadius: "999px",
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": { backgroundColor: "#333", opacity: "0.7" },
                  width: "40%",
                }}
              >
                Checkout
              </Button>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default AddedToBagPopup;
