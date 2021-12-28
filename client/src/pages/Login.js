import React, { useContext, useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';
const Login = () => {
    const {getLoggIn} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorStatus, setErrorStatus] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    async function login(e) {
        e.preventDefault();
        try {
            const loginData = {
                email,
                password
            };

            await axios.post("/login/", loginData);
            
            getLoggIn();
            navigate("/");
        } catch (e) {
            setErrorStatus(true);
            setErrorMessage(e.response.data.errorMessage);
        }
    }


    return (    
        <div>
            <Container style={{height:'100vh'}}>
                <Row style={{justifyContent:'center', height:'100vh', alignItems:'center'}}>
                    <Col lg={6}>
                        <Card style={{padding:'28px', justifyContent:'center', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
                            <Card.Body >
                                <Card.Title className='py-3' style={{textAlign:'center'}}>Login</Card.Title>
                                <Form onSubmit={login}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                                    </Form.Group>
                                    {errorStatus === true && <Form.Label style={{color:'red'}}>{errorMessage}</Form.Label>}
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                                    </Form.Group>
                                    <Button style={{width:'100%'}} variant="primary" type="submit">
                                        Login
                                    </Button>

                                </Form>
                                <div className='py-3' style={{textAlign:'center'}}>
                                    <Link to="/signup">Create Account</Link>
                                </div>

                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login
