import React from "react";
import { Box, Typography, Button } from "@mui/material";

export default function HeroSection() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh", // full screen
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background YouTube Video */}
      <Box
        component="iframe"
        src="https://youtu.be/B77UadFPfDE?si=LheQRlHb_xn2x61c"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
          zIndex: 0,
        }}
      />

      {/* Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg,#202c58,#3e4c7c,#837d14)", // dark overlay
          zIndex: 1,
        }}
      />

      {/* Centered Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          color: "white",
          maxWidth: "800px",
          px: 3,
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
          Take Control
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          With the country’s largest self-managed auto transportation marketplace. <br />
          From dispatch to drop-off, Central Dispatch gives you the power of choice at every step of the transportation process. <br />
          So you can confidently find the ideal partner for any job, and run your business the way you need to.
        </Typography>

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
          <Button variant="contained" color="secondary" size="large"sx={{ backgroundColor: "#B79F04" }}>
            I'm a Shipper
          </Button>
          <Button variant="outlined" color="inherit" size="large">
            I'm a Carrier
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
