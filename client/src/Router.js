import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthContext from './context/AuthContext';
import AdminHome from './pages/AdminHome';
import AdminLogin from './pages/AdminLogin';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
function Router() {

    const {loggedIn, adminLoggedIn} = useContext(AuthContext);
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={ loggedIn ? <Navigate to="/" /> : <Signup />} />
                <Route path="/login" element={ loggedIn ? <Navigate to="/" /> : <Login />} />
                <Route path="/admin/" element={ adminLoggedIn ? <AdminHome /> : <Navigate to="/admin/login" /> } />
                <Route path="/admin/login" element={ adminLoggedIn ? <Navigate to="/admin/" /> : <AdminLogin />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
