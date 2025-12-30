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
import Dashboard from '../Components/Dashboard/userDashboard';
import ProfileSettings from '../Components/Dashboard/ProfileSettings';
import AllListings from '../Components/Posts/AllListings';
import PostDetailsPage from '../Pages/PostDetails';

export function AppRouter() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />}> </Route>
                    <Route path="/login" element={<LoginPage/>}></Route>
                    <Route path="/register" element={<RegistrationPage/>}></Route>
                    <Route path="/create-post" element={<AddPostsPage/>}></Route>
                    <Route path="/userdashboard" element={<UserDashboard/>}></Route>
                    <Route path="/dashboard" element={<Dashboard/>}></Route>
                    <Route path="/allListings" element={<AllListings/>}></Route>
                    <Route path="/filterSidebar" element={<FilterSidebar/>}></Route>
                    <Route path="/profile-settings" element={<ProfileSettings/>} />
                    <Route path="/post" element={<PostDetailsPage/>} />
                </Routes>
            </Router>
        </>
    )
}