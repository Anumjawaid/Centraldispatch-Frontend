import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    CardActions,
    Chip,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ChatScreen from '../Chat/ChatScreen';
import { get_posts } from '../../Store/postReducer';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../Header';
import { resetChat, setListingsPaneOpen } from '../../Store/chatReducer';
import { startChat } from '../../utils/socketClient';



export default function AllPosts() {
    const navigate = useNavigate();

    const postsState = useSelector((state) => state.posts || {});
    // console.log(postsState, "posts in all posts");
    const posts = postsState.posts.rows || [];
    const auth = useSelector((state) => state.authentication || {});
    const dispatch = useDispatch();
    // console.log(auth, "auth in dashboard");

    const user = auth.user || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null);
    const token = auth.token || localStorage.getItem('token');
    // console.log(token, "token in dashboard");
    const isLoggedIn = Boolean(user || token);

    // useEffect(() => {
    //     // Fetch user profile if logged in and user data is not present
    //     if (isLoggedIn && !user) {
    //     }
    //     console.log("Dispatching get_posts");
    //     dispatch(get_posts());
    // }, [isLoggedIn, user, dispatch]);



    return (
        <>
            <Header />
            {/* Recent Posts */}
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Your Active Posts
            </Typography>
            <Grid container spacing={3}>
                {posts.map((post) => (
                    <MainCard post={post} />
                ))}
            </Grid>

            {posts.length === 0 && (
                <Card sx={{ p: 6, textAlign: 'center' }}>
                    <LocalShippingIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No active posts yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Create your first shipment listing to get started
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => navigate('/create-post')}
                    >
                        Create New Post
                    </Button>
                </Card>
            )}
        </>
    )
}

function MainCard({ post }) {
    const navigate = useNavigate();
    const [chatOpen, setChatOpen] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [selectedShipment, setSelectedShipment] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [toUserId, setToUserId] = useState("");
    const dispatch = useDispatch();
    // console.log(post, "post");
    const handleMenuOpen = (event, postId) => {
        setAnchorEl(event.currentTarget);
        setSelectedPost(postId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedPost(null);
    };
    const handleEdit = (item) => console.log("Edit:", item);
    const handleDelete = (item) => console.log("Delete:", item);
    const handleView = (item) => console.log("View:", item);
    const getStatusColor = (status) => {
        switch (status) {
            case 'listing':
                return 'info';
            case 'assigned':
                return 'warning';
            case 'pickedup':
                return 'primary';
            case 'delivered':
                return 'success';
            default:
                return 'default';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'listing':
                return 'Open Listing';
            case 'assigned':
                return 'Assigned';
            case 'pickedup':
                return 'In Transit';
            case 'delivered':
                return 'Delivered';
            default:
                return status;
        }
    };
    const ME = JSON.parse(localStorage.getItem('user') || 'null');
    const handleChatDriver = (post) => {
        // setSelectedDriver({
        //     name: post.driver || 'Available Driver',
        //     company: post.driverCompany || 'Transport Company',
        // });

        // setSelectedShipment({
        //     title: post.title,
        //     ...post,
        // });
        const to = post.createdBy == ME.id ? post.carrier : post.createdBy;
        // setChatOpen(true);
        console.log("Starting chat", post);
        startChat(to || "", post?._id);
        // setActivepost(item);
        setToUserId(to);
        dispatch(setListingsPaneOpen(true));

        setSelectedDriver({
            name: post.driver || 'Available Driver',
            company: post.driverCompany || 'Transport Company',
        });
        setSelectedShipment(post);
        setChatOpen(true);
    };

    const handleCloseChat = () => {
        dispatch(resetChat());
        dispatch(setListingsPaneOpen(false));
        setChatOpen(false);
        setSelectedDriver(null);
        setSelectedShipment(null);
    };
    return (
        <>

            <Grid item xs={12} md={6} lg={4} key={post.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                            <Chip
                                label={getStatusLabel(post.status)}
                                color={getStatusColor(post.status)}
                                size="small"
                            />
                            <IconButton size="small" onClick={(e) => handleMenuOpen(e, post.id)}>
                                <MoreVertIcon />
                            </IconButton>
                        </Box>
                        <Typography variant="h6" gutterBottom>
                            {post.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            <strong>From:</strong> {post.pickupLocationId.addressLine}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            <strong>To:</strong> {post.deliveryLocationId.addressLine}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            <strong>Vehicle:</strong> {post.vehicles[0].type}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            <strong>Quoted Price:</strong> ${post.quotedPriceUsd}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Posted:</strong> {post.createdAt}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" onClick={() => navigate("/post")}>
                            View Details
                        </Button>

                        <Button
                            size="small"
                            startIcon={<ChatIcon />}
                            onClick={() => handleChatDriver(post)}
                        >
                            Chat Driver
                        </Button>
                    </CardActions>
                </Card>
            </Grid>

            {/* 🔹 Chat Dialog */}
            <ChatScreen
                open={chatOpen}
                onClose={handleCloseChat}
                driver={selectedDriver}
                shipment={selectedShipment}
            />

        </>
    )
}