import React from 'react'
import useConversation from '../../../../zustand/useConversation.js'
import { useSocketContext } from '../../../context/SocketContext.jsx';
import { Socket } from 'socket.io-client';
function Users({user}) {
  const {selectedConversation,setSelectedConversation}=useConversation()
  const {onlineUsers}=useSocketContext()
  const isOnline=onlineUsers.includes(user._id);
  
  const isSelected = selectedConversation ? selectedConversation._id === user._id : false;
  return (
    <div className={`hover:bg-slate-600 duration-300  ${isSelected? "bg-slate-700":""}`} onClick={()=>setSelectedConversation(user)}>
        <div className='flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer'>
            <div className={`avatar ${isOnline?"avatar-online":""}`}>
  <div className="w-14 rounded-full">
    <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
  </div>
  
</div>
    <div>
        <h1 className='font-bold'>{user?.fullname || "No Name"}</h1>
        <span>{user?.email || "No Email"}</span>
    </div>

    </div>
  </div>
  )
}

export default Users