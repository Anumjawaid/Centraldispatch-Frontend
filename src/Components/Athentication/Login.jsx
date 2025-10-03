import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    MenuItem,
    Paper,
} from "@mui/material";

export const LoginForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
       
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                height:'100vh',
                alignItems: "center",
                background: "linear-gradient(135deg, #3e4c7c, #5c72a2, #a3bffa)",
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
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ py: 1.2, fontWeight: "bold" }}
                    >
                        Login
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

