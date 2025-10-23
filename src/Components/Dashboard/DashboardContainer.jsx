import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import { background,Dashboardbackground ,primaryColor} from '../../Constants/Colors';


export default function DashboardContainer() {
  // 🧩 Styled card component
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: background,
    padding: theme.spacing(4),
    textAlign: 'center',
    color: '#1A2027',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '16px',
    boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 10px 18px rgba(0,0,0,0.15)',
    },
  }));

  // 🔹 Sample dynamic data
  const cards = [
    {
      icon: <ViewInArIcon sx={{ fontSize: 50, mb: 1,color:primaryColor}} />,
      name: 'View Listings',
      link: '/allListings',
      helper: 'No active listing ATM',
    },
    {
      icon: <DashboardIcon sx={{ fontSize: 50, mb: 1,color:primaryColor }} />,
      name: 'Add Listings',
      link: '/addposts',
      helper: 'Add Listings From Here',
    },
    {
      icon: <SettingsIcon sx={{ fontSize: 50, mb: 1,color:primaryColor }} />,
      name: 'Settings',
      link: '/settings',
      helper: 'Manage your account',
    },
  ];

  return (
    <React.Fragment sx={{backgroundColor:Dashboardbackground}}>
        
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin:'50px',
          px: 4,
        }}
      >
        <Grid container spacing={4} justifyContent="center" maxWidth="lg">
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Link
                to={card.link}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Item>
                  {card.icon}
                  <Typography variant="h6" gutterBottom>
                    {card.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.helper}
                  </Typography>
                </Item>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </React.Fragment>
  );
}
