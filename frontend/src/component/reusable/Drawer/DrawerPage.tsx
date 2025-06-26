import { useState } from "react";
import { Layout } from "antd";
import Drawer from "./Drawer";
import ProductGrid from "./ProductGrid";
import Navbar from "../Nav&Footer/Navbar";
import Footer from "../Nav&Footer/Footer";
import { theme } from "antd";
import "../../css/DrawerPage.css";
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Button, Menu, MenuItem, Typography, Box } from "@mui/material";

const { Sider, Content } = Layout;

interface ProductGridProps {
  hideFilters: boolean;
  sortOption: string; // Add this to your ProductGridProps interface
}

const DrawerPage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [sortOption, setSortOption] = useState<string | null>(null); // Starts as null
  const [hideFilters, setHideFilters] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const title = "Men's Shoes";
  const filteredProducts = Array(20).fill(0);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortSelect = (value: string) => {
    setSortOption(value);
    handleClose();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      
      {/* Sticky header with filter controls */}
      <div 
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: colorBgContainer,
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          boxSizing: "border-box",
          borderBottom: "1px solid #f0f0f0"
        }}
      >
        <Typography variant="h6" style={{ fontWeight: 600 }}>
          {title} ({filteredProducts.length})
        </Typography>
        
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Filter Toggle Button - Now first in order */}
          <Button
            startIcon={<TuneRoundedIcon />}
            onClick={() => setHideFilters(!hideFilters)}
            sx={{
              textTransform: "none",
              color: "#000",
              fontWeight: 500
            }}
          >
            {hideFilters ? "Show Filters" : "Hide Filters"}
          </Button >

          {/* Sort Dropdown */}
          <Button
            id="sort-button"
            aria-controls={open ? 'sort-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            endIcon={<KeyboardArrowDownRoundedIcon />}
            sx={{
              textTransform: 'none',
              color: '#000',
              fontWeight: 500,
              opacity: sortOption ? 1 : 0.6, // 0.6 opacity when no selection
              '& .MuiButton-endIcon': {
                marginLeft: '4px'
              }
            }}
          >
            {sortOption ? 
              `Sort By: ${sortOption.charAt(0).toUpperCase() + sortOption.slice(1).replace(/([A-Z])/g, ' $1')}` : 
              'Sort By'}
          </Button>
          
          <Menu
            id="sort-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'sort-button',
            }}
            PaperProps={{
              style: {
                width: '200px',
              },
            }}
          >
            <MenuItem 
              selected={sortOption === "featured"}
              onClick={() => handleSortSelect("featured")}
            >
              Featured
            </MenuItem>
            <MenuItem 
              selected={sortOption === "newest"}
              onClick={() => handleSortSelect("newest")}
            >
              Newest
            </MenuItem>
            <MenuItem 
              selected={sortOption === "priceHighLow"}
              onClick={() => handleSortSelect("priceHighLow")}
            >
              Price: High-Low
            </MenuItem>
            <MenuItem 
              selected={sortOption === "priceLowHigh"}
              onClick={() => handleSortSelect("priceLowHigh")}
            >
              Price: Low-High
            </MenuItem>
          </Menu>
        </div>
      </div>

      {/* Main content area */}
      <div style={{ display: "flex", flex: 1, position: "relative" }}>
        {/* Filters sidebar */}
        {!hideFilters && (
          <div 
            style={{
              width: 240,
              background: colorBgContainer,
              height: "calc(100vh - 64px)",
              overflowY: "auto",
              position: "sticky",
              top: 64,
              borderRight: "1px solid #f0f0f0",
              padding: "16px 0",
            }}
          >
            <Drawer />
          </div>
        )}

        {/* Product grid area */}
        <div 
          className={`product-grid-container ${hideFilters ? 'filters-hidden' : ''}`}
          style={{
            flex: 1,
            height: "calc(100vh - 64px)",
            overflowY: "auto",
            padding: "24px",
          }}
        >
          <ProductGrid hideFilters={hideFilters} sortOption={sortOption || "featured"} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DrawerPage;