import React, { useState } from 'react'
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login(e) {
        e.preventDefault();
        try {
            const loginData = {
                email,
                password
            };

            await axios.post("http://localhost:2000/login/", loginData);

        } catch (e) {
            console.error(e);
        }
    }
    

    return (
        <div>
            <form onSubmit={login}>
                <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                <button type='submit' >Login</button>
            </form>
        </div>
    )
}

export default Login
