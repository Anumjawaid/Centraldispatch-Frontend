import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from '../Pages/Home';
// import { Login } from '../Components/Registration/Login';
// import { Register } from '../Components/Registration/Register';
import { RegistrationForm} from '../Components/Athentication/Registration'
import {LoginForm} from '../Components/Athentication/Login'

export function AppRouter() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />}> </Route>
                    <Route path="/login" element={<LoginForm/>}></Route>
                <Route path="/register" element={<RegistrationForm/>}></Route>
                </Routes>
            </Router>
        </>
    )
}