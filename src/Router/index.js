import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from '../Pages/Home';
// import { Login } from '../Components/Registration/Login';
// import { Register } from '../Components/Registration/Register';

import LoginPage from '../Pages/Login';
import ShippingQuoteForm from '../Components/Posts/shippingQuote';
import UserDashboard from '../Components/Dashboard/userpage'
import UserView from '../Components/Dashboard/userDashboard';
import AddPostsPage from '../Pages/AddPosts';
import RegistrationPage from '../Pages/Registration';
import FilterSidebar from '../Components/Posts/FilterSidebar';
import ChatPage from '../Pages/ChatPage';
import Dashboard from '../Components/Dashboard/userDashboard';
import ProfileSettings from '../Components/Dashboard/ProfileSettings';
import AllListings from '../Components/Posts/AllListings';
import PostDetailsPage from '../Components/Posts/PostDetail';

export function AppRouter() {
    const user = (typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null);
    const token = (typeof window !== "undefined" ? localStorage.getItem("token") : null);
    const isLoggedIn = Boolean(user || token);
    return (
        <>
            <Router>
                <Routes>
                    {/* <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Home />} /> */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    {/* <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginPage />} /> */}
                    <Route path="/register" element={<RegistrationPage />}></Route>
                    <Route path="/create-post" element={<AddPostsPage />}></Route>
                    <Route path="/userdashboard" element={<UserDashboard />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/allListings" element={<AllListings />}></Route>
                    <Route path="/filterSidebar" element={<FilterSidebar />}></Route>
                    <Route path="/chat" element={<ChatPage />}></Route>
                    <Route path="/profile-settings" element={<ProfileSettings />} />
                    <Route path="/post" element={<PostDetailsPage />} />
                </Routes>
            </Router>
        </>
    )
}
