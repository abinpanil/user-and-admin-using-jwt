import React from 'react'
import { Button, Container, Navbar } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminNavbar() {
    const navigate = useNavigate();

    async function logout() {
        await axios.post("/admin/logout");
        navigate("/admin/login")
    }

    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="/">Admin</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Button onClick={logout} variant="outline-secondary">Logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AdminNavbar
