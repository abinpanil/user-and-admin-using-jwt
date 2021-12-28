import React, { useContext, useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';

const Signup = () => {
    const {getLoggIn} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVarify, setPasswordVarify] = useState("");
    const [errorStatus, setErrorStatus] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    async function register(e) {
        e.preventDefault();
        try {
            const registerData = {
                email,
                password,
                passwordVarify
            };

            await axios.post("/signup/", registerData);
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
                                <Card.Title className='py-3' style={{textAlign:'center'}}>Register</Card.Title>
                                <Form onSubmit={register}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Varify Password</Form.Label>
                                        <Form.Control onChange={(e) => setPasswordVarify(e.target.value)} type="password" placeholder="varifyPassword" />
                                    </Form.Group>
                                    {errorStatus === true && <Form.Label style={{color:'red'}}>{errorMessage}</Form.Label>}
                                    <Button style={{width:'100%'}} variant="primary" type="submit">
                                        Login
                                    </Button>

                                </Form>
                                <div className='py-3' style={{textAlign:'center'}}>
                                <Link to="/login">Already have an account? </Link>
                                </div>

                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Signup
