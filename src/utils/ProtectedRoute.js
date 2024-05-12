import React from 'react'
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    let isAuthenticated = false;
    const user = localStorage.getItem('user');
    if(user && Object.keys(JSON.parse(user)).length) {
        isAuthenticated = true
    }
    let location = useLocation();

    if(!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;