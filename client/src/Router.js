import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';

function Router() {
    return (
        <BrowserRouter>
        <Navbar />
            <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
