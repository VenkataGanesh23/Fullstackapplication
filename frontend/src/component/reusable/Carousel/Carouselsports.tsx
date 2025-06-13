import { Box, Typography, Button } from "@mui/material";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { useRef, useState, useEffect } from "react";
import img9 from "../../../assets/sports/nike-sports.avif";
import img10 from "../../../assets/sports/nike-sports1.avif";
import img11 from "../../../assets/sports/nike-sports2.avif";
import img12 from "../../../assets/sports/nike-sports.avif";
import img13 from "../../../assets/sports/nike-sports4.avif";

const sports = [
  { title: "Skateboarding", img: img9 },
  { title: "Tennis", img: img10 },
  { title: "Yoga", img: img11 },
  { title: "Basketball", img: img12 },
  { title: "Running", img: img13 },
];

const ShopBySport = () => {
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
          Shop By Sport
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Left Arrow */}
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

          {/* Right Arrow */}
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
        {sports.map((item, i) => (
          <Box
            key={i}
            sx={{
              flex: "0 0 auto",
              width: 400,
              height: 300,
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              //   border: selectedIndex === i ? "3px solid #1976d2" : "3px solid transparent",
              transition: "border 0.3s",
            }}
          >
            <Box
              component="img"
              src={item.img}
              alt={item.title}
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
                bottom: 16,
                left: 16,
                backgroundColor: "white",
                color: "black",
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: 5,
                px: 2,
                py: 0.5,
                boxShadow: 1,
                // border: selectedIndex === i ? "2px solid #1976d2" : "2px solid transparent",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              {item.title}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ShopBySport;
