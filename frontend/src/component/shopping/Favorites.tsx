import {
  Box,
  Typography,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import Footer from "../reusable/Nav&Footer/Footer";
import Navbar from "../reusable/Nav&Footer/Navbar";
import { useFavorites } from "../../context/FavoritesContext";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { useEffect, useState } from "react";
import AddedToBagPopup from "./AddedToBagPopup";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  images: string[];
  sizes?: string[]; // ✅ Make this optional
}


const Favorites: React.FC = () => {
  const { favorites, removeFavorite } = useFavorites();
  const [shrinkHeader, setShrinkHeader] = useState(false);
  const [removedItemId, setRemovedItemId] = useState<number | null>(null);
  const [undoTimer, setUndoTimer] = useState<NodeJS.Timeout | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
const [showBagPopup, setShowBagPopup] = useState(false);
const [bagProductId, setBagProductId] = useState<number | null>(null);
const [bagSelectedSize, setBagSelectedSize] = useState<string>("");
const navigate = useNavigate()


  useEffect(() => {
    const handleScroll = () => {
      setShrinkHeader(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRemove = (id: number) => {
    setRemovedItemId(id);
    setShowSnackbar(true);
    const timer = setTimeout(() => {
      removeFavorite(id);
      setRemovedItemId(null);
      setShowSnackbar(false);
    }, 5000);
    setUndoTimer(timer);
  };

  const handleUndo = () => {
    if (undoTimer) {
      clearTimeout(undoTimer);
      setUndoTimer(null);
    }
    setRemovedItemId(null);
    setShowSnackbar(false);
  };

const handleAddToBag = (product: Product) => {
  setBagProductId(product.id);
  setBagSelectedSize(product.sizes?.[0] || ""); // Pick first size or set default
  setShowBagPopup(true);

  // Removed auto-close timeout to keep popup open until user closes it
  // setTimeout(() => setShowBagPopup(false), 5000); // Reduced timeout to 5 seconds
};
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />

      <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1201,
          bgcolor: "background.paper",
          px: 4,
          py: 2,
          transition: "all 0.3s ease",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{
            fontWeight: 400,
            fontSize: shrinkHeader ? "1.25rem" : "1.75rem",
            transition: "font-size 0.3s ease",
          }}
        >
          Favorites
        </Typography>
      </Box>

      <Box component="main" flex="1" px={4} py={4}>
        {favorites.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "calc(100vh - 250px)",
            }}
          >
            <Typography variant="body1">
              Items added to your Favorites will be saved here.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 3,
            }}
          >
            {favorites.map((item) => {
              const isRemoved = removedItemId === item.id;

              return (
                <Box
                  key={item.id}
                  sx={{
                    position: "relative",
                    maxWidth: "450px",
                    mx: "auto",
                    display: "flex",
                    flexDirection: "column",
                    // Removed overflow hidden to fix Add to Bag button click area issue
                    // overflow: "hidden",
                    backgroundColor: "background.paper",
                  }}
                >
                  <IconButton
                    onClick={() => handleRemove(item.id)}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      zIndex: 2,
                      backgroundColor: "rgba(255,255,255,0.9)",
                    }}
                  >
                    <FavoriteRoundedIcon />
                  </IconButton>

                  <Box sx={{ position: "relative", width: "100%" }}>
                    <CardMedia
                      component="img"
                      image={item.images[0]}
                      onClick={() => {
                  window.location.href = `/Productdetails/${item.id}`;
                }}
                      alt={item.name}
                      sx={{
                        width: "100%",
                        height: "450px",
                        objectFit: "cover",
                        cursor:"pointer"
                      }}
                    />

                    {/* Removed overlay snackbar in card to avoid duplicate snackbars and click issues */}
                    {/* {isRemoved && (
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 10,
                          left: "50%",
                          transform: "translateX(-50%)",
                          backgroundColor: "black",
                          color: "white",
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          fontSize: "14px",
                          zIndex: 3,
                          opacity: 0.95,
                        }}
                      >
                        Removed from Favorites
                        <Button
                          size="small"
                          onClick={handleUndo}
                          sx={{
                            ml: 1,
                            color: "white",
                            textDecoration: "underline",
                            textTransform: "none",
                          }}
                        >
                          Undo
                        </Button>
                      </Box>
                    )} */}
                  </Box>

                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle1" fontWeight={600} noWrap sx={{cursor:"pointer"}} onClick={() => {
                  window.location.href = `/Productdetails/${item.id}`;
                }}>
                        {item.name}
                      </Typography>
                      <Typography fontWeight={500} fontSize={15} mt={1}>
                        MRP: ₹{item.price}
                      </Typography>
                    </Box>
                    <Typography fontSize={15} color="text.secondary">
                      {item.category}
                    </Typography>

                    <Button
                      onClick={() => handleAddToBag(item)}
                      sx={{
                        mt: 2,
                        color: "black",
                        backgroundColor: "white",
                        borderRadius: "20px",
                        border: "1px solid #ccc",
                        textTransform: "none",
                        fontSize: "14px",
                        px: 2,
                        py: 1,
                        "&:hover": {
                          backgroundColor: "#f5f5f5",
                        },
                      }}
                    >
                      Add to Bag
                    </Button>
                  </CardContent>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="info"
          elevation={0}
          icon={false}
          variant="filled"
          action={
            <Button
              size="small"
              onClick={handleUndo}
              sx={{
                textTransform: "none",
                color: "white",
                fontWeight: 500,
                textDecoration: "underline",
              }}
            >
              Undo
            </Button>
          }
          sx={{
            bgcolor: "black",
            color: "white",
            fontSize: "14px",
            borderRadius: "8px",
            px: 2,
            py: 1.5,
          }}
        >
          Removed from Favorites
        </Alert>
      </Snackbar>

{bagProductId !== null && (
  <AddedToBagPopup
    open={showBagPopup}
    productId={bagProductId}
    selectedSize={bagSelectedSize}
    onClose={() => setShowBagPopup(false)}
    onViewBag={() => navigate("/Cart")}
    setShowBagPopup={setShowBagPopup} // ✅ PASS THIS
  />
)}
      <Footer />
    </Box>
  );
};

export default Favorites;
