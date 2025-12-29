import React from 'react';
import { Box, Container, Typography, Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: '#1F2B56', color: 'white', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Transport Platform
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Connecting shippers, carriers, and transporters in one easy place.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                component="button"
                onClick={() => navigate('/')}
                sx={{ color: 'white', opacity: 0.8, textAlign: 'left', textDecoration: 'none' }}
              >
                Home
              </Link>
              <Link
                component="button"
                onClick={() => navigate('/contact-support')}
                sx={{ color: 'white', opacity: 0.8, textAlign: 'left', textDecoration: 'none' }}
              >
                Contact & Support
              </Link>
              <Link
                component="button"
                onClick={() => navigate('/disclaimer')}
                sx={{ color: 'white', opacity: 0.8, textAlign: 'left', textDecoration: 'none' }}
              >
                Disclaimer
              </Link>
              <Link
                component="button"
                onClick={() => navigate('/registration-info')}
                sx={{ color: 'white', opacity: 0.8, textAlign: 'left', textDecoration: 'none' }}
              >
                Registration Info
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              This platform is a neutral marketplace. We are not responsible for any damages, disputes, or unauthorized transport activity.
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 4, pt: 4, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            © {new Date().getFullYear()} Transport Platform. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
