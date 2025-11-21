import React from "react";
import { Box, Container, TextField, Button, Typography } from "@mui/material";
import { SECONDARY, background } from "../../Constants/Colors";

export default function ContactSupport() {
  return (
    <Box sx={{ width: '100vw', backgroundColor: background, py: 10 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 6,
            alignItems: "start",
          }}
        >
          {/* Left Content */}
          <Box>
            <Typography variant="h3" fontSize={35} fontWeight="bold" gutterBottom color={SECONDARY} sx={{ fontFamily: 'serif', letterSpacing: 1 }}>
              Contact & Support
            </Typography>

            <Typography variant="h6" fontSize={20} gutterBottom color={SECONDARY} sx={{ fontFamily: 'serif' }}>
              Questions? Need help?
            </Typography>

            <Typography variant="body1" fontSize={25} sx={{ mb: 3, color: SECONDARY, fontFamily: 'serif' }}>
              Email us or use the Contact form. We’re happy to guide you.
            </Typography>

            <Typography variant="body2"fontSize={25} sx={{ color: SECONDARY, fontFamily: 'serif' }}>
              This platform is a neutral marketplace. We are not responsible for any
              damages, disputes, or unauthorized transport activity.
            </Typography>
          </Box>

          {/* Right Contact Form */}
          <Box component="form" noValidate autoComplete="off" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField label="Name" fullWidth variant="outlined" InputLabelProps={{ style: { color: SECONDARY } }} />
            <TextField label="Email" fullWidth variant="outlined" InputLabelProps={{ style: { color: SECONDARY } }} />
            <TextField label="Phone" fullWidth variant="outlined" InputLabelProps={{ style: { color: SECONDARY } }} />
            <TextField label="Inquiry Message" fullWidth variant="outlined" multiline rows={4} InputLabelProps={{ style: { color: SECONDARY } }} />

            <Button variant="contained" size="large" sx={{ mt: 1, backgroundColor: SECONDARY, color: background, fontWeight: 'bold', fontFamily: 'serif' }}>
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
