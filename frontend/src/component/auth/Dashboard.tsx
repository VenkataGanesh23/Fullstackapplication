import { useNavigate } from "react-router-dom";
import Navbar from "../reusable/Nav&Footer/Navbar";
import Footer from "../reusable/Nav&Footer/Footer";
import { Box, Typography, Button } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_ALL_CONTENT } from "../graphql/Query";
import Carousel from "../reusable/Carousel/Carousel";
import ShopBySport from "../reusable/Carousel/Carouselsports";

const Dashboard = () => {
  const navigate = useNavigate();
  const { data } = useQuery(GET_ALL_CONTENT);
  const contents = data?.getAllContents || [];

  const heroContent = contents.find((c: any) => c.id === 4);
  const featuredContent = contents.find((c: any) => c.id === 1);
  const latestContent = contents.find((c: any) => c.id === 3);
  const latestContent2 = contents.find((c: any) => c.id === 8);
  const DontmissContent = contents.find((c: any) => c.id === 5);
  const Carousel1 = contents.find((c: any) => c.id === 7);
  const carousel3 = contents.find((c: any) => c.id === 9);

  const ShopByIcons =
    Carousel1?.images?.map((img: string, i: number) => ({
      image: img,
      subtitle: Carousel1?.descriptions?.[i] || "",
    })) || [];
  console.log("Carousel1", Carousel1);
  console.log("ShopByIcons", ShopByIcons);

  const handleShoes = () => navigate("/Shoes");

  return (
    <>
      <Navbar />

      {/* 🔷 Hero Section (ID 1) */}
      <Box sx={{ px: { xs: 2, md: 4 }, py: 4, textAlign: "center" }}>
        <Box
          component="img"
          src={heroContent?.images?.[0] || ""}
          alt="Hero"
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
            "&:hover": { backgroundColor: "#333" },
          }}
        >
          Shop Now
        </Button>
      </Box>
      <Typography sx={{ fontSize: 20, ml: 4, fontWeight: "bold" }}>
        The Latest
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Stack on mobile, side-by-side on desktop
          gap: 2,
          px: 4,
          py: 2,
        }}
      >
        {/* Section from ID 3 */}
        {latestContent?.images?.map((img: string, index: number) => (
          <Box
            key={`latest-3-${index}`}
            sx={{
              flex: 1,
              overflow: "hidden",
              aspectRatio: "3 / 2",
              position: "relative",
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: index === 1 ? "white" : "black",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              p: 4,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, mb: 1, color: "white", fontSize: 16 }}
            >
              {latestContent.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: 20,
                fontWeight: 500,
                mb: 2,
                color: "white",
                whiteSpace: "wrap",
              }}
            >
              {latestContent.descriptions}
            </Typography>
            <Button
              variant="contained"
              sx={{
                width: "fit-content",
                backgroundColor: index === 1 ? "white" : "white",
                color: index === 1 ? "black" : "black",
                borderRadius: 8,
                px: 3,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              {index === 0 ? "Mark Your Calendar" : "Shop"}
            </Button>
          </Box>
        ))}

        {/* Section from ID 8 */}
        {latestContent2?.images?.map((img: string, index: number) => (
          <Box
            key={`latest-8-${index}`}
            sx={{
              flex: 1,
              overflow: "hidden",
              aspectRatio: "3 / 2",
              position: "relative",
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: index === 1 ? "white" : "black",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              p: 4,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, mb: 1, color: "white", fontSize: 16 }}
            >
              {latestContent2.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{ fontSize: 20, fontWeight: 500, mb: 2, color: "white" }}
            >
              {latestContent2.descriptions}
            </Typography>
            <Button
              variant="contained"
              sx={{
                width: "fit-content",
                backgroundColor: index === 1 ? "black" : "white",
                color: index === 1 ? "white" : "black",
                borderRadius: 8,
                px: 3,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              {index === 0 ? "Shop" : "Shop"}
            </Button>
          </Box>
        ))}
      </Box>

      {/* 🔷 Featured Section (ID 2) */}
      <Typography sx={{ fontWeight: "bold", fontSize: 22, mt: 5, px: 7 }}>
        {featuredContent?.title || "Featured"}
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
        {featuredContent?.images?.map((img: string, i: number) => (
          <Box key={i} sx={{ minWidth: 450 }}>
            {/* Image */}
            <Box
              component="img"
              src={img}
              alt={`featured-${i}`}
              sx={{
                aspectRatio: "0.81481 / 1",
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
            />

            {/* Matching Description */}
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: "bold",
                mt: 5,
                mb: 5,
                color: "black",
              }}
            >
              {featuredContent?.descriptions?.[i] || ""}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          px: 4,
          py: 4,
        }}
      >
        {DontmissContent?.images?.map((img: string, i: number) => (
          <Box
            key={i}
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: "1.98 / 1",
              overflow: "hidden",
            }}
          >
            {/* Title Overlay (top-left) */}
            <Typography
              sx={{
                fontSize: 23,
                fontWeight: "bold",
                margin: "10px 0px 30px 10px",
              }}
            >
              {" "}
              {DontmissContent?.title}
            </Typography>
            {/* Background Image */}
            <Box
              component="img"
              src={img}
              alt={`dontmiss-${i}`}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                margin: " 0px 10px",
              }}
            />
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          textAlign: "center",
          px: 2,
          py: 4,
          maxWidth: 600,
          mx: "auto",
        }}
      >
        <Typography variant="body1" sx={{ fontSize: 17 }}>
          Men's Air Jordan Collection
        </Typography>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            fontSize: "4.75rem",
            textTransform: "uppercase",
            fontFamily:
              "'Nike Futura ND', 'Helvetica Now Text Medium', Helvetica, Arial, sans-serif",
          }}
        >
          Show 'Em Up
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: 17,
            mb: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            whiteSpace: "nowrap",
          }}
        >
          Crafted for your flyest self, the new Air Jordan Collection brings
          iconic prints and elevated cuts.
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            borderRadius: "40px",
            px: 2.5,
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              opacity: 0.6,
            },
          }}
        >
          Shop
        </Button>
      </Box>
      <Box sx={{ margin: "0px 40px 0px 40px" }}>
        <Carousel
          title={Carousel1?.title}
          items={ShopByIcons}
          itemWidth={455}
          itemHeight={450}
        />
      </Box>
      <ShopBySport
        title={carousel3?.title}
        images={carousel3?.images || []}
        descriptions={carousel3?.descriptions || []}
      />
      <Footer />
    </>
  );
};

export default Dashboard;
