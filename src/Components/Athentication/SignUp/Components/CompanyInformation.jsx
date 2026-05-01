import React from 'react';
import { Box, Grid, Paper, TextField, Typography } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';

export const CompanyInformation = ({ formData, handleChange, formErrors }) => {
  return (
    <Grid container sx={{ flex: 1 }}>
      <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <BusinessIcon sx={{ color: 'primary.main', mr: 1 }} />
          <Typography variant="h6" color="primary">
            Company Information
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company Legal Name"
              name="companyLegalName"
              value={formData.companyLegalName}
              onChange={handleChange}
              required
              error={!!formErrors.companyLegalName}
              helperText={formErrors.companyLegalName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company Address"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="State/Province"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Zip Code"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
              error={!!formErrors.zipCode}
              helperText={formErrors.zipCode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
