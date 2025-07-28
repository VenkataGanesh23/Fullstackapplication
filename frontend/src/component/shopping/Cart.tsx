import React from "react";
import { useCart } from "../../context/CartContext";
import { Box, Typography, Button, IconButton, Divider } from "@mui/material";
import Navbar from "../reusable/Nav&Footer/Navbar";
import Footer from "../reusable/Nav&Footer/Footer";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useFavorites } from "../../context/FavoritesContext";

const Cart: React.FC = () => {
  const { cartItems, addToCart, decreaseQuantity } = useCart();
  const { addFavorite, removeFavorite, isFavorited } = useFavorites();

  const handleIncrement = (item: any) => {
    console.log('Incrementing item:', item.id); // Debug log
    // Prevent double increment by stopping event propagation handled in onClick
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      size: item.size,
      images: item.images,
      category: item.category,
    });
  };

  const handleDecrement = (item: any) => {
    console.log('Decrementing item:', item.id); // Debug log
    decreaseQuantity(item.id, item.size);
  };

  const toggleFavorite = (item: any) => {
    if (isFavorited(item.id)) {
      removeFavorite(item.id);
    } else {
      addFavorite({
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        images: item.images,
      });
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  
  const estimatedDelivery = cartItems.length > 0 ? 1250 : 0;
  const total = subtotal + estimatedDelivery;

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex", p: 10, gap: 4, m: "10px 150px 0px 150px" }}>
        {/* Left side - Bag items */}
        <Box sx={{ flex: 2 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
            Bag
          </Typography>

          {cartItems.length === 0 ? (
            <Typography>There are no items in your bag.</Typography>
          ) : (
            cartItems.map((item) => (
              <Box key={`${item.id}-${item.size}`} sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", gap: 3 }}>
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    style={{ width: 150, height: 150, objectFit: "cover" }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.category}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                      Size {item.size}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                      >
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDecrement(item);
                          }}
                          size="small"
                          aria-label={item.quantity === 1 ? "delete item" : "decrease quantity"}
                          sx={{ p: 0.5 }}
                        >
                          {item.quantity === 1 ? (
                            <DeleteOutlineOutlinedIcon fontSize="small"/>
                          ) : (
                            <RemoveIcon fontSize="small" />
                          )}
                        </IconButton>
                        <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleIncrement(item);
                          }}
                          size="small"
                          aria-label="increase quantity"
                          sx={{ p: 0.5 }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <IconButton 
                        aria-label="add to favorites" 
                        sx={{ p: 0.5 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item);
                        }}
                      >
                        {isFavorited(item.id) ? (
                          <FavoriteIcon fontSize="small" />
                        ) : (
                          <FavoriteBorderIcon fontSize="small" />
                        )}
                      </IconButton>
                    </Box>
                  </Box>

                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="body2" color="text.secondary">
                      Price: ₹{" "}
                      {item.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </Typography>
                    {/* Removed the crossed out MRP price as per user request */}
                    {/* <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textDecoration: "line-through" }}
                    >
                      MRP: ₹{" "}
                      {(item.price * 1.1).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </Typography> */}
                  </Box>
                </Box>
                <Divider sx={{ mt: 2 }} />
              </Box>
            ))
          )}
        </Box>

        {/* Right side - Summary */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
            Summary
          </Typography>

          <Box sx={{ p: 2 }}>
          {/* Removed detailed summary items as per user request */}
          {/* Only show subtotal, estimated delivery, and total */}

            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>Subtotal</Typography>
                <Typography>
                  {cartItems.length === 0
                    ? "—"
                    : `₹ ${subtotal.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}`}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>Estimated Delivery & Handling</Typography>
                <Typography>
                  {cartItems.length === 0
                    ? "Free"
                    : `₹ ${estimatedDelivery.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}`}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between"}}>
              <Typography fontWeight="bold">Total</Typography>
              {cartItems.length === 0 ? (
                <Typography>—</Typography>
              ) : (
                <Typography fontWeight="bold">
                  ₹{" "}
                  {total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </Typography>
              )}
            </Box>
 <Divider sx={{ my: 2 }} />
            <Button
              variant="contained"
              fullWidth
              disabled={cartItems.length === 0}
              sx={{
                py: 1.7,
                borderRadius: "999px",
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "1rem",
                color:"white",
                backgroundColor:"black"
              }}
            >
              Member Checkout
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Cart;