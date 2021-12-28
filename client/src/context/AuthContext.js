import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

const AuthContext = createContext();

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(undefined);
    const [adminLoggedIn, setAdminLoggedIn] = useState(undefined);

    async function getLoggIn() {
        const loggedInRes = await axios.get("/loggedIn");
        setLoggedIn(loggedInRes.data);
    }

    async function getAdminLoggIn() {
        const loggedInRes = await axios.get("/admin/loggedIn");
        setAdminLoggedIn(loggedInRes.data);
    }

    useEffect(() => {
        getLoggIn();
        getAdminLoggIn();
    }, []);

    return <AuthContext.Provider value={{loggedIn, getLoggIn, adminLoggedIn, getAdminLoggIn}}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;
export {AuthContextProvider};
