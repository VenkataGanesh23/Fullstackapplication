import { Box, Typography, Button } from "@mui/material";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { useRef, useState, useEffect } from "react";

type ShopBySportProps = {
  title: string;
  images: string[];
  descriptions: string[];
};

const ShopBySport = ({ title, images, descriptions }: ShopBySportProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeArrow, setActiveArrow] = useState<"left" | "right" | null>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    const updateScroll = () => {
      if (el) {
        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
      }
    };
    el?.addEventListener("scroll", updateScroll);
    updateScroll();
    return () => el?.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <Box sx={{ mt: 8, position: "relative" }}>
      {/* Header with Arrows */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 7,
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: 24, pl: 6 }}>
          {title}
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Box
            onClick={() => {
              if (canScrollLeft) {
                handleScroll("left");
                setActiveArrow("left");
              }
            }}
            sx={{
              backgroundColor: canScrollLeft ? "#f5f5f5" : "#e0e0e0",
              borderRadius: "50%",
              p: 1,
              cursor: canScrollLeft ? "pointer" : "not-allowed",
              pointerEvents: canScrollLeft ? "auto" : "none",
              border:
                activeArrow === "left"
                  ? "2px solid #1976d2"
                  : "2px solid transparent",
              transition: "border 0.3s",
            }}
          >
            <NavigateBeforeRoundedIcon
              sx={{ fontSize: 30, color: canScrollLeft ? "black" : "#aaa" }}
            />
          </Box>

          <Box
            onClick={() => {
              if (canScrollRight) {
                handleScroll("right");
                setActiveArrow("right");
              }
            }}
            sx={{
              backgroundColor: canScrollRight ? "#f5f5f5" : "#e0e0e0",
              borderRadius: "50%",
              p: 1,
              cursor: canScrollRight ? "pointer" : "not-allowed",
              pointerEvents: canScrollRight ? "auto" : "none",
              border:
                activeArrow === "right"
                  ? "2px solid #1976d2"
                  : "2px solid transparent",
              transition: "border 0.3s",
            }}
          >
            <NavigateNextRoundedIcon
              sx={{ fontSize: 30, color: canScrollRight ? "black" : "#aaa" }}
            />
          </Box>
        </Box>
      </Box>

      {/* Scrollable Sports Section */}
      <Box
        ref={scrollRef}
        sx={{
          mt: 3,
          pl: 13,
          pr: 3,
          py: 2,
          display: "flex",
          gap: 3,
          overflowX: "auto",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            height: 6,
            opacity: 0,
            transition: "opacity 0.3s",
          },
          "&:hover::-webkit-scrollbar": {
            opacity: 1,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#999",
            borderRadius: 3,
          },
        }}
      >
        {images.map((img, i) => (
          <Box
            key={i}
            sx={{
              flex: "0 0 auto",
              width: 450,
              height: 300,
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              transition: "border 0.3s",
            }}
          >
            <Box
              component="img"
              src={img}
              alt={descriptions[i]}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <Button
              variant="contained"
              onClick={() => setSelectedIndex(i)}
              sx={{
                position: "absolute",
                bottom: 50,
                left: 48,
                fontFamily: 'Open Sans, sans-serif',
                backgroundColor: "white",
                color: "black",
                fontWeight: "600",
                textTransform: "none",
                borderRadius: 5,
                px: 2,
                py: 0.5,
                boxShadow: 1,
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              {descriptions[i]}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ShopBySport;
