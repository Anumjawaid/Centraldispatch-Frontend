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
import shipperImg from "../../Components/Assets/fullshipper.jpg";


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
                const accessToken = payload.accessToken
                const successMessage = (payload.message || '').toLowerCase().includes('success');

                if (accessToken || successMessage) {
                    try {
                        if (payload.data) localStorage.setItem('user', JSON.stringify(payload.data));
                        if (accessToken) localStorage.setItem('token', accessToken);
                        else if (payload.token) localStorage.setItem('token', payload.token);
                    } catch (err) {
                        // ignore storage errors
                    }
                    navigate('/dashboard');
                } else {
                    setError(payload.message || 'Unable to login. Please check credentials.');
                }
            })
            .catch((err) => {
                setError('Login failed. Please try again later.');
                console.error(err);
            });
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex' }}>
            <Grid container sx={{ flex: 1 }}>
                {/* Left side - GIF/Animation */}
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
                                src={shipperImg}
                                alt="Shipping Animation"
                                style={{ maxWidth: '100%', maxHeight: '50%', borderRadius: 8 }}
                            />
                        </Box>
                    </Box>
                </Grid>

                {/* Right side - Login Form */}
                <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Container maxWidth="sm" sx={{ py: 6 }}>
                        <Paper elevation={3} sx={{ p: 6 }}>
                            <Typography variant="h4" gutterBottom align="center" color="primary">
                                Login
                            </Typography>
                            <Typography variant="body2" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
                                Access your account
                            </Typography>

                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Password"
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* Submit */}
                                        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            fullWidth
                                            sx={{ py: 1.2, fontWeight: "bold" }}
                                            disabled={loading}
                                        >
                                            {loading ? <CircularProgress size={22} color="inherit" /> : 'Login'}
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body2" align="center">
                                            Don't have an account?{' '}
                                            <Button onClick={() => navigate('/signup')} sx={{ textTransform: 'none' }}>
                                                Sign up here
                                            </Button>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Container>
                </Grid>
            </Grid>
        </Box>
    );
}
