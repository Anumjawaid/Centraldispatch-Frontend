import React from 'react';
import { H1, PRIMARY, SECONDARY, p, background,HEADINGTXT, HeaderBackground,Dashboardbackground } from '../../Constants/Colors';
import { Container, Card, CardContent, Typography, Box } from "@mui/material";

const shipperSections = [
  {
    heading: 'For Shippers',
    items: [
      'Post shipments easily in minutes.',
      'View driver ratings and reviews.',
      'Print driver ID and insurance.',
      'Talk directly with drivers — no middleman.',
    ],
    color: SECONDARY,
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
    color: SECONDARY,
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
  <Box sx={{ width: '100%', backgroundColor: PRIMARY, py: 8 }}>
    <Container maxWidth="lg">

      {/* Title */}
      <Typography
        variant="h3"
        align="center"
        fontWeight={700}
        mb={4}
        fontSize="38px"
        color={Dashboardbackground}
        sx={{ fontFamily: 'serif', letterSpacing: 1 }}
      >
        Shipper & Carrier Information
      </Typography>

      {/* Main Section */}
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
        {shipperSections.map((section) => (
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
              flex: 1,
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
                    color={HEADINGTXT}
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


    </Container>
  </Box>
);

export default ShipperInfo;
