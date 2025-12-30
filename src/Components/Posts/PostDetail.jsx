import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Chip,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import HomeIcon from '@mui/icons-material/Home';

export default function PostDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const post = location.state?.post;

  if (!post) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5">Post not found</Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard')} sx={{ mt: 2 }}>
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'not signed':
        return 'warning';
      case 'assigned':
        return 'info';
      case 'picked up':
        return 'primary';
      case 'delivered':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ bgcolor: '#F9FAFB', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/dashboard')}
            sx={{ mb: 2 }}
          >
            Back to Dashboard
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h4" sx={{ mb: 0.5 }}>
                Shipment Details
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: {post._id}
              </Typography>
            </Box>
            <Chip
              label={post.status}
              color={getStatusColor(post.status)}
              sx={{ px: 2, py: 2.5 }}
            />
          </Box>
        </Box>

        {/* Overview Section */}
        <Paper elevation={2} sx={{ mb: 2, borderRadius: 2 }}>
          <Box sx={{ p: 2, bgcolor: '#1447E6', color: 'white', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center' }}>
            <LocalShippingIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Shipment Overview</Typography>
          </Box>
          <TableContainer>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, width: '25%' }}>Trailer Type</TableCell>
                  <TableCell sx={{ width: '25%' }}>{post.trailerType}</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '25%' }}>Quoted Price</TableCell>
                  <TableCell sx={{ width: '25%', color: 'success.main', fontWeight: 600 }}>
                    ${post.quotedPriceUsd?.toLocaleString() || 'N/A'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Terms Agreement</TableCell>
                  <TableCell>
                    <Chip
                      label={post.agreedToTerms ? 'Agreed' : 'Not Agreed'}
                      color={post.agreedToTerms ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Created Date</TableCell>
                  <TableCell>{formatDate(post.createdAt)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Pickup and Delivery Locations */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {/* Pickup Location */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ borderRadius: 2, height: '100%' }}>
              <Box sx={{ p: 2, bgcolor: '#1447E6', color: 'white', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center' }}>
                <LocationOnIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Pickup Location</Typography>
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, width: '40%' }}>Type</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {post.pickupLocationId?.type === 'RESIDENCE' ? (
                            <HomeIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                          ) : (
                            <BusinessIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                          )}
                          {post.pickupLocationId?.type || 'N/A'}
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                      <TableCell>{post.pickupLocationId?.name || 'N/A'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Address</TableCell>
                      <TableCell>
                        {post.pickupLocationId?.addressLine || 'N/A'}
                        <br />
                        {post.pickupLocationId?.city}, {post.pickupLocationId?.stateOrProvince} {post.pickupLocationId?.postalCode}
                        <br />
                        {post.pickupLocationId?.country}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Contact Name</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PersonIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                          {post.pickupLocationId?.contactName || 'N/A'}
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <EmailIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                          {post.pickupLocationId?.contactEmail || 'N/A'}
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PhoneIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                          {post.pickupLocationId?.contactPhone || 'N/A'}
                        </Box>
                      </TableCell>
                    </TableRow>
                    {post.pickupLocationId?.contactCell && (
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Cell Phone</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PhoneIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                            {post.pickupLocationId.contactCell}
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                    {post.pickupLocationId?.buyerReferenceNumber && (
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Buyer Ref #</TableCell>
                        <TableCell>{post.pickupLocationId.buyerReferenceNumber}</TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>TWIC Required</TableCell>
                      <TableCell>
                        <Chip
                          label={post.pickupLocationId?.twicRequired ? 'Yes' : 'No'}
                          color={post.pickupLocationId?.twicRequired ? 'warning' : 'default'}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Delivery Location */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ borderRadius: 2, height: '100%' }}>
              <Box sx={{ p: 2, bgcolor: '#1447E6', color: 'white', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center' }}>
                <LocationOnIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Delivery Location</Typography>
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, width: '40%' }}>Type</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {post.deliveryLocationId?.type === 'RESIDENCE' ? (
                            <HomeIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                          ) : (
                            <BusinessIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                          )}
                          {post.deliveryLocationId?.type || 'N/A'}
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                      <TableCell>{post.deliveryLocationId?.name || 'N/A'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Address</TableCell>
                      <TableCell>
                        {post.deliveryLocationId?.addressLine || 'N/A'}
                        <br />
                        {post.deliveryLocationId?.city}, {post.deliveryLocationId?.stateOrProvince} {post.deliveryLocationId?.postalCode}
                        <br />
                        {post.deliveryLocationId?.country}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Contact Name</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PersonIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                          {post.deliveryLocationId?.contactName || 'N/A'}
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <EmailIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                          {post.deliveryLocationId?.contactEmail || 'N/A'}
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PhoneIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                          {post.deliveryLocationId?.contactPhone || 'N/A'}
                        </Box>
                      </TableCell>
                    </TableRow>
                    {post.deliveryLocationId?.contactCell && (
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Cell Phone</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PhoneIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                            {post.deliveryLocationId.contactCell}
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                    {post.deliveryLocationId?.buyerReferenceNumber && (
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Buyer Ref #</TableCell>
                        <TableCell>{post.deliveryLocationId.buyerReferenceNumber}</TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>TWIC Required</TableCell>
                      <TableCell>
                        <Chip
                          label={post.deliveryLocationId?.twicRequired ? 'Yes' : 'No'}
                          color={post.deliveryLocationId?.twicRequired ? 'warning' : 'default'}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Vehicle Details */}
        <Paper elevation={2} sx={{ borderRadius: 2 }}>
          <Box sx={{ p: 2, bgcolor: '#1447E6', color: 'white', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center' }}>
            <DirectionsCarIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Vehicle Information</Typography>
          </Box>
          
          {post.vehicles && post.vehicles.length > 0 ? (
            post.vehicles.map((vehicle, index) => (
              <Box key={vehicle._id || index}>
                {index > 0 && <Divider />}
                <Box sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                  <Typography variant="h6" color="primary">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </Typography>
                </Box>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, width: '25%' }}>VIN</TableCell>
                        <TableCell sx={{ width: '25%' }}>
                          {vehicle.vinAvailable ? vehicle.vin : 'Not Available'}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, width: '25%' }}>Type</TableCell>
                        <TableCell sx={{ width: '25%' }}>
                          <Chip label={vehicle.type} size="small" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Color</TableCell>
                        <TableCell>{vehicle.color}</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Lot Number</TableCell>
                        <TableCell>{vehicle.lotNumber || 'N/A'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>License Plate</TableCell>
                        <TableCell>{vehicle.licensePlate || 'N/A'}</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>License State</TableCell>
                        <TableCell>{vehicle.licenseStateOrProvince || 'N/A'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Condition</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <Chip
                              label={vehicle.inoperable ? 'Inoperable' : 'Operable'}
                              color={vehicle.inoperable ? 'error' : 'success'}
                              size="small"
                            />
                            {vehicle.oversized && (
                              <Chip label="Oversized" color="warning" size="small" />
                            )}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Available Date</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CalendarTodayIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            {formatDate(vehicle.availableDate)}
                          </Box>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Desired Delivery</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CalendarTodayIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            {formatDate(vehicle.desiredDeliveryDate)}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Expiration Date</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CalendarTodayIcon sx={{ fontSize: 16, color: 'error.main' }} />
                            <Typography color="error.main">
                              {formatDate(vehicle.expirationDate)}
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                      {vehicle.notes && (
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Notes</TableCell>
                          <TableCell colSpan={3} sx={{ fontStyle: 'italic' }}>
                            {vehicle.notes}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            ))
          ) : (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                No vehicle information available
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}