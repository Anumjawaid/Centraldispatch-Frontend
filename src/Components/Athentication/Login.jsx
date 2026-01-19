import React, { useState, useEffect } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    CircularProgress,
    Container,
    Grid,
    Alert,
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login_user } from '../../Store/authenticationReducer';
import { connectSocket, disconnectSocket, emitSocketEvent, socket } from '../../utils/socketClient';
import Logistics from "../../Components/Assets/Logistics.gif";


export default function LoginForm({ onLogin }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, status, message } = useSelector((state) => state.authentication || {});

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

        const handleSubmit = (e) => {
                e.preventDefault();
                setError(null);
                // Dispatch login and navigate on success
                dispatch(login_user(formData))
                    .then((res) => {
                        const payload = res.payload || {};
                        // Support API that returns accessToken and message
                        const accessToken = payload.accessToken || payload.token || payload.data?.token;
                        const successMessage = (payload.message || '').toLowerCase().includes('success');  
                        if (accessToken || successMessage) {
                            try {
                                if (payload.user) localStorage.setItem('user', JSON.stringify(payload.user));
                                if (accessToken) localStorage.setItem('token', accessToken);
                                else if (payload.token) localStorage.setItem('token', payload.token);
                                // connectSocket();
                            } catch (err) {
                                // ignore storage errors
                                console.log("LocalStorage error:", err);
                            }
                            navigate('/dashboard');
                        } else {
                            setError(payload.message || 'Unable to login. Please check credentials.');
                        }
                    })
                    .catch((err) => {
                        setError('Login failed. Please try again later.');
                        console.error(err);
                        // disconnectSocket();
                    });
        };

    return (
        <Box sx={{
            bgcolor: 'background.default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4
        }}>
                <Grid container spacing={0} sx={{ minHeight: '600px' }}>
                    {/* Left side - Content */}
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            bgcolor: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 4,
                            minHeight: '600px'
                        }}
                    >
                    <Box sx={{ textAlign: 'center', color: 'white' }}>
                        <Typography variant="h3" gutterBottom>
                            Welcome Back!
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                            Login to manage your shipments
                        </Typography>
                        <Box
                            sx={{
                                width: '100%',
                                maxWidth: 400,
                                height: 400,
                                bgcolor: 'rgba(255,255,255,0.1)',
                                borderRadius: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <img
                                src={Logistics}
                                alt="Shipping Animation"
                                style={{ maxWidth: '100%', maxHeight: '50%', borderRadius: 8 }}
                            />
                        </Box>
                    </Box>
                </Grid>

                {/* Right side - Login Form */}
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 4,
                        width:"700px",
                        minHeight: '600px'
                    }}
                >
                    <Paper 
                        elevation={3} 
                        sx={{ 
                            p: 6, 
                            width: '100%',
                            mx: 'auto' // Center horizontally
                        }}
                    >
                            <Typography variant="h4" gutterBottom align="center" color="primary">
                                Login
                            </Typography>
                            <Typography variant="body2" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
                                Access your account
                            </Typography>

                            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'stretch' }}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        variant="outlined"
                                    />
                                    
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        variant="outlined"
                                    />

                                    {/* Error Alert */}
                                    {error && (
                                        <Alert severity="error" sx={{ width: '100%' }}>
                                            {error}
                                        </Alert>
                                    )}

                                    {/* Submit Button - Clearly Separated */}
                                    <Box sx={{
                                        mt: 3,
                                        pt: 2,
                                        borderTop: '1px solid',
                                        borderColor: 'divider',
                                        textAlign: 'center',
                                        width: '100%'
                                    }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            fullWidth
                                            sx={{
                                                py: 2,
                                                fontWeight: "bold",
                                                fontSize: '1.2rem',
                                                borderRadius: 3,
                                                boxShadow: 3,
                                                '&:hover': {
                                                    boxShadow: 6,
                                                    transform: 'translateY(-2px)',
                                                    transition: 'all 0.3s ease'
                                                }
                                            }}
                                            disabled={loading}
                                        >
                                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                                        </Button>
                                    </Box>

                                    {/* Sign up link */}
                                    <Box sx={{ textAlign: 'center', mt: 2, width: '100%' }}>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            Don't have an account?{' '}
                                            <Button
                                                onClick={() => navigate('/register')}
                                                sx={{
                                                    textTransform: 'none',
                                                    fontWeight: 'bold',
                                                    textDecoration: 'underline'
                                                }}
                                            >
                                                Sign up here
                                            </Button>
                                        </Typography>
                                    </Box>
                                </Box>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
        </Box>
    );
}
