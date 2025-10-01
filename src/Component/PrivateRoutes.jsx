import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'

function PrivateRoutes() {
    
    const authTokenn= window.localStorage.getItem("authToken");
  return (
   
    authTokenn?<Outlet/>:<Navigate to="/login" />

  )
}

export default PrivateRoutes