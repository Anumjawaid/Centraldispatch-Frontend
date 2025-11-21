import { Box, Typography, Container, Card } from "@mui/material";
import { PRIMARY, SECONDARY, background } from "../../Constants/Colors";

const RegistrationNotice = () => {
  return (
    <Box
      sx={{
        width: "100%",
        py: 10,
        background: "linear-gradient(135deg, #1a2140 0%, #0d1226 100%)",
      }}
    >
      <Container maxWidth="md">
        <Card
          sx={{
            p: 6,
            borderRadius: "32px",
            backdropFilter: "blur(12px)",
            background:
              "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
          }}
        >
          {/* Heading */}
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 3,
              fontSize: "40px",
              color: "#fff",
              letterSpacing: 0.5,
              fontFamily: "serif",
            }}
          >
            Free Registration — Limited Time Offer!
          </Typography>

          {/* Highlight badge */}
          <Box
            sx={{
              display: "inline-block",
              mx: "auto",
              mb: 4,
              px: 3,
              py: 1,
              borderRadius: "20px",
              background: "linear-gradient(90deg, #6b8cff, #9eaaff)",
              color: "#0d1226",
              fontWeight: 700,
              fontSize: "16px",
              textAlign: "center",
            }}
          >
            First 3 Months – Absolutely Free
          </Box>

          {/* Content */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography
              sx={{
                color: "#d6d9f0",
                fontSize: "18px",
                textAlign: "center",
                fontFamily: "serif",
              }}
            >
              Right now, registration is completely <strong>free for all users</strong>.
            </Typography>

            <Typography
              sx={{
                color: "#d6d9f0",
                fontSize: "18px",
                textAlign: "center",
                fontFamily: "serif",
              }}
            >
              After 3 months, regular users will need to pay a{" "}
              <strong>one-time permanent registration fee of $100</strong>.
            </Typography>

            <Typography
              sx={{
                color: "#d6d9f0",
                fontSize: "18px",
                textAlign: "center",
                fontFamily: "serif",
              }}
            >
              If you have a credit card on file, the payment will be charged
              automatically after 3 months.
            </Typography>

            <Typography
              sx={{
                color: "#d6d9f0",
                fontSize: "18px",
                textAlign: "center",
                fontFamily: "serif",
              }}
            >
              No monthly or yearly fees currently.
            </Typography>

            <Typography
              sx={{
                color: "#d6d9f0",
                fontSize: "18px",
                textAlign: "center",
                fontFamily: "serif",
              }}
            >
              Future charges may depend on users and platform expenses.
            </Typography>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default RegistrationNotice;
