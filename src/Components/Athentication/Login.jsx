import React, { useState, useEffect } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    MenuItem,
    Paper,
    CircularProgress,
    Alert,
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login_user } from '../../Store/authenticationReducer';

export const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, status, message } = useSelector((state) => state.authentication || {});

    const [formData, setFormData] = useState({
        name: "",
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
                            navigate('/userdashboard');
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
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                height:'100vh',
                alignItems: "center",
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    maxWidth: 600,
                    width: "100%",
                    borderRadius: 3,
                }}
            >
                <Typography variant="h5" align="center" gutterBottom>
                    Login Form
                </Typography>

                <form onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />

                    {/* Email + Confirm Email */}
                    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                        <TextField
                            fullWidth
                            type="email"
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                    </Box>

                    {/* Password */}
                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />



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
                </form>
            </Paper>
        </Box>
    );
};

