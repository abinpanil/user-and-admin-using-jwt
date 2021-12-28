import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

const AdminAuthContext = createContext();

function AuthContextProvider(props) {
    const [adminLoggedIn, setAdminLoggedIn] = useState(undefined);

    async function getAdminLoggIn() {
        const loggedInRes = await axios.get("/admin/loggedIn");
        setAdminLoggedIn(loggedInRes.data);
    }

    useEffect(() => {
        getAdminLoggIn();
    }, []);

    return <AdminAuthContext.Provider value={{adminLoggedIn, getAdminLoggIn}}>
        {props.children}
    </AdminAuthContext.Provider>
}

export default AdminAuthContext;
export {AuthContextProvider};
