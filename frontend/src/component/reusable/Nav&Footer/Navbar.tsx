import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import GlobalStyles from "@mui/material/GlobalStyles";
import logo from "../../../assets/nikelogo.webp";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SearchIcon from "@mui/icons-material/Search";
import jordanlogo from "../../../assets/jordanlogo.webp";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Dropdownnav from "./Dropdownnav";
import {
  newAndFeaturedSections,
  MenSection,
  womenSections,
  kidsSections,
  saleSections,
} from "../../reusable/Nav&Footer/Dropdowndatanav";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const texts = [
  {
    title: "New Styles On Sale: Up To 40% Off",
    subtitle: "",
    link: "/Shoes",
  },
  {
    title: "Move, Shop, Customise & Celebrate With Us",
    subtitle:
      "No matter what you feel like doing today, it’s better as a Member.",
    link: "",
  },
];

export default function Navbar() {
  const [index, setIndex] = useState(0);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLogoClick = () => {
    navigate("/Dashboard");
  };

  return (
    <>
      <GlobalStyles
        styles={{
          "@keyframes slideInOut": {
            "0%": {
              transform: "translateX(-100%)",
              opacity: 0,
            },
            "20%": {
              transform: "translateX(0%)",
              opacity: 1,
            },
            "80%": {
              transform: "translateX(0%)",
              opacity: 1,
            },
            "100%": {
              transform: "translateX(100%)",
              opacity: 0,
            },
          },
          ".slide-text": {
            animation: "slideInOut 6s ease-in-out forwards",
            position: "absolute",
            width: "100%",
            textAlign: "center",
            top: 20,
            left: 0,
          },
        }}
      />

      <Box sx={{ flexGrow: 1 }}>
        {/* Top Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 4,
            py: 0.5,
            backgroundColor: "white",
          }}
        >
          <img
            src={jordanlogo}
            alt="Jordan Logo"
            className="jordan-logo-nav"
            onClick={() => navigate("/Jordan")}
          />
          <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
            <p className="nav-text-main">Find a Store</p>
            <div className="vertical-line"></div>
            <p className="nav-text-main">Help</p>
            <div className="vertical-line"></div>
            <p className="nav-text-main">Join Us</p>
            <div className="vertical-line"></div>
            <p className="nav-text-signout" onClick={handleLogout}>
              Sign Out
            </p>
          </Box>
        </Box>

        {/* App Bar */}
        {!showSearchOverlay && (
          <AppBar
            position="static"
            sx={{
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              backgroundColor: "#fff",
            }}
          >
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                <img
                  src={logo}
                  alt="Logo"
                  className="nike-logo-nav"
                  onClick={handleLogoClick}
                />
              </Typography>
              <div className="nav-name" >
                <Typography
                  className="nav-text"
                  onMouseEnter={() => setActiveDropdown("new")}
                >
                  New & Featured
                </Typography>
                <Typography
                  className="nav-text"
                  onMouseEnter={() => setActiveDropdown("men")}
                >
                  Men
                </Typography>
                <Typography
                  className="nav-text"
                  onMouseEnter={() => setActiveDropdown("women")}
                >
                  Women
                </Typography>
                <Typography
                  className="nav-text"
                  onMouseEnter={() => setActiveDropdown("kids")}
                >
                  Kids
                </Typography>
                <Typography
                  className="nav-text"
                  onMouseEnter={() => setActiveDropdown("sale")}
                >
                  Sale
                </Typography>
                <Typography className="nav-text"
                  onMouseLeave={() => setActiveDropdown(null)}>SNKRS</Typography>
              </div>
              <Search className="nav-search-icon">
                <SearchIconWrapper className="nav-search-icon">
                  <SearchIcon className="nav-search-icons" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={searchText}
                  onFocus={() => setShowSearchOverlay(true)}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </Search>
              <FavoriteBorderRoundedIcon className="nav-icon" />
              <WorkOutlineIcon className="nav-icon" />
            </Toolbar>
          </AppBar>
        )}
        <Dropdownnav
          visible={activeDropdown === "new"}
          onMouseLeave={() => setActiveDropdown(null)}
          sections={newAndFeaturedSections}
        />
        <Dropdownnav
          visible={activeDropdown === "men"}
          onMouseLeave={() => setActiveDropdown(null)}
          sections={MenSection}
        />
        <Dropdownnav
          visible={activeDropdown === "women"}
          onMouseLeave={() => setActiveDropdown(null)}
          sections={womenSections}
        />
        <Dropdownnav
          visible={activeDropdown === "kids"}
          onMouseLeave={() => setActiveDropdown(null)}
          sections={kidsSections}
        />
        <Dropdownnav
          visible={activeDropdown === "sale"}
          onMouseLeave={() => setActiveDropdown(null)}
          sections={saleSections}
        />

        {/* Search Overlay */}
        {showSearchOverlay && (
          <Box
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              height: "50vh",
              bgcolor: "rgba(255, 255, 255)",
              top: "0px",
              zIndex: 1301,
              px: 4,
              py: 3,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Input Row */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 3,
              }}
            >
              <img
                src={logo}
                alt="Nike"
                className="nav-expand-logo"
                style={{ height: 24, cursor: "pointer" }}
              />
              <InputBase
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "30px",
                  px: 3,
                  py: 1,
                  flexGrow: 0.7,
                  display: "flex",
                  justifyContent: "space-between",
                  bgcolor: "#eee",
                }}
              />
              <Typography
                onClick={() => setShowSearchOverlay(false)}
                sx={{
                  fontSize: 16,
                  cursor: "pointer",
                  fontWeight: "bold",
                  px: 2,
                  py: 1,
                  borderRadius: "8px",
                  whiteSpace: "nowrap",
                  "&:hover": { bgcolor: "white", opacity: "0.5" },
                }}
              >
                Cancel
              </Typography>
            </Box>

            {/* Popular Search Terms */}
            <Typography
              variant="subtitle2"
              sx={{
                mb: 2,
                ml: 11,
                textAlign: "center",
                color: "grey",
                fontWeight: "bold",
                marginRight: "800px",
              }}
            >
              Popular Search Terms
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(7, auto)",
                justifyContent: "center",
                gap: 1,
                mb: 3,
              }}
            >
              {[
                "neutrals",
                "jordan cmft era",
                "air jordan 1",
                "shoes",
                "air force 1",
                "jordan",
                "running shoes",
                "sneakers men",
                "trainers",
                "high tops",
              ].map((term) => (
                <Box
                  key={term}
                  sx={{
                    bgcolor: "#f5f5f5",
                    fontWeight: "bold",
                    px: 2,
                    py: 1,
                    borderRadius: "30px",
                    fontSize: "14px",
                    cursor: "pointer",
                    textAlign: "center",
                    "&:hover": {
                      backgroundColor: "#eee",
                    },
                  }}
                  onClick={() => {
                    setSearchText(term);
                    setRecentSearches((prev) => [...new Set([term, ...prev])]);
                    setShowSearchOverlay(false);
                  }}
                >
                  {term}
                </Box>
              ))}
            </Box>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Recent Searches
                </Typography>
                {recentSearches.map((search, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 0.5,
                    }}
                  >
                    <Typography>{search}</Typography>
                    <Typography
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        setRecentSearches((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                    >
                      ✕
                    </Typography>
                  </Box>
                ))}
              </>
            )}
          </Box>
        )}

        {/* Bottom Banner */}
        <Box
          sx={{
            position: "relative",
            padding: "10px",
            height: 70,
            overflow: "hidden",
            backgroundColor: "#f5f5f5",
          }}
        >
          {texts.map((text, i) => (
            <Box
              key={i}
              className={index === i ? "slide-text" : ""}
              sx={{
                opacity: index === i ? 1 : 0,
              }}
            >
              <Typography variant="h5" sx={{ fontSize: 16 }}>
                {text.title}
              </Typography>
              {text.subtitle && (
                <Typography variant="subtitle1" sx={{ fontSize: 14 }}>
                  {text.subtitle}
                </Typography>
              )}
              {text.link && (
                <Typography
                  onClick={() => navigate(text.link)}
                  sx={{
                    cursor: "pointer",
                    fontSize: 12,
                    color: "black",
                    textDecoration: "underline",
                    mt: 1,
                    fontWeight: "bold",
                  }}
                >
                  Shop All Our New Markdowns
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
