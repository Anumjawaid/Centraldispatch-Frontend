import React from "react";
import { Box, Grid, Typography, Link, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import Logo from './Assets/Logo.png';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#202c58",
        color: "white",
        py: 6,
        px: 4,
        mt: 6
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {/* Left Column - Branding */}
        <Grid item xs={12} md={4}>
            <img src={Logo} width="200px" height='150px'/>
          
          <Typography variant="body2" sx={{ mt: 1 }}>
            Moving vehicles is better when you have the power to…
          </Typography>
        </Grid>

        {/* Middle Column - Quick Links */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#b79f04", mb: 1 }}
          >
            Quick Links
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Link href="/" underline="hover" color="inherit">
              Home
            </Link>
            <Link href="/about" underline="hover" color="inherit">
              About
            </Link>
            <Link href="/services" underline="hover" color="inherit">
              Services
            </Link>
            <Link href="/contact" underline="hover" color="inherit">
              Contact
            </Link>
          </Box>
        </Grid>

        {/* Right Column - Social */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#b79f04", mb: 1 }}
          >
            Follow Us
          </Typography>
          <Box>
            <IconButton href="#" sx={{ color: "white" }}>
              <FacebookIcon />
            </IconButton>
            <IconButton href="#" sx={{ color: "white" }}>
              <TwitterIcon />
            </IconButton>
            <IconButton href="#" sx={{ color: "white" }}>
              <LinkedInIcon />
            </IconButton>
            <IconButton href="#" sx={{ color: "white" }}>
              <InstagramIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Bottom Bar */}
      <Box sx={{ textAlign: "center", mt: 4, borderTop: "1px solid #444", pt: 2 }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} Central Dispatch. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
