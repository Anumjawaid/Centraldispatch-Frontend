import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Checkbox, Button } from "@mui/material";
import { SECONDARY, background, PRIMARY } from "../../Constants/Colors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 480,
  bgcolor: SECONDARY,
  color: background,
  borderRadius: 4,
  boxShadow: 24,
  p: 5,
  outline: "none",
};

const DisclaimerModal = () => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const shown = localStorage.getItem("disclaimer_shown");
    if (!shown) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("disclaimer_shown", "true");
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h5" fontWeight={700} mb={2} color={PRIMARY} align="center" sx={{ fontFamily: "serif" }}>
          Disclaimer
        </Typography>
        <Typography variant="body1" mb={2} sx={{ fontFamily: "serif" }}>
          This platform only provides a space for shippers, carriers, and drivers to connect. We do not act as a broker, agent, or intermediary in any transaction. All arrangements, agreements, or communications between users are made at their own risk.
        </Typography>
        <Typography variant="body1" mb={2} sx={{ fontFamily: "serif" }}>
          We are not responsible for any disputes, claims, damages, losses, delays, or issues arising between buyers, sellers, shippers, carriers, or drivers. Any conflicts must be resolved directly between the involved parties.
        </Typography>
        <Box display="flex" alignItems="center" mb={2}>
          <Checkbox
            checked={checked}
            onChange={e => setChecked(e.target.checked)}
            sx={{ color: PRIMARY }}
          />
          <Typography variant="body2" sx={{ fontFamily: "serif", color: background }}>
            By using this platform, all users agree to assume full responsibility for their interactions and transactions.
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          disabled={!checked}
          onClick={handleClose}
          sx={{ backgroundColor: PRIMARY, color: SECONDARY, fontWeight: "bold", fontFamily: "serif" }}
        >
          I Agree
        </Button>
      </Box>
    </Modal>
  );
};

export default DisclaimerModal;
