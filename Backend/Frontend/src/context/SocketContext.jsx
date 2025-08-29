import { createContext,useState,useEffect,useContext } from "react"
import {useAuth} from "./AuthProvider"
import io from "socket.io-client"

const socketContext=createContext()

// it is a hook
export const useSocketContext=()=>{
    return useContext(socketContext)
}


export const SocketProvider=({children})=>{
    const [socket,setSocket]=useState(null);
    const [onlineUsers,setOnlineUsers]=useState([]);
    const [authUser]=useAuth();

    useEffect(()=>{
      const userId = authUser?.user?._id;
      if(userId){
        const newSocket=io("https://chatappnew-t0jr.onrender.com/",{
        query:{userId},
      });
      setSocket(newSocket);
      newSocket.on("getOnlineUsers",(users)=>{
            setOnlineUsers(users);
      })

      return ()=>{
        newSocket.disconnect();
        setSocket(null);
      };
     } else{
            if(socket){
                socket.close();
                setSocket(null);
            }
      }    
    },[authUser]);
    return (
        <socketContext.Provider value={{socket,onlineUsers}}>{children}
        </socketContext.Provider>
    );
};