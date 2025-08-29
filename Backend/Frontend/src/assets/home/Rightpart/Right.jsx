import { useEffect } from "react";
import useConversation from "../../../../zustand/useConversation.js";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import Loading from "../../../components/Loading.jsx";
import {useAuth} from "../../../context/AuthProvider.jsx";


function Right() {
  const {selectedConversation,setSelectedConversation}=useConversation()
  useEffect(()=>{
    return setSelectedConversation(null)
  },[setSelectedConversation]);
  return (
    <div className="w-[70%] border bg-slate-900 text-gray-300 border-black">
    <div>
      {!selectedConversation ?(<NoChatSelected/>):(<> 
      
        <Chatuser/>
        <div className="flex-1 overflow-y-auto hide-scrollbar" style={{maxHeight: "calc(92vh - 8vh)"}}>
        <Messages/>
        </div>
        <Typesend/>
        </>
        )}
        </div>
    </div>
    
  )
}

export default Right;

const NoChatSelected=()=>{
  const [authUser]=useAuth()
  return(
    <>
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-center">Welcome <span>{authUser.user.fullname}</span><br/>
      No chat selected, please start conversation by selecting anyone to your contacts.
      </h1>
    </div>
    </>
  )
} 