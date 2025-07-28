import { Box } from "@mui/material";
import jordanLogoBlack from "../../../assets/airjordandark.png";
import jordanLogoWhite from "../../../assets/airjordanwhite.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Jordannav: React.FC = () => {
  const location = useLocation();
  const isJordanPage = location.pathname.includes("/Jordan");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 4,
        backgroundColor: isJordanPage ? "black" : "#f5f5f5",
        color: isJordanPage ? "#fff" : "#000",
        zIndex: 1301, // 👈 stays above the overlay
        position: "relative", // 👈 required for zIndex to work
      }}
    >
      <img
        src={isJordanPage ? jordanLogoBlack : jordanLogoWhite}
        alt="Jordan Logo"
        className="jordan-logo-nav"
        onClick={() => navigate("/Jordan")}
        style={{
          width: "60px",
          height: "30px",
          backgroundColor: isJordanPage ? "black" : "#f5f5f5",
        }}
      />
      <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
        <p className="nav-text-main">Find a Store</p>
        <div className="vertical-line" />
        <p className="nav-text-main">Help</p>
        <div className="vertical-line" />
        <p className="nav-text-main">Join Us</p>
        <div className="vertical-line" />
        <p className="nav-text-signout" onClick={handleLogout}>
          Sign Out
        </p>
      </Box>
    </Box>
  );
};

export default Jordannav;
