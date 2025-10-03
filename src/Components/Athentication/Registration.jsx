import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";

export const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    confirmEmail: "",
    password: "",
    businessType: "",
    companyLegalName: "",
    country: "",
    state: "",
    city: "",
    companyAddress: "",
    zipCode: "",
    operationHoursStart: "",
    operationHoursEnd: "",
    businessPhone: "",
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
          Registration
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
            <TextField
              fullWidth
              type="email"
              label="Confirm Email"
              name="confirmEmail"
              value={formData.confirmEmail}
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

          {/* Business Type */}
          <TextField
            select
            fullWidth
            label="Business Type"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            sx={{ mb: 2 }}
          >
            {["Retail", "Wholesale", "Services"].map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>

          {/* Company Legal Name */}
          <TextField
            fullWidth
            label="Company Legal Name"
            name="companyLegalName"
            value={formData.companyLegalName}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          {/* Country / State / City / Zip */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Zip Code"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </Box>

          {/* Company Address */}
          <TextField
            fullWidth
            label="Company Address"
            name="companyAddress"
            value={formData.companyAddress}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          {/* Operation Hours */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              type="time"
              label="Start Hours"
              name="operationHoursStart"
              value={formData.operationHoursStart}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              type="time"
              label="End Hours"
              name="operationHoursEnd"
              value={formData.operationHoursEnd}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          {/* Business Phone */}
          <TextField
            fullWidth
            label="Business Phone"
            name="businessPhone"
            value={formData.businessPhone}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          {/* Submit */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ py: 1.2, fontWeight: "bold" }}
          >
            Register
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

