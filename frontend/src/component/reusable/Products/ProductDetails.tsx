import {
  Box,
  Button,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "../../graphql/Query";
import Navbar from "../Nav&Footer/Navbar";
import Footer from "../Nav&Footer/Footer";
import ProductDescription from "./ProductDescription";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import DesignServicesRoundedIcon from "@mui/icons-material/DesignServicesRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import "../../css/Productdetails.css";
import { useFavorites } from "../../../context/FavoritesContext";
import { useCart } from "../../../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id: parseInt(id || "0") },
  });

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [showFavPopup, setShowFavPopup] = useState(false);
  const [showAddToCartPopup, setShowAddToCartPopup] = useState(false);
  const navigate = useNavigate();

  const { addFavorite, removeFavorite, isFavorited } = useFavorites();
  const { addToCart } = useCart();

  const product = data?.getProductById?.product;
  const availableSizes = product?.sizes || [];
  const images = product?.images || [];
  const disabledSizes: string[] = [];

  const isInFavorites = isFavorited(product?.id);

  useEffect(() => {
    if (showFavPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showFavPopup]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error || !product) return <Typography>Product not found.</Typography>;

  const handleSizeChange = (_: any, newSize: string | null) => {
    if (!disabledSizes.includes(newSize || "")) {
      setSelectedSize(newSize);
    }
  };

  const handleAddFavorite = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (isInFavorites) {
      removeFavorite(product.id);
    } else {
      addFavorite({
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images,
        category: product.category?.name || "Uncategorized",
      });
      setShowFavPopup(true);
      setTimeout(() => setShowFavPopup(false), 5000);
    }
  };

const handleAddCart = () => {
  if (!selectedSize) {
    setShowError(true);
  } else {
    setShowError(false);
    // Scroll to top on add to cart
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Add to cart logic
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      images: product.images,
      category: product.category?.name || "Uncategorized",
    });
    setShowAddToCartPopup(true);
    setTimeout(() => setShowAddToCartPopup(false), 5000);
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
      <Box sx={{ display: "flex", height: "auto" }}>
        {/* Left Section */}
        <Box
          className="left-section"
          sx={{
            width: "50%",
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
          }}
        >
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
            width: "50%",
            height: "auto",
            overflowY: "auto",
            pb: 10,
          }}
        >
          <Typography sx={{ mt: 8 }}>{product.name}</Typography>
          <Typography color="text.secondary">{product.brand}</Typography>
          <Typography sx={{ mr: 2 }}>MRP : ₹ {product.price}</Typography>
          <Typography className="tax-info" sx={{ mr: 3 }}>
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
            <Button
              variant="outlined"
              className="btn favorite"
              onClick={handleAddFavorite}
              sx={{ display: "flex", alignItems: "center" }}
            >
              {isInFavorites ? "Favorited" : "Favorite"}
              {isInFavorites ? (
                <FavoriteRoundedIcon sx={{ ml: 1, color: "black" }} />
              ) : (
                <FavoriteBorderRoundedIcon sx={{ ml: 1 }} />
              )}
            </Button>
          </Box>

          <Box className="product-description">
            <ProductDescription product={product} />
          </Box>

          <Box sx={{ height: 100 }} />
        </Box>
      </Box>

      {/* Favorite Added Popup */}
      {showFavPopup && (
        <>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              backgroundColor: "rgba(0,0,0,0.3)",
              zIndex: 1300,
            }}
          />

          <Box
            sx={{
              position: "fixed",
              top: 100,
              right: 20,
              width: 430,
              bgcolor: "#fff",
              borderRadius: "0 0 20px 20px",
              height: "auto",
              p: 2,
              zIndex: 1400,
              transition: "opacity 0.3s ease-in-out",
            }}
          >
            <IconButton
              onClick={() => setShowFavPopup(false)}
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
              <CloseIcon sx={{ borderRadius: "20px" }} />
            </IconButton>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <CheckCircleRoundedIcon sx={{ color: "green", fontSize: 25 }} />
              <Typography sx={{ color: "black", fontSize: 19 }}>
                Added to Favourites
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <img
                src={product.images[0]}
                alt="fav"
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                }}
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
                <Typography variant="body2" sx={{ opacity: 0.6, mt: 0.5 }}>
                  Inclusive of all taxes
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.6, mt: 0.5 }}>
                  (Also includes all applicable duties)
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              sx={{
                ml: 3,
                mt: 3,
                padding: "20px",
                borderRadius: "999px",
                backgroundColor: "black",
                color: "white",
                "&:hover": { backgroundColor: "#333",opacity:"0.7" },
                width: "90%",
              }}
              onClick={() => navigate("/Favorites")}
            >
              View Favourites
            </Button>
          </Box>
        </>
      )}
{showAddToCartPopup && (
  <>
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.3)",
        zIndex: 1300,
      }}
    />

    <Box
      sx={{
        position: "fixed",
        top: 100,
        right: 20,
        width: 430,
        bgcolor: "#fff",
        borderRadius: "0 0 20px 20px",
        height: "auto",
        p: 2,
        zIndex: 1400,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <IconButton
        onClick={() => setShowAddToCartPopup(false)}
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
        <CloseIcon sx={{ borderRadius: "20px" }} />
      </IconButton>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <CheckCircleRoundedIcon sx={{ color: "green", fontSize: 25 }} />
        <Typography sx={{ color: "black", fontSize: 19 }}>
          Added to Cart
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <img
          src={product.images[0]}
          alt="cart"
          style={{
            width: 100,
            height: 100,
            objectFit: "cover",
          }}
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
          <Typography sx={{ fontSize: "15px",opacity:0.6 }}>
            Size {selectedSize}
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            MRP : ₹ {product.price}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.6, mt: 0.5 }}>
            Inclusive of all taxes
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.6, mt: 0.5 }}>
            (Also includes all applicable duties)
          </Typography>
        </Box>
      </Box>

      <Button
        sx={{
          ml: 3,
          mt: 3,
          padding: "20px",
          borderRadius: "999px",
          backgroundColor: "white",
          color: "black",
          border:"1px solid #CACACB",
          "&:hover": { border:"1px solid black" },
          width: "90%",
        }}
        onClick={() => navigate("/Cart")}
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
          width: "90%",
        }}
        onClick={() => navigate("")}
      >
        Checkout
      </Button>
    </Box>
  </>
)}
      <Footer />
    </>
  );
};

export default ProductDetails;
