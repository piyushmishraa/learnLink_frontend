import React from 'react'
import { useNavigate } from 'react-router-dom'
function LogOut() {
    const navigate= useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem("authToken");
        navigate('/login');
    }
  
  return (
    <>
    <button className='bg-black text-white' onClick={handleLogout}>Logout</button>
    </>


  )
}

export default LogOut