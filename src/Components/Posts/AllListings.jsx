import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
} from '@mui/material';
import Header from '../Header';
import ChatScreen from '../Chat/ChatScreen';
import { useNavigate, useLocation } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import AllPosts from './AllPosts';

import { startChat } from "../../utils/socketClient";
import { get_posts } from '../../Store/postReducer';

export default function AllListings() {
  const navigate = useNavigate();
  const location = useLocation();
  const postsState = useSelector((state) => state.posts || {});
  // console.log(postsState, "posts in all posts");
  const posts = postsState.posts.rows || [];
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('tab') || 'listing';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [toUserId, setToUserId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_posts());
  }, []);

  const mockListings = {
    listing: [...posts],
    assigned: [
    ],
    pickedup: [
    ],
    delivered: [
    ],
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleChatDriver = (listing) => {
    startChat(listing.createdBy || "");
    // setActiveListing(item);
    setToUserId(listing.createdBy || "");
    // dispatch(setListingsPaneOpen(true));

    setSelectedDriver({
      name: listing.driver || 'Available Driver',
      company: listing.driverCompany || 'Transport Company',
    });
    setSelectedShipment(listing);
    setChatOpen(true);
  };

  const renderListings = (listings, status) => {
    if (listings.length === 0) {
      return (
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No {status} shipments found
          </Typography>
        </Card>
      );
    }

    return (
      <Grid container spacing={3}>
        <AllPosts />
        {/* {listings.map((listing) => (
          <Grid item xs={12} md={6} key={listing.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                  <Typography variant="h6">{listing.title}</Typography>
                  <Chip
                    label={status.charAt(0).toUpperCase() + status.slice(1)}
                    color={
                      status === 'listing' ? 'info' :
                        status === 'assigned' ? 'warning' :
                          status === 'pickedup' ? 'primary' :
                            'success'
                    }
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>From:</strong> {listing.from}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>To:</strong> {listing.to}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>Price:</strong> ${listing.price}
                </Typography>
                {listing.driver && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Driver:</strong> {listing.driver}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  <strong>Date:</strong> {listing.date}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Button size="small" variant="outlined">
                    View Details
                  </Button>
                  {status === 'listing' && (
                    <Button size="small" variant="contained">
                      Assign Driver
                    </Button>
                  )}
                  {(status === 'assigned' || status === 'pickedup') && listing.driver && (
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<ChatIcon />}
                      onClick={() => handleChatDriver(listing)}
                    >
                      Chat Driver
                    </Button>
                  )}
                  {status === 'delivered' && (
                    <Button size="small" variant="outlined" color="success">
                      Leave Review
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))} */}
      </Grid>
    );
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header isAuthenticated={true} />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/dashboard')}
          sx={{ mb: 3 }}
        >
          Back to Dashboard
        </Button>
        <Typography variant="h4" gutterBottom>
          Listing & Status
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Manage and track your shipment listings
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
            <Tab label="Listing" value="listing" />
            <Tab label="Assigned" value="assigned" />
            <Tab label="Picked Up" value="pickedup" />
            <Tab label="Delivered" value="delivered" />
          </Tabs>
        </Box>

        {activeTab === 'listing' && renderListings(mockListings.listing, 'listing')}
        {activeTab === 'assigned' && renderListings(mockListings.assigned, 'assigned')}
        {activeTab === 'pickedup' && renderListings(mockListings.pickedup, 'picked up')}
        {activeTab === 'delivered' && renderListings(mockListings.delivered, 'delivered')}
      </Container>

      {chatOpen && (
        <ChatScreen
          open={chatOpen}
          driver={selectedDriver}
          shipment={selectedShipment}
          toUserId={toUserId}
          onClose={() => setChatOpen(false)}
        />
      )}
    </Box>
  );
}