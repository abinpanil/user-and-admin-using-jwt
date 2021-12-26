import React, { useState } from 'react'
import axios from "axios";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVarify, setPasswordVarify] = useState("");

    async function register(e) {
        e.preventDefault();
        try {
            const registerData = {
                email,
                password,
                passwordVarify
            };

            await axios.post("http://localhost:2000/signup/", registerData);

        } catch (e) {
            console.error(e);
        }
    }
    

    return (
        <div>
            <form onSubmit={register}>
                <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                <input onChange={(e) => setPasswordVarify(e.target.value)} type="password" placeholder="varefyPassword" />
                <button type='submit' >Register</button>
            </form>
        </div>
    )
}

export default Signup
