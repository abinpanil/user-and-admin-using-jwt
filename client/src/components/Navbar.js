import React from 'react';
import styled from 'styled-components';

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
                    <Logo>NavBar</Logo>
                </Left>
                <Right>Right</Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar
