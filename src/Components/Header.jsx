import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';


export default function Header({ isAuthenticated = false }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [listingMenuAnchor, setListingMenuAnchor] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleListingMenuOpen = (event) => {
    setListingMenuAnchor(event.currentTarget);
  };

  const handleListingMenuClose = () => {
    setListingMenuAnchor(null);
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Listing & Status', hasSubmenu: true },
    { label: 'Contact & Support', path: '/contact-support' },
    { label: 'Disclaimer', path: '/disclaimer' },
    { label: 'Registration Info', path: '/registration-info' },
  ];

  const authenticatedItems = [
    { label: 'Profile Settings', path: '/profile-settings' },
    { label: 'Billing', path: '/billing' },
    { label: 'Chat', path: '/chat' },
  ];

  const listingSubmenu = [
    { label: 'Create Listing', path: '/create-post' },
    { label: 'All Listings', path: '/listing-status?tab=listing' },
    { label: 'Assigned', path: '/listing-status?tab=assigned' },
    { label: 'Picked Up', path: '/listing-status?tab=pickedup' },
    { label: 'Delivered', path: '/listing-status?tab=delivered' },
    { label: 'Chat', path: '/chat' },
  ];

  const handleHomeNavigation = () => {  
    //check if user is authenticated
    const token = localStorage.getItem('token');
    const isAuthenticated = Boolean(token);
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  }
  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar>
        <LocalShippingIcon sx={{ mr: 1 }} />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: isMobile ? 1 : 0, mr: 4, cursor: 'pointer' }}
          onClick={handleHomeNavigation}
        >
          Transport Platform
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {menuItems.map((item) => (
                item.hasSubmenu ? (
                  listingSubmenu.map((subItem) => (
                    <MenuItem
                      key={subItem.path}
                      onClick={() => {
                        navigate(subItem.path);
                        handleMenuClose();
                      }}
                    >
                      {subItem.label}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      handleMenuClose();
                    }}
                  >
                    {item.label}
                  </MenuItem>
                )
              ))}
              {isAuthenticated && authenticatedItems.map((item) => (
                <MenuItem
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    handleMenuClose();
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
            <Button color="inherit" onClick={handleHomeNavigation}>
              Home
            </Button>
            <Button
              color="inherit"
              onClick={handleListingMenuOpen}
              aria-controls="listing-menu"
              aria-haspopup="true"
            >
              Listing & Status
            </Button>
            <Menu
              id="listing-menu"
              anchorEl={listingMenuAnchor}
              open={Boolean(listingMenuAnchor)}
              onClose={handleListingMenuClose}
            >
              {listingSubmenu.map((item) => (
                <MenuItem
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    handleListingMenuClose();
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
            <Button color="inherit" onClick={() => navigate('/contact-support')}>
              Contact & Support
            </Button>
            <Button color="inherit" onClick={() => navigate('/disclaimer')}>
              Disclaimer
            </Button>
            <Button color="inherit" onClick={() => navigate('/registration-info')}>
              Registration Info
            </Button>
            {isAuthenticated && (
              <>
                <Button color="inherit" onClick={() => navigate('/profile-settings')}>
                  Profile Settings
                </Button>
                <Button color="inherit" onClick={() => navigate('/billing')}>
                  Billing
                </Button>
              </>
            )}
          </Box>
        )}

        {!isAuthenticated && !isMobile && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button color="inherit" variant="outlined" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: '#f0f0f0' } }}
              onClick={() => navigate('/register')}
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
