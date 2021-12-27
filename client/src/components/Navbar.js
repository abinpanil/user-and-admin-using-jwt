import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import AuthContext from '../context/AuthContext';
import LogoutBtn from './LogoutBtn';
import { Container, Navbar } from 'react-bootstrap';

const Navibar = () => {
    const { loggedIn } = useContext(AuthContext);

    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="/">User</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {
                        loggedIn ?
                            <LogoutBtn />
                            :
                            <Link to="/login">Login</Link>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default Navibar
