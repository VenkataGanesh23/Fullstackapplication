import { useNavigate } from "react-router-dom";
import Navbar from "../reusable/Nav&Footer/Navbar";
import { useEffect, useState, useRef } from "react";
import mainimage from "../../assets/mainimage.avif";
import img1 from "../../assets/shoes/nike-just-do-it3.avif";
import img2 from "../../assets/shoes/nike-just-do-it1.avif";
import img4 from "../../assets/shoes/nike-just-do-it2.avif";
import img5 from "../../assets/shoes/shoes.avif";
import img6 from "../../assets/submain/image.avif";
import img7 from "../../assets/submain/image1.avif";
import img8 from "../../assets/submain/image3.avif";
import { Box, Typography, Button } from "@mui/material";
import Footer from "../reusable/Nav&Footer/Footer";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import secondmainimg from "../../assets/image.avif";
import ShopBySport from "../reusable/Carousel/Carouselsports";

const carouselImages = [img1, img2, img4, img5,img2,img4];
const carouselImages2 = [
  { src: img6, label: "Trail ready in style" },
  { src: img7, label: "Game Time Must-Haves" },
  { src: img8, label: "Pretty in Pink" },
];

const Dashboard = () => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeArrow, setActiveArrow] = useState<"left" | "right" | null>(null);
  const navigate = useNavigate();

  // Separate scrollRef for Shop by Icons
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleShoes = () => {
    navigate("/Shoes");
  };

 const updateScrollButtons = () => {
  const el = scrollRef.current;
  if (el) {
    const scrollLeft = Math.round(el.scrollLeft);
    const maxScrollLeft = Math.round(el.scrollWidth - el.clientWidth);

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < maxScrollLeft);
  }
};

  const handleScroll = (direction: "left" | "right") => {
  const scrollAmount = 470;
  if (scrollRef.current) {
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });

    // Defer updateScrollButtons until after browser completes scroll
    requestAnimationFrame(() => {
      setTimeout(updateScrollButtons, 300);
    });

    setActiveArrow(direction);
  }
};


  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, []);

  return (
    <>
      <Navbar />
      {/* Hero Image */}
      <Box sx={{ px: { xs: 2, md: 4 }, py: 4, textAlign: "center" }}>
        <Box
          component="img"
          src={mainimage}
          alt="Main"
          sx={{
            width: "100%",
            height: "500px",
            borderRadius: 2,
            boxShadow: 3,
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Banner with Button */}
      <Box sx={{ backgroundColor: "#fff", textAlign: "center", py: 6, px: 2 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            fontSize: "4.75rem",
            mb: 2,
            fontFamily:
              "'Nike Futura ND', 'Helvetica Now Text Medium', Helvetica, Arial, sans-serif",
          }}
        >
          TURN OFF SEASON ON
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 18, mb: 3 }}>
          Get the gear that goes hard on and off the court.
        </Typography>
        <Button
          onClick={handleShoes}
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            px: 4,
            py: 1.5,
            borderRadius: "30px",
            fontWeight: 600,
            fontSize: 14,
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Shop Now
        </Button>
      </Box>

      {/* Featured Section */}
      <Typography sx={{ fontWeight: "bold", fontSize: 22, mt: 5, px: 7 }}>
        Featured
      </Typography>

      <Box
        sx={{
          mt: 2,
          display: "flex",
          gap: 2,
          overflowX: "auto",
          scrollBehavior: "smooth",
          px: 7,
          py: 2,
          "&::-webkit-scrollbar": { height: 6 },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#999", borderRadius: 3 },
        }}
      >
        {carouselImages2.map((item, i) => (
          <Box key={i} sx={{ minWidth: 450 }}>
            <Box
              component="img"
              src={item.src}
              alt={item.label}
              sx={{
                width: 450,
                height: 450,
                objectFit: "cover",
              }}
            />
            <Typography
              sx={{
                mt: 5,
                fontWeight: 500,
                fontSize: "1.25rem",
                fontFamily: `'Helvetica Now Display Medium', Helvetica, Arial, sans-serif`,
              }}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* The Latest Section */}
      <Typography
        sx={{
          font: "500 1.5rem/1.2 'Helvetica Now Display Medium', Helvetica, Arial, sans-serif",
          m: "90px 0px 0px 30px",
        }}
      >
        The latest
      </Typography>
      <Box sx={{ px: { xs: 2, md: 4 }, py: 4, textAlign: "center" }}>
        <Box
          component="img"
          src={secondmainimg}
          alt="Main"
          sx={{
            width: "100%",
            height: "500px",
            boxShadow: 3,
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Promo Banner */}
      <Box sx={{ backgroundColor: "#fff", textAlign: "center", py: 0, px: 2 }}>
        <Typography>Luca 4</Typography>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            fontSize: "4.75rem",
            lineHeight: 0.9,
            fontFamily:
              "'Nike Futura ND', 'Helvetica Now Text Medium', Helvetica, Arial, sans-serif",
          }}
        >
          BAD LUKA! NICE SHOES
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 1,
            mb: 4,
            fontWeight: 400,
            fontSize: "1rem",
            lineHeight: 1.5,
            fontFamily: "'Helvetica Now Text', Helvetica, Arial, sans-serif",
          }}
        >
          Stability. Zoom Air. Nice shoes.
        </Typography>
        <Button
          onClick={handleShoes}
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "30px",
            fontWeight: 600,
            fontSize: 14,
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Shop
        </Button>
      </Box>

      {/* Arrow Controls & Shop by Icons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 6,
          px: 7,
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
          Shop by Icons
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Box
            onClick={() => canScrollLeft && handleScroll("left")}
            sx={{
              backgroundColor: canScrollLeft ? "#f5f5f5" : "#E5E5E5",
              borderRadius: "50%",
              cursor: canScrollLeft ? "pointer" : "default",
              p: 1,
              border:
                activeArrow === "left"
                  ? "2px solid #1976d2"
                  : "2px solid transparent",
              pointerEvents: canScrollLeft ? "auto" : "none",
              "&:hover": {
                backgroundColor: canScrollLeft ? "#e0e0e0" : "#E5E5E5",
              },
            }}
          >
            <NavigateBeforeRoundedIcon
              sx={{
                fontSize: 40,
                color: canScrollLeft ? "black" : "#aaa",
              }}
            />
          </Box>

          <Box
            onClick={() => canScrollRight && handleScroll("right")}
            sx={{
              backgroundColor: canScrollRight ? "#f5f5f5" : "#E5E5E5",
              borderRadius: "50%",
              cursor: canScrollRight ? "pointer" : "default",
              p: 1,
              border:
                activeArrow === "right"
                  ? "2px solid #1976d2"
                  : "2px solid transparent",
              pointerEvents: canScrollRight ? "auto" : "none",
              "&:hover": {
                backgroundColor: canScrollRight ? "#e0e0e0" : "#E5E5E5",
              },
            }}
          >
            <NavigateNextRoundedIcon
              sx={{
                fontSize: 40,
                color: canScrollRight ? "black" : "#aaa",
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Shop by Icons Carousel */}
      <Box
        ref={scrollRef}
        sx={{
          mt: 4,
          display: "flex",
          gap: 2,
          overflowX: "auto",
          scrollBehavior: "smooth",
          px: 7,
          py: 2,
          "&::-webkit-scrollbar": {
            height: 6,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#999",
            borderRadius: 3,
          },
        }}
      >
        {carouselImages.map((img, i) => (
          <Box
            key={i}
            component="img"
            src={img}
            sx={{
              width: 450,
              height: 450,
              objectFit: "cover",
            }}
          />
        ))}
      </Box>

      <ShopBySport />
      <Footer />
    </>
  );
};

export default Dashboard;
