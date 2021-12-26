import React from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";

const Container = styled.div`
    height: 60px;
`
const Wrapper = styled.div `
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
`
const Left = styled.div`
    flex: 1;
`
const Logo = styled.div`
    font-weight: bold;
    font-size: 25px;
`

const Right = styled.div`
    flex: 1;
    text-align: end;
`

const Navbar = () => {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Logo>
                        <Link to="/">User</Link>
                    </Logo>
                </Left>
                <Right>
                    <Link to="/signup">Signup</Link>
                    <Link to="/login">Login</Link>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar
