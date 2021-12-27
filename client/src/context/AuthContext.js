import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

const AuthContext = createContext();

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(undefined);

    async function getLoggIn() {
        const loggedInRes = await axios.get("/loggedIn");
        setLoggedIn(loggedInRes.data);
    }

    useEffect(() => {
        getLoggIn();
    }, []);

    return <AuthContext.Provider value={{loggedIn, getLoggIn}}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;
export {AuthContextProvider};
