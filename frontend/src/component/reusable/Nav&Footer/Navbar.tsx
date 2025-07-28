import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import GlobalStyles from "@mui/material/GlobalStyles";
import nikelogowhite from "../../../assets/nikelogowhite.png";
import nikelogoblack from "../../../assets/nikelogoblack.png";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Dropdownnav from "./Dropdownnav";
import {
  newAndFeaturedSections,
  MenSection,
  womenSections,
  kidsSections,
  saleSections,
} from "../../reusable/Nav&Footer/Dropdowndatanav";
import Scroll from "./Scroll";
import Jordannav from "./Jordannav";
import { InputAdornment, Badge } from "@mui/material";
import "../../css/Navbar.css"
import { useCart } from "../../../context/CartContext";

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
      "No matter what you feel like doing today, it's better as a Member.",
    link: "",
  },
];

type NavbarProps = {
  darkMode?: boolean;
};

export default function Navbar({ darkMode }: NavbarProps) {
  const [index, setIndex] = useState(0);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const overlayInputRef = useRef<HTMLInputElement | null>(null);
  const hiddenScrollPaths = ["/favorites", "/cart"];
  const shouldHideScroll = hiddenScrollPaths.includes(
    location.pathname.toLowerCase()
  );
  const isJordanPage = location.pathname.includes("/Jordan");

  const navigate = useNavigate();

  const { cartItems } = useCart();
const totalCartCount = cartItems.reduce((sum:any, item:any) => sum + item.quantity, 0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleLogoClick = () => {
    navigate("/Dashboard");
  };

useEffect(() => {
  const handleScroll = () => {
    if (activeDropdown || showSearchOverlay) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setShowSearchOverlay(false);
      setActiveDropdown(null);
    }
  };

  // Attach both listeners
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("keydown", handleKeyDown);

  // Clean up
  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [activeDropdown, showSearchOverlay]);

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
          ".nav-text": {
            color: isJordanPage ? "#fff" : "#000",
            "&:hover": {
              color: isJordanPage ? "#ccc" : "#555",
            },
          },
          ".nav-icon": {
            color: isJordanPage ? "#fff" : "#000",
          },
          ".nav-search-icons": {
            color: isJordanPage ? "#fff" : "#000",
          },
          ".nav-text-main": {
            color: isJordanPage ? "#fff" : "#000",
          },
          ".nav-text-signout": {
            color: isJordanPage ? "#fff" : "#000",
          },
          ".vertical-line": {
            backgroundColor: isJordanPage ? "#fff" : "#000",
          },
          ".dropdown-nav": {
            pointerEvents: "none", // Disable pointer events when hidden
          },
          ".dropdown-nav.visible": {
            pointerEvents: "auto", // Enable pointer events when visible
          },
        }}
      />

      <Box sx={{ flexGrow: 1 }}>
        {/* Dim Background Overlay */}
        {(activeDropdown || showSearchOverlay) && (
          <Box
            sx={{
              position: "fixed",
              top: 40,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.4)", // semi-transparent black
              zIndex: 1000,
              transition: "opacity 0.3s ease-in-out",
              pointerEvents: "none", // So it doesn’t block interaction
            }}
          />
        )}

        {<Jordannav />}
        {/* App Bar */}
        {showSearchOverlay ? (
          // Preserve height of AppBar when hidden
          <Box sx={{ height: "64px" }} />
        ) : (
          <AppBar
            position="sticky"
            elevation={0}
            sx={{
              top: 0,
              zIndex: 1400,
              backgroundColor: isJordanPage ? "#1f1f21" : "#fff",
              color: isJordanPage ? "#fff" : "#000",
            }}
          >
            <Toolbar
              sx={{
                backgroundColor: isJordanPage ? "#1f1f21" : "#fff",
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                  backgroundColor: isJordanPage ? "#1f1f21" : "#fff", // <<< Also add here
                }}
              >
                <img
                  src={isJordanPage ? nikelogowhite : nikelogoblack}
                  alt="Nike Logo"
                  className="nike-logo-nav"
                  onClick={handleLogoClick}
                  style={{
                    backgroundColor: isJordanPage ? "#1f1f21" : "#fff",
                    height: "40px",
                    cursor: "pointer",
                  }}
                />
              </Typography>

              <div
                className="nav-name"
                onMouseLeave={() => setActiveDropdown(null)}
              >
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
                <Typography
                  className="nav-text"
                  onMouseEnter={() => setActiveDropdown(null)}
                >
                  SNKRS
                </Typography>

                {/* 🔻 Now render the correct dropdown based on state */}
                <Dropdownnav
                  visible={activeDropdown === "new"}
                  sections={newAndFeaturedSections}
                  darkMode={isJordanPage}
                />
                <Dropdownnav
                  visible={activeDropdown === "men"}
                  sections={MenSection}
                  darkMode={isJordanPage}
                />
                <Dropdownnav
                  visible={activeDropdown === "women"}
                  sections={womenSections}
                  darkMode={isJordanPage}
                />
                <Dropdownnav
                  visible={activeDropdown === "kids"}
                  sections={kidsSections}
                  darkMode={isJordanPage}
                />
                <Dropdownnav
                  visible={activeDropdown === "sale"}
                  sections={saleSections}
                  darkMode={isJordanPage}
                />
              </div>

              <Search
                className="nav-search-icon"
                sx={{
                  backgroundColor: isJordanPage ? "black" : alpha("#000", 0.05),
                  "&:hover": {
                    backgroundColor: isJordanPage ? "grey" : alpha("#000", 0.1),
                  },
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon className="nav-search-icons" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={searchText}
                  onFocus={() => setShowSearchOverlay(true)}
                  onChange={(e) => setSearchText(e.target.value)}
                  sx={{
                    input: {
                      color: isJordanPage ? "#fff" : "#000",
                    },
                  }}
                />
              </Search>

              <FavoriteBorderRoundedIcon className="nav-icon" sx={{ ml: 2 }} onClick={()=>navigate("/Favorites")} />
              <Box
  component="a"
  href="/Cart"
  sx={{
    position: "relative",
    display: "flex",
    alignItems: "center",
    color: isJordanPage ? "#fff" : "#000",
    ml: 2,
    textDecoration: "none",
  }}
  aria-label={`Bag Items: ${totalCartCount}`}
  title={`Bag Items: ${totalCartCount}`}
>
  <WorkOutlineIcon fontSize="medium" className="nav-icon" />

  {totalCartCount > 0 && (
    <Typography
      sx={{
        position: "absolute",
        top: "6px",
        right: "4px",
        color: "black",
        borderRadius: "50%",
        width: 16,
        height: 16,
        fontSize: "11px",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {totalCartCount}
    </Typography>
  )}
</Box>



            </Toolbar>
          </AppBar>
        )}

        {/* Dropdowns */}
        <Dropdownnav
          visible={activeDropdown === "new"}
          onMouseLeave={() => setActiveDropdown(null)}
          sections={newAndFeaturedSections}
          darkMode={isJordanPage}
        />
        <Dropdownnav
          visible={activeDropdown === "men"}
          onMouseLeave={() => setActiveDropdown(null)}
          sections={MenSection}
          darkMode={isJordanPage}
        />
        <Dropdownnav
          visible={activeDropdown === "women"}
          onMouseLeave={() => setActiveDropdown(null)}
          sections={womenSections}
          darkMode={isJordanPage}
        />
        <Dropdownnav
          visible={activeDropdown === "kids"}
          onMouseLeave={() => setActiveDropdown(null)}
          sections={kidsSections}
          darkMode={isJordanPage}
        />
        <Dropdownnav
          visible={activeDropdown === "sale"}
          onMouseLeave={() => setActiveDropdown(null)}
          sections={saleSections}
          darkMode={isJordanPage}
        />

        {/* Search Overlay */}
        {showSearchOverlay && (
          <Box
          className="search-overlay"
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              height: "auto",
              bgcolor: isJordanPage ? "#1f1f21" : "#fff",
              color: isJordanPage ? "#fff" : "#000",
              top: "0px",
              zIndex: 1301,
              px: 2,
              pb: 12,
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
                src={nikelogoblack}
                alt="Nike"
                className="nav-expand-logo"
                style={{
                  height: 24,
                  cursor: "pointer",
                  filter: isJordanPage ? "invert(1)" : "none",
                }}
              />
              <InputBase
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                inputRef={overlayInputRef} 
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{ color: isJordanPage ? "#fff" : "#000" }}
                    />
                  </InputAdornment>
                }
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "30px",
                  px: 3,
                  py: 0.5,
                  flexGrow: 0.7,
                  display: "flex",
                  justifyContent: "space-between",
                  bgcolor: isJordanPage ? "#333" : "#eee",
                  color: isJordanPage ? "#fff" : "#000",
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
                  "&:hover": {
                    opacity: "0.6",
                  },
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
                color: isJordanPage ? "#ccc" : "grey",
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
                gap: 2,
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
                    bgcolor: isJordanPage ? "#333" : "#f5f5f5",
                    fontWeight: "bold",
                    px: 2.2,
                    py: 1.3,
                    borderRadius: "30px",
                    fontSize: "14px",
                    cursor: "pointer",
                    textAlign: "center",
                    "&:hover": {
                      backgroundColor: isJordanPage ? "#444" : "#eee",
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
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, ml: 38, color: isJordanPage ? "#ccc" : "grey" }}
                >
                  Recent Searches
                </Typography>
                {recentSearches.map((search, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      ml: 38,
                      mb: 1,
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 0.5,
                    }}
                  >
                    <Typography sx={{ fontSize: 21 }}>{search}</Typography>
                    <Typography
                      sx={{ cursor: "pointer", marginRight: "240px" }}
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
        {!shouldHideScroll && (
          <Scroll texts={texts} index={index} isJordanPage={isJordanPage} />
        )}
      </Box>
    </>
  );
}
