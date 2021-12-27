import React from 'react'
import Navibar from '../components/Navbar'
import { Col, Container, Row } from 'react-bootstrap';

const Home = () => {
    return (
        <div>

            <Navibar />
            <Container>
                <Container fluid>
                    <Row>
                        <Col>

                            <h1>Home</h1>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </div>
    )
}

export default Home;
