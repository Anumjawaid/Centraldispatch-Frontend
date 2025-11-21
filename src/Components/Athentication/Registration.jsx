import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register_user, removeMessage } from "../../Store/authenticationReducer";
import DisclaimerModal from "../Home/DisclaimerModal";

export const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, status, message } = useSelector(
    (state) => state.authentication
  );

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

  const [openModal, setOpenModal] = useState(false);
  // used to open the disclaimer when user hits submit
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // instead of submitting immediately, open the disclaimer modal
    setPendingFormData(formData);
    setShowDisclaimer(true);
  };

 useEffect(() => {
  console.log(status, message, "status after");
  if (
    status === "fulfilled" &&
    message?.toLowerCase().includes("user created successfully")
  ) {
    console.log("Opening modal...");
    setOpenModal(true);
    dispatch(removeMessage());
  }
}, [status, message, dispatch]);

  const handleClose = () => {
    setOpenModal(false);
    navigate("/userdashboard");
  };

  const handleDisclaimerAgree = () => {
    // user agreed — submit stored form data
    if (pendingFormData) {
      dispatch(register_user(pendingFormData));
      setPendingFormData(null);
    }
    setShowDisclaimer(false);
  };

  const handleDisclaimerClose = () => {
    // user closed without agreeing — just close the disclaimer
    setShowDisclaimer(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #3e4c7c, #5c72a2, #a3bffa)",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 600,
          width: "100%",
          borderRadius: 3,
          position: "relative",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Registration
        </Typography>

        {status === "rejected" && message && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

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

          <TextField
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

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

          <TextField
            fullWidth
            label="Company Legal Name"
            name="companyLegalName"
            value={formData.companyLegalName}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

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

          <TextField
            fullWidth
            label="Company Address"
            name="companyAddress"
            value={formData.companyAddress}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

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

          <TextField
            fullWidth
            label="Business Phone"
            name="businessPhone"
            value={formData.businessPhone}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ py: 1.2, fontWeight: "bold" }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
          </Button>
        </form>
      </Paper>

      {/* ✅ Success Modal */}
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Typography>You are successfully registered!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
      {/* Disclaimer modal used on-demand when user submits */}
      <DisclaimerModal controlledOpen={showDisclaimer} onAgree={handleDisclaimerAgree} onClose={handleDisclaimerClose} />
    </Box>
  );
};
