import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from '../Pages/Home';
// import { Login } from '../Components/Registration/Login';
// import { Register } from '../Components/Registration/Register';
import { RegistrationForm} from '../Components/Athentication/Registration'
import {LoginForm} from '../Components/Athentication/Login'
import ShippingQuoteForm from '../Components/Posts/shippingQuote';
import UserDashboard from '../Components/Dashboard/userpage'

export function AppRouter() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />}> </Route>
                    <Route path="/login" element={<LoginForm/>}></Route>
                <Route path="/register" element={<RegistrationForm/>}></Route>
                <Route path="/addposts" element={<ShippingQuoteForm/>}></Route>
                <Route path="/userdashboard" element={<UserDashboard/>}></Route>
                </Routes>
            </Router>
        </>
    )
}