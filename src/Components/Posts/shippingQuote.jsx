import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import UserHeader from "../Dashboard/userHeader";

const ShippingQuoteForm = () => {
  const [formData, setFormData] = useState({
    trailerType: "",
    quotedPriceUsd: "",
    pickupLocation: {
      type: "",
      name: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      stateOrProvince: "",
      postalCode: "",
      country: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      contactCell: "",
      buyerReferenceNumber: "",
      twicRequired: false,
      saveToAddressBook: false,
    },
    deliveryLocation: {
      type: "",
      name: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      stateOrProvince: "",
      postalCode: "",
      country: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      contactCell: "",
      buyerReferenceNumber: "",
      twicRequired: false,
      saveToAddressBook: false,
    },
    vehicles: [
      {
        vinAvailable: false,
        vin: "",
        type: "",
        year: "",
        make: "",
        model: "",
        color: "",
        lotNumber: "",
        licensePlate: "",
        licenseStateOrProvince: "",
        notes: "",
        inoperable: false,
        oversized: false,
      },
    ],
  });

  const handleChange = (e, section, field, index) => {
    if (section === "pickupLocation" || section === "deliveryLocation") {
      setFormData({
        ...formData,
        [section]: { ...formData[section], [field]: e.target.value },
      });
    } else if (section === "vehicles") {
      const updatedVehicles = [...formData.vehicles];
      updatedVehicles[index][field] =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setFormData({ ...formData, vehicles: updatedVehicles });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Shipping Quote Submitted:", formData);
  };

  return (
    <React.Fragment>
       <UserHeader/>

    <Box
      sx={{
        height: "100vh",
        overflowY: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        background: "linear-gradient(135deg, #3e4c7c, #5c72a2, #a3bffa)",
        py: 4,
      }}
    >
      <Paper elevation={6} sx={{ p: 4, maxWidth: 1000, width: "100%", borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Shipping Quote Form
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* General Quote */}
          <Typography variant="h6" gutterBottom>
            General Quote
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              select
              fullWidth
              label="Trailer Type"
              value={formData.trailerType}
              onChange={(e) => handleChange(e, null, "trailerType")}
            >
              {["ENCLOSED", "OPEN", "FLATBED"].map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Quoted Price (USD)"
              value={formData.quotedPriceUsd}
              onChange={(e) => handleChange(e, null, "quotedPriceUsd")}
            />
          </Box>

          {/* Pickup Location */}
          <Typography variant="h6" gutterBottom>
            Pickup Location
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="Type"
              value={formData.pickupLocation.type}
              onChange={(e) => handleChange(e, "pickupLocation", "type")}
            />
            <TextField
              fullWidth
              label="Name"
              value={formData.pickupLocation.name}
              onChange={(e) => handleChange(e, "pickupLocation", "name")}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="Address Line 1"
              value={formData.pickupLocation.addressLine1}
              onChange={(e) => handleChange(e, "pickupLocation", "addressLine1")}
            />
            <TextField
              fullWidth
              label="Address Line 2"
              value={formData.pickupLocation.addressLine2}
              onChange={(e) => handleChange(e, "pickupLocation", "addressLine2")}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="City"
              value={formData.pickupLocation.city}
              onChange={(e) => handleChange(e, "pickupLocation", "city")}
            />
            <TextField
              fullWidth
              label="State/Province"
              value={formData.pickupLocation.stateOrProvince}
              onChange={(e) => handleChange(e, "pickupLocation", "stateOrProvince")}
            />
            <TextField
              fullWidth
              label="Postal Code"
              value={formData.pickupLocation.postalCode}
              onChange={(e) => handleChange(e, "pickupLocation", "postalCode")}
            />
            <TextField
              fullWidth
              label="Country"
              value={formData.pickupLocation.country}
              onChange={(e) => handleChange(e, "pickupLocation", "country")}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="Contact Name"
              value={formData.pickupLocation.contactName}
              onChange={(e) => handleChange(e, "pickupLocation", "contactName")}
            />
            <TextField
              fullWidth
              label="Contact Email"
              value={formData.pickupLocation.contactEmail}
              onChange={(e) => handleChange(e, "pickupLocation", "contactEmail")}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="Contact Phone"
              value={formData.pickupLocation.contactPhone}
              onChange={(e) => handleChange(e, "pickupLocation", "contactPhone")}
            />
            <TextField
              fullWidth
              label="Contact Cell"
              value={formData.pickupLocation.contactCell}
              onChange={(e) => handleChange(e, "pickupLocation", "contactCell")}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="Buyer Reference #"
              value={formData.pickupLocation.buyerReferenceNumber}
              onChange={(e) => handleChange(e, "pickupLocation", "buyerReferenceNumber")}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.pickupLocation.twicRequired}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pickupLocation: {
                        ...formData.pickupLocation,
                        twicRequired: e.target.checked,
                      },
                    })
                  }
                />
              }
              label="TWIC Required"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.pickupLocation.saveToAddressBook}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pickupLocation: {
                        ...formData.pickupLocation,
                        saveToAddressBook: e.target.checked,
                      },
                    })
                  }
                />
              }
              label="Save to Address Book"
            />
          </Box>

          {/* Delivery Location */}
          <Typography variant="h6" gutterBottom>
            Delivery Location
          </Typography>
          {/* (Repeat same structure as Pickup, just replace section with "deliveryLocation") */}

          {/* Vehicles */}
          <Typography variant="h6" gutterBottom>
            Vehicles
          </Typography>
          {formData.vehicles.map((vehicle, index) => (
            <Box key={index} sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2, mb: 2 }}>
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  label="Type"
                  value={vehicle.type}
                  onChange={(e) => handleChange(e, "vehicles", "type", index)}
                />
                <TextField
                  fullWidth
                  label="Year"
                  value={vehicle.year}
                  onChange={(e) => handleChange(e, "vehicles", "year", index)}
                />
                <TextField
                  fullWidth
                  label="Make"
                  value={vehicle.make}
                  onChange={(e) => handleChange(e, "vehicles", "make", index)}
                />
                <TextField
                  fullWidth
                  label="Model"
                  value={vehicle.model}
                  onChange={(e) => handleChange(e, "vehicles", "model", index)}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  label="Color"
                  value={vehicle.color}
                  onChange={(e) => handleChange(e, "vehicles", "color", index)}
                />
                <TextField
                  fullWidth
                  label="Lot Number"
                  value={vehicle.lotNumber}
                  onChange={(e) => handleChange(e, "vehicles", "lotNumber", index)}
                />
                <TextField
                  fullWidth
                  label="License Plate"
                  value={vehicle.licensePlate}
                  onChange={(e) => handleChange(e, "vehicles", "licensePlate", index)}
                />
                <TextField
                  fullWidth
                  label="License State"
                  value={vehicle.licenseStateOrProvince}
                  onChange={(e) => handleChange(e, "vehicles", "licenseStateOrProvince", index)}
                />
              </Box>
              <TextField
                fullWidth
                multiline
                label="Notes"
                value={vehicle.notes}
                onChange={(e) => handleChange(e, "vehicles", "notes", index)}
                sx={{ mb: 2 }}
              />
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={vehicle.inoperable}
                      onChange={(e) => handleChange(e, "vehicles", "inoperable", index)}
                    />
                  }
                  label="Inoperable"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={vehicle.oversized}
                      onChange={(e) => handleChange(e, "vehicles", "oversized", index)}
                    />
                  }
                  label="Oversized"
                />
              </Box>
            </Box>
          ))}

          {/* Submit */}
          <Button type="submit" variant="contained" fullWidth sx={{ py: 1.2, fontWeight: "bold" }}>
            Submit Quote
          </Button>
        </form>
      </Paper>
    </Box>
    </React.Fragment>
  );
};

export default ShippingQuoteForm;
