<<<<<<< HEAD
import UserHeader from "./userHeader"
import DashboardContainer from "./DashboardContainer"
import { useEffect } from "react";
export default function  UserView(){
    
    return(
        <>
        <UserHeader/>
        <DashboardContainer/>
=======
import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
   
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { get_posts } from '../../Store/postReducer';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../Header';


export default function Dashboard() {
    const auth = useSelector((state) => state.authentication || {});
    const dispatch = useDispatch();
    console.log(auth, "auth in dashboard");
    

    const user = auth.user || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null);
    const token = auth.token || localStorage.getItem('token');
    console.log(token, "token in dashboard");
    console.log(user, "user in dashboard");
    const isLoggedIn = Boolean(user || token);
    console.log(isLoggedIn, "isLoggedIn in dashboard");

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        // redirect to login
        navigate('/login');
    };
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [chatOpen, setChatOpen] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [selectedShipment, setSelectedShipment] = useState(null);
    useEffect(() => {
        // Fetch user profile if logged in and user data is not present
        if (isLoggedIn && !user) {
        }
        console.log("Dispatching get_posts");
        dispatch(get_posts());
    }, [isLoggedIn, user, dispatch]);


   
    return (
        <>
        <Header/>
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>

            <Container maxWidth="lg" sx={{ py: 6 }}>
                {/* Welcome Section */}
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                        <Typography variant="h4" gutterBottom>
                            Welcome back, {user?.name || 'User'}!
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {user?.companyName || 'Your Company'}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            variant="outlined"
                            startIcon={<PersonIcon />}
                            onClick={() => navigate('/profile-settings')}
                        >
                            Profile
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<LogoutIcon />}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Box>
                </Box>

                {/* Quick Actions */}
                <Grid container spacing={3} sx={{ mb: 6 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card
                            sx={{
                                bgcolor: 'primary.main',
                                color: 'white',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                '&:hover': { transform: 'translateY(-4px)' },
                            }}
                            onClick={() => navigate('/create-post')}
                        >
                            <CardContent sx={{ textAlign: 'center', py: 4 }}>
                                <AddIcon sx={{ fontSize: 48, mb: 2 }} />
                                <Typography variant="h6">Create New Post</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card
                            sx={{
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                '&:hover': { transform: 'translateY(-4px)' },
                            }}
                            onClick={() => navigate('/alllistings')}
                        >
                            <CardContent sx={{ textAlign: 'center', py: 4 }}>
                                <LocalShippingIcon sx={{ fontSize: 48, mb: 2, color: 'primary.main' }} />
                                <Typography variant="h6">View All Listings</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card
                            sx={{
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                '&:hover': { transform: 'translateY(-4px)' },
                            }}
                            onClick={() => navigate('/profile-settings')}
                        >
                            <CardContent sx={{ textAlign: 'center', py: 4 }}>
                                <PersonIcon sx={{ fontSize: 48, mb: 2, color: 'primary.main' }} />
                                <Typography variant="h6">Profile Settings</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>


        </Box>
>>>>>>> 5d7d1ce55805ed7c8197b7fc47cc52104cc9dba2
        </>
    );
}