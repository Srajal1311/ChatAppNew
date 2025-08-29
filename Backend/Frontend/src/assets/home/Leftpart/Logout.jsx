import React, { useState } from 'react'
import axios from 'axios';
import Cookies from "js-cookie";
import toast from 'react-hot-toast';
import { FaSearch } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";

function Logout() {
  const[loading,setLoading]=useState(false)
  const handleLogout=async()=>{
    try{
      const res= await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logged out successfully");
      window.location.reload();
    }catch(error){
      console.log("Error in logout",error)
      toast.error("Error in logging out");
    }

  }
  return (
    <div className='h-[8vh] bg-slate-900'>
           <div>
            <BiLogOutCircle className='text-3xl hover:bg-slate-700 cursor-pointer duration-300 rounded-full my-2 mx-2 p-0 'onClick={handleLogout} />
           </div>
    </div>
  )
}

export default Logout