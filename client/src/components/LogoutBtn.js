import axios from 'axios'
import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

function LogoutBtn() {
    const {getLoggIn} = useContext(AuthContext)
    const navigate = useNavigate()

    async function logout() {
        await axios.get("/logout/");
        getLoggIn();
        navigate("/")
    }

    return <Button onClick={logout} variant="outline-secondary">Logout</Button>
        
}

export default LogoutBtn
