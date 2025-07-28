import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import Drawer from "./Drawer";
import ProductGrid from "./ProductGrid";
import Navbar from "../Nav&Footer/Navbar";
import Footer from "../Nav&Footer/Footer";
import { theme } from "antd";
import "../../css/DrawerPage.css";
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Button, Menu, MenuItem, Typography, Box, Breadcrumbs, Link } from "@mui/material";
import { categories, Category } from "./types";

const { Sider, Content } = Layout;

interface ProductGridProps {
  hideFilters: boolean;
  sortOption: string;
}

const DrawerPage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { categoryPath } = useParams();
  const navigate = useNavigate();
  
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [hideFilters, setHideFilters] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  
  const open = Boolean(anchorEl);

  useEffect(() => {
    // Find the current category based on URL
    const foundCategory = categories.find(cat => cat.path === categoryPath);
    
    if (foundCategory) {
      setCurrentCategory(foundCategory);
      
      // Build breadcrumbs
      const crumbs: Category[] = [];
      let parentId = foundCategory.parent;
      
      if (parentId) {
        const parent = categories.find(cat => cat.id === parentId);
        if (parent) crumbs.unshift(parent);
      }
      
      crumbs.push(foundCategory);
      setBreadcrumbs(crumbs);
      
      // Find subcategories
      const subs = categories.filter(cat => cat.parent === foundCategory.id);
      setSubcategories(subs);
    }
  }, [categoryPath]);

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

  const navigateToCategory = (path: string) => {
    navigate(`/category/${path}`);
  };

  if (!currentCategory) {
    return <div>Loading...</div>;
  }

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
        <div>
          {/* Breadcrumbs */}
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
            {breadcrumbs.map((crumb, index) => (
              <Link
                key={crumb.id}
                color={index === breadcrumbs.length - 1 ? "text.primary" : "inherit"}
                href={`/category/${crumb.path}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToCategory(crumb.path);
                }}
                sx={{
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                  fontWeight: index === breadcrumbs.length - 1 ? 600 : 400
                }}
              >
                {crumb.name}
              </Link>
            ))}
          </Breadcrumbs>
          
          <Typography variant="h6" style={{ fontWeight: 600 }}>
            {currentCategory.name} ({currentCategory.count})
          </Typography>
          
          {/* Subcategories */}
          {subcategories.length > 0 && (
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              {subcategories.map(sub => (
                <Typography 
                  key={sub.id}
                  variant="body2"
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                  onClick={() => navigateToCategory(sub.path)}
                >
                  {sub.name}
                </Typography>
              ))}
            </Box>
          )}
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Filter Toggle Button */}
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
          </Button>

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
              opacity: sortOption ? 1 : 0.6,
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
              width: 200,
              background: colorBgContainer,
              height: "calc(100vh - 64px)",
              overflowY: "auto",
              position: "sticky",
              top: 64,
              borderRight: "1px solid #f0f0f0",
              padding: "16px 0",
              marginLeft:"60px",
              fontWeight:"bold"
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
          <ProductGrid 
            hideFilters={hideFilters} 
            sortOption={sortOption || "featured"} 
            category={currentCategory}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DrawerPage;