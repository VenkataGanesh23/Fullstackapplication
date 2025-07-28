import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type TextItem = {
  title: string;
  subtitle?: string;
  link?: string;
};

type ScrollProps = {
  texts: TextItem[];
  index: number;
  isJordanPage: boolean;
};

const Scroll = ({ texts, index, isJordanPage }: ScrollProps) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        padding: "10px",
        height: 70,
        overflow: "hidden",
        backgroundColor: isJordanPage ? "black" : "#f5f5f5",
        color: isJordanPage ? "#fff" : "#000",
        // Fixes for white line:
        marginTop: "-1px", // Pulls up to overlap any potential gap
        borderTop: isJordanPage ? "1px solid black" : "1px solid #f5f5f5",
        // Ensure no other borders exist
        borderBottom: "none",
        // Remove any box shadows
        boxShadow: "none",
        // Force the background to extend
        "&::before, &::after": {
          content: '""',
          display: "block",
          height: "1px",
          backgroundColor: isJordanPage ? "black" : "#f5f5f5",
          position: "absolute",
          left: 0,
          right: 0,
        }
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
              onClick={() => navigate(text.link!)}
              sx={{
                cursor: "pointer",
                fontSize: 12,
                color: isJordanPage ? "#fff" : "#000",
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
  );
};

export default Scroll;