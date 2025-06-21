import { useNavigate } from "react-router-dom";
import Navbar from "../reusable/Nav&Footer/Navbar";
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
import secondmainimg from "../../assets/image.avif";
import Carousel from "../reusable/Carousel/Carousel";
import img9 from "../../assets/sports/nike-sports.avif";
import img10 from "../../assets/sports/nike-sports1.avif";
import img11 from "../../assets/sports/nike-sports2.avif";
import img12 from "../../assets/sports/nike-sports3.avif";
import img13 from "../../assets/sports/nike-sports4.avif";

const carouselItems = [
  { image: img1 },
  { image: img2 },
  { image: img4 },
  { image: img5 },
  { image: img2 },
];

const carouselItems2 = [
  { image: img9, button: "Skateboarding" },
  { image: img10, button: "Tennis" },
  { image: img11, button: "Yoga" },
  { image: img12, button: "Basketball" },
  { image: img13, button: "Running" },
];

const carouselImages2 = [
  { src: img6, label: "Trail ready in style" },
  { src: img7, label: "Game Time Must-Haves" },
  { src: img8, label: "Pretty in Pink" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleShoes = () => {
    navigate("/Shoes");
  };

  return (
    <>
      <Navbar />
      <Box sx={{ px: { xs: 2, md: 4 }, py: 4, textAlign: "center" }}>
        <Box
          component="img"
          src={mainimage}
          alt="Main"
          sx={{
            width: "100%",
            height: "500px",
            boxShadow: 3,
            objectFit: "cover",
          }}
        />
      </Box>

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
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#999",
            borderRadius: 3,
          },
        }}
      >
        {carouselImages2.map((item, i) => (
          <Box key={i} sx={{ minWidth: 450, position: "relative" }}>
            <Box
              sx={{
                position: "relative",
                width: 450,
                height: 450,
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={item.src}
                alt={item.label}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
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

      <Carousel
        title="SHOP BY ICONS"
        items={carouselItems}
        itemWidth={450}
        itemHeight={450}
        className="dashboard-carousel1"
      />
      <Carousel
        title="SHOP BY SPORT"
        items={carouselItems2}
        itemWidth={450}
        itemHeight={300}
        className="dashboard-carousel2"
        // showButtonsOnImages
      />
      <Footer />
    </>
  );
};

export default Dashboard;