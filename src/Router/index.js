import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from '../Pages/Home';
// import { Login } from '../Components/Registration/Login';
// import { Register } from '../Components/Registration/Register';

import LoginPage from '../Pages/Login';
import ShippingQuoteForm from '../Components/Posts/shippingQuote';
import UserDashboard from '../Components/Dashboard/userpage'
import UserView from '../Components/Dashboard/userDashboard';
import AllListings from '../Components/Posts/AllListings';
import RegistrationPage from '../Pages/Registration';
import FilterSidebar from '../Components/Posts/FilterSidebar';

export function AppRouter() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />}> </Route>
                    <Route path="/login" element={<LoginPage/>}></Route>
                    <Route path="/register" element={<RegistrationPage/>}></Route>
                    <Route path="/addposts" element={<ShippingQuoteForm/>}></Route>
                    <Route path="/userdashboard" element={<UserDashboard/>}></Route>
                    <Route path="/userdashboard1" element={<UserView/>}></Route>
                    <Route path="/allListings" element={<AllListings/>}></Route>
                    <Route path="/filterSidebar" element={<FilterSidebar/>}></Route>
                </Routes>
            </Router>
        </>
    )
}