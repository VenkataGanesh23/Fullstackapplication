import React from 'react';
import { Box, Typography, Link, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import "../../css/Footer.css"

type FooterProps = {
  isJordanPage?: boolean;
};

const Footer: React.FC<FooterProps> = ({ isJordanPage = false }) => {
  return (
    <Box className={`footer-container ${isJordanPage ? 'jordan-footer' : ''}`}>
      <Divider sx={{ mb: 4, borderColor: isJordanPage ? '#ffffff33' : '#000000', opacity: 0.2 }} />

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom className="footer-head">
            Resources
          </Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            <Link href="#" className="footer-subhead">Find A Store</Link>
            <Link href="#" className="footer-subhead">Become A Member</Link>
            <Link href="#" className="footer-subhead">Running Shoe Finder</Link>
            <Link href="#" className="footer-subhead">Product Advice</Link>
            <Link href="#" className="footer-subhead">Send Us Feedback</Link>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom className="footer-head">
            Help
          </Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            <Link href="#" className="footer-subhead">Get Help</Link>
            <Link href="#" className="footer-subhead">Order Status</Link>
            <Link href="#" className="footer-subhead">Delivery</Link>
            <Link href="#" className="footer-subhead">Returns</Link>
            <Link href="#" className="footer-subhead">Payment Options</Link>
            <Link href="#" className="footer-subhead">Contact Us On Nike.com Inquiries</Link>
            <Link href="#" className="footer-subhead">Contact Us On All Other Inquiries</Link>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom className="footer-head">
            Company
          </Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            <Link href="#" className="footer-subhead">About Nike</Link>
            <Link href="#" className="footer-subhead">News</Link>
            <Link href="#" className="footer-subhead">Careers</Link>
            <Link href="#" className="footer-subhead">Investors</Link>
            <Link href="#" className="footer-subhead">Sustainability</Link>
            <Link href="#" className="footer-subhead">Impact</Link>
            <Link href="#" className="footer-subhead">Report a Concern</Link>
          </Box>
        </Grid>
      </Grid>

      {/* Bottom bar: left and right */}
      <Box className="footer-bottom">
        <Typography variant="body2" className="footer-left">
          © 2025 Nike, Inc. All rights reserved
        </Typography>
        <Box className="footer-right">
          <Link href="#" className="footer-link">Guides</Link>
          <Link href="#" className="footer-link">Terms of Sale</Link>
          <Link href="#" className="footer-link">Terms of Use</Link>
          <Link href="#" className="footer-link">Nike Privacy Policy</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
