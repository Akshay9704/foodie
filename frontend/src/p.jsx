import React from 'react'
import {Navigate, Outlet, useLocation} from "react-router-dom"

const ProtectedRoutes = () => {
    const location = useLocation();
    const token = localStorage.getItem("token")

    if(!token) {
        alert("Please Login");
        return <Navigate to="/" state={{from: location.pathname}}/>
    }

    return <Outlet/>;
}

export default ProtectedRoutes