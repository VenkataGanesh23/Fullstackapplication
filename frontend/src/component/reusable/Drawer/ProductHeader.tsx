import { Typography, Box, Select, MenuItem, Button } from "@mui/material";
import React from "react";

interface ProductHeaderProps {
  title: string;
  count: number;
  sortOption: string;
  onSortChange: (value: string) => void;
  onHideFilters: () => void;
  hideFilters: boolean;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  title,
  count,
  sortOption,
  onSortChange,
  onHideFilters,
  hideFilters,
}) => {
  return (
    <>
      {/* Title with product count - always visible */}
      <Typography variant="h6" sx={{ 
        fontWeight: 600, 
        fontSize: "1.1rem",
        whiteSpace: "nowrap"
      }}>
        {title} ({count})
      </Typography>

      {/* Filter and sort controls */}
      <Box sx={{ 
  display: "flex", 
  alignItems: "center", 
  gap: 2,
  flexWrap: 'wrap', // Allows items to wrap on small screens
  justifyContent: { xs: 'flex-end', sm: 'flex-end' } // Right-align on all screens
}}>
  <Button
    onClick={onHideFilters}
    sx={{
      textTransform: "none",
      color: "black",
      fontWeight: 500,
      fontSize: "0.875rem",
      minWidth: "120px",
      whiteSpace: 'nowrap', // Prevent text wrapping
      padding: '6px 12px' // Tighter padding
    }}
  >
    {hideFilters ? "Show Filters" : "Hide Filters"}
  </Button>

  {/* Sort dropdown */}
  <Box sx={{ 
    display: "flex", 
    alignItems: "center", 
    gap: 1,
    minWidth: '150px' // Ensure minimum width
  }}>
    <Typography variant="body2" sx={{ 
      fontWeight: 500, 
      whiteSpace: "nowrap",
      display: { xs: 'none', sm: 'block' } // Hide "Sort By:" text on mobile
    }}>
      Sort By:
    </Typography>
    <Select
      value={sortOption}
      onChange={(e) => onSortChange(e.target.value as string)}
      size="small"
      variant="outlined"
      sx={{
        minWidth: 140,
        "& .MuiSelect-select": {
          padding: "6px 12px",
          fontSize: "0.875rem",
        },
      }}
    >
      <MenuItem value="featured">Featured</MenuItem>
      <MenuItem value="newest">Newest</MenuItem>
      <MenuItem value="priceHighLow">Price: High-Low</MenuItem>
      <MenuItem value="priceLowHigh">Price: Low-High</MenuItem>
    </Select>
  </Box>
</Box>
    </>
  );
};

export default ProductHeader;