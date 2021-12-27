import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContext from './context/AuthContext';
import AdminHome from './pages/AdminHome';
import AdminLogin from './pages/AdminLogin';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function Router() {

    const {loggedIn} = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={ loggedIn ? <Home /> : <Signup />} />
                <Route path="/login" element={ loggedIn ? <Home /> : <Login />} />
                <Route path="/admin/" element={ <AdminHome /> } />
                <Route path="/admin/login" element={ <AdminLogin />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
