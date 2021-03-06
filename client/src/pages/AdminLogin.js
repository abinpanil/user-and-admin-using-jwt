import React, { useContext, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

function AdminLogin() {
    const {getAdminLoggIn} = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorStatus, setErrorStatus] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    async function login(e) {
        e.preventDefault();
        try {
            const loginData = {
                username,
                password
            };

            await axios.post("/admin/login", loginData);
            getAdminLoggIn();
            navigate("/admin");
        } catch (e) {
            setErrorStatus(true);
            setErrorMessage(e.response.data.errorMessage);
        }
    }


    return (
        <div>
            <Container style={{ height: '100vh' }}>
                <Row style={{ justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
                    <Col lg={6}>
                        <Card style={{ padding: '28px', justifyContent: 'center', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
                            <Card.Body >
                                <Card.Title className='py-3' style={{ textAlign: 'center' }}>Admin Login</Card.Title>
                                <Form onSubmit={login}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
                                    </Form.Group>
                                    {errorStatus === true && <Form.Label style={{ color: 'red' }}>{errorMessage}</Form.Label>}
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                                    </Form.Group>
                                    <Button style={{ width: '100%' }} variant="primary" type="submit">
                                        Login
                                    </Button>

                                </Form>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AdminLogin
