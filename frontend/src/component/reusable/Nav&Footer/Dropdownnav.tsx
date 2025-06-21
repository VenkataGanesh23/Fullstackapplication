import { Box, Typography } from "@mui/material";

interface DropdownMenuProps {
  visible: boolean;
  onMouseLeave?: () => void;
  sections: {
    heading: string;
    items: string[];
  }[];
}

const Dropdownnav = ({ visible, onMouseLeave, sections }: DropdownMenuProps) => {
  if (!visible) return null;

  return (
    <Box
      onMouseLeave={onMouseLeave}
      sx={{
        position: "absolute",
        top: 110,
        left: 0,
        right: 0,
        height: "50vh",
        backgroundColor: "#fff",
        zIndex: 1300,
        display: "flex",
        px: 8,
        py: 4,
        boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
      }}
    >
      {sections.map((section, idx) => (
        <Box key={idx} sx={{ flex: 0.2,display:"flex",flexDirection:"column",marginLeft:"100px" }}>
          <Typography fontWeight="bold" sx={{fontSize:"14px"}} mb={1}>
            {section.heading}
          </Typography>
          {section.items.map((item, subIdx) => (
            <Typography key={subIdx} sx={{ mb: 0.5, cursor: "pointer",opacity:0.6,fontSize:"12px",fontWeight:"bold" }}>
              {item}
            </Typography>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default Dropdownnav;
