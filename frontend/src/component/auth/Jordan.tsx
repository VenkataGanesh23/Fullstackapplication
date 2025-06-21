import { useEffect, useState } from "react";
import Footer from "../reusable/Nav&Footer/Footer";
import Navbar from "../reusable/Nav&Footer/Navbar";
import airjordan from "../../assets/airjordanlogo.jpg";
import logo from "../../assets/mainimage.avif";
import jordan1 from "../../assets/submain/jordanimg.avif";
import jordan2 from "../../assets//submain/jordanimg2.avif";
import jordan3 from "../../assets/shoes/jordanairev.avif";
import jordan4 from "../../assets/shoes/airjordanmule.avif";
import jordan5 from "../../assets/shoes/jordancmft.avif";
import jordan6 from "../../assets/shoes/jordanluka4.avif";
import jordan7 from "../../assets/shoes/jordanluka77.avif";
import jordanbottom1 from "../../assets/shoes/jordanbottom.avif";
import jordanbottom2 from "../../assets/shoes/jordanbottom2.avif";
import { Box, Button, Grid, Typography } from "@mui/material";
import Carousel from "../reusable/Carousel/Carousel";
import Imagecard from "../reusable/Imagecard";

const SCROLL_THRESHOLD = 150;

const Jordan = () => {
  const categories = ["New Releases", "Jordan Sport", "Men", "Women", "Kids"];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const carouselItems = [
    { image: logo, subtitle: "just In" },
    { image: airjordan, subtitle: "Air Jordan 4 RM" },
    { image: logo, subtitle: "Air Jordan 4 RM" },
    { image: airjordan, subtitle: "Air Jordan 4 RM" },
    { image: airjordan, subtitle: "Air Jordan 4 RM" },
    { image: airjordan, subtitle: "Air Jordan 4 RM" },
  ];
  const carouselItems2 = [
    {
      image: jordan3,
      subtitle: "Jordan Air Rev",
      subtitle2: "Golf Shoes",
      subtitle3: "MRP:₹ 21 695.00",
    },
    {
      image: jordan4,
      subtitle: "Luka 4 PF 'Bloodline'",
      subtitle2: "Golf Shoes",
      subtitle3: "MRP:₹ 21 695.00",
    },
    {
      image: jordan5,
      subtitle: "just In",
      subtitle2: "Golf Shoes",
      subtitle3: "MRP:₹ 21 695.00",
    },
    {
      image: jordan6,
      subtitle: "just In",
      subtitle2: "Golf Shoes",
      subtitle3: "MRP:₹ 21 695.00",
    },
    {
      image: jordan7,
      subtitle: "just In",
      subtitle2: "Golf Shoes",
      subtitle3: "MRP:₹ 21 695.00",
    },
  ];
  const imageData = [
    {
      image: jordan1,
      title: "TRAIL AND AIR",
      subtitle: "Air Jordan 1 High OG 'Rare Air'",
      buttonText: "Shop",
    },
    {
      image: jordan2,
      title: "JORDAN SPORT",
      subtitle: "LUKA 4",
      buttonText: "Shop",
    },
  ];
  const imageData2 = [
    {
      image: jordanbottom1,
      title: "Find The Shoe That Hoops Like You",
      subtitle: "Jordan Basketball",
      buttonText: "Learn More",
    },
    {
      image: jordanbottom2,
      title: "",
      subtitle: "Explore Jordan Basketball",
      buttonText: "Explore",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Centered logo before scroll */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
          mb: 2,
          transition: "opacity 0.3s ease",
          opacity: scrolled ? 0 : 1,
          height: scrolled ? 0 : "auto",
          overflow: "hidden",
        }}
      >
        <img
          src={airjordan}
          alt="airjordan-logo"
          style={{ width: "80px", height: "80px" }}
        />
      </Box>

      {/* Sticky header with left logo + centered categories */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          bgcolor: "#fff",
          px: { xs: 2, md: 6 },
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.3s ease",
        }}
      >
        {/* Left-aligned logo (only visible when scrolled) */}
        <Box
          sx={{
            width: scrolled ? "40px" : "0px",
            height: scrolled ? "40px" : "0px",
            opacity: scrolled ? 1 : 0,
            transition: "all 0.4s ease",
            overflow: "hidden",
            mr: 2,
          }}
        >
          <img
            src={airjordan}
            alt="sticky-logo"
            style={{ width: "100%", height: "100%" }}
          />
        </Box>

        {/* Centered categories */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            gap: { xs: 2, md: 4 },
            flexWrap: "wrap",
            transition: "all 0.3s ease",
          }}
        >
          {categories.map((category) => (
            <Typography
              key={category}
              sx={{
                fontWeight: 600,
                fontSize: { xs: "14px", md: "16px" },
                cursor: "pointer",
                "&:hover": {
                  opacity: 0.5,
                },
              }}
            >
              {category}
            </Typography>
          ))}
        </Box>

        {/* Empty box to balance layout (so categories stay centered) */}
        <Box
          sx={{
            width: scrolled ? "40px" : "0px",
            height: scrolled ? "40px" : "0px",
            visibility: "hidden",
          }}
        />
      </Box>

      {/* Main image */}
      <Box sx={{ px: { xs: 2, md: 8 }, mt: 4 }}>
        <img
          src={logo}
          alt="main-banner"
          style={{ width: "100%", borderRadius: "8px" }}
        />
      </Box>
      <Box
        sx={{
          px: { xs: 2, md: 8 },
          mt: 4,
          display: "flex", // ✅ changed from "grid" to "flex" for better vertical stacking
          flexDirection: "column", // ✅ stack children vertically
          alignItems: "center", // ✅ center horizontally
          textAlign: "center", // ✅ center text
        }}
      >
        {/* Subtitle */}
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "1rem",
            lineHeight: 1.5,
            fontFamily:
              "'Helvetica Now Text Medium', Helvetica, Arial, sans-serif",
            mb: 1, // ✅ small space below
          }}
        >
          Women's Air Jordan Collection
        </Typography>

        {/* Title */}
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: "4.75rem",
            mb: 2,
            fontFamily:
              "'Nike Futura ND', 'Helvetica Now Text Medium', Helvetica, Arial, sans-serif",
          }}
        >
          SHOW 'EM UP
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "1.25rem",
            lineHeight: 1.5,
            fontFamily: "'Helvetica Now Text', Helvetica, Arial, sans-serif",
            wordBreak: "break-word",
            overflowWrap: "anywhere",
            maxWidth: "700px", // ✅ optional: prevent it from going too wide
            mb: 3, // ✅ space below paragraph
          }}
        >
          Crafted for your flyest self, the new Air Jordan Collection brings
          iconic prints and elevated cuts.
        </Typography>

        {/* Shop Button */}
        <Button
          sx={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "20px",
            px: 4, // ✅ padding for button
            py: 1,
            textTransform: "none", // ✅ keep button text in normal case
            fontWeight: 500,
            "&:hover": {
              opacity: 0.7,
            },
          }}
        >
          Shop
        </Button>
      </Box>
      <Carousel
        title="SHOP JORDAN ESSENTIALS"
        items={carouselItems}
        itemWidth={400}
        itemHeight={400}
      />

      <Box sx={{ px: { xs: 2 }, py: 6 }}>
        <Typography
          sx={{
            textTransform: "Uppercase",
            fontSize: "20px",
            fontWeight: "bold",
            margin: "30px 20px 0px 20px",
          }}
        >
          Heat Check
        </Typography>
        <Grid container justifyContent="center">
          {imageData.map((item, index) => (
            <Grid key={index}>
              <Imagecard
                image={item.image}
                title={item.title}
                subtitle={item.subtitle}
                buttonText={item.buttonText}
                onClick={() => console.log(`Clicked ${item.title}`)}
                width="700px"
                height={750}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Carousel
        title="POPULAR RIGHT NOW"
        items={carouselItems2}
        itemHeight={500}
        itemWidth={450}
      />
      <Box sx={{ px: { xs: 2 }, py: 6 }}>
        <Typography
          sx={{
            textTransform: "Uppercase",
            fontSize: "20px",
            fontWeight: "bold",
            margin: "30px 20px 0px 20px",
          }}
        >
          Heat Check
        </Typography>
        <Grid container justifyContent="center">
          {imageData2.map((item, index) => (
            <Grid key={index}>
              <Imagecard
                image={item.image}
                title={item.title}
                subtitle={item.subtitle}
                buttonText={item.buttonText}
                onClick={() => console.log(`Clicked ${item.title}`)}
                className={
                  index === 0 ? "jordan-style-one" : "jordan-style-two"
                }
                width="700px"
                height={750}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default Jordan;
