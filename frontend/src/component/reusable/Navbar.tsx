import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import logo from "../../assets/nikelogo.webp";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SearchIcon from "@mui/icons-material/Search";
import jordanlogo from "../../assets/jordanlogo.webp";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

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

export default function Navbar() {
  const { logout } = useAuth(); // ✅ Now correctly inside component
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const handellogo=()=>{
    navigate("/Dashboard")
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
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
        <img src={jordanlogo} alt="Jordan Logo" className="jordan-logo-nav" />
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
            <img src={logo} alt="Logo" className="nike-logo-nav" onClick={handellogo} />
          </Typography>
          <div  className="nav-name">
          <Typography className="nav-text">New & Featured</Typography>
          <Typography className="nav-text">Men</Typography>
          <Typography className="nav-text">Women</Typography>
          <Typography className="nav-text">Kids</Typography>
          <Typography className="nav-text">Sale</Typography>
          <Typography className="nav-text">SNKRS</Typography>
          </div>
          <Search className="nav-search-icon">
            <SearchIconWrapper className="nav-search-icon">
              <SearchIcon className="nav-search-icons" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <FavoriteBorderRoundedIcon className="nav-icon" />
          <WorkOutlineIcon className="nav-icon" />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
