import React from "react";
import { Box, Typography, Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          textAlign: "center",
          mt: 8,
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
          bgcolor: "background.paper",
        }}
      >
        {/* Main Heading */}
        <Typography variant="h4" gutterBottom>
          Hey, Welcome User 👋
        </Typography>

        {/* Buttons Section */}
        <Stack spacing={3} sx={{ mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            fullWidth
            onClick={() => navigate("/addposts")}
          >
            Create Post
          </Button>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            fullWidth
            onClick={() => navigate("/addposts")}
          >
            View Listings
          </Button>
          <Button
            variant="outlined"
            size="large"
            color="error"
            fullWidth
            onClick={() => navigate("/addposts")}
          >
            Logout
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
