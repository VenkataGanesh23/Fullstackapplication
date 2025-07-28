import { useEffect, useState, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import Footer from "../reusable/Nav&Footer/Footer";
import Navbar from "../reusable/Nav&Footer/Navbar";
import airjordan from "../../assets/airjordandark.png";
import { GET_ALL_CONTENT_BY_ID } from "../graphql/Query";

const Jordan = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isNavSticky, setIsNavSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show when at top of page
      if (currentScrollY === 0) {
        setScrolled(false);
        setIsNavSticky(false);
        return;
      }
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setScrolled(currentScrollY > 200);
        setIsNavSticky(currentScrollY > 300);
      } else {
        // Scrolling up - always show
        setScrolled(true);
        setIsNavSticky(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.boundingClientRect.top <= 0) {
          setIsNavSticky(true);
        }
      },
      { threshold: [0], rootMargin: '-1px 0px 0px 0px' }
    );

    if (navRef.current) {
      observer.observe(navRef.current);
    }

    return () => {
      if (navRef.current) {
        observer.unobserve(navRef.current);
      }
    };
  }, []);

  const { data } = useQuery(GET_ALL_CONTENT_BY_ID, {
    variables: { getContentByIdId: 10 },
  });

  const { data: data1 } = useQuery(GET_ALL_CONTENT_BY_ID, {
    variables: { getContentByIdId: 11 },
  });

  const navItems = [
    "New Releases",
    "Jordan Basketball",
    "Purpose & Community",
    "Men",
    "Women",
    "Kids"
  ];

  return (
    <>
      <Navbar />

      <Box
        component="main"
        sx={{
          backgroundColor: "#1f1f21",
          minHeight: "100vh",
          color: "#fff",
          pt: "64px", // Account for main navbar
        }}
      >
        {/* Main Jordan Logo */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 180,
            transition: "all 0.4s ease",
            opacity: scrolled ? 0 : 1,
            transform: scrolled ? "translateY(-20px)" : "translateY(0)",
            overflow: "hidden",
          }}
        >
          <img
            src={airjordan}
            alt="airjordan-logo"
            style={{ width: "250px", height: "150px" }}
          />
        </Box>

        {/* Content that converts to sticky navbar */}
        <Box
          ref={navRef}
          sx={{
            position: isNavSticky ? "fixed" : "relative",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1100,
            backgroundColor: isNavSticky ? "#1f1f21" : "transparent",
            borderBottom: isNavSticky ? "1px solid #333" : "none",
            py: isNavSticky ? 1 : 2,
            px: 2,
            display: "flex",
            alignItems: "center",
            gap: 3,
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Jordan logo - appears when sticky */}
          {isNavSticky && (
            <Box sx={{ width: "100px", mr: 2, transition: "all 0.3s ease" }}>
              <img
                src={airjordan}
                alt="airjordan-logo"
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
          )}

          {/* Navigation items - always visible when sticky */}
          <Box sx={{ 
            display: "flex", 
            gap: isNavSticky ? 2 : 3,
            flexWrap: isNavSticky ? "nowrap" : "wrap",
            justifyContent: "center",
            width: "100%",
            overflowX: isNavSticky ? "auto" : "visible",
            opacity: isNavSticky ? 1 : 1 // Always visible when sticky
          }}>
            {navItems.map((item) => (
              <Typography
                key={item}
                variant="body2"
                sx={{
                  color: "#fff",
                  fontWeight: isNavSticky ? 600 : 500,
                  cursor: "pointer",
                  "&:hover": { color: "#aaa" },
                  fontSize: isNavSticky ? "1rem" : "1rem",
                  whiteSpace: "nowrap",
                  transition: "all 0.3s ease",
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Spacer to prevent content jump */}
        {isNavSticky && <Box sx={{ height: "60px" }} />}


        {/* Page content */}
        {data?.getContentById?.images?.length > 0 && (
          <Box sx={{ px: { xs: 2, md: 0 }, mt: 4 }}>
            <img
              src={data.getContentById.images[0]}
              alt={data.getContentById.title}
              style={{ width: "100%", display: "block" }}
            />
          </Box>
        )}

        {data1?.getContentById?.images?.length > 0 && (
          <Box sx={{ px: { xs: 2, md: 0 }, mt: 2 }}>
            <img
              src={data1.getContentById.images[0]}
              alt={data1.getContentById.title}
              style={{ width: "100%", display: "block" }}
            />
          </Box>
        )}

        <Box sx={{ px: { xs: 2, md: 8 }, py: 4 }}>
          {/* Your content sections */}
        </Box>
      </Box>

      <Footer isJordanPage={location.pathname.includes("/Jordan")} />
    </>
  );
};

export default Jordan;