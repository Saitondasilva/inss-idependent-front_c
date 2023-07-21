import React,{useEffect} from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    
    const user  = useSelector((state) => state.user);
    const token = localStorage.getItem('token');
    let location = useLocation();
    useEffect(() => {

      }, []);
      /*
    if(!user.user.isAuthenticated || !token) {
        return <Navigate to="/sign-in" state={{ from: location}} replace />
    }
    */
   
    if(!token) {
        return <Navigate to="/sign-in" state={{ from: location}} replace />
    }
    
    
 return children

};

export default ProtectedRoute;