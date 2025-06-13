import {
  Box,
  Typography,
  Collapse,
  Rating,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState } from "react";

interface CollapsibleSectionProps {
  title: string;
  content: string;
  showRating?: boolean;
  showTitleRating?: boolean;
  defaultTitleRating?: number;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  content,
  showRating = false,
  showTitleRating = false,
  defaultTitleRating = 0,
}) => {
  const [open, setOpen] = useState(title === "More Info");
  const [userRating, setUserRating] = useState<number | null>(0);

  return (
    <Box mt={3} sx={{ borderBottom: "1px solid #ccc", pb: 2 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        onClick={() => setOpen(!open)}
        sx={{ cursor: "pointer",width: "370px" }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6">{title}</Typography>

          {showTitleRating && (
            <Rating
              value={defaultTitleRating}
              precision={0.5}
              readOnly
              sx={{
                pointerEvents: "none", // disable interaction
                display:"flex",
                cursor:"none",
                marginLeft:30,
                "& .MuiRating-iconFilled": { color: "#ccc" }, // grey stars
                "& .MuiRating-iconHover": { color: "#ccc" },
              }}
            />
          )}
        </Box>

        <IconButton size="small">
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box mt={1}>
          <Typography
            variant="body2"
            sx={{ whiteSpace: "pre-line", color: "#333" }}
          >
            {content}
          </Typography>

          {showRating && (
            <Box mt={2}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Rate this product:
              </Typography>
              <Rating
                name="user-rating"
                value={userRating}
                onChange={(event, newValue) => setUserRating(newValue)}
              />
            </Box>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

export default CollapsibleSection;
