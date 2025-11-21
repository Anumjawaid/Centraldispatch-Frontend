import React from 'react';
import { H1, PRIMARY, SECONDARY, p, background, HeaderBackground } from '../../Constants/Colors';
import { Container, Grid, Card, CardContent, Typography, Box } from "@mui/material";
import fullshipper from '../Assets/fullshipper.jpg';

const shipperSections = [
  {
    heading: 'For Shippers',
    items: [
      'Post shipments easily in minutes.',
      'View driver ratings and reviews.',
      'Print driver ID and insurance.',
      'Talk directly with drivers — no middleman.',
    ],
    color: PRIMARY,
    icon: '🚚',
  },
  {
    heading: 'For Carriers / Transporters',
    items: [
      'Find loads that match your route.',
      'Build your reputation with reviews.',
      'Get direct bookings and grow your business.',
    ],
    color: SECONDARY,
    icon: '🛣️',
  },
  {
    heading: 'Safety & Verification',
    items: [
      'Every driver shows ratings and reviews.',
      'You can print ID and insurance from their profile.',
      'If not available, ask the driver directly before pickup.',
    ],
    color: PRIMARY,
    icon: '✅',
  },
  {
    heading: 'No Double Brokering',
    items: [
      'Double brokering is not allowed on our platform.',
      'Changing prices or giving the job to another driver without permission is not allowed.',
      'Always confirm who will pick up, deliver, and the final price.',
    ],
    color: SECONDARY,
    icon: '🚫',
  },
];

const importantNotice = [
  'This platform only connects shippers and carriers.',
  'We are not responsible for damages, disputes, or payments.',
  'If any issue happens, contact the driver or company directly.',
  'Our goal: make every shipment smooth, safe, and easy for everyone.',
];

const ShipperInfo = () => (
  <Box sx={{ width: '100%', backgroundColor: HeaderBackground, py: 8 }}>
    <Container maxWidth="lg">

      {/* Title */}
      <Typography
        variant="h3"
        align="center"
        fontWeight={700}
        mb={4}
        fontSize="38px"
        color={PRIMARY}
        sx={{ fontFamily: 'serif', letterSpacing: 1 }}
      >
        Shipper & Carrier Information
      </Typography>

      {/* Main Section */}
      <Grid container spacing={4} alignItems="stretch" mb={4} wrap="nowrap" sx={{ minWidth: 0, width: '100%' }}>
        
        {/* Left column */}
        <Grid item sx={{ minWidth: 0, width: '35%' }}>
          <Box display="flex" flexDirection="column" gap={4} height="100%">
            {[shipperSections[0], shipperSections[2]].map((section) => (
              <Card
                key={section.heading}
                sx={{
                  borderRadius: 4,
                  boxShadow: '0 4px 24px rgba(32,44,88,0.10)',
                  background,
                  minHeight: 220,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 2,
                  height: '100%',
                }}
              >
                <CardContent>
                  <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                    <Typography fontSize={40} mb={1} color={PRIMARY}>{section.icon}</Typography>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color={section.color}
                      align="center"
                      fontSize="22px"
                      mb={2}
                      sx={{ fontFamily: 'serif' }}
                    >
                      {section.heading}
                    </Typography>
                  </Box>

                  {section.items.map((item, i) => (
                    <Typography
                      key={i}
                      variant="body1"
                      color={p}
                      fontSize="17px"
                      mb={1}
                      align="center"
                      sx={{ fontFamily: 'serif' }}
                    >
                      {item}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>

        {/* Center image */}
        <Grid item display="flex" justifyContent="center" alignItems="center" sx={{ minWidth: 0, width: '30%' }}>
          <Box display="flex" justifyContent="center" alignItems="center" width="100%">
            <img
              src={fullshipper}
              alt="Shipping luxury"
              style={{
                width: '420px',
                height: '420px',
                objectFit: 'cover',
                borderRadius: '32px',
                boxShadow: '0 8px 32px rgba(32,44,88,0.18)',
              }}
            />
          </Box>
        </Grid>

        {/* Right column */}
        <Grid item sx={{ minWidth: 0, width: '35%' }}>
          <Box display="flex" flexDirection="column" gap={4} height="100%">
            {[shipperSections[1], shipperSections[3]].map((section) => (
              <Card
                key={section.heading}
                sx={{
                  borderRadius: 4,
                  boxShadow: '0 4px 24px rgba(32,44,88,0.10)',
                  background,
                  minHeight: 220,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 2,
                  height: '100%',
                }}
              >
                <CardContent>
                  <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                    <Typography fontSize={40} mb={1} color={PRIMARY}>{section.icon}</Typography>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color={section.color}
                      align="center"
                      fontSize="22px"
                      mb={2}
                      sx={{ fontFamily: 'serif' }}
                    >
                      {section.heading}
                    </Typography>
                  </Box>

                  {section.items.map((item, i) => (
                    <Typography
                      key={i}
                      variant="body1"
                      color={p}
                      fontSize="17px"
                      mb={1}
                      align="center"
                      sx={{ fontFamily: 'serif' }}
                    >
                      {item}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* Important Notice */}
      <Box
        mt={2}
        mx="auto"
        maxWidth={700}
        p={4}
        borderRadius={4}
        boxShadow="0 4px 24px rgba(32,44,88,0.10)"
        bgcolor={background}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          color={PRIMARY}
          mb={2}
          align="center"
          sx={{ fontFamily: 'serif' }}
        >
          Important Notice
        </Typography>

        {importantNotice.map((item, i) => (
          <Typography
            key={i}
            variant="body1"
            color={p}
            fontSize="18px"
            mb={1}
            align="center"
            sx={{ fontFamily: 'serif' }}
          >
            {item}
          </Typography>
        ))}
      </Box>

    </Container>
  </Box>
);

export default ShipperInfo;
