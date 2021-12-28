import React, { useContext } from 'react'
import { Button, Container, Navbar, Nav } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function AdminNavbar() {
    const { getAdminLoggIn } = useContext(AuthContext);
    const navigate = useNavigate();

    async function logout() {
        await axios.post("/admin/logout");
        getAdminLoggIn();
        navigate("/admin/login")
    }

    return (

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/admin">Admin</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>

                        <Button onClick={logout} variant="outline-secondary">Logout</Button>


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>


    )
}

export default AdminNavbar
