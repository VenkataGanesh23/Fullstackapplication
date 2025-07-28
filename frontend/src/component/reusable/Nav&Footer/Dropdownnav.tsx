import { Box, Typography } from "@mui/material";
import "../../css/Dropdown.css"

interface DropdownMenuProps {
  visible: boolean;
  onMouseLeave?: () => void;
  onMouseEnter?: () => void;
  sections: {
    heading: string;
    items: string[];
  }[];
  darkMode?: boolean;
  fixedAndFullscreen?: boolean;
}


const Dropdownnav = ({
  visible,
  onMouseLeave,
  onMouseEnter,
  sections,
  darkMode = false,
}: DropdownMenuProps) => {
  return (
    <Box
      className={`dropdown-nav ${visible ? "visible" : ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: '64px', // Matches navbar height
        backgroundColor: darkMode ? "#1f1f21" : "#fff",
        color: darkMode ? "#fff" : "#000",
        px: 8,
        py: 4,
        display: visible ? 'flex' : 'none', // Better than visibility for layout
        justifyContent: "center",
        width: "100%",
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        zIndex: 1200,
        // Remove any default margins
        margin: 0,
        // Ensure no gap
        borderTop: '1px solid transparent'
      }}
    >
      <Box
        sx={{
          display: "flex",
          maxWidth: "1200px",
          justifyContent: "space-around",
          margin: "0 auto",
        }}
      >
        {sections.map((section, idx) => (
          <Box
            key={idx}
            sx={{
              flex: 1,
              minWidth: "130px",
              display: "flex",
              flexDirection: "column",
              marginLeft: idx === 0 ? 0 : "40px",
            }}
          >
            <Typography fontWeight="bold" sx={{ fontSize: "14px", mb: 1 }}>
              {section.heading}
            </Typography>
            {section.items.map((item, subIdx) => (
              <Typography
                key={subIdx}
                sx={{
                  mb: 0.5,
                  cursor: "pointer",
                  opacity: 0.6,
                  fontSize: "12px",
                  fontWeight: "bold",
                  transition: "opacity 0.2s",
                  "&:hover": { opacity: 1 },
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Dropdownnav;