import React, {createContext, useState, useContext} from 'react'
import Cookies from "js-cookie"

export const AuthContext=createContext()
export const AuthProvider = ({children})=>{
    const initialState=Cookies.get("jwt") || localStorage.getItem("ChatApp");

    //parse the user data and storing in state
    const [authUser,setAuthUser] = useState(initialState? JSON.parse(initialState): undefined);
    return (
        <AuthContext.Provider value={[authUser,setAuthUser]}>
            {children}
        </AuthContext.Provider>    
    )
  
}

export const useAuth=()=>useContext(AuthContext);