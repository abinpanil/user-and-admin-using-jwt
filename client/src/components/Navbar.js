import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import AuthContext from '../context/AuthContext';
import LogoutBtn from './LogoutBtn';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';

const Navibar = () => {
    const { loggedIn } = useContext(AuthContext);

    return (

        <Navbar style={{height:'30px'}} collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Cart</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        {
                            loggedIn ?
                                <LogoutBtn />
                                :
                                <Button href="/login" variant="outline-secondary">Login</Button>
                                // <Link to="/login">Login</Link>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>



    )
}

export default Navibar
