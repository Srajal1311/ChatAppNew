import React from 'react'
import Cookies from "js-cookie"
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react'

function useGetAllUsers() {
  const [allUsers, setAllUsers]=useState([])
  const [loading,setLoading]=useState(false)
  useEffect(()=>{
        const getUser=async()=>{
            setLoading(true)
        try{
            const token=Cookies.get("jwt")
            const response=await axios.get("/api/user/allUsers",{
                credentials:"include",
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setAllUsers(response.data);
            setLoading(false)
        } catch(error){
            console.log("Error in useGetAllUsers: "+error)
        }
    }
    getUser();
        
  },[])
  return [allUsers,loading]
}

export default useGetAllUsers