import React, { useRef, useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

export type CarouselItem = {
  title?: string;
  subtitle?: string;
  subtitle2?: string;
  subtitle3?: string;
  button?: string;
  className?:string;
  image: string;
};

type CarouselProps = {
  title?: string;
  subtitle?: string;
  subtitle2?: string;
  subtitle3?: string;
  button?: string;
  className?:string;
  items?: CarouselItem[];
  itemWidth?: number;
  itemHeight?: number;
};

const Carousel: React.FC<CarouselProps> = ({
  title = "",
  subtitle = "",
  subtitle2 = "",
  subtitle3 = "",
  className="",
  items = [],
  itemWidth = 400,
  itemHeight = 300,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeButton, setActiveButton] = useState<"left" | "right" | null>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      setActiveButton(direction);

      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const updateScroll = () => {
    const el = scrollRef.current;
    if (el) {
      const left = el.scrollLeft > 0;
      const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;

      setCanScrollLeft(left);
      setCanScrollRight(right);

      if (!left && activeButton === "left") setActiveButton(null);
      if (!right && activeButton === "right") setActiveButton(null);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    el?.addEventListener("scroll", updateScroll);
    updateScroll();

    return () => el?.removeEventListener("scroll", updateScroll);
  }, [activeButton]);

  return (
    <Box sx={{ mt: 7, position: "relative" }}>
      {title && (
        <Box
          className={className}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 7,
          }}
        >
          <Typography className="carousel-title" sx={{ fontWeight: "bold", fontSize: 24 }}>{title}</Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box
              onClick={() => canScrollLeft && handleScroll("left")}
              sx={{
                backgroundColor: canScrollLeft ? "#f5f5f5" : "#e0e0e0",
                borderRadius: "50%",
                p: 1,
                cursor: canScrollLeft ? "pointer" : "not-allowed",
                outline: activeButton === "left" ? "2px solid blue" : "none",
                transition: "outline 0.2s ease",
              }}
            >
              <NavigateBeforeRoundedIcon sx={{ fontSize: 30 }} />
            </Box>
            <Box
              onClick={() => canScrollRight && handleScroll("right")}
              sx={{
                backgroundColor: canScrollRight ? "#f5f5f5" : "#e0e0e0",
                borderRadius: "50%",
                p: 1,
                cursor: canScrollRight ? "pointer" : "not-allowed",
                outline: activeButton === "right" ? "2px solid blue" : "none",
                transition: "outline 0.2s ease",
              }}
            >
              <NavigateNextRoundedIcon sx={{ fontSize: 30 }} />
            </Box>
          </Box>
        </Box>
      )}

      <Box
        ref={scrollRef}
        sx={{
          px: 5,
          py: 2,
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            height: 6,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "transparent",
            borderRadius: 3,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          "&:hover::-webkit-scrollbar-thumb": {
            backgroundColor: "#999",
          },
          "&:hover::-webkit-scrollbar": {
            backgroundColor: "#f0f0f0",
          },
          scrollbarWidth: "none",
          "&:hover": {
            scrollbarWidth: "auto",
            scrollbarColor: "#999 transparent",
          },
        }}
      >
        {Array.isArray(items) &&
          items.map((item, index) => (
            <Box
              key={index}
              sx={{
                flex: "0 0 auto",
                width: itemWidth,
                height: itemHeight + 60,
                position: "relative",
                overflow: "visible",
              }}
            >
              <Box
                sx={{
                  width: itemWidth,
                  height: itemHeight,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Box
                className="carousel-images"
                  component="img"
                  src={item.image}
                  alt={item.title || `Image ${index + 1}`}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
                {item.button && (
                  <Button
                    variant="contained"
                    sx={{
                      position: "absolute",
                      bottom: 50,
                      left: 60,
                      backgroundColor: "white",
                      color: "black",
                      fontWeight: "bold",
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
                    {item.button}
                  </Button>
                )}
              </Box>

              {item.subtitle && (
                <Typography
                  sx={{
                    mt: 1,
                    fontWeight: 600,
                    fontSize: "1rem",
                    lineHeight: 1.5,
                    fontFamily:
                      "'Helvetica Now Text Medium', Helvetica, Arial, sans-serif",
                    color: "#111111",
                  }}
                >
                  {item.subtitle}
                </Typography>
              )}
              {item.subtitle2 && (
                <Typography
                  sx={{
                    mt: 1,
                    fontWeight: 600,
                    fontSize: "1rem",
                    opacity: "0.6",
                    lineHeight: 1.5,
                    fontFamily:
                      "'Helvetica Now Text Medium', Helvetica, Arial, sans-serif",
                    color: "#111111",
                  }}
                >
                  {item.subtitle2}
                </Typography>
              )}
              {item.subtitle3 && (
                <Typography
                  sx={{
                    mt: 1,
                    fontWeight: 600,
                    fontSize: "1rem",
                    lineHeight: 1.5,
                    fontFamily:
                      "'Helvetica Now Text Medium', Helvetica, Arial, sans-serif",
                    color: "#111111",
                  }}
                >
                  {item.subtitle3}
                </Typography>
              )}
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default Carousel;